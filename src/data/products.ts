export interface ProductCertification {
  title: string;
  code: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  documentUrl?: string;
  status: 'active' | 'pending' | 'exempt';
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Medical Equipment' | 'Consumables' | 'Surgical Supplies' | 'Laboratory Supplies' | 'Hospital Furniture' | 'Rehabilitation' | 'Home Care' | 'PPE' | 'Logistics Services';
  shortDescription: string;
  detailedDescription: string;
  specs: ProductSpec[];
  certifications: ProductCertification[];
  imagePlaceholder: string;
  /**
   * Optional product image path relative to /public.
   * e.g. "/products/laparotomy-pack.jpg"
   * Drop image files into the /public/products/ folder and set this field.
   * If omitted, the SVG icon placeholder is shown instead.
   */
  image?: string;
  isAvailable: boolean;
  price?: string; // Optional price (e.g. GH¢ 350)
}

export const PRODUCTS: Product[] = [
  {
    id: "laparotomy-packs",
    name: "Laparotomy Packs",
    category: "Surgical Supplies",
    price: "GH¢ 350",
    shortDescription: "Sterile procedure packs for surgical environments. Custom pack configurations can be discussed for hospitals in Ghana.",
    detailedDescription: "Sterile surgical procedure pack designed for laparotomy procedures. Sourced from certified medical manufacturers to guarantee sterilization and patient safety in operating theatres. Highly requested by hospitals, maternities, and surgical centers across all major towns and cities in Ghana, including Accra and Kumasi.",
    specs: [
      { label: "Sterility", value: "Sterile and ready to use" },
      { label: "Design", value: "Designed for laparotomy procedures" },
      { label: "Contents", value: "Includes drapes, gowns, gauze, swabs, table cover, mayo stand cover, and more" },
      { label: "Packaging", value: "Individually wrapped, sterile vacuum packs" },
      { label: "Options", value: "Custom pack configurations available upon request" }
    ],
    certifications: [
      {
        title: "Ghana FDA Registration Certificate",
        code: "FDA/DE-26-108",
        issuer: "Food and Drugs Authority Ghana",
        issueDate: "2024-02-15",
        expiryDate: "2027-02-14",
        status: "active"
      },
      {
        title: "ISO 13485:2016 Quality Management Systems",
        code: "ISO-SUT-9844",
        issuer: "SGS United Kingdom",
        issueDate: "2023-05-10",
        expiryDate: "2026-05-09",
        status: "active"
      }
    ],
    imagePlaceholder: "sutures",
    isAvailable: true
  },
  {
    id: "cesarean-section-packs",
    name: "Cesarean Section Packs",
    category: "Surgical Supplies",
    price: "GH¢ 400",
    shortDescription: "Sterile obstetric procedure packs for maternity clinics, theatres and surgical centres.",
    detailedDescription: "Sterile obstetric procedure pack designed for cesarean section procedures. Sourced from certified medical manufacturers to guarantee sterilization and patient safety. Suitable for hospitals, maternity clinics, and surgical centers. Custom pack options available.",
    specs: [
      { label: "Sterility", value: "Sterile and ready to use" },
      { label: "Design", value: "Designed for cesarean section procedures" },
      { label: "Contents", value: "Includes drapes, gowns, gauze, swabs, table cover, mayo stand cover, and more" },
      { label: "Packaging", value: "Individually wrapped, sterile vacuum packs" },
      { label: "Options", value: "Custom pack options available" }
    ],
    certifications: [
      {
        title: "Ghana FDA Registration Certificate",
        code: "FDA/DE-26-109",
        issuer: "Food and Drugs Authority Ghana",
        issueDate: "2024-02-15",
        expiryDate: "2027-02-14",
        status: "active"
      },
      {
        title: "ISO 13485:2016 Quality Management Systems",
        code: "ISO-SUT-9845",
        issuer: "SGS United Kingdom",
        issueDate: "2023-05-10",
        expiryDate: "2026-05-09",
        status: "active"
      }
    ],
    imagePlaceholder: "sutures",
    isAvailable: true
  },
  {
    id: "biopsy-needles",
    name: "Biopsy Needles",
    category: "Consumables",
    shortDescription: "Precision biopsy needles for clinical and hospital procedures in Ghana. Contact us with your required specification.",
    detailedDescription: "Precision clinical biopsy needles and related accessories for clinical biopsy procedures. Available in multiple gauges and lengths to fit specific ultrasound or CT-guided biopsy protocols. Highly sourced for clinics, dental clinics, and major hospitals across Accra, Kumasi, Tamale, and all regional centers in Ghana.",
    specs: [
      { label: "Application", value: "Clinical biopsy procedures" },
      { label: "Sizes", value: "Available in multiple gauges and lengths" },
      { label: "Sterility", value: "Ethylene Oxide (EO) gas sterilized" },
      { label: "Material", value: "Medical-grade stainless steel" },
      { label: "Packaging", value: "Individually blister-packed, 50 pcs per box" }
    ],
    certifications: [
      {
        title: "ISO 13485:2016 Medical Devices Quality Management",
        code: "ISO-BIP-4432",
        issuer: "BSI Group",
        issueDate: "2023-08-20",
        expiryDate: "2026-08-19",
        status: "active"
      },
      {
        title: "CE Mark Certificate",
        code: "CE-BIP-990",
        issuer: "Notified Body 0123",
        issueDate: "2023-09-01",
        expiryDate: "2028-08-31",
        status: "active"
      }
    ],
    imagePlaceholder: "syringe",
    isAvailable: true
  },
  {
    id: "hernia-mesh",
    name: "Hernia Mesh",
    category: "Surgical Supplies",
    shortDescription: "Surgical mesh products for hernia repair. Availability depends on requested size, material and clinical specification.",
    detailedDescription: "Surgical mesh products for hernia repair. Sourced from certified medical manufacturers to guarantee biocompatibility, tensile strength, and minimal tissue reaction. Availability depends on requested size, material and clinical specification.",
    specs: [
      { label: "Application", value: "Hernia repair surgery" },
      { label: "Sizing", value: "Multiple dimensions available depending on clinical specifications" },
      { label: "Material", value: "Biocompatible polypropylene mesh" },
      { label: "Sterility", value: "Sterile, single-use package" }
    ],
    certifications: [
      {
        title: "Ghana FDA Registration Certificate",
        code: "FDA/DE-26-112",
        issuer: "Food and Drugs Authority Ghana",
        issueDate: "2024-03-10",
        expiryDate: "2027-03-09",
        status: "active"
      },
      {
        title: "CE Mark Surgical Devices Certificate",
        code: "CE-MSH-0123",
        issuer: "TÜV Rheinland LGA Products GmbH",
        issueDate: "2023-06-11",
        expiryDate: "2028-06-10",
        status: "active"
      }
    ],
    imagePlaceholder: "sutures",
    isAvailable: true
  },
  {
    id: "robotic-rehab-gloves",
    name: "Stroke and Rehabilitation Gloves",
    category: "Rehabilitation",
    shortDescription: "Assistive stroke and rehabilitation gloves for movement recovery, hand pain, and arthritis management. Suitable for home and clinical use in Ghana.",
    detailedDescription: "Innovative robotic stroke and rehabilitation gloves designed to assist patients with movement recovery, severe hand pain, and arthritis. Employs pneumatic muscle simulation to guide finger flexing and extension. Highly recommended by hospitals and physiotherapists across Ghana for post-stroke recovery and clinical hand rehabilitation. Suitable for home care or clinical deployment.",
    specs: [
      { label: "Application", value: "Stroke recovery, hand pain & arthritis management" },
      { label: "Operation Mode", value: "Pneumatic muscle simulation for movement" },
      { label: "Target Users", value: "Post-stroke, arthritis, hand trauma patients" },
      { label: "Settings", value: "Adjustable flexing speed and intensity levels" },
      { label: "Power Source", value: "Rechargeable control unit (included)" }
    ],
    certifications: [
      {
        title: "CE Mark Medical Devices",
        code: "CE-GLV-882",
        issuer: "TÜV SÜD Product Service GmbH",
        issueDate: "2023-10-15",
        expiryDate: "2028-10-14",
        status: "active"
      },
      {
        title: "ISO 13485:2016 Medical Devices Quality Management",
        code: "ISO-GLV-993",
        issuer: "BSI Group",
        issueDate: "2023-11-01",
        expiryDate: "2026-10-31",
        status: "active"
      }
    ],
    imagePlaceholder: "concentrator",
    isAvailable: true
  },
  {
    id: "protective-goggles",
    name: "Protective Goggles",
    category: "PPE",
    shortDescription: "Protective eyewear for healthcare, laboratory and clinical environments.",
    detailedDescription: "Premium anti-fog protective goggles designed for healthcare workers, laboratory technicians, and clinical environments. Features wrap-around splash protection, adjustable head strap, and scratch-resistant polycarbonate lenses.",
    specs: [
      { label: "Application", value: "Healthcare, laboratory, and clinical environments" },
      { label: "Material", value: "Polycarbonate lenses, medical-grade PVC frame" },
      { label: "Features", value: "Anti-fog coating, scratch-resistant, splash-proof vents" },
      { label: "Design", value: "Wrap-around protection with adjustable head strap" }
    ],
    certifications: [
      {
        title: "Ghana FDA Registration Certificate",
        code: "FDA/DE-26-025",
        issuer: "Food and Drugs Authority Ghana",
        issueDate: "2024-04-18",
        expiryDate: "2027-04-17",
        status: "active"
      },
      {
        title: "CE Mark Certificate (EN 166 Compliance)",
        code: "CE-GOG-166",
        issuer: "SGS United Kingdom",
        issueDate: "2023-05-15",
        expiryDate: "2028-05-14",
        status: "active"
      }
    ],
    imagePlaceholder: "mask",
    isAvailable: true
  },
  {
    id: "wheelchairs",
    name: "Wheelchairs",
    category: "Rehabilitation",
    shortDescription: "Mobility solutions for hospitals, clinics, care facilities and individual users.",
    detailedDescription: "Sturdy, lightweight manual wheelchairs designed for hospitals, clinics, care facilities, and individual home users. Features fold-flat design for easy storage, padded armrests, swing-away footrests, and durable puncture-proof tires.",
    specs: [
      { label: "Application", value: "Hospitals, clinics, care facilities, and individual users" },
      { label: "Frame Material", value: "Lightweight, powder-coated steel" },
      { label: "Tires", value: "Solid, puncture-proof PU tires" },
      { label: "Weight Capacity", value: "Up to 120 kg" },
      { label: "Folded Size", value: "Compact folding mechanism for vehicle trunk transport" }
    ],
    certifications: [
      {
        title: "CE Mark Medical Devices",
        code: "CE-WHL-2023",
        issuer: "Notified Body 0123",
        issueDate: "2023-07-20",
        expiryDate: "2028-07-19",
        status: "active"
      },
      {
        title: "ISO 13485:2016 Medical Devices Quality Management",
        code: "ISO-WHL-873",
        issuer: "Bureau Veritas Certification",
        issueDate: "2022-09-12",
        expiryDate: "2025-09-11",
        status: "active"
      }
    ],
    imagePlaceholder: "bed",
    isAvailable: true
  },
  {
    id: "dental-xray",
    name: "Dental X-Ray Machines",
    category: "Medical Equipment",
    shortDescription: "General dental x-ray machines and accessories sourced for healthcare providers.",
    detailedDescription: "High-precision digital dental X-ray machines designed for dental clinics and maxilla-facial diagnostic centers. Features low radiation dosage settings, stable positioning arm, and high-frequency generator for sharp imaging results.",
    specs: [
      { label: "Application", value: "Dental diagnostics and dental clinic settings" },
      { label: "Generator Type", value: "High-frequency generator (60kV/70kV options)" },
      { label: "Radiation Level", value: "Low dosage digital imaging settings" },
      { label: "Focal Spot", value: "0.4mm for high resolution" },
      { label: "Connectivity", value: "USB connection for digital sensor integration" }
    ],
    certifications: [
      {
        title: "Ghana FDA Registration Certificate",
        code: "FDA/DE-26-399",
        issuer: "Food and Drugs Authority Ghana",
        issueDate: "2024-06-25",
        expiryDate: "2027-06-24",
        status: "active"
      },
      {
        title: "CE Mark Certificate",
        code: "CE-XRAY-0197",
        issuer: "TÜV SÜD Product Service GmbH",
        issueDate: "2023-12-15",
        expiryDate: "2028-12-14",
        status: "active"
      }
    ],
    imagePlaceholder: "ultrasound",
    isAvailable: true
  },
  {
    id: "cardiopulse-ecg-300",
    name: "Elite CardioPulse ECG-300",
    category: "Medical Equipment",
    shortDescription: "Professional 12-channel electrocardiograph with advanced interpretation algorithm.",
    detailedDescription: "The CardioPulse ECG-300 is a high-resolution diagnostic electrocardiograph designed for hospitals, cardiology clinics, and rehab facilities. Features standard 12 leads and internal interpretation algorithms.",
    specs: [
      { label: "Lead Mode", value: "Standard 12 leads" },
      { label: "Frequency Response", value: "0.05Hz ~ 150Hz" },
      { label: "Display", value: "7-inch color touch screen (800x480)" },
      { label: "Connectivity", value: "USB, Ethernet, Wi-Fi" }
    ],
    certifications: [
      {
        title: "Ghana FDA Registration Certificate",
        code: "FDA/DE-26-081",
        issuer: "Food and Drugs Authority Ghana",
        issueDate: "2024-03-12",
        expiryDate: "2027-03-11",
        status: "active"
      }
    ],
    imagePlaceholder: "ecg",
    isAvailable: true
  },
  {
    id: "ultrascan-v2-ultrasound",
    name: "Zenith UltraScan V2 Ultrasound System",
    category: "Medical Equipment",
    shortDescription: "Versatile trolley ultrasound machine with multiple probe configurations for general imaging.",
    detailedDescription: "The Zenith UltraScan V2 is a digital color Doppler ultrasound system designed to meet high clinical demands in obstetrics, gynecology, cardiology, and general abdominal imaging.",
    specs: [
      { label: "Display Monitor", value: "19-inch High-Definition LED, 10-inch Touch Panel" },
      { label: "Imaging Modes", value: "B, M, Color Doppler, Power Doppler, PW, CW" }
    ],
    certifications: [
      {
        title: "Ghana FDA Registration Certificate",
        code: "FDA/DE-26-092",
        issuer: "Food and Drugs Authority Ghana",
        issueDate: "2024-05-15",
        expiryDate: "2027-05-14",
        status: "active"
      }
    ],
    imagePlaceholder: "ultrasound",
    isAvailable: true
  },
  {
    id: "safetouch-sterile-syringes",
    name: "SafeTouch Sterile Syringes & Needles",
    category: "Consumables",
    shortDescription: "High-grade disposable medical syringes with ultra-sharp luer-lock needles.",
    detailedDescription: "SafeTouch syringes are manufactured from medical-grade polypropylene, featuring clear graduation scales for accurate dosing and an airtight plunger.",
    specs: [
      { label: "Sizes Available", value: "2ml, 5ml, 10ml, 20ml" },
      { label: "Sterilization", value: "Ethylene Oxide (EO) gas sterilized" }
    ],
    certifications: [
      {
        title: "CE Mark Declaration of Conformity",
        code: "CE-SYR-004",
        issuer: "Notified Body 0120",
        issueDate: "2023-04-18",
        expiryDate: "2028-04-17",
        status: "active"
      }
    ],
    imagePlaceholder: "syringe",
    isAvailable: true
  },
  {
    id: "hemascan-hematology-analyzer",
    name: "HemaScan-5 Hematology Analyzer",
    category: "Laboratory Supplies",
    shortDescription: "Automatic 5-part differential blood counter with 29 parameters and laser flow cytometry.",
    detailedDescription: "The HemaScan-5 is a state-of-the-art hematology analyzer suited for medium to large laboratories and clinics.",
    specs: [
      { label: "Throughput", value: "60 samples per hour" },
      { label: "Sample Volume", value: "20uL Whole Blood" }
    ],
    certifications: [
      {
        title: "Ghana FDA Registration Certificate",
        code: "FDA/DE-26-304",
        issuer: "Food and Drugs Authority Ghana",
        issueDate: "2024-08-10",
        expiryDate: "2027-08-09",
        status: "active"
      }
    ],
    imagePlaceholder: "analyzer",
    isAvailable: true
  },
  {
    id: "ergocomfort-icu-bed",
    name: "ErgoComfort 5-Function ICU Bed",
    category: "Hospital Furniture",
    shortDescription: "Fully electric ICU bed with nursing controller, digital weighing, and CPR quick release.",
    detailedDescription: "Designed for high-dependency wards, the ErgoComfort ICU bed offers full electric control of backrest, legrest, height, and tilting angles.",
    specs: [
      { label: "Overall Dimensions", value: "2200mm (L) x 1020mm (W) x 480-780mm (H)" },
      { label: "Safe Working Load", value: "250 kg" }
    ],
    certifications: [
      {
        title: "CE Mark Declaration of Conformity",
        code: "CE-BED-2022",
        issuer: "Notified Body 0123",
        issueDate: "2022-10-01",
        expiryDate: "2027-09-30",
        status: "active"
      }
    ],
    imagePlaceholder: "bed",
    isAvailable: true
  },
  {
    id: "oxylife-oxygen-concentrator",
    name: "OxyLife Portable Oxygen Concentrator",
    category: "Home Care",
    shortDescription: "Lightweight, long-battery-life pulse flow oxygen system with bag for active lifestyles.",
    detailedDescription: "The OxyLife Portable Concentrator provides high-purity medical oxygen (93% ± 3%) for respiratory patients who need mobile support.",
    specs: [
      { label: "Flow Rate Settings", value: "Pulse mode 1-5 settings" },
      { label: "Weight", value: "2.2 kg (including battery)" }
    ],
    certifications: [
      {
        title: "Ghana FDA Registration Certificate",
        code: "FDA/DE-26-440",
        issuer: "Food and Drugs Authority Ghana",
        issueDate: "2024-04-18",
        expiryDate: "2027-04-17",
        status: "active"
      }
    ],
    imagePlaceholder: "concentrator",
    isAvailable: true
  },
  {
    id: "manny-coldchain-logistics",
    name: "Manny MedTech Temp-Controlled Cold Chain",
    category: "Logistics Services",
    shortDescription: "Specialized WHO-compliant logistics for vaccines, reagents, and sensitive medications in West Africa.",
    detailedDescription: "Manny MedTech provides end-to-end temperature-controlled shipping and storage in Ghana, covering key regional capitals.",
    specs: [
      { label: "Temperature Ranges", value: "+2°C to +8°C, -20°C, -80°C" },
      { label: "Compliance Standard", value: "WHO TRS 961 Annex 9 Guidelines" }
    ],
    certifications: [
      {
        title: "Good Storage and Distribution Practices (GSDP)",
        code: "GSDP-2025-044",
        issuer: "Pharmacy Council of Ghana",
        issueDate: "2025-01-15",
        expiryDate: "2028-01-14",
        status: "active"
      }
    ],
    imagePlaceholder: "logistics",
    isAvailable: true
  },
  {
    id: "heart-monitors",
    name: "Heart Monitors",
    category: "Medical Equipment",
    shortDescription: "Advanced cardiovascular monitoring systems for hospitals, clinics, and personal care across Ghana.",
    detailedDescription: "High-precision heart monitors and cardiovascular telemetry systems. Essential for continuous patient monitoring in intensive care units, emergency wards, and specialized maternity or dental clinics. Supplied to medical facilities in Accra, Kumasi, and all 16 regions.",
    specs: [
      { label: "Application", value: "Cardiovascular monitoring" },
      { label: "Display", value: "High-resolution color LCD" },
      { label: "Tracking", value: "Continuous ECG, SpO2, NIBP, Respiration" }
    ],
    certifications: [
      {
        title: "CE Mark Medical Devices",
        code: "CE-HM-102",
        issuer: "TÜV Rheinland",
        issueDate: "2023-08-20",
        expiryDate: "2028-08-19",
        status: "active"
      }
    ],
    imagePlaceholder: "ecg",
    isAvailable: true
  },
  {
    id: "diabetic-monitors",
    name: "Diabetic Sugar Level Check Equipment",
    category: "Medical Equipment",
    shortDescription: "Precision blood glucose monitoring systems and test strips for diabetes management.",
    detailedDescription: "Accurate and reliable diabetic monitors for blood sugar level checking. Designed for rapid results and ease of use in hospitals, clinics, and for personal home care. Distributed across all major towns and cities in Ghana for effective diabetes management.",
    specs: [
      { label: "Application", value: "Blood glucose monitoring" },
      { label: "Read Time", value: "5 seconds" },
      { label: "Sample Size", value: "0.5 µL blood" }
    ],
    certifications: [
      {
        title: "ISO 15197:2013 In vitro diagnostic test systems",
        code: "ISO-DM-554",
        issuer: "BSI Group",
        issueDate: "2024-02-10",
        expiryDate: "2027-02-09",
        status: "active"
      }
    ],
    imagePlaceholder: "ppe",
    isAvailable: true
  }
];
