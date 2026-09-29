import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesHubIntro } from "@/components/sections/ServicesHubIntro";
import { ServiceCardsGrid } from "@/components/sections/ServiceCardsGrid";
import { ServiceTimelineTable } from "@/components/sections/ServiceTimelineTable";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { OneDayPromoWp } from "@/components/sections/OneDayPromoWp";
import { ThumbtackReviews } from "@/components/sections/ThumbtackReviews";
import { WarrantyStrip } from "@/components/sections/WarrantyStrip";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Remodel Services - Trusted Renovation Professionals",
  description:
    "Bathroom remodel services providing attention to detail, skilled installation, and reliable bathroom remodeling services that transform your home with style.",
  alternates: { canonical: absoluteUrl("/bathroom-remodel-services") },
};

// Verbatim from wordpress-archive/html/bathroom-remodel-services.html. Two
// items (cost and permit-fee answers) have specific dollar figures redacted
// per the standing no-unverified-pricing-claims policy — the surrounding
// real copy is otherwise untouched.
const faqs = [
  {
    question: "How much does a professional bathroom remodel cost in Seattle?",
    answer:
      "Cost varies significantly by scope: a mid-range bathroom remodel is a different investment than a full luxury primary suite renovation. These costs reflect the high demand for skilled labor in King County and the necessity of using premium, moisture-resistant materials that can withstand the local climate. We provide a detailed, project-specific quote after a consultation.",
  },
  {
    question: "Do I need a permit for my bathroom renovation in King County?",
    answer:
      "Generally, yes. In Seattle, any project that involves moving plumbing, changing electrical wiring, or structural alterations requires a permit from the SDCI. Minor cosmetic changes may be exempt, but for a full service remodel, being permitted is vital for your home's resale value and insurance compliance. We handle the entire permitting process for our clients.",
  },
  {
    question: "What is the typical timeline for a full bathroom remodel?",
    answer:
      "A standard full-gut renovation usually takes 3 to 5 weeks. This includes demolition, rough-in plumbing/electrical, inspections, tiling, and final fixture installation. Our “One-Day” options are strictly for wet-area replacements (tubs/showers), whereas a comprehensive “Elite” remodel ensures no detail is rushed.",
  },
  {
    question: "Which materials are best for the damp Pacific Northwest climate?",
    answer:
      "We prioritize non-porous surfaces like porcelain tile and quartz countertops. For shower walls, we recommend large-format tiles to minimize grout lines—which are the primary site for mold growth. Additionally, high-CFM ventilation fans are a non-negotiable part of our installs to ensure proper moisture extraction.",
  },
  {
    question: "Will a bathroom remodel increase my Seattle home's value?",
    answer:
      "Updated bathrooms are consistently one of the highest-return renovations in the current Seattle real estate market. Buyers in the PNW specifically look for “move-in ready” wet areas that show no signs of water damage or dated plumbing.",
  },
  {
    question: "Can I stay in my home during the renovation?",
    answer:
      "Yes, though there will be noise and dust during the demolition phase. We use industrial-grade HEPA air scrubbers and floor protection to keep the rest of your home pristine. If the home only has one bathroom, we can coordinate a phased approach or suggest temporary solutions to minimize the impact on your daily life.",
  },
  {
    question: "Why are Seattle bathroom permits so expensive and necessary?",
    answer:
      "The Seattle Department of Construction & Inspections (SDCI) requires rigorous reviews for tree protection and energy efficiency. Permit fees are your only protection against future insurance claims and resale hurdles. A permitted remodel ensures your electrical and moisture-rated ventilation meet current Seattle Electrical Code, which is strictly enforced during resale inspections.",
  },
  {
    question: 'What is the "2-Inch Drain Rule" for Seattle shower conversions?',
    answer:
      "If you are converting a bathtub to a walk-in shower, Seattle plumbing code generally requires a 2-inch drain line. Most older Seattle homes (pre-1980) were built with 1.5-inch drains for tubs. Simply swapping the fixture without upgrading the pipe behind the wall is a common “budget contractor” mistake that will fail a King County plumbing inspection and lead to slow drainage or overflow issues.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        title="Bathroom Remodel Services - Trusted Renovation Professionals"
      />
      <ServicesHubIntro />
      <ServiceCardsGrid />
      <ServiceTimelineTable />
      <FaqAccordion
        faqs={faqs}
        title={
          <>
            Frequently Asked Questions About <span className="text-bronze-500">Bathroom Remodeling</span>
          </>
        }
      />
      <GoogleReviews />
      <OneDayPromoWp />
      <ThumbtackReviews />
      <WarrantyStrip />
    </main>
  );
}
