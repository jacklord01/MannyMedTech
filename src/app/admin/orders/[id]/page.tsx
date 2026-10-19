import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { site } from "@/lib/config";
import { formatCedis } from "@/lib/money";
import { statusLabels } from "@/lib/orders";
import { orders } from "@/lib/store";
import { cancelOrder, issueInvoice, recordManualPayment } from "../../actions";
import styles from "../../admin.module.css";
import { ActionForm } from "./ActionForm";

export const metadata: Metadata = { title: "Order | Manny MedTech", robots: { index: false, follow: false } };

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const order = await orders().get((await params).id);
  if (!order) notFound();

  const link = `${site.url}/order/${order.id}?t=${order.accessToken}`;
  const editable = order.status === "quote_requested" || order.status === "awaiting_payment";
  const { customer } = order;
  const customerWhatsApp = customer.phone.replace(/\D/g, "").replace(/^0/, "233");

  return (
    <div className={styles.page}>
      <div className="container" style={{ maxWidth: 1000 }}>
        <p style={{ marginBottom: 12 }}><Link href="/admin">← All orders</Link></p>
        <div className={styles.head}>
          <div>
            <h1>{order.number}</h1>
            <span className={`${styles.status} ${styles[`status_${order.status}`]}`}>{statusLabels[order.status]}</span>
          </div>
          <a className="btn btn-secondary" href={link} target="_blank" rel="noopener noreferrer">Open customer invoice</a>
        </div>

        <div className={styles.grid}>
          <div className={styles.panel}>
            <h2>Pricing</h2>
            {editable ? (
              <ActionForm action={issueInvoice.bind(null, order.id)} submitLabel={order.status === "quote_requested" ? "Issue invoice" : "Update invoice"}>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead><tr><th>Item</th><th>Qty</th><th>Unit price (GH₵)</th></tr></thead>
                    <tbody>
                      {order.items.map((line, index) => (
                        <tr key={line.productId}>
                          <td>{line.name}{line.notes ? <><br /><span className={styles.muted}>{line.notes}</span></> : null}</td>
                          <td>{line.quantity}</td>
                          <td>
                            <input className={styles.priceInput} name={`price-${index}`} inputMode="decimal" required
                              defaultValue={line.unitPrice !== null ? (line.unitPrice / 100).toFixed(2) : ""} placeholder="0.00" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={styles.muted} style={{ marginTop: 8 }}>
                  {order.taxRatePercent > 0 ? `${order.taxLabel} at ${order.taxRatePercent}% is added automatically.` : "No tax is added (INVOICE_TAX_RATE_PERCENT is 0)."}
                </p>
              </ActionForm>
            ) : (
              <table className={styles.table}>
                <tbody>
                  {order.items.map((line) => (
                    <tr key={line.productId}><td>{line.name}</td><td>{line.quantity}</td><td>{line.unitPrice !== null ? formatCedis(line.unitPrice) : "—"}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
            {order.total > 0 ? (
              <div style={{ marginTop: 12 }}>
                <div className={styles.row}><span>Subtotal</span><span>{formatCedis(order.subtotal)}</span></div>
                {order.tax ? <div className={styles.row}><span>{order.taxLabel}</span><span>{formatCedis(order.tax)}</span></div> : null}
                <div className={`${styles.row} ${styles.total}`}><span>Total</span><span>{formatCedis(order.total)}</span></div>
              </div>
            ) : null}
          </div>

          <div className={styles.stack}>
            <div className={styles.panel}>
              <h2>Customer</h2>
              <p><strong>{customer.facilityName}</strong></p>
              <p>{customer.fullName}<br />{customer.email}<br />{customer.phone}</p>
              <p>{customer.address ? <>{customer.address}<br /></> : null}{customer.location}</p>
              {customer.shippingNotes ? <p className={styles.note}>{customer.shippingNotes}</p> : null}
              <p className={styles.link}><strong>Invoice link:</strong> {link}</p>
              {order.status === "awaiting_payment" ? (
                <p style={{ marginTop: 12 }}>
                  <a className="btn btn-primary" target="_blank" rel="noopener noreferrer"
                    href={`https://wa.me/${customerWhatsApp}?text=${encodeURIComponent(`Hello ${customer.fullName}, your Manny MedTech invoice ${order.number} is ready. View and pay securely here: ${link}`)}`}>
                    Send invoice on WhatsApp
                  </a>
                </p>
              ) : null}
            </div>
            {order.status === "awaiting_payment" ? (
              <div className={styles.panel}>
                <h2>Record offline payment</h2>
                <ActionForm action={recordManualPayment.bind(null, order.id)} submitLabel="Mark as paid">
                  <label className={styles.label} htmlFor="method">Payment details</label>
                  <input className={styles.input} id="method" name="method" placeholder="e.g. Bank transfer, GCB ref 10293" required />
                </ActionForm>
              </div>
            ) : null}
            {order.status === "paid" ? (
              <div className={styles.panel}>
                <h2>Payment</h2>
                <p>{order.amountPaid !== null ? formatCedis(order.amountPaid) : ""} · {order.paymentNote}</p>
                {order.paystackReference ? <p className={styles.muted}>Paystack ref {order.paystackReference}</p> : null}
              </div>
            ) : null}
            {editable ? (
              <form action={cancelOrder.bind(null, order.id)}>
                <button className={`btn ${styles.dangerBtn}`}>Cancel order</button>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
