import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Positioning } from "@/components/sections/Positioning";
import { FeaturedService } from "@/components/sections/FeaturedService";
import { CoreServices } from "@/components/sections/CoreServices";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { WhyElite } from "@/components/sections/WhyElite";
import { Waterproofing } from "@/components/sections/Waterproofing";
import { Process } from "@/components/sections/Process";
import { OneDayPromo } from "@/components/sections/OneDayPromo";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { Financing } from "@/components/sections/Financing";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { NextStepCTA } from "@/components/sections/NextStepCTA";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function HomePage() {
  return (
    <main>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <TrustBar />
      <Positioning />
      <FeaturedService />
      <CoreServices />
      <FeaturedProjects />
      <WhyElite />
      <Waterproofing />
      <Process />
      <OneDayPromo />
      <BeforeAfter />
      <Testimonials />
      <Financing />
      <ServiceAreas />
      <BlogTeaser />
      <NextStepCTA heading="Ready to talk about your bathroom?" variant="banner" />
    </main>
  );
}
