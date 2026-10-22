import { NextResponse } from "next/server";
import { orderUrl } from "@/lib/access";
import { site } from "@/lib/config";
import { settle } from "@/lib/paystack";

/** Paystack redirects the customer here after checkout. We verify server-side before showing "paid". */
export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference) return NextResponse.redirect(new URL("/", site.url));

  try {
    const result = await settle(reference);
    if (!result.order) return NextResponse.redirect(new URL("/payment?status=unmatched", site.url));
    const flag = result.outcome === "paid" || result.outcome === "already_paid" ? "&payment=success" : "&payment=failed";
    return NextResponse.redirect(new URL(orderUrl(result.order, flag), site.url));
  } catch (error) {
    console.error("paystack callback verification failed", error);
    return NextResponse.redirect(new URL("/payment?status=pending", site.url));
  }
}
