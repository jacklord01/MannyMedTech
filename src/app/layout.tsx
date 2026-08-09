import type { Metadata, Viewport } from "next";
import { InquiryProvider } from "@/context/InquiryContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manny MedTech | Reliable Medical Solutions & Efficient Logistics",
  description: "Manny MedTech & Logistics Ltd. delivers certified medical equipment, surgical consumables, hospital furniture, laboratory supplies, and temperature-controlled logistics services across Ghana and West Africa. Connecting the African diaspora with reliable health solutions.",
  keywords: "Manny MedTech, medical equipment Ghana, healthcare logistics West Africa, surgical supplies Accra, hospital furniture Ghana, wholesale medical supplies Africa, regional medical distribution Ghana, clinical supplies diaspora",
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
      <body>
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
