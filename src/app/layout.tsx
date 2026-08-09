import type { Metadata, Viewport } from "next";
import { InquiryProvider } from "@/context/InquiryContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manny MedTech | Reliable Medical Solutions & Efficient Logistics",
  description: "Manny MedTech & Logistics Ltd. delivers certified medical equipment, surgical consumables, hospital furniture, laboratory supplies, and temperature-controlled logistics services to hospitals, clinics, and retailers in Ghana and the African diaspora. Partnering with global manufacturers to guarantee FDA Ghana and ISO compliant supplies.",
  keywords: "Manny MedTech, medical equipment Ghana, healthcare logistics West Africa, surgical supplies Accra, hospital furniture Ghana, cold chain logistics Africa, rehabilitation supplies, clinical supplies diaspora, Ghana FDA approved medical devices",
  authors: [{ name: "Manny MedTech & Logistics Ltd." }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
