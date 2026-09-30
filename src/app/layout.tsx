import type { Metadata, Viewport } from "next";
import { Figtree, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { AttributionCapture } from "@/components/analytics/AttributionCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/schema";

// Figtree/Roboto match the live WordPress site's Elementor global kit
// (Secondary/Heading = Figtree, Primary/body = Roboto) — see
// docs/migration/rebuild-reconciliation.md for how this was confirmed.
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["600", "700", "800"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  // Apex domain, no www — matches WordPress's own canonical. See
  // src/lib/seo.ts's SITE_URL comment for the source of truth.
  metadataBase: new URL("https://elitebathrooms.com"),
  title: {
    default: "Elite Bathrooms | Greater Seattle Area Bathroom Remodeling Specialists",
    template: "%s | Elite Bathrooms",
  },
  description:
    "Elite Bathrooms is a bathroom remodeling specialist serving the Greater Seattle Area, including Tacoma, Seattle, Bellevue, Kirkland, Issaquah, Sammamish, and Puyallup. Full remodels, showers, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
  openGraph: {
    type: "website",
    siteName: "Elite Bathrooms",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#25272E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-warm-50">
        <JsonLd data={organizationSchema()} />
        <AttributionCapture />
        <Header />
        {children}
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
