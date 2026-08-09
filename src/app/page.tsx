import React from 'react';
import Link from 'next/link';
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
  HeartHandshake 
} from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
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
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroInfo}>
            <div className="hero-badge">
              <ShieldCheck size={16} />
              <span>WHO GSDP & Ghana FDA Compliant Supplier</span>
            </div>
            <h1 className={styles.heroTitle}>
              Reliable Medical Solutions.<br />
              <span className="grad-text">Efficient Logistics.</span>
            </h1>
            <p className={styles.heroSub}>
              Manny MedTech & Logistics Ltd. is Ghana's premier distributor of fully certified healthcare supplies, hospital furniture, and temperature-controlled supply chain logistics. Serving hospitals, labs, and pharmacies nationwide and connecting the African diaspora.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/products" className="btn btn-primary">
                Browse Catalog <ArrowRight size={18} />
              </Link>
              <Link href="/logistics" className="btn btn-secondary">
                Our Logistics Network
              </Link>
            </div>
            
            {/* Quick trust metrics */}
            <div className={styles.trustRow}>
              <div className={styles.trustItem}>
                <strong>Ghana FDA</strong>
                <span>Registered Devices</span>
              </div>
              <div className={styles.trustDivider}></div>
              <div className={styles.trustItem}>
                <strong>Cold Chain</strong>
                <span>Vaccines & Reagents</span>
              </div>
              <div className={styles.trustDivider}></div>
              <div className={styles.trustItem}>
                <strong>Diaspora</strong>
                <span>Procurement Services</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            {/* Modern decorative visual representing clinical tech & logistics */}
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <span className={styles.panelTitle}>Accra Core Distribution Center</span>
              </div>
              <div className={styles.visualBody}>
                <div className={styles.visualMetric}>
                  <span>Storage Temperature</span>
                  <h4>4.2 °C <span className={styles.metricState}>Optimal</span></h4>
                </div>
                <div className={styles.shipmentList}>
                  <div className={styles.shipmentItem}>
                    <div className={styles.shipmentIndicator}></div>
                    <div>
                      <h5>Korle Bu Teaching Hospital</h5>
                      <span>SurgiGold Sutures & ICU Beds • In Transit</span>
                    </div>
                  </div>
                  <div className={styles.shipmentItem}>
                    <div className={styles.shipmentIndicator}></div>
                    <div>
                      <h5>Komfo Anokye Teaching Hospital</h5>
                      <span>UltraScan V2 Probes • Delivered</span>
                    </div>
                  </div>
                  <div className={styles.shipmentItem}>
                    <div className={styles.shipmentIndicator}></div>
                    <div>
                      <h5>Tamale Regional Hospital</h5>
                      <span>WHO Vaccine Consignment • Dispatched</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Secondary backing cards representing certification */}
            <div className={styles.visualBackCard}>
              <ShieldCheck size={28} className={styles.visualBackIcon} />
              <div>
                <h5>ISO 13485:2016</h5>
                <span>Verified Manufacturer Supply Chain</span>
              </div>
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
            <span>Every single device is vetted for FDA Ghana, CE or ISO standards.</span>
          </div>
          <div className={styles.statCard}>
            <h3>16</h3>
            <p>Regions Covered</p>
            <span>Reliable transport networks from Accra to Tamale, Bolgatanga and beyond.</span>
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
              At Manny MedTech & Logistics, we operate our own fleet of refrigerated transit vans and secure warehousing in Accra. We ensure that delicate diagnostics reagents, enzymes, and vaccines maintain their temperature guidelines (+2°C to +8°C) from the moment they land at Kotoka International Airport (KIA) until delivery.
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
