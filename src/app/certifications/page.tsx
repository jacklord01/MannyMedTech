import React from 'react';
import { ShieldCheck, Award, FileText, CheckCircle, HelpCircle } from 'lucide-react';
import styles from './certifications.module.css';

export const metadata = {
  title: "Regulatory Compliance & Certifications | Manny MedTech",
  description: "Manny MedTech's healthcare compliance portal. Learn about Ghana Food and Drugs Authority listings, ISO 13485 compliance, and our strict equipment auditing standards.",
};

export default function CertificationsPage() {
  const standards = [
    {
      icon: <Award size={36} />,
      title: "Ghana Food & Drugs Authority (FDA)",
      desc: "Under Part III of the Public Health Act, 2012 (Act 851), all medical devices distributed in Ghana must be registered. Manny MedTech coordinates registrations and maintains valid FDA listing codes for our catalog, facilitating institutional purchasing."
    },
    {
      icon: <ShieldCheck size={36} />,
      title: "ISO 13485:2016 Certification",
      desc: "We exclusively partner with global manufacturers whose quality management systems conform to ISO 13485. This ensures that machinery design, fabrication, and calibration adhere to medical device guidelines."
    },
    {
      icon: <FileText size={36} />,
      title: "CE Mark & Conformity",
      desc: "Our diagnostic machinery, surgical tools, and laboratory analyzers carry European Union CE markings, proving conformity with health, safety, and environmental standards."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Manufacturer Audit",
      desc: "Our quality desk audits manufacturer QMS credentials, testing reports, and ISO validations before listing any equipment."
    },
    {
      num: "02",
      title: "Ghana FDA Dossier Submission",
      desc: "We compile technical files, user booklets, and clinical trial reviews for registration with the Food and Drugs Authority in Accra."
    },
    {
      num: "03",
      title: "Warehouse Batch Inspections",
      desc: "Upon landing at ports, batch numbers are inspected, temperature logs verified, and physical safety seals validated."
    },
    {
      num: "04",
      title: "Institutional Delivery File",
      desc: "We supply hospitals with complete registration copies, warranties, and calibration documents on delivery."
    }
  ];

  return (
    <div className={styles.certificationsPage}>
      {/* Banner */}
      <section className={styles.heroBanner}>
        <div className="container">
          <div className="hero-badge">
            <ShieldCheck size={16} />
            <span>Guaranteed Medical Standards</span>
          </div>
          <h1>Regulatory Compliance & Quality</h1>
          <p>
            Operating with strict adherence to FDA Ghana registrations and international ISO 13485 quality standards. Ensuring safe clinical operations.
          </p>
        </div>
      </section>

      {/* Standards list */}
      <section className={styles.standardsSection}>
        <div className="container">
          <div className="section-header">
            <h2>Supported Compliance Regimes</h2>
            <p>Manny MedTech bridges the gap between global medical standards and national regulatory requirements in West Africa.</p>
          </div>
          
          <div className={styles.standardsGrid}>
            {standards.map((std, index) => (
              <div key={index} className={`glass-card ${styles.stdCard}`}>
                <div className={styles.stdIcon}>{std.icon}</div>
                <h3>{std.title}</h3>
                <p>{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation Pipeline */}
      <section className={styles.pipelineSection}>
        <div className="container">
          <div className="section-header">
            <h2>Our Quality Validation Pipeline</h2>
            <p>Every piece of equipment distributed by Manny MedTech undergoes a rigorous verification cycle.</p>
          </div>

          <div className={styles.pipelineGrid}>
            {steps.map((step, index) => (
              <div key={index} className={styles.pipelineCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>{step.num}</span>
                  <div className={styles.stepLine}></div>
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Compliance Questions</h2>
            <p>Clarifying medical device registrations and import clearance procedures for hospitals and retailers.</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqCard}>
              <div className={styles.faqQuestion}>
                <HelpCircle size={20} className={styles.faqIcon} />
                <h4>Do you provide Ghana FDA certificates on delivery?</h4>
              </div>
              <p className={styles.faqAnswer}>
                Yes. Every clinical machine (such as ECG recorders, ultrasounds, and incubators) is delivered alongside a folder containing our import license, factory warranty, and Ghana Food and Drugs Authority registration certificate.
              </p>
            </div>

            <div className={styles.faqCard}>
              <div className={styles.faqQuestion}>
                <HelpCircle size={20} className={styles.faqIcon} />
                <h4>Why is there no pricing shown on the website?</h4>
              </div>
              <p className={styles.faqAnswer}>
                Medical procurement involves varying freight rates, import custom duties at the Port of Tema, and bulk discounts. By operating on a Request for Quote (RFQ) basis, we provide clinics with highly tailored, competitive, and transparent landing quotes.
              </p>
            </div>

            <div className={styles.faqCard}>
              <div className={styles.faqQuestion}>
                <HelpCircle size={20} className={styles.faqIcon} />
                <h4>How do you guarantee cold chain integrity for diagnostics reagents?</h4>
              </div>
              <p className={styles.faqAnswer}>
                We employ WHO-approved vaccine carrier boxes and temperature monitoring loggers (such as Sensitech). Upon delivery at your facility in Accra, Kumasi, or Tamale, our team downloads and prints the digital temperature file to prove the item remained within the +2°C to +8°C threshold during transit.
              </p>
            </div>

            <div className={styles.faqCard}>
              <div className={styles.faqQuestion}>
                <HelpCircle size={20} className={styles.faqIcon} />
                <h4>Can retail pharmacies and distributor groups order from you?</h4>
              </div>
              <p className={styles.faqAnswer}>
                Yes. We serve wholesale retail chains, nursing homes, and clinical procurement agents. Submitting an inquiry list allows our sales desk to structure volume-based pricing brackets and arrange custom shipping logistics.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
