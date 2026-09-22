import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elitebathrooms.com"),
  title: {
    default: "Elite Bathrooms | Tacoma Bathroom Remodeling Specialists",
    template: "%s | Elite Bathrooms",
  },
  description:
    "Elite Bathrooms is a Tacoma-based bathroom remodeling specialist serving Tacoma, Seattle, Bellevue, Kirkland, Issaquah, Sammamish, and Puyallup. Full remodels, showers, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121316",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-warm-50">
        <Header />
        {children}
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
