"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInquiry } from '@/context/InquiryContext';
import {
  FileText, MapPin, Building, Phone, Mail, User, Trash2,
  ArrowLeft, ClipboardList, Loader2, Send, MessageCircle
} from 'lucide-react';
import styles from './inquire.module.css';

const WHATSAPP_NUMBER = '233202776944';

function buildWhatsAppMessage(
  formData: {
    fullName: string;
    facilityName: string;
    phone: string;
    email: string;
    location: string;
    address: string;
    shippingNotes: string;
  },
  items: Array<{ product: { name: string; category: string; price?: string }; quantity: number; notes?: string }>,
  quoteId: string
): string {
  const itemLines = items
    .map((item, i) => {
      const price = item.product.price ? ` (${item.product.price})` : '';
      const note = item.notes ? `\n   Note: ${item.notes}` : '';
      return `${i + 1}. ${item.product.name}${price} — Qty: ${item.quantity} [${item.product.category}]${note}`;
    })
    .join('\n');

  return [
    `*QUOTE REQUEST — Manny MedTech*`,
    `Ref: ${quoteId}`,
    ``,
    `*Contact Details*`,
    `Name: ${formData.fullName}`,
    `Facility: ${formData.facilityName}`,
    `Phone: ${formData.phone}`,
    `Email: ${formData.email}`,
    `Delivery Location: ${formData.location}`,
    ``,
    `*Requested Items*`,
    itemLines,
    ``,
    formData.shippingNotes
      ? `*Special Instructions*\n${formData.shippingNotes}\n`
      : '',
    `Please confirm availability, pricing, and delivery timeline. Thank you.`,
  ]
    .join('\n')
    .trim();
}

