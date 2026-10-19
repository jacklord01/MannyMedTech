import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "mmt_admin";
const MAX_AGE_SECONDS = 12 * 60 * 60;

function sign(issuedAt: string): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) return null;
  return createHmac("sha256", password).update(`mmt-admin:${issuedAt}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 12);
}

export function passwordMatches(candidate: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password && password.length >= 12 && safeEqual(candidate, password));
}

export async function startAdminSession() {
  const issuedAt = String(Math.floor(Date.now() / 1000));
  const signature = sign(issuedAt);
  if (!signature) throw new Error("ADMIN_PASSWORD is not configured");
  (await cookies()).set(COOKIE, `${issuedAt}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE_SECONDS
  });
}

export async function endAdminSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [issuedAt = "", signature = ""] = value.split(".");
  const expected = sign(issuedAt);
  if (!expected || !safeEqual(signature, expected)) return false;
  return Date.now() / 1000 - Number(issuedAt) < MAX_AGE_SECONDS;
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
