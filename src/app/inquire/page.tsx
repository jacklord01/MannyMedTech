"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useInquiry } from '@/context/InquiryContext';
import { FileText, MapPin, Building, Phone, Mail, User, Trash2, ArrowLeft, CheckCircle, ClipboardList, Loader2, Send } from 'lucide-react';
import styles from './inquire.module.css';

export default function InquirePage() {
  const { items, removeItem, clearCart, updateQuantity } = useInquiry();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    facilityName: '',
    phone: '',
    email: '',
    location: '',
    shippingNotes: ''
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [quoteId, setQuoteId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMsg("Your inquiry list is empty. Please add products from the catalog.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/inquire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientInfo: formData,
          items: items.map(item => ({
            productId: item.product.id,
            name: item.product.name,
            category: item.product.category,
            quantity: item.quantity,
            notes: item.notes
          }))
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setQuoteId(data.quoteId);
        setSubmitSuccess(true);
        clearCart(); // Clear the quote cart on success
      } else {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("RFQ Submission Error", err);
      setErrorMsg("Unable to submit request. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className={styles.inquirePage}>
        <div className="container">
          <div className={styles.successCard}>
            <CheckCircle className={styles.successIcon} size={64} />
            <h2>RFQ Submitted Successfully!</h2>
            <p className={styles.successSub}>
              Thank you for choosing Manny MedTech. Your request has been logged under ID: <strong>{quoteId}</strong>.
            </p>
            
            <div className={styles.successDetails}>
              <h4>What happens next?</h4>
              <ol>
                <li>Our Accra logistics and sales desk will calculate landing taxes, delivery options, and wholesale discounts.</li>
                <li>A complete PDF quotation along with copy certificates (FDA Ghana registration / ISO forms) will be sent to <strong>{formData.email}</strong>.</li>
                <li>We will contact you via <strong>{formData.phone}</strong> within 1-2 business hours to review payment structures (Vercel Postgres ledger logs / AWS secure channels).</li>
              </ol>
            </div>

            <div className={styles.successButtons}>
              <Link href="/products" className="btn btn-primary">
                Return to Catalog
              </Link>
              <Link href="/" className="btn btn-secondary">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.inquirePage}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className="container">
          <h1>Request for Quote (RFQ)</h1>
          <p>Complete the form below to receive a wholesale quote, logistics schedule, and compliance sheets.</p>
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
            <p>You haven't added any products to your inquiry list yet. Browse our divisions and select the supplies or equipment your clinic requires.</p>
            <Link href="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className={styles.inquireGrid}>
            {/* Left: Contact Form */}
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Facility & Procurement Details</h2>
              <p className={styles.formSub}>All fields are required to process customized shipping clearance and taxes in Ghana.</p>

              {errorMsg && (
                <div className={styles.errorAlert}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.rfqForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName">
                    <User size={16} /> Contact Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="e.g., Dr. Kwame Mensah"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="facilityName">
                    <Building size={16} /> Hospital / Clinic / Business Name
                  </label>
                  <input
                    type="text"
                    id="facilityName"
                    name="facilityName"
                    required
                    placeholder="e.g., Spintex Hope Clinic Ltd."
                    value={formData.facilityName}
                    onChange={handleInputChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.gridFormRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">
                      <Phone size={16} /> Contact Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="e.g., +233 24 123 4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">
                      <Mail size={16} /> Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g., k.mensah@hopeclinic.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.inputField}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="location">
                    <MapPin size={16} /> Primary Delivery City & Region
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
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
                  <label htmlFor="shippingNotes">
                    Special Shipping or Regulatory Requests
                  </label>
                  <textarea
                    id="shippingNotes"
                    name="shippingNotes"
                    placeholder="e.g., Provide customs clearance at Tema Port / Requires WHO-approved logistics logs on arrival / Request certifications printed in hardcopy..."
                    value={formData.shippingNotes}
                    onChange={handleInputChange}
                    className={styles.textareaField}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary ${styles.submitBtn}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className={styles.spinner} size={18} /> Submitting RFQ...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Submit Quote Request
                    </>
                  )}
                </button>
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
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                          className={styles.quantityInput}
                        />
                      </div>
                      
                      {item.product.certifications && item.product.certifications.length > 0 && (
                        <span className={styles.certBadge}>
                          ✓ FDA/ISO Compliance
                        </span>
                      )}
                    </div>

                    {item.notes && (
                      <div className={styles.summaryItemNote}>
                        <strong>Requirement:</strong> {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.summaryTotalRow}>
                <span>Wholesale Quote:</span>
                <strong>CONTACT SALES</strong>
              </div>
              <p className={styles.summaryNotice}>
                * Prices are determined by import clearance taxes, delivery regions, and order volumes. We verify every request against active FDA databases.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
