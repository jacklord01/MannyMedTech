import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { orderUrl } from "@/lib/access";
import { invoiceSettings } from "@/lib/config";
import { buildLines, computeTotals, isFullyPriced, orderRequestSchema } from "@/lib/orders";
import { orders } from "@/lib/store";

/**
 * Saves an order from the inquiry list. Fully priced orders are invoiced immediately
 * (with a Paystack Pay now button); anything else becomes a quotation for staff to price at /admin.
 */
export async function POST(request: Request) {
  const json: unknown = await request.json().catch(() => null);
  const parsed = orderRequestSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[issue.path.length - 1] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json({ message: Object.values(fieldErrors)[0] ?? "Please check your details.", fieldErrors }, { status: 400 });
  }

  let lines;
  try {
    lines = buildLines(parsed.data.items);
  } catch {
    return NextResponse.json({ message: "One of the items is no longer available. Please refresh your list." }, { status: 400 });
  }

  const { taxLabel, taxRatePercent } = invoiceSettings();
  const priced = isFullyPriced(lines);
  const totals = priced ? computeTotals(lines, taxRatePercent) : { subtotal: 0, tax: 0, total: 0 };

  try {
    const order = await orders().create({
      accessToken: randomBytes(24).toString("base64url"),
      status: priced ? "awaiting_payment" : "quote_requested",
      customer: parsed.data.clientInfo,
      items: lines,
      taxLabel,
      taxRatePercent,
      ...totals,
      paystackReference: null,
      amountPaid: null,
      paidAt: null,
      paymentNote: null,
      invoicedAt: priced ? new Date().toISOString() : null
    });
    return NextResponse.json(
      { success: true, quoteId: order.number, invoiced: priced, url: orderUrl(order, "&new=1") },
      { status: 201 }
    );
  } catch (error) {
    console.error("order create failed", error);
    return NextResponse.json({ message: "We could not save your order right now. Please send it to us on WhatsApp." }, { status: 503 });
  }
}
