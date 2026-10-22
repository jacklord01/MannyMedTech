import type { Metadata } from "next";
import { connection } from "next/server";
import { adminConfigured } from "@/lib/admin-auth";
import styles from "../admin.module.css";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sales desk sign in | Manny MedTech", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  await connection();
  return (
    <div className={styles.page}>
      <div className="container" style={{ maxWidth: 420 }}>
        <div className={styles.panel}>
          <h1 style={{ fontSize: "1.6rem", marginBottom: 16 }}>Sales desk</h1>
          {adminConfigured() ? (
            <LoginForm />
          ) : (
            <p className={styles.note}>Set ADMIN_PASSWORD (at least 12 characters) in the environment to enable the sales desk.</p>
          )}
        </div>
      </div>
    </div>
  );
}
