import { z } from "zod";
import { PRODUCTS, type Product } from "@/data/products";
import { cedisToPesewas, taxOn } from "./money";

export type OrderStatus = "quote_requested" | "awaiting_payment" | "paid" | "cancelled";

export type OrderLine = {
  productId: string;
  name: string;
  category: string;
  quantity: number;
  notes: string;
  /** Pesewas. null until priced (catalogue price, or set by staff for quoted items). */
  unitPrice: number | null;
};

export type Customer = {
  fullName: string;
  facilityName: string;
  phone: string;
  email: string;
  location: string;
  address: string;
  shippingNotes: string;
};

export type Order = {
  id: string;
  accessToken: string;
  number: string;
  status: OrderStatus;
  customer: Customer;
  items: OrderLine[];
  taxLabel: string;
  taxRatePercent: number;
  subtotal: number;
  tax: number;
  total: number;
  paystackReference: string | null;
  amountPaid: number | null;
  paidAt: string | null;
  paymentNote: string | null;
  invoicedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/** Catalogue price in pesewas, parsed from the product's display price (e.g. "GH¢ 350"). */
export function unitPriceOf(product: Product): number | null {
  if (!product.price) return null;
  return cedisToPesewas(product.price.replace(/^\s*GH[¢₵S]\s*/i, ""));
}

const text = (max: number) => z.string().trim().max(max);

export const orderRequestSchema = z.object({
  clientInfo: z.object({
    fullName: text(120).min(2, "Enter a contact name"),
    facilityName: text(160).min(2, "Enter your hospital, clinic or business name"),
    phone: text(30).regex(/^\+?[\d\s()-]{9,}$/, "Enter a valid phone number"),
    email: z.email("Enter a valid email address").max(200),
    location: text(120).min(2, "Select a delivery location"),
    address: text(300).default(""),
    shippingNotes: text(1000).default("")
  }),
  items: z
    .array(z.object({ productId: z.string().max(100), quantity: z.number().int().min(1).max(10_000), notes: text(500).optional() }))
    .min(1, "Your list is empty")
    .max(50),
  website: z.string().max(0).optional()
});

export type OrderRequest = z.infer<typeof orderRequestSchema>;

/** Builds order lines from the catalogue so prices never come from the browser. */
export function buildLines(items: OrderRequest["items"]): OrderLine[] {
  const merged = new Map<string, { quantity: number; notes: string }>();
  for (const item of items) {
    const current = merged.get(item.productId);
    merged.set(item.productId, {
      quantity: (current?.quantity ?? 0) + item.quantity,
      notes: item.notes || current?.notes || ""
    });
  }

  return [...merged].map(([productId, { quantity, notes }]) => {
    const product = PRODUCTS.find((candidate) => candidate.id === productId);
    if (!product || !product.isAvailable) throw new Error(`Unavailable product: ${productId}`);
    return {
      productId,
      name: product.name,
      category: product.category,
      quantity: Math.min(quantity, 10_000),
      notes,
      unitPrice: unitPriceOf(product)
    };
  });
}

export function isFullyPriced(lines: OrderLine[]): boolean {
  return lines.every((line) => line.unitPrice !== null);
}

export function computeTotals(lines: OrderLine[], taxRatePercent: number) {
  const subtotal = lines.reduce((sum, line) => sum + (line.unitPrice ?? 0) * line.quantity, 0);
  const tax = taxOn(subtotal, taxRatePercent);
  return { subtotal, tax, total: subtotal + tax };
}

export function orderNumber(sequence: number): string {
  return `MMT-${String(sequence).padStart(5, "0")}`;
}

export const statusLabels: Record<OrderStatus, string> = {
  quote_requested: "Quotation in progress",
  awaiting_payment: "Invoice issued — awaiting payment",
  paid: "Paid",
  cancelled: "Cancelled"
};
