import { NextResponse } from "next/server";
import { orderForToken, orderUrl } from "@/lib/access";
import { paystackEnabled, site } from "@/lib/config";
import { initializePayment } from "@/lib/paystack";

/** Form POST from the invoice's Pay now button; redirects to Paystack's hosted checkout. */
export async function POST(request: Request) {
  const form = await request.formData();
  const order = await orderForToken(String(form.get("id") ?? ""), String(form.get("t") ?? ""));
  if (!order) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  if (order.status !== "awaiting_payment" || order.total <= 0 || !paystackEnabled()) {
    return NextResponse.redirect(new URL(orderUrl(order), site.url), 303);
  }

  try {
    const authorizationUrl = await initializePayment(order);
    return NextResponse.redirect(authorizationUrl, 303);
  } catch (error) {
    console.error("paystack initialize failed", error);
    return NextResponse.redirect(new URL(orderUrl(order, "&payment=error"), site.url), 303);
  }
}
