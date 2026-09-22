import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Positioning } from "@/components/sections/Positioning";
import { Services } from "@/components/sections/Services";
import { Waterproofing } from "@/components/sections/Waterproofing";
import { Process } from "@/components/sections/Process";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { Financing } from "@/components/sections/Financing";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { EstimateTeaser } from "@/components/sections/EstimateTeaser";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function HomePage() {
  return (
    <main>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <TrustBar />
      <FeaturedProjects />
      <Positioning />
      <Services />
      <Waterproofing />
      <Process />
      <BeforeAfter />
      <Testimonials />
      <Financing />
      <ServiceAreas />
      <EstimateTeaser />
    </main>
  );
}
