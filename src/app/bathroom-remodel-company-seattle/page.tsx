import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { AboutTeamSection } from "@/components/sections/AboutTeamSection";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { OneDayPromoWp } from "@/components/sections/OneDayPromoWp";
import { ThumbtackReviews } from "@/components/sections/ThumbtackReviews";
import { WarrantyStrip } from "@/components/sections/WarrantyStrip";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Remodeling Company - Skilled Renovation Contractors",
  description:
    "Elite Bathrooms is a trusted bathroom remodeling company specializing in premium bathroom remodeling solutions designed with both aesthetics and practicality in mind.",
  alternates: { canonical: absoluteUrl("/bathroom-remodel-company-seattle") },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
        title="Bathroom Remodeling Company - Skilled Renovation Contractors"
      />
      <AboutIntro />
      <AboutTeamSection />
      <GoogleReviews />
      <OneDayPromoWp />
      <ThumbtackReviews />
      <WarrantyStrip />
    </main>
  );
}
