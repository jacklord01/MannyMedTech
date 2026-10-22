export const site = {
  name: "Manny MedTech",
  legalName: process.env.INVOICE_ISSUER_NAME || "Manny Med Tech",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  whatsappNumber: "233202776944",
  phoneDisplay: "+233 20 277 6944"
};

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function invoiceSettings() {
  const rate = Number(process.env.INVOICE_TAX_RATE_PERCENT ?? "0");
  return {
    taxLabel: process.env.INVOICE_TAX_LABEL || "VAT & levies",
    taxRatePercent: Number.isFinite(rate) && rate > 0 && rate < 100 ? rate : 0,
    issuerAddress: (process.env.INVOICE_ISSUER_ADDRESS || "Danyame, Block 71A|Kumasi, Ghana").split("|"),
    issuerEmail: process.env.INVOICE_ISSUER_EMAIL || "mannymedtech@gmail.com",
    issuerWebsite: process.env.INVOICE_ISSUER_WEBSITE || "www.mannymedtech.com",
    issuerTin: process.env.INVOICE_ISSUER_TIN || null,
    signatory: process.env.INVOICE_SIGNATORY || null,
    paymentTerms: process.env.INVOICE_PAYMENT_TERMS || "Full payment before delivery",
    notes: [
      "Goods supplied are non-refundable except in cases of manufacturer defect.",
      "Please inspect items upon receipt.",
      "Payment confirms acceptance of goods and quantities.",
      "Thank you for your continued support."
    ]
  };
}

export function paystackEnabled(): boolean {
  return Boolean(process.env.PAYSTACK_SECRET_KEY);
}
