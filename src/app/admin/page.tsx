import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { formatCedis } from "@/lib/money";
import { statusLabels } from "@/lib/orders";
import { orders } from "@/lib/store";
import { logout } from "./actions";
import styles from "./admin.module.css";

export const metadata: Metadata = { title: "Sales desk | Manny MedTech", robots: { index: false, follow: false } };

export default async function AdminPage() {
  await requireAdmin();
  const list = await orders().list(200);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <h1>Sales desk</h1>
            <p className={styles.muted}>Price quotation requests, issue invoices and track payments.</p>
          </div>
          <form action={logout}><button className="btn btn-secondary">Sign out</button></form>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Ref</th><th>Date</th><th>Facility</th><th>Items</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {list.length ? list.map((order) => (
                <tr key={order.id}>
                  <td><Link href={`/admin/orders/${order.id}`}>{order.number}</Link></td>
                  <td>{new Date(order.createdAt).toLocaleDateString("en-GB")}</td>
                  <td>{order.customer.facilityName}<br /><span className={styles.muted}>{order.customer.location}</span></td>
                  <td>{order.items.length}</td>
                  <td>{order.total ? formatCedis(order.total) : "—"}</td>
                  <td><span className={`${styles.status} ${styles[`status_${order.status}`]}`}>{statusLabels[order.status]}</span></td>
                </tr>
              )) : (
                <tr><td colSpan={6} className={styles.muted}>No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
