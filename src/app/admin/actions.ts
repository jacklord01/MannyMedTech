"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { endAdminSession, passwordMatches, requireAdmin, startAdminSession } from "@/lib/admin-auth";
import { cedisToPesewas } from "@/lib/money";
import { computeTotals } from "@/lib/orders";
import { orders } from "@/lib/store";

export async function login(_: string | null, form: FormData): Promise<string | null> {
  if (!passwordMatches(String(form.get("password") ?? ""))) return "Incorrect password.";
  await startAdminSession();
  redirect("/admin");
}

export async function logout() {
  await endAdminSession();
  redirect("/admin/login");
}

/** Sets prices on every line (quoted or catalogue) and issues the invoice. */
export async function issueInvoice(id: string, _: string | null, form: FormData): Promise<string | null> {
  await requireAdmin();
  const order = await orders().get(id);
  if (!order) return "Order not found.";

  const items = [];
  for (const [index, line] of order.items.entries()) {
    const price = cedisToPesewas(String(form.get(`price-${index}`) ?? ""));
    if (price === null || price <= 0) return `Enter a valid unit price for ${line.name}.`;
    items.push({ ...line, unitPrice: price });
  }
  const totals = computeTotals(items, order.taxRatePercent);
  const updated = await orders().update(
    id,
    { items, ...totals, status: "awaiting_payment", invoicedAt: new Date().toISOString() },
    ["quote_requested", "awaiting_payment"]
  );
  if (!updated) return "This order can no longer be repriced (it may already be paid).";
  revalidatePath(`/admin/orders/${id}`);
  return "Invoice issued. Send the customer their invoice link.";
}

export async function recordManualPayment(id: string, _: string | null, form: FormData): Promise<string | null> {
  await requireAdmin();
  const method = String(form.get("method") ?? "").trim().slice(0, 120);
  if (!method) return "Describe how the payment was received (e.g. MoMo ref 1234).";
  const order = await orders().get(id);
  if (!order) return "Order not found.";
  const updated = await orders().update(
    id,
    { status: "paid", amountPaid: order.total, paidAt: new Date().toISOString(), paymentNote: method },
    ["awaiting_payment"]
  );
  if (!updated) return "Only invoices awaiting payment can be marked paid.";
  revalidatePath(`/admin/orders/${id}`);
  return "Payment recorded.";
}

export async function cancelOrder(id: string) {
  await requireAdmin();
  await orders().update(id, { status: "cancelled" }, ["quote_requested", "awaiting_payment"]);
  revalidatePath(`/admin/orders/${id}`);
}