export default function InquirePage() {
  const { items, removeItem, clearCart, updateQuantity } = useInquiry();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    facilityName: '',
    phone: '',
    email: '',
    location: '',
    address: '',
    shippingNotes: '',
  });
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteId, setQuoteId] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMsg('Your inquiry list is empty. Please add products from the catalog.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientInfo: formData,
          website: honeypot || undefined,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            notes: item.notes || undefined,
          })),
        }),
      });
      const result = (await response.json()) as { url?: string; quoteId?: string; message?: string };
      if (!response.ok || !result.url) {
        throw new Error(result.message || 'We could not save your order.');
      }
      clearCart();
      router.push(result.url);
    } catch (error) {
      // Fall back to WhatsApp so the request is never lost.
      const fallbackId = `MMT-${Date.now().toString(36).toUpperCase()}`;
      setQuoteId(fallbackId);
      setWhatsappUrl(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(formData, items, fallbackId))}`);
      setErrorMsg(error instanceof Error ? error.message : 'We could not save your order.');
      setIsSubmitting(false);
    }
  };

  /* ── Main Form ──────────────────────────────────────────────────── */
  return (
    <div className={styles.inquirePage}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className="container">
          <h1>Request for Quote (RFQ)</h1>
          <p>Select the items you need and send your request. Our sales desk will call you to confirm details and pricing, then send your invoice with a secure Pay now button.</p>

          {/* Channel strip */}
          <div className={styles.channelStrip}>
            <span className={styles.channelPill}>
              <FileText size={14} /> Invoice after confirmation — pay by card, MoMo or bank
            </span>
            <span className={styles.channelPill}>
              <Mail size={14} /> Email — PDF Quote Follow-up
            </span>
            <span className={styles.channelPill}>
              <Phone size={14} /> Call: +233 20 277 6944
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <Link href="/products" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Product Catalog
        </Link>

        {items.length === 0 ? (
          <div className={styles.emptyContainer}>
            <ClipboardList size={64} strokeWidth={1} />
            <h3>No Items Selected</h3>
            <p>You haven&apos;t added any products to your inquiry list yet. Browse our catalog and add the supplies or equipment your clinic requires.</p>
            <Link href="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className={styles.inquireGrid}>
            {/* Left: Contact Form */}
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Facility &amp; Contact Details</h2>
              <p className={styles.formSub}>
                Please give a phone number we can call to confirm your request. Your invoice and Paystack receipt will be sent to your email.
              </p>

              {errorMsg && (
                <div className={styles.errorAlert} role="alert">
                  {errorMsg}
                  {whatsappUrl && (
                    <>
                      {' '}
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        Send your list on WhatsApp instead (ref {quoteId})
                      </a>
                    </>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.rfqForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName"><User size={16} /> Contact Full Name</label>
                  <input
                    type="text" id="fullName" name="fullName" required
                    placeholder="e.g., Dr. Kwame Mensah"
                    value={formData.fullName} onChange={handleInputChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="facilityName"><Building size={16} /> Hospital / Clinic / Business Name</label>
                  <input
                    type="text" id="facilityName" name="facilityName" required
                    placeholder="e.g., Spintex Hope Clinic Ltd."
                    value={formData.facilityName} onChange={handleInputChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.gridFormRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone"><Phone size={16} /> Contact Phone Number</label>
                    <input
                      type="tel" id="phone" name="phone" required
                      placeholder="e.g., +233 24 123 4567"
                      value={formData.phone} onChange={handleInputChange}
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email"><Mail size={16} /> Email Address</label>
                    <input
                      type="email" id="email" name="email" required
                      placeholder="e.g., k.mensah@hopeclinic.com"
                      value={formData.email} onChange={handleInputChange}
                      className={styles.inputField}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="location"><MapPin size={16} /> Primary Delivery City &amp; Region</label>
                  <select
                    id="location" name="location" required
                    value={formData.location} onChange={handleInputChange}
                    className={styles.selectField}
                  >
                    <option value="">-- Select Delivery Location --</option>
                    <option value="Accra Metropolitan, Greater Accra">Accra Metropolitan, Greater Accra</option>
                    <option value="Kumasi, Ashanti Region">Kumasi, Ashanti Region</option>
                    <option value="Tamale, Northern Region">Tamale, Northern Region</option>
                    <option value="Takoradi, Western Region">Takoradi, Western Region</option>
                    <option value="Cape Coast, Central Region">Cape Coast, Central Region</option>
                    <option value="Koforidua, Eastern Region">Koforidua, Eastern Region</option>
                    <option value="Ho, Volta Region">Ho, Volta Region</option>
                    <option value="Sunyani, Bono Region">Sunyani, Bono Region</option>
                    <option value="United Kingdom (Diaspora Donation)">United Kingdom (Diaspora Donation)</option>
                    <option value="United States / Canada (Diaspora Donation)">United States / Canada (Diaspora Donation)</option>
                    <option value="Europe / Other (Diaspora Shipment)">Europe / Other (Diaspora Shipment)</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="address"><MapPin size={16} /> Delivery Address (optional)</label>
                  <input
                    type="text" id="address" name="address"
                    placeholder="e.g., Spintex Road, near Coca-Cola roundabout / GhanaPostGPS GA-123-4567"
                    value={formData.address} onChange={handleInputChange}
                    className={styles.inputField}
                  />
                </div>

                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="shippingNotes">
                    <FileText size={16} /> Special Shipping or Regulatory Requests
                  </label>
                  <textarea
                    id="shippingNotes" name="shippingNotes"
                    placeholder="e.g., Requires WHO-approved logistics logs / Customs clearance at Tema Port / Hardcopy certifications..."
                    value={formData.shippingNotes} onChange={handleInputChange}
                    className={styles.textareaField}
                  />
                </div>

                {/* Submit — WhatsApp primary */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn ${styles.whatsappSubmitBtn}`}
                >
                  {isSubmitting ? (
                    <><Loader2 className={styles.spinner} size={18} /> Saving your order...</>
                  ) : (
                    <><Send size={18} /> Submit Quote Request</>
                  )}
                </button>

                <p className={styles.submitNote}>
                  Our sales desk will call you to confirm availability, pricing and delivery, then send your invoice with a secure Pay now button (card, mobile money or bank).
                </p>
              </form>
            </div>

            {/* Right: Summary Sidebar */}
            <div className={styles.summaryContainer}>
              <h3>Selected Products ({cartItemsCount})</h3>
              <div className={styles.summaryItems}>
                {items.map((item) => (
                  <div key={item.product.id} className={styles.summaryItem}>
                    <div className={styles.summaryItemMeta}>
                      <div>
                        <h4>{item.product.name}</h4>
                        <span>{item.product.category}</span>
                        {item.product.price && (
                          <span className={styles.summaryPrice}>{item.product.price}</span>
                        )}
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.product.id)}
                        title="Remove product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className={styles.summaryItemControls}>
                      <div className={styles.quantityWidget}>
                        <span>Qty:</span>
                        <input
                          type="number" min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.product.id, parseInt(e.target.value) || 1)
                          }
                          className={styles.quantityInput}
                        />
                      </div>
                      {item.product.certifications && item.product.certifications.length > 0 && (
                        <span className={styles.certBadge}>✓ FDA/ISO</span>
                      )}
                    </div>

                    {item.notes && (
                      <div className={styles.summaryItemNote}>
                        <strong>Note:</strong> {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.summaryTotalRow}>
                <span>Pricing:</span>
                <strong>CONFIRMED BY PHONE</strong>
              </div>
              <p className={styles.summaryNotice}>
                * Pricing includes import clearance, delivery zones and order volume discounts. Verified against FDA Ghana databases.
              </p>

              {/* Quick direct WhatsApp link without form */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Manny MedTech, I would like to enquire about your medical supplies. Please assist.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${styles.quickWhatsappBtn}`}
              >
                <MessageCircle size={16} /> Chat Directly on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
