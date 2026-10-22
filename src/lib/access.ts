import "server-only";
import { timingSafeEqual } from "node:crypto";
import type { Order } from "./orders";
import { orders } from "./store";

/** Loads an order only when the caller holds its unguessable access token. */
export async function orderForToken(id: string, token: string | null | undefined): Promise<Order | null> {
  if (!token) return null;
  const order = await orders().get(id);
  if (!order) return null;
  const a = Buffer.from(order.accessToken);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b) ? order : null;
}

export function orderUrl(order: Order, extra = ""): string {
  return `/order/${order.id}?t=${order.accessToken}${extra}`;
}
