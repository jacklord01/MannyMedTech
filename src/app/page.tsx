import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Truck, 
  ShieldCheck, 
  Globe, 
  FileCheck, 
  Activity, 
  ArrowRight, 
  Award, 
  Stethoscope, 
  Warehouse, 
  HeartHandshake,
  Layers
} from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const featuredOffers = [
    { 
      name: "Cesarean Section Pack Offer", 
      image: "/offers/cesarean-offer.jpeg",
      productId: "cesarean-packs" 
    },
    { 
      name: "Laparotomy Pack Offer", 
      image: "/offers/laparotomy-offer.jpeg",
      productId: "laparotomy-packs" 
    }
  ];

  const divisions = [
    { name: "Medical Equipment", icon: <Stethoscope size={28} />, desc: "ECGs, Ultrasounds, Patient Monitors, and critical diagnostic units." },
    { name: "Consumables", icon: <Activity size={28} />, desc: "Sterile syringes, cannulas, bandages, and clinical consumables." },
    { name: "Surgical Supplies", icon: <Award size={28} />, desc: "Sterile sutures, scalpels, surgical packs, and operating tools." },
    { name: "Laboratory Supplies", icon: <FileCheck size={28} />, desc: "Hematology counters, pipettes, test kits, and chemical reagents." },
    { name: "Hospital Furniture", icon: <Warehouse size={28} />, desc: "5-function ICU beds, medical trolleys, surgical lights, and cabinets." },
    { name: "Rehabilitation", icon: <HeartHandshake size={28} />, desc: "Physiotherapy parallel bars, rehab treadmills, and orthotic aids." },
    { name: "Home Care", icon: <Activity size={28} />, desc: "Portable oxygen concentrators, nebulizers, and home beds." },
    { name: "PPE", icon: <ShieldCheck size={28} />, desc: "NIOSH N95 masks, isolation gowns, gloves, and protective gear." },
    { name: "Logistics Services", icon: <Truck size={28} />, desc: "WHO-compliant cold chain transport, warehousing, and customs clearance." }
  ];

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          {/* Top row: text left, badge right */}
          <div className={styles.heroGrid}>
            <div className={styles.heroInfo}>
              <div className="hero-badge">
                <ShieldCheck size={16} />
                <span>WHO GSDP &amp; Ghana FDA Compliant Supplier</span>
              </div>
              <h1 className={styles.heroTitle}>
                Reliable Medical Solutions.<br />
                <span className="grad-text">Efficient Logistics.</span>
              </h1>
              <p className={styles.heroSub}>
                Manny MedTech &amp; Logistics Ltd. is Ghana&apos;s premier distributor of certified healthcare supplies, hospital furniture, and supply chain logistics — serving hospitals, labs, clinics, and connecting the African diaspora.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/products" className="btn btn-primary">
                  Browse Catalog <ArrowRight size={18} />
                </Link>
                <Link href="/logistics" className="btn btn-secondary">
                  Our Logistics Network
                </Link>
              </div>
              <div className={styles.trustRow}>
                <div className={styles.trustItem}>
                  <strong>Ghana FDA</strong>
                  <span>Registered Devices</span>
                </div>
                <div className={styles.trustDivider}></div>
                <div className={styles.trustItem}>
                  <strong>Cold Chain</strong>
                  <span>Vaccines &amp; Reagents</span>
                </div>
                <div className={styles.trustDivider}></div>
                <div className={styles.trustItem}>
                  <strong>Diaspora</strong>
                  <span>Procurement Services</span>
                </div>
              </div>
            </div>

            {/* Hero Van Illustration */}
            <div className={styles.heroVisual}>
              <div className={styles.vanScene}>
                {/* Van SVG */}
                <svg viewBox="0 0 520 280" className={styles.vanSvg} xmlns="http://www.w3.org/2000/svg">
                  {/* Road */}
                  <rect x="0" y="240" width="520" height="40" fill="#e2e8f0" rx="4" />
                  <rect x="0" y="255" width="520" height="4" fill="#cbd5e1" />
                  {/* Road dashes */}
                  {[0,60,120,180,240,300,360,420].map(x => (
                    <rect key={x} x={x+10} y={257} width={36} height={3} fill="#ffffff" rx="1" />
                  ))}

                  {/* Van body */}
                  <rect x="30" y="130" width="360" height="110" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2"/>

                  {/* Cab */}
                  <path d="M330 130 L390 130 Q430 130 440 165 L440 240 L330 240 Z" fill="#0033a0" />
                  <rect x="338" y="148" width="68" height="50" rx="6" fill="#7dd3fc" opacity="0.85" />
                  {/* Windscreen lines */}
                  <line x1="355" y1="148" x2="355" y2="198" stroke="#ffffff" strokeWidth="1" opacity="0.4"/>

                  {/* Side panel — company name */}
                  <rect x="38" y="148" width="280" height="72" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>

                  {/* Logo / brand text on panel */}
                  <text x="52" y="175" fontFamily="sans-serif" fontSize="13" fontWeight="800" fill="#0033a0">MANNY MEDTECH</text>
                  <text x="52" y="191" fontFamily="sans-serif" fontSize="9" fontWeight="600" fill="#009639">&amp; LOGISTICS LTD.</text>
                  <text x="52" y="207" fontFamily="sans-serif" fontSize="7.5" fill="#64748b">Reliable Medical Solutions. Efficient Logistics.</text>

                  {/* Green stripe on van */}
                  <rect x="30" y="220" width="410" height="8" rx="0" fill="#009639" />
                  <rect x="30" y="130" width="410" height="8" rx="12" fill="#0033a0" />

                  {/* Wheels */}
                  <circle cx="120" cy="245" r="24" fill="#1e293b" />
                  <circle cx="120" cy="245" r="14" fill="#94a3b8" />
                  <circle cx="120" cy="245" r="6" fill="#1e293b" />
                  <circle cx="360" cy="245" r="24" fill="#1e293b" />
                  <circle cx="360" cy="245" r="14" fill="#94a3b8" />
                  <circle cx="360" cy="245" r="6" fill="#1e293b" />

                  {/* Rear door */}
                  <rect x="32" y="132" width="2" height="86" fill="#e2e8f0" />

                  {/* Headlight */}
                  <rect x="435" y="185" width="18" height="10" rx="3" fill="#fef08a" />

                  {/* Floating product card 1 - Laparotomy Pack */}
                  <g transform="translate(30, 30)">
                    <rect width="130" height="72" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#shadow)"/>
                    <rect width="130" height="5" rx="8" fill="#009639" />
                    <text x="10" y="22" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="#0033a0">LAPAROTOMY PACK</text>
                    <text x="10" y="35" fontFamily="sans-serif" fontSize="7" fill="#64748b">Sterile Surgical Pack</text>
                    <text x="10" y="48" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#009639">GH¢ 350</text>
                    <text x="10" y="62" fontFamily="sans-serif" fontSize="6.5" fill="#009639">✓ FDA Ghana Registered</text>
                  </g>

                  {/* Floating product card 2 - C-Section Pack */}
                  <g transform="translate(360, 22)">
                    <rect width="130" height="72" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5"/>
                    <rect width="130" height="5" rx="8" fill="#0033a0" />
                    <text x="10" y="22" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="#0033a0">C-SECTION PACK</text>
                    <text x="10" y="35" fontFamily="sans-serif" fontSize="7" fill="#64748b">Sterile Obstetric Pack</text>
                    <text x="10" y="48" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#009639">GH¢ 400</text>
                    <text x="10" y="62" fontFamily="sans-serif" fontSize="6.5" fill="#009639">✓ ISO 13485 Certified</text>
                  </g>

                  {/* Floating product card 3 - Wheelchair */}
                  <g transform="translate(200, 10)">
                    <rect width="118" height="68" rx="8" fill="#0033a0" stroke="#0033a0" strokeWidth="1"/>
                    <text x="10" y="22" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="#ffffff">WHEELCHAIRS</text>
                    <text x="10" y="35" fontFamily="sans-serif" fontSize="7" fill="#93c5fd">Mobility Solutions</text>
                    <text x="10" y="50" fontFamily="sans-serif" fontSize="7" fill="#7dd3fc">Hospital • Clinic • Home</text>
                    <text x="10" y="63" fontFamily="sans-serif" fontSize="6.5" fill="#86efac">✓ Delivery Nationwide</text>
                  </g>

                  {/* WhatsApp enquiry chip */}
                  <g transform="translate(175, 88)">
                    <rect width="170" height="26" rx="13" fill="#25D366" />
                    <text x="14" y="17" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#ffffff">📦 Enquire on WhatsApp</text>
                  </g>

                  <defs>
                    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Distribution Centers strip — below hero */}
          <div className={styles.distStrip}>
            <div className={styles.distStripHeader}>
              <Truck size={16} />
              <span>National Distribution Network</span>
            </div>
            <div className={styles.distList}>
              {[
                { name: 'Kumasi Head Office (Ashanti)', dot: 'blue' },
                { name: 'Greater Accra Regional Hub', dot: 'green' },
                { name: 'Northern Regional Hub', dot: 'green' },
                { name: 'Western Regional Hub', dot: 'amber' },
                { name: 'Central Regional Hub', dot: 'blue' },
                { name: 'Volta Regional Hub', dot: 'green' },
                { name: 'Brong Ahafo Regional Hub', dot: 'amber' },
                { name: 'Diaspora & Export Desk', dot: 'blue' }
              ].map(c => (
                <div key={c.name} className={styles.distEntry}>
                  <span className={`${styles.distDot} ${styles[`dot${c.dot.charAt(0).toUpperCase() + c.dot.slice(1)}`]}`}></span>
                  <span className={styles.distName}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsSection}>
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statCard}>
            <h3>100%</h3>
            <p>Certified Catalog</p>
            <span>Every single device is backed by official Supplier Certificates.</span>
          </div>
          <div className={styles.statCard}>
            <h3>16</h3>
            <p>Regions Covered</p>
            <span>Reliable transport from our Kumasi head office and Accra hub to Tamale, Bolgatanga and beyond.</span>
          </div>
          <div className={styles.statCard}>
            <h3>&lt; 2 Hrs</h3>
            <p>RFQ Turnaround</p>
            <span>Quote requests are estimated and returned with certification copies.</span>
          </div>
          <div className={styles.statCard}>
            <h3>24/7</h3>
            <p>IoT Temperature Log</p>
            <span>Continuous tracking of pharmaceutical storage and transit.</span>
          </div>
        </div>
      </section>

      {/* Featured Offers Section */}
      <section className={styles.offersSection}>
        <div className="container">
          <div className="section-header">
            <h2 className={styles.offersTitle}>This Week's Offers</h2>
            <p>High-quality procedure packs ready for immediate distribution. Stock up for your surgical centre.</p>
          </div>
          <div className={styles.offersGrid}>
            {featuredOffers.map((offer, idx) => (
              <div key={idx} className={styles.offerCard}>
                <div className={styles.offerBadge}>Featured</div>
                <div className={styles.offerImageWrapper}>
                  <Image 
                    src={offer.image} 
                    alt={offer.name} 
                    fill 
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className={styles.offerAction}>
                  <Link href={`/products/${offer.productId}`} className="btn-primary">View Product</Link>
                  <a 
                    href={`https://wa.me/233202776944?text=Hello%20Manny%20MedTech,%20I%20would%20like%20to%20enquire%20about%20the%20${encodeURIComponent(offer.name)}.%20Please%20provide%20availability%20and%20quotation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappBtn}
                  >
                    Order Now via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions Section */}
      <section className={styles.divisionsSection}>
        <div className="container">
          <div className="section-header">
            <h2>Our Supply Divisions</h2>
            <p>We source, clear, verify, and deliver across nine primary divisions. Explore our catalog to construct your wholesale RFQ.</p>
          </div>
          <div className={styles.divisionsGrid}>
            {divisions.map((div, idx) => (
              <Link 
                key={idx} 
                href={`/products?category=${encodeURIComponent(div.name)}`}
                className={`glass-card ${styles.divisionCard}`}
              >
                <div className={styles.divIcon}>
                  {div.icon}
                </div>
                <h4>{div.name}</h4>
                <p>{div.desc}</p>
                <span className={styles.divLink}>
                  Explore Products <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics & Cold Chain Highlights */}
      <section className={styles.logisticsPromo}>
        <div className={`container ${styles.promoGrid}`}>
          <div className={styles.promoImage}>
            {/* CSS-based schematic illustration for logistics trust */}
            <div className={styles.logisticsBadge}>
              <Truck size={36} />
              <h4>Manny Express Delivery</h4>
            </div>
            <div className={styles.logisticsSteps}>
              <div className={styles.step}>
                <div className={styles.stepNum}>1</div>
                <div>
                  <h5>Global Sourcing & Consolidation</h5>
                  <span>Verified factories in EU, USA, Asia.</span>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>2</div>
                <div>
                  <h5>Port Clearance (Tema & KIA)</h5>
                  <span>Fast-track customs handling by FDA certified agents.</span>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>3</div>
                <div>
                  <h5>Cold Chain Transport</h5>
                  <span>Continuous IoT monitoring for vaccine/reagent security.</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.promoInfo}>
            <h2>WHO-Standard Healthcare Supply Chain</h2>
            <p className={styles.promoSub}>
              Medical logistics in West Africa requires strict adherence to temperature integrity and regulatory clearance. 
            </p>
            <p className={styles.promoText}>
              Headquartered in Kumasi, Manny MedTech & Logistics operates its own fleet of refrigerated transit vans and secure warehousing at our Accra hub. We ensure that delicate diagnostics reagents, enzymes, and vaccines maintain their temperature guidelines (+2°C to +8°C) from the moment they land at Kotoka International Airport (KIA) until delivery.
            </p>
            <div className={styles.promoPoints}>
              <div className={styles.point}>
                <ShieldCheck size={20} className={styles.pointIcon} />
                <div>
                  <h5>Good Storage & Distribution Practice (GSDP)</h5>
                  <span>Fully audited facilities keeping drugs and gear safe.</span>
                </div>
              </div>
              <div className={styles.point}>
                <Globe size={20} className={styles.pointIcon} />
                <div>
                  <h5>Diaspora Procurement Desk</h5>
                  <span>Allowing healthcare groups globally to safely acquire and deliver verified machinery to local Ghanaian hospitals.</span>
                </div>
              </div>
            </div>
            <Link href="/logistics" className="btn btn-accent" style={{ marginTop: '24px' }}>
              Learn More About Our Logistics Services
            </Link>
          </div>
        </div>
      </section>

      {/* Sourcing request banner */}
      <section className={styles.sourcingSection}>
        <div className={`container ${styles.sourcingBanner}`}>
          <div className={styles.sourcingLeft}>
            <span className={styles.sourcingTag}>NEED A PRODUCT?</span>
            <h2>Send us the item name, photo or specification.</h2>
            <p>We will confirm availability and provide a quotation. Delivery is available throughout Ghana.</p>
          </div>
          <div className={styles.sourcingRight}>
            <a 
              href="https://wa.me/233202776944?text=Hello%20Manny%20MedTech,%20I%20would%20like%20to%20inquire%20about%20a%20product."
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${styles.whatsappBannerBtn}`}
            >
              WhatsApp +233 20 277 6944
            </a>
            <a 
              href="tel:+233202776944"
              className={`btn ${styles.callBannerBtn}`}
            >
              Call +233 20 277 6944
            </a>
          </div>
        </div>
      </section>

      {/* Call To Action banner */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaCard}`}>
          <h2>Ready to Equip Your Health Facility?</h2>
          <p>
            Browse our catalog, add required items to your inquiry list, and submit. Our logistics desk will compile a quote including landing, delivery, and certification papers.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/products" className="btn btn-primary">
              View Catalog
            </Link>
            <Link href="/inquire" className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}>
              Submit a Direct RFQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
