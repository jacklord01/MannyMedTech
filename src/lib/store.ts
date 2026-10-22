import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { orderNumber, type Order, type OrderStatus } from "./orders";

export type NewOrder = Omit<Order, "id" | "number" | "createdAt" | "updatedAt">;
export type OrderPatch = Partial<Omit<Order, "id" | "number" | "accessToken" | "createdAt" | "updatedAt">>;

interface OrderStore {
  create(order: NewOrder): Promise<Order>;
  get(id: string): Promise<Order | null>;
  list(limit: number): Promise<Order[]>;
  /** Applies the patch only while the order is in one of `fromStatuses`; returns null otherwise. */
  update(id: string, patch: OrderPatch, fromStatuses: OrderStatus[]): Promise<Order | null>;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ---------- Supabase (production) ----------

type Row = {
  id: string;
  sequence: number;
  access_token: string;
  status: OrderStatus;
  customer: Order["customer"];
  items: Order["items"];
  tax_label: string;
  tax_rate_percent: number | string;
  subtotal_pesewas: number;
  tax_pesewas: number;
  total_pesewas: number;
  paystack_reference: string | null;
  amount_paid_pesewas: number | null;
  paid_at: string | null;
  payment_note: string | null;
  invoiced_at: string | null;
  created_at: string;
  updated_at: string;
};

function fromRow(row: Row): Order {
  return {
    id: row.id,
    accessToken: row.access_token,
    number: orderNumber(Number(row.sequence)),
    status: row.status,
    customer: row.customer,
    items: row.items,
    taxLabel: row.tax_label,
    taxRatePercent: Number(row.tax_rate_percent),
    subtotal: Number(row.subtotal_pesewas),
    tax: Number(row.tax_pesewas),
    total: Number(row.total_pesewas),
    paystackReference: row.paystack_reference,
    amountPaid: row.amount_paid_pesewas === null ? null : Number(row.amount_paid_pesewas),
    paidAt: row.paid_at,
    paymentNote: row.payment_note,
    invoicedAt: row.invoiced_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function toRow(patch: OrderPatch): Partial<Row> {
  const row: Partial<Row> = {};
  if (patch.status !== undefined) row.status = patch.status;
  if (patch.customer !== undefined) row.customer = patch.customer;
  if (patch.items !== undefined) row.items = patch.items;
  if (patch.taxLabel !== undefined) row.tax_label = patch.taxLabel;
  if (patch.taxRatePercent !== undefined) row.tax_rate_percent = patch.taxRatePercent;
  if (patch.subtotal !== undefined) row.subtotal_pesewas = patch.subtotal;
  if (patch.tax !== undefined) row.tax_pesewas = patch.tax;
  if (patch.total !== undefined) row.total_pesewas = patch.total;
  if (patch.paystackReference !== undefined) row.paystack_reference = patch.paystackReference;
  if (patch.amountPaid !== undefined) row.amount_paid_pesewas = patch.amountPaid;
  if (patch.paidAt !== undefined) row.paid_at = patch.paidAt;
  if (patch.paymentNote !== undefined) row.payment_note = patch.paymentNote;
  if (patch.invoicedAt !== undefined) row.invoiced_at = patch.invoicedAt;
  return row;
}

class SupabaseOrderStore implements OrderStore {
  constructor(private readonly db: SupabaseClient) {}

  async create(order: NewOrder) {
    const { data, error } = await this.db
      .from("mmt_orders")
      .insert({ ...toRow(order), access_token: order.accessToken })
      .select()
      .single<Row>();
    if (error) throw new Error(`Could not save order: ${error.message}`);
    return fromRow(data);
  }

  async get(id: string) {
    if (!UUID.test(id)) return null;
    const { data, error } = await this.db.from("mmt_orders").select().eq("id", id).maybeSingle<Row>();
    if (error) throw new Error(`Could not load order: ${error.message}`);
    return data ? fromRow(data) : null;
  }

  async list(limit: number) {
    const { data, error } = await this.db
      .from("mmt_orders")
      .select()
      .order("created_at", { ascending: false })
      .limit(limit)
      .returns<Row[]>();
    if (error) throw new Error(`Could not list orders: ${error.message}`);
    return data.map(fromRow);
  }

  async update(id: string, patch: OrderPatch, fromStatuses: OrderStatus[]) {
    if (!UUID.test(id)) return null;
    const { data, error } = await this.db
      .from("mmt_orders")
      .update({ ...toRow(patch), updated_at: new Date().toISOString() })
      .eq("id", id)
      .in("status", fromStatuses)
      .select()
      .maybeSingle<Row>();
    if (error) throw new Error(`Could not update order: ${error.message}`);
    return data ? fromRow(data) : null;
  }
}

// ---------- JSON file (local development only) ----------

type FileData = { sequence: number; orders: (Order & { sequence: number })[] };

class FileOrderStore implements OrderStore {
  private readonly file = path.join(process.cwd(), ".data", "orders.json");
  private queue: Promise<unknown> = Promise.resolve();

  private async read(): Promise<FileData> {
    try {
      return JSON.parse(await readFile(this.file, "utf8")) as FileData;
    } catch {
      return { sequence: 0, orders: [] };
    }
  }

  private async write(data: FileData) {
    await mkdir(path.dirname(this.file), { recursive: true });
    await writeFile(this.file, JSON.stringify(data, null, 2));
  }

  private serial<T>(task: () => Promise<T>): Promise<T> {
    const next = this.queue.then(task, task);
    this.queue = next.catch(() => undefined);
    return next;
  }

  create(order: NewOrder) {
    return this.serial(async () => {
      const data = await this.read();
      data.sequence += 1;
      const now = new Date().toISOString();
      const saved = { ...order, id: randomUUID(), sequence: data.sequence, number: orderNumber(data.sequence), createdAt: now, updatedAt: now };
      data.orders.push(saved);
      await this.write(data);
      return saved;
    });
  }

  async get(id: string) {
    const data = await this.read();
    return data.orders.find((order) => order.id === id) ?? null;
  }

  async list(limit: number) {
    const data = await this.read();
    return [...data.orders].reverse().slice(0, limit);
  }

  update(id: string, patch: OrderPatch, fromStatuses: OrderStatus[]) {
    return this.serial(async () => {
      const data = await this.read();
      const index = data.orders.findIndex((order) => order.id === id);
      const current = data.orders[index];
      if (!current || !fromStatuses.includes(current.status)) return null;
      const updated = { ...current, ...patch, updatedAt: new Date().toISOString() };
      data.orders[index] = updated;
      await this.write(data);
      return updated;
    });
  }
}

let store: OrderStore | null = null;

export function orders(): OrderStore {
  if (store) return store;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    store = new SupabaseOrderStore(createClient(url, key, { auth: { persistSession: false } }));
  } else if (process.env.NODE_ENV !== "production" || process.env.ALLOW_FILE_STORE === "true") {
    store = new FileOrderStore();
  } else {
    throw new Error("Order storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  return store;
}
