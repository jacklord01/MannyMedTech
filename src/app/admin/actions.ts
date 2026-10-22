"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { endAdminSession, passwordMatches, requireAdmin, startAdminSession } from "@/lib/admin-auth";
import { cedisToPesewas } from "@/lib/money";
import { PRODUCTS } from "@/data/products";
import { computeTotals, EXTRA_INVOICE_ROWS, type OrderLine } from "@/lib/orders";
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

/**
 * Turns a confirmed quote into an invoice: staff can change quantities (0 removes a line),
 * set every unit price, and add catalogue or custom items agreed on the phone.
 */
export async function issueInvoice(id: string, _: string | null, form: FormData): Promise<string | null> {
  await requireAdmin();
  const order = await orders().get(id);
  if (!order) return "Order not found.";
  const field = (name: string) => String(form.get(name) ?? "").trim();

  const items: OrderLine[] = [];
  for (const [index, line] of order.items.entries()) {
    const quantity = Number(field(`qty-${index}`) || line.quantity);
    if (!Number.isInteger(quantity) || quantity < 0 || quantity > 10_000) return `Enter a valid quantity for ${line.name}.`;
    if (quantity === 0) continue;
    const price = cedisToPesewas(field(`price-${index}`));
    if (price === null || price <= 0) return `Enter a valid unit price for ${line.name}.`;
    items.push({ ...line, quantity, unitPrice: price });
  }

  for (let row = 0; row < EXTRA_INVOICE_ROWS; row++) {
    const productId = field(`new-product-${row}`);
    if (!productId) continue;
    const product = PRODUCTS.find((candidate) => candidate.id === productId);
    const name = product?.name ?? field(`new-name-${row}`).slice(0, 160);
    if (!name) return `Enter a description for added item ${row + 1}.`;
    const quantity = Number(field(`new-qty-${row}`));
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10_000) return `Enter a valid quantity for ${name}.`;
    const price = cedisToPesewas(field(`new-price-${row}`));
    if (price === null || price <= 0) return `Enter a valid unit price for ${name}.`;
    const notes = field(`new-notes-${row}`).slice(0, 500);
    const existing = product ? items.find((item) => item.productId === product.id) : undefined;
    if (existing) return `${name} is already on this order — change its quantity instead.`;
    items.push({
      productId: product?.id ?? `custom-${Date.now().toString(36)}-${row}`,
      name,
      category: product?.category ?? "Other",
      quantity,
      notes,
      unitPrice: price
    });
  }

  if (!items.length) return "The invoice needs at least one item. To drop the whole order, cancel it instead.";
  const totals = computeTotals(items, order.taxRatePercent);
  const updated = await orders().update(
    id,
    { items, ...totals, status: "awaiting_payment", invoicedAt: new Date().toISOString() },
    ["quote_requested", "awaiting_payment"]
  );
  if (!updated) return "This order can no longer be changed (it may already be paid).";
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
