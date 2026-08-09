import type { Metadata, Viewport } from "next";
import { InquiryProvider } from "@/context/InquiryContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manny MedTech | Reliable Medical Solutions & Efficient Logistics",
  description: "Manny MedTech & Logistics Ltd. delivers certified medical equipment to hospitals, maternity clinics, dental clinics, and rehab centers across all major towns and cities in Ghana (Accra, Kumasi, Tamale, Takoradi, Tema, Cape Coast). Specializing in laparotomy packs, biopsy needles, and stroke & rehabilitation gloves for movement hand pain and arthritis.",
  keywords: "Manny MedTech, medical equipment Ghana, healthcare logistics West Africa, hospitals in Ghana, maternity clinics Ghana, dental clinics Accra, laparotomy packs, biopsy needles, stroke rehabilitation gloves, hand pain relief, arthritis gloves, rehab equipment, surgical supplies Accra, Kumasi, Tamale, Takoradi, Cape Coast, Tema, Koforidua, Sunyani, Ho, Bolgatanga, Wa, regional medical distribution Ghana, wholesale medical supplies Africa",
  authors: [{ name: "Manny MedTech & Logistics Ltd." }],
  robots: "index, follow",
  openGraph: {
    title: "Manny MedTech | Medical Supplies & Logistics in Ghana",
    description: "Your trusted partner for certified medical equipment and efficient logistics across all 16 regions of Ghana and West Africa.",
    url: "https://mannymedtech.com",
    siteName: "Manny MedTech",
    locale: "en_GH",
    type: "website",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Script id="manny-analytics" strategy="afterInteractive">
          {`
            // Placeholder for Google Analytics or other tracking
            // window.dataLayer = window.dataLayer || [];
            // function gtag(){dataLayer.push(arguments);}
            // gtag('js', new Date());
            // gtag('config', 'G-XXXXXXXXXX');
            console.log('Tracking script loaded for regional analytics.');
          `}
        </Script>
        <InquiryProvider>
          <Navbar />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
        </InquiryProvider>
      </body>
    </html>
  );
}
