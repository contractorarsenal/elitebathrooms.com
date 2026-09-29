import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { OurServices } from "@/components/sections/OurServices";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { OurProjectsShowcase } from "@/components/sections/OurProjectsShowcase";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { OneDayPromoWp } from "@/components/sections/OneDayPromoWp";
import { ThumbtackReviews } from "@/components/sections/ThumbtackReviews";
import { WarrantyStrip } from "@/components/sections/WarrantyStrip";

// Homepage rebuilt as a direct visual reproduction of the live WordPress
// homepage — see docs/migration/homepage-parity.md for the full section-by-
// section source mapping and known gaps. Section order matches
// wordpress-archive/html/home.html exactly.
export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function HomePage() {
  return (
    <main>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <OurServices />
      <HowWeWork />
      <OurProjectsShowcase />
      <GoogleReviews />
      <OneDayPromoWp />
      <ThumbtackReviews />
      <WarrantyStrip />
    </main>
  );
}
