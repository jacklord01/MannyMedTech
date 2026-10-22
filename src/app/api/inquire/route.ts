import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { orderUrl } from "@/lib/access";
import { invoiceSettings } from "@/lib/config";
import { buildLines, orderRequestSchema } from "@/lib/orders";
import { orders } from "@/lib/store";

/**
 * Saves the customer's inquiry list as a quotation request (no prices are shown to the customer).
 * Sales staff call the customer, then price it at /admin to issue an invoice with a Pay now button.
 * Catalogue prices are kept on each line only to pre-fill the staff pricing form.
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

  try {
    const order = await orders().create({
      accessToken: randomBytes(24).toString("base64url"),
      status: "quote_requested",
      customer: parsed.data.clientInfo,
      items: lines,
      taxLabel,
      taxRatePercent,
      subtotal: 0,
      tax: 0,
      total: 0,
      paystackReference: null,
      amountPaid: null,
      paidAt: null,
      paymentNote: null,
      invoicedAt: null
    });
    return NextResponse.json(
      { success: true, quoteId: order.number, url: orderUrl(order, "&new=1") },
      { status: 201 }
    );
  } catch (error) {
    console.error("order create failed", error);
    return NextResponse.json({ message: "We could not save your order right now. Please send it to us on WhatsApp." }, { status: 503 });
  }
}
