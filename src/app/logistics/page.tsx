import React from 'react';
import Link from 'next/link';
import { 
  Truck, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Map, 
  Anchor, 
  Plane, 
  CalendarClock, 
  Globe 
} from 'lucide-react';
import styles from './logistics.module.css';

export const metadata = {
  title: "Medical Logistics & Supply Chain | Manny MedTech",
  description: "WHO-compliant temperature-controlled cold chain logistics, customs brokerage, and national medical transport serving clinics, hospitals, and pharmacies in Ghana.",
};

export default function LogisticsPage() {
  const capabilities = [
    {
      icon: <ThermometerSnowflake size={36} />,
      title: "Active Cold Chain (+2°C to +8°C)",
      desc: "Critical for vaccines, reagents, insulins, and biological samples. Every truck and storage unit features automated dual compressors and cellular telemetry logs."
    },
    {
      icon: <Anchor size={36} />,
      title: "Sea Clearance (Port of Tema)",
      desc: "Port operations team manages complete custom brokerage, FDA examinations, and clearing containerized machinery like MRI systems and furniture."
    },
    {
      icon: <Plane size={36} />,
      title: "Air Clearance (KIA, Accra)",
      desc: "Expedited processing at Kotoka Airport cargo terminals for temperature-sensitive reagents, surgical packs, and urgent clinical consumables."
    },
    {
      icon: <Map size={36} />,
      title: "All 16 Regions Covered",
      desc: "Direct routes from our Accra hub to Kumasi, Takoradi, Tamale, and rural districts via validated transport box systems with backup power."
    }
  ];

  return (
    <div className={styles.logisticsPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className="container">
          <div className="hero-badge">
            <Truck size={16} />
            <span>WHO GSDP Certified Operations</span>
          </div>
          <h1>Healthcare Logistics You Can Trust</h1>
          <p>
            Operating temperature-controlled transport, customs clearance, and nationwide distribution in Ghana. Bridging the gap for local clinics and the African diaspora.
          </p>
        </div>
      </section>

      {/* Main Intro grid */}
      <section className={styles.introSection}>
        <div className={`container ${styles.introGrid}`}>
          <div className={styles.introText}>
            <h2>Reliable cold chain and custom clearance is not optional. It saves lives.</h2>
            <p>
              Many diagnostic reagents, vaccine packages, and enzymes degrade rapidly if exposed to temperatures above 8°C. In Ghana's warm tropical climate, Manny MedTech operates a validated cold chain loop. 
            </p>
            <p>
              We consolidate shipments from international manufacturers, clear them via certified regulatory agents at ports, store them in our WHO-standard Accra warehouse, and distribute them to clinical labs in sealed, audited compartments.
            </p>
            <div className={styles.complianceNote}>
              <ShieldCheck size={20} className={styles.complianceIcon} />
              <div>
                <h5>GSDP Audited Facilities</h5>
                <span>Manny MedTech is licensed by the Pharmacy Council of Ghana and the Food and Drugs Authority (FDA) for storage and distribution.</span>
              </div>
            </div>
          </div>
          <div className={styles.visualDiagram}>
            {/* CSS Schematic representing cold chain loop */}
            <div className={styles.schematicCard}>
              <h4>Supply Chain Telemetry Loop</h4>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.dotActive}></div>
                  <div>
                    <h5>Manufacturer Consolidation</h5>
                    <span>Pre-cooled packaging, EU/USA/Asia cargo bays</span>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.dotActive}></div>
                  <div>
                    <h5>Air/Sea Clearance (KIA & Tema)</h5>
                    <span>FDA clearance within 24 hours of arrival</span>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.dotActive}></div>
                  <div>
                    <h5>Cold Chain Van Transport</h5>
                    <span>Accra &rarr; Regional Capitals (IoT Monitored)</span>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.dotActive}></div>
                  <div>
                    <h5>Clinical Delivery</h5>
                    <span>Korle Bu, KATH, local clinics (receipt temperature logs)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capability Grid */}
      <section className={styles.capabilitiesSection}>
        <div className="container">
          <div className="section-header">
            <h2>Logistics Capabilities</h2>
            <p>Our infrastructure is customized for medical equipment, laboratory reagents, and surgical supplies.</p>
          </div>
          <div className={styles.capabilitiesGrid}>
            {capabilities.map((cap, index) => (
              <div key={index} className={`glass-card ${styles.capCard}`}>
                <div className={styles.capIcon}>{cap.icon}</div>
                <h4>{cap.title}</h4>
                <p>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diaspora Procurement Desk */}
      <section className={styles.diasporaSection}>
        <div className={`container ${styles.diasporaGrid}`}>
          <div className={styles.diasporaVisual}>
            <div className={styles.diasporaBadge}>
              <Globe size={48} />
              <h4>Diaspora Desk</h4>
            </div>
          </div>
          <div className={styles.diasporaInfo}>
            <h2>African Diaspora Procurement Portal</h2>
            <p className={styles.diasporaSub}>
              Supporting relatives, clinics, and philanthropic medical projects in Ghana.
            </p>
            <p>
              Many Ghanaians living in the UK, USA, Canada, and Europe fund healthcare clinics or purchase medical equipment for hospitals in their home regions. However, shipping complex equipment (like ultrasound units, ICU beds, or laboratory consumables) independently poses severe risks, including customs blockages, high clearance fees, lack of FDA validation, and transport damage.
            </p>
            <p>
              Manny MedTech's **Diaspora Procurement Desk** solves this. You select the certified equipment from our catalog, add it to the inquiry, and note that it's for diaspora donation. We handle the clearance, warranty, local installation, and regulatory validation, delivering it directly to your recipient clinic in Ghana with full certification papers.
            </p>
            <Link href="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Explore Equipment Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Request quote banner */}
      <section className={styles.logisticsCta}>
        <div className={`container ${styles.ctaCard}`}>
          <h2>Need Logistics Assistance or Equipment Delivery?</h2>
          <p>
            Our supply chain team helps hospitals manage their freight customs clearance, and provides specialized cold chain runs. Contact us for custom quotes.
          </p>
          <Link href="/inquire" className="btn btn-accent">
            Inquire for Logistics Service
          </Link>
        </div>
      </section>
    </div>
  );
}
