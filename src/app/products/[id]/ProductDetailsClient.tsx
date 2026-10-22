"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, ProductCertification } from '@/data/products';
import { useInquiry } from '@/context/InquiryContext';
import { ShieldCheck, FileText, Check, Plus, Minus, Info, Award, Calendar, ExternalLink } from 'lucide-react';
import styles from './product-detail.module.css';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addItem, items, updateQuantity } = useInquiry();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [selectedCert, setSelectedCert] = useState<ProductCertification | null>(
    product.certifications && product.certifications.length > 0 ? product.certifications[0] : null
  );

  const cartItem = items.find(i => i.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addItem(product, quantity, notes);
    setNotes(""); // Reset notes after adding
  };

  const renderProductIllustration = (type: string) => {
    switch (type) {
      case 'ecg':
        return (
          <div className={styles.illustrationBox}>
            <div className={styles.monitorFrame}>
              <div className={styles.monitorHeader}>
                <span className={styles.hrMetric}>HR: 72 bpm</span>
                <span className={styles.leadMetric}>LEAD II</span>
              </div>
              <div className={styles.monitorScreen}>
                <svg viewBox="0 0 300 120" className={styles.ecgWave}>
                  <path d="M 0,60 L 40,60 L 50,60 L 55,20 L 60,100 L 65,60 L 90,60 L 100,60 L 105,10 L 110,110 L 115,60 L 140,60 L 150,60 L 155,20 L 160,100 L 165,60 L 200,60 Q 210,40 220,60 T 240,60 L 300,60" 
                        fill="none" stroke="#22c55e" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
            <div className={styles.deviceControls}>
              <div className={styles.knob}></div>
              <div className={styles.buttonGrid}>
                <span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>
        );
      case 'ultrasound':
        return (
          <div className={styles.illustrationBox}>
            <div className={styles.ultrasoundFrame}>
              <div className={styles.monitorHeader}>
                <span>Freq: 5.0 MHz</span>
                <span>Depth: 12cm</span>
              </div>
              <div className={styles.monitorScreen}>
                <div className={styles.ultrasoundCone}>
                  <div className={styles.ultrasoundPulse}></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'syringe':
        return (
          <div className={styles.illustrationBox}>
            <div className={styles.syringeVector}>
              <div className={styles.plunger}></div>
              <div className={styles.barrel}>
                <div className={styles.ticks}>
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
              <div className={styles.needle}></div>
            </div>
          </div>
        );
      case 'logistics':
        return (
          <div className={styles.illustrationBox}>
            <div className={styles.logisticsVector}>
              <div className={styles.truckCabin}>
                <div className={styles.window}></div>
              </div>
              <div className={styles.containerBox}>
                <div className={styles.thermometerBadge}>2-8°C</div>
              </div>
              <div className={styles.wheels}>
                <div className={styles.wheel}></div>
                <div className={styles.wheel}></div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.illustrationBox}>
            <div className={styles.fallbackBox}>
              <FileText size={64} strokeWidth={1.5} className={styles.fallbackIcon} />
              <span>Verified Clinical Solution</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.gridContainer}>
      {/* Product Image/Illustration Area */}
      <div className={styles.visualCol}>
        <div className={styles.illustrationWrapper}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: 'contain', padding: '20px' }}
            />
          ) : (
            renderProductIllustration(product.imagePlaceholder)
          )}
        </div>
        
        {/* Compliance checklist summary */}
        <div className={styles.complianceSummary}>
          <h4>Quality Verification</h4>
          <ul>
            <li>
              <ShieldCheck size={16} className={styles.checkIcon} />
              <span>Ghana Food & Drugs Authority Listed</span>
            </li>
            <li>
              <ShieldCheck size={16} className={styles.checkIcon} />
              <span>ISO 13485 Manufactured Quality System</span>
            </li>
            <li>
              <ShieldCheck size={16} className={styles.checkIcon} />
              <span>Full batch technical docs and certifications available</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Product Meta & Actions Area */}
      <div className={styles.infoCol}>
        <span className={styles.categoryLabel}>{product.category}</span>
        <h1 className={styles.productName}>{product.name}</h1>
        
        {/* Slogan / Highlight */}
        <p className={styles.shortDesc}>{product.shortDescription}</p>

        {/* Dynamic Cart Control Box */}
        <div className={styles.actionBox}>
          <div className={styles.actionHeader}>
            <span className={styles.noPriceLabel}>Price: {product.price ? product.price : "Request Quote Required"}</span>
            {inCartQty > 0 && (
              <span className={styles.cartStatus}>
                <Check size={14} /> Already in inquiry list ({inCartQty})
              </span>
            )}
          </div>
          
          <p className={styles.actionNotice}>
            As a wholesaler, Manny MedTech provides custom pricing based on shipping location (Ghana / West Africa / Diaspora) and volume. Add to RFQ below.
          </p>

          <div className={styles.controlsRow}>
            <div className={styles.quantityPicker}>
              <button 
                className={styles.pickerBtn}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={16} />
              </button>
              <span className={styles.pickerValue}>{quantity}</span>
              <button 
                className={styles.pickerBtn}
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>

            <button 
              className={`btn btn-primary ${styles.addToCartBtn}`} 
              onClick={handleAddToCart}
            >
              <Plus size={18} /> Add to Inquiry List
            </button>

            <a
              href={`https://wa.me/233202776944?text=Hello%20Manny%20MedTech,%20I%20would%20like%20to%20enquire%20about%20the%20${encodeURIComponent(product.name)}.%20Please%20provide%20availability%20and%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${styles.whatsappBtn}`}
            >
              Enquire on WhatsApp
            </a>
          </div>

          <div className={styles.notesField}>
            <label htmlFor="notes">Inquiry Note (Optional)</label>
            <textarea
              id="notes"
              placeholder="e.g., Request specific voltages, plug types, shipping options to Kumasi, or custom regulatory documents..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={styles.notesTextarea}
            />
          </div>
        </div>

        {/* Stacked Content Sections instead of hidden tabs */}
        <div className={styles.stackedContent}>
          {/* Section 1: Overview */}
          <div className={styles.contentSection}>
            <h3 className={styles.sectionHeading}>Product Overview</h3>
            <p>{product.detailedDescription}</p>
            <div className={styles.clinicalFitGrid}>
              <h5>Ideal For:</h5>
              <div className={styles.fitBadges}>
                <span>Hospitals</span>
                <span>Clinics</span>
                <span>Rehabilitation Labs</span>
                <span>Retailers</span>
              </div>
            </div>
          </div>

          {/* Section 2: Specifications & Contents */}
          <div className={styles.contentSection}>
            <h3 className={styles.sectionHeading}>Technical Specifications & Contents</h3>
            <table className={styles.specsTable}>
              <tbody>
                {product.specs.map((spec, index) => (
                  <tr key={index}>
                    <td className={styles.specName}>{spec.label}</td>
                    <td className={styles.specValue}>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Certifications */}
          {product.certifications.length > 0 && (
          <div className={styles.contentSection}>
            <div className={styles.certsLayout}>
              {/* Cert List */}
              <div className={styles.certList}>
                <h3 className={styles.sectionHeading}>Supplier Certificates ({product.certifications.length})</h3>
                <p className={styles.certListSub}>Click on a document below to view its regulatory validation profile.</p>
                <div className={styles.certItems}>
                  {product.certifications.map((cert) => (
                    <button
                      key={cert.code}
                      className={`${styles.certItemBtn} ${selectedCert?.code === cert.code ? styles.certItemBtnActive : ''}`}
                      onClick={() => setSelectedCert(cert)}
                    >
                      <FileText size={16} />
                      <div className={styles.certItemBtnMeta}>
                        <span>{cert.title}</span>
                        <strong>{cert.code}</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cert Viewer */}
              <div className={styles.certViewer}>
                {selectedCert ? (
                  <div className={styles.certificate}>
                    <div className={styles.certBorder}>
                      <div className={styles.certHeader}>
                        <Award size={32} className={styles.certSeal} />
                        <h3>REGULATORY COMPLIANCE CERTIFICATE</h3>
                        <span className={styles.certIssuer}>{selectedCert.issuer}</span>
                      </div>
                      
                      <div className={styles.certBody}>
                        <p className={styles.certCertifyText}>
                          This document serves as verification that the medical supply item specified below conforms to the standards and legal provisions of the regulatory bodies.
                        </p>

                        <div className={styles.certDetailsTable}>
                          <div className={styles.certDetailRow}>
                              <span>Product Name:</span>
                              <strong>{product.name}</strong>
                            </div>
                            <div className={styles.certDetailRow}>
                              <span>Category Class:</span>
                              <strong>{product.category}</strong>
                            </div>
                            <div className={styles.certDetailRow}>
                              <span>Registration/Code:</span>
                              <strong>{selectedCert.code}</strong>
                            </div>
                            <div className={styles.certDetailRow}>
                              <span>Verification Issuer:</span>
                              <strong>{selectedCert.issuer}</strong>
                            </div>
                          </div>

                          <div className={styles.certDatesRow}>
                            <div>
                              <span>Issue Date</span>
                              <strong>{selectedCert.issueDate}</strong>
                            </div>
                            <div>
                              <span>Expiry Date</span>
                              <strong>{selectedCert.expiryDate}</strong>
                            </div>
                          </div>

                          <div className={styles.certFooter}>
                            <div className={styles.certStamp}>
                              <span>APPROVED</span>
                              <small>Manny MedTech Quality Desk</small>
                            </div>
                            <div className={styles.certSignature}>
                              <div className={styles.sigLine}></div>
                              <span>Authorized Registrar Signature</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.noCertSelected}>
                      <Info size={36} />
                      <p>Select a certificate to load document viewer.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
  );
}
