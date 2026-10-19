import { NextResponse } from "next/server";
import { paystackEnabled } from "@/lib/config";
import { settle, validWebhookSignature } from "@/lib/paystack";

/**
 * Paystack webhook (set in Dashboard → Settings → API Keys & Webhooks):
 *   https://<your-domain>/api/paystack/webhook
 * Covers customers who close the browser before returning from checkout.
 */
export async function POST(request: Request) {
  if (!paystackEnabled()) return NextResponse.json({ ok: false }, { status: 503 });
  const raw = await request.text();
  if (!validWebhookSignature(raw, request.headers.get("x-paystack-signature"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const event = JSON.parse(raw) as { event?: string; data?: { reference?: string } };
  if (event.event === "charge.success" && event.data?.reference) {
    try {
      const result = await settle(event.data.reference);
      if (result.outcome === "mismatch") console.warn("paystack webhook mismatch", event.data.reference);
    } catch (error) {
      console.error("paystack webhook settlement failed", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }
  return NextResponse.json({ ok: true });
}
