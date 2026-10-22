import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/PrintButton";
import { orderForToken } from "@/lib/access";
import { invoiceSettings, paystackEnabled, site, whatsappLink } from "@/lib/config";
import { amountInWords, formatCedis } from "@/lib/money";
import { statusLabels } from "@/lib/orders";
import styles from "../order.module.css";

export const metadata: Metadata = { title: "Invoice | Manny MedTech", robots: { index: false, follow: false } };

/** Plain number for the invoice table, e.g. 1,350.00 — the GHS currency is stated in the headings. */
const plain = (pesewas: number) => (pesewas / 100).toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Accra" });

export default async function OrderPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ t?: string; new?: string; payment?: string }>;
}) {
  const { id } = await params;
  const { t, new: isNew, payment } = await searchParams;
  const order = await orderForToken(id, t);
  if (!order) notFound();

  const issuer = invoiceSettings();
  const isInvoice = order.status === "awaiting_payment" || order.status === "paid";
  const canPay = order.status === "awaiting_payment" && order.total > 0;
  const shareLink = `${site.url}/order/${order.id}?t=${order.accessToken}`;
  const { customer } = order;
  const quoteMessage = [
    `*QUOTE REQUEST ${order.number}* — ${customer.facilityName}`,
    `Contact: ${customer.fullName}, ${customer.phone}`,
    ...order.items.map((line, index) => `${index + 1}. ${line.name} — Qty ${line.quantity}${line.notes ? ` (${line.notes})` : ""}`),
    `Link: ${shareLink}`
  ].join("\n");

  return (
    <div className={styles.page}>
      <div className={`container ${styles.wrap}`}>
        {payment === "success" && order.status === "paid" ? (
          <div className={`${styles.notice} ${styles.noticeGood} ${styles.noPrint}`}>
            Payment received — thank you. A Paystack receipt has been sent to {customer.email}.
          </div>
        ) : null}
        {payment === "failed" ? <div className={`${styles.notice} ${styles.noticeWarn} ${styles.noPrint}`}>The payment was not completed. You can try again below.</div> : null}
        {payment === "error" ? (
          <div className={`${styles.notice} ${styles.noticeWarn} ${styles.noPrint}`}>We could not start the payment. Please try again shortly or message us on WhatsApp.</div>
        ) : null}
        {isNew && order.status === "quote_requested" ? (
          <div className={`${styles.notice} ${styles.noticeGood} ${styles.noPrint}`}>
            Thank you — your quote request <strong>{order.number}</strong> has been received. Our sales desk will call you on{" "}
            <strong>{customer.phone}</strong> to confirm your selection and pricing, then send your invoice with a Pay now button.
            Keep this page link: it becomes your invoice once confirmed.
            <div style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href={whatsappLink(quoteMessage)} target="_blank" rel="noopener noreferrer">
                Send my request to Manny MedTech on WhatsApp
              </a>
            </div>
          </div>
        ) : null}

        {canPay ? (
          <div className={`${styles.payBox} ${styles.noPrint}`}>
            <div>
              <span className={styles.muted}>Amount due</span>
              <br />
              <strong>{formatCedis(order.total)}</strong>
            </div>
            {paystackEnabled() ? (
              <form action="/api/paystack/initialize" method="post">
                <input type="hidden" name="id" value={order.id} />
                <input type="hidden" name="t" value={order.accessToken} />
                <button type="submit" className={`btn ${styles.payBtn}`}>Pay now with Paystack</button>
              </form>
            ) : (
              <span className={styles.muted}>Online payment is being activated — please contact us to pay by mobile money or bank transfer.</span>
            )}
          </div>
        ) : null}

        <div className={`${styles.actions} ${styles.noPrint}`}>
          <span className={`${styles.status} ${styles[`status_${order.status}`]}`}>{statusLabels[order.status]}</span>
          <span className={styles.actionButtons}>
            <PrintButton label={isInvoice ? "Print / save PDF" : "Print request"} />
            <PrintButton label="Print ink-saving" ink />
            <a className="btn btn-secondary" href={whatsappLink(`Hello Manny MedTech, regarding ${order.number}: ${shareLink}`)} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp
            </a>
          </span>
        </div>

        <article className={styles.invoice}>
          <div className={styles.top}>
            {/* eslint-disable-next-line @next/next/no-img-element -- small SVG letterhead that must print crisply */}
            <img className={styles.logo} src="/brand/logo.svg" alt={site.legalName} width={190} height={55} />
            <address className={styles.issuer}>
              {issuer.issuerAddress.map((line) => <span key={line}>{line}</span>)}
              <span>{site.phoneDisplay}</span>
              <span>{issuer.issuerEmail}</span>
              <span>{issuer.issuerWebsite}</span>
              {issuer.issuerTin ? <span>TIN: {issuer.issuerTin}</span> : null}
            </address>
          </div>

          <div className={styles.titleRow}>
            <h1>{isInvoice ? "INVOICE" : "QUOTE REQUEST"}</h1>
            <dl className={styles.facts}>
              <dt>{isInvoice ? "Invoice No:" : "Reference:"}</dt><dd>{order.number}</dd>
              <dt>Date:</dt><dd>{dateFormat.format(new Date(order.invoicedAt ?? order.createdAt))}</dd>
              {isInvoice ? <><dt>Currency:</dt><dd>Ghana Cedis (GHS)</dd></> : null}
            </dl>
          </div>

          <div className={styles.meta}>
            <div className={styles.box}>
              <h2>Bill to</h2>
              <p><strong>{customer.facilityName}</strong></p>
              <p>{customer.fullName}</p>
              <p>{customer.phone} · {customer.email}</p>
            </div>
            <div className={styles.box}>
              <h2>Deliver to</h2>
              {customer.address ? <p>{customer.address}</p> : null}
              <p>{customer.location}</p>
              {isInvoice ? <p className={styles.terms}><strong>Payment terms:</strong> {issuer.paymentTerms}</p> : null}
            </div>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.no}>No.</th>
                  <th>Description</th>
                  <th className={styles.num}>Qty</th>
                  {isInvoice ? (
                    <>
                      <th className={styles.num}>Unit Price (GHS)</th>
                      <th className={styles.num}>Subtotal (GHS)</th>
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {order.items.map((line, index) => (
                  <tr key={line.productId}>
                    <td className={styles.no}>{index + 1}</td>
                    <td>
                      {line.name}
                      {line.notes ? <span className={styles.lineNote}>{line.notes}</span> : null}
                    </td>
                    <td className={styles.num}>{line.quantity}</td>
                    {isInvoice ? (
                      <>
                        <td className={styles.num}>{plain(line.unitPrice ?? 0)}</td>
                        <td className={styles.num}>{plain((line.unitPrice ?? 0) * line.quantity)}</td>
                      </>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isInvoice ? (
            <>
              <div className={styles.totals}>
                <div className={styles.row}><span>Subtotal</span><span>{plain(order.subtotal)}</span></div>
                {order.taxRatePercent > 0 ? (
                  <div className={styles.row}><span>{order.taxLabel} ({order.taxRatePercent}%)</span><span>{plain(order.tax)}</span></div>
                ) : null}
                <div className={`${styles.row} ${styles.total}`}><span>Total (GHS)</span><span>{plain(order.total)}</span></div>
                {order.status === "paid" && order.amountPaid !== null ? (
                  <div className={styles.row}>
                    <span>Paid {order.paidAt ? dateFormat.format(new Date(order.paidAt)) : ""}</span>
                    <span>{plain(order.amountPaid)}</span>
                  </div>
                ) : null}
              </div>
              <p className={styles.words}><em>Amount in words:</em> <strong>{amountInWords(order.total)}</strong></p>
            </>
          ) : null}

          {customer.shippingNotes ? <p className={styles.instructions}><strong>Instructions:</strong> {customer.shippingNotes}</p> : null}

          <div className={styles.closing}>
            <div className={styles.signature}>
              {order.status === "paid" ? <span className={styles.stamp}>PAID</span> : null}
              <div className={styles.sigLine} />
              <span>Authorised signature{issuer.signatory ? ` — ${issuer.signatory}` : ""}</span>
              <span>{site.legalName} · Tel: {site.phoneDisplay}</span>
            </div>
            {isInvoice ? (
              <div className={styles.notes}>
                <h2>Notes</h2>
                <ol>{issuer.notes.map((note) => <li key={note}>{note}</li>)}</ol>
              </div>
            ) : null}
          </div>

          <div className={styles.foot}>
            {order.status === "paid" ? (
              <p>
                Payment received{order.paymentNote ? ` via ${order.paymentNote}` : ""}
                {order.paystackReference ? ` · Ref ${order.paystackReference}` : ""}. Thank you for choosing {site.legalName}.
              </p>
            ) : isInvoice ? (
              <p>Pay online by card, mobile money or bank via Paystack using the Pay now button on your online invoice, or pay by bank transfer or cash.</p>
            ) : (
              <p>This is a list of your selected items, not an invoice. Our sales desk will call you to confirm availability and pricing, then issue your invoice.</p>
            )}
          </div>
          <div className={styles.band}>
            <span>Surgical Supplies · Hospital Equipment · Consumables · Technical Support</span>
            <em>Thank you for choosing {site.legalName}</em>
          </div>
        </article>

        <p className={styles.noPrint} style={{ marginTop: 20 }}><Link href="/products">← Continue browsing the catalog</Link></p>
      </div>
    </div>
  );
}
