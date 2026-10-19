import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { site } from "./config";
import type { Order } from "./orders";
import { orders } from "./store";

const API = process.env.PAYSTACK_API_BASE ?? "https://api.paystack.co";

function secretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("Paystack is not configured");
  return key;
}

async function paystack<T>(pathname: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API}${pathname}`, {
    ...init,
    headers: { Authorization: `Bearer ${secretKey()}`, "Content-Type": "application/json", ...init?.headers },
    cache: "no-store"
  });
  const body = (await response.json().catch(() => null)) as { status?: boolean; message?: string; data?: T } | null;
  if (!response.ok || !body?.status || body.data === undefined) {
    throw new Error(`Paystack ${pathname} failed: ${body?.message ?? response.status}`);
  }
  return body.data;
}

/** Starts a Paystack checkout for the invoice and returns the hosted payment page URL. */
export async function initializePayment(order: Order): Promise<string> {
  const reference = `${order.number}-${randomBytes(4).toString("hex")}`;
  const data = await paystack<{ authorization_url: string }>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: order.customer.email,
      amount: order.total,
      currency: "GHS",
      reference,
      callback_url: `${site.url}/api/paystack/callback`,
      channels: ["card", "mobile_money", "bank", "bank_transfer"],
      metadata: {
        order_id: order.id,
        invoice_number: order.number,
        custom_fields: [
          { display_name: "Invoice", variable_name: "invoice_number", value: order.number },
          { display_name: "Facility", variable_name: "facility", value: order.customer.facilityName }
        ]
      }
    })
  });
  await orders().update(order.id, { paystackReference: reference }, ["awaiting_payment"]);
  return data.authorization_url;
}

type Transaction = {
  status: string;
  reference: string;
  amount: number;
  currency: string;
  paid_at: string | null;
  channel: string;
  metadata: { order_id?: string } | string | null;
};

export type SettlementResult =
  | { outcome: "paid" | "already_paid"; order: Order }
  | { outcome: "not_successful" | "mismatch"; order: Order | null };

/**
 * Re-fetches the transaction from Paystack (never trusting redirect or webhook payloads alone),
 * checks it matches the invoice exactly, then marks the order paid. Safe to call repeatedly.
 */
export async function settle(reference: string): Promise<SettlementResult> {
  const tx = await paystack<Transaction>(`/transaction/verify/${encodeURIComponent(reference)}`);
  const metadata = typeof tx.metadata === "string" ? (JSON.parse(tx.metadata || "{}") as { order_id?: string }) : tx.metadata;
  const order = metadata?.order_id ? await orders().get(metadata.order_id) : null;
  if (!order) return { outcome: "mismatch", order: null };
  if (order.status === "paid") return { outcome: "already_paid", order };
  if (tx.status !== "success") return { outcome: "not_successful", order };
  if (tx.currency !== "GHS" || tx.amount !== order.total || !tx.reference.startsWith(`${order.number}-`)) {
    return { outcome: "mismatch", order };
  }

  const paid = await orders().update(
    order.id,
    {
      status: "paid",
      paystackReference: tx.reference,
      amountPaid: tx.amount,
      paidAt: tx.paid_at ?? new Date().toISOString(),
      paymentNote: `Paystack (${tx.channel})`
    },
    ["awaiting_payment"]
  );
  if (paid) return { outcome: "paid", order: paid };
  const latest = await orders().get(order.id);
  return latest?.status === "paid" ? { outcome: "already_paid", order: latest } : { outcome: "mismatch", order: latest };
}

export function validWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const expected = createHmac("sha512", secretKey()).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(signature, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}
