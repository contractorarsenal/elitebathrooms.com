import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceAreaHubContent } from "@/components/sections/ServiceAreaHubContent";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { ThumbtackReviews } from "@/components/sections/ThumbtackReviews";
import { WarrantyStrip } from "@/components/sections/WarrantyStrip";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Local Bathroom Remodel - Full-Service Bathroom Remodel In WA",
  description:
    "Elite Bathrooms provides full-service bathroom remodeling across King, Pierce, Snohomish, and Kitsap counties in Washington.",
  alternates: { canonical: absoluteUrl("/service-area") },
};

export default function ServiceAreaPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Service Areas" }]}
        title="Local Bathroom Remodel - Full-Service Bathroom Remodel In WA"
      />
      <ServiceAreaHubContent />
      <GoogleReviews />
      <ThumbtackReviews />
      <WarrantyStrip />
    </main>
  );
}
