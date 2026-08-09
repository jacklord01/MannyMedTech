import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ShieldCheck, Activity } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.logoImageWrapper}>
            <Image 
              src="/logo.png" 
              alt="Manny MedTech Logo" 
              width={180}
              height={55}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p className={styles.brandSlogan}>
            Reliable Medical Solutions. Efficient Logistics.
          </p>
          <p className={styles.brandDesc}>
            Providing certified medical equipment, healthcare consumables, and end-to-end cold chain logistics to clinics, hospitals, and retailers in Ghana and the African diaspora.
          </p>
          <div className={styles.complianceBadge}>
            <ShieldCheck size={16} />
            <span>GSDP & FDA Ghana Verified Distributor</span>
          </div>
        </div>

        {/* Categories Column */}
        <div className={styles.linkCol}>
          <h5>Product Divisions</h5>
          <ul>
            <li><Link href="/products?category=Medical+Equipment">Medical Equipment</Link></li>
            <li><Link href="/products?category=Consumables">Consumables & PPE</Link></li>
            <li><Link href="/products?category=Surgical+Supplies">Surgical Supplies</Link></li>
            <li><Link href="/products?category=Laboratory+Supplies">Laboratory Supplies</Link></li>
            <li><Link href="/products?category=Hospital+Furniture">Hospital Furniture</Link></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className={styles.linkCol}>
          <h5>Services & Quality</h5>
          <ul>
            <li><Link href="/logistics">Cold Chain Logistics</Link></li>
            <li><Link href="/logistics#freight">Customs Clearance</Link></li>
            <li><Link href="/certifications">Quality Standard Audits</Link></li>
            <li><Link href="/certifications#fda">Ghana FDA Approvals</Link></li>
            <li><Link href="/inquire">Request Wholesale RFQ</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className={styles.contactCol}>
          <h5>Headquarters & Contact</h5>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={18} className={styles.contactIcon} />
              <span>
                Manny Heights, Spintex Road, Accra, Ghana
              </span>
            </li>
            <li>
              <Phone size={18} className={styles.contactIcon} />
              <div className={styles.phoneNumbers}>
                <a href="tel:+233202776944">+233 20 277 6944</a>
              </div>
            </li>
            <li>
              <Mail size={18} className={styles.contactIcon} />
              <a href="mailto:maame.jenny@yahoo.com">maame.jenny@yahoo.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* SEO Links & Keywords */}
      <div className={styles.seoFooter}>
        <div className={`container`}>
          <p>
            <strong>Serving Facilities:</strong> Hospitals, Maternity Clinics, Dental Clinics, Rehabilitation Centers, and Pharmacies across Ghana.
          </p>
          <p>
            <strong>Key Products & Conditions:</strong> Laparotomy packs for surgery, biopsy needles, stroke and rehabilitation gloves for movement recovery, hand pain, and arthritis management. 
          </p>
          <p>
            <strong>Coverage Areas:</strong> Accra, Kumasi, Tamale, Takoradi, Cape Coast, Tema, Obuasi, Koforidua, Sunyani, Ho, Bolgatanga, Wa, and all 16 regions of Ghana. Supplying the African diaspora with reliable wholesale medical distribution.
          </p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomBarContent}`}>
          <p>&copy; {currentYear} Manny MedTech & Logistics Ltd. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <span>Ghana FDA Compliant</span>
            <span className={styles.dot}>•</span>
            <span>WHO GSDP Standard</span>
            <span className={styles.dot}>•</span>
            <Link href="/inquire">Submit Inquiry</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
