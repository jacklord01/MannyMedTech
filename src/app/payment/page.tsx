import type { Metadata } from "next";
import Link from "next/link";
import { whatsappLink } from "@/lib/config";
import styles from "../order/order.module.css";

export const metadata: Metadata = { title: "Payment status | Manny MedTech", robots: { index: false } };

const messages: Record<string, string> = {
  pending:
    "We are still confirming your payment with Paystack. Your invoice will update automatically — if it has not within an hour, please message us with your invoice number.",
  unmatched: "We could not match that payment to an invoice. Please message us with your invoice number and Paystack receipt."
};

export default async function PaymentStatusPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  return (
    <div className={styles.page}>
      <div className={`container ${styles.wrap}`}>
        <h1 style={{ marginBottom: 16 }}>Payment status</h1>
        <div className={`${styles.notice} ${styles.noticeWarn}`}>{messages[status ?? ""] ?? messages.pending}</div>
        <div className={styles.actionButtons}>
          <a className="btn btn-primary" href={whatsappLink("Hello Manny MedTech, I need help with a payment for invoice:")} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>
          <Link href="/products" className="btn btn-secondary">Back to catalog</Link>
        </div>
      </div>
    </div>
  );
}
