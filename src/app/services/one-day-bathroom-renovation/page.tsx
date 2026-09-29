import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { serviceDetailContent } from "@/data/service-detail-content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "One Day Bathroom Renovation and Express Bathroom Remodel",
  description:
    "One-day bathroom renovation in Seattle, WA using pre-measured, prefabricated materials for a fast, clean wet-area refresh with minimal disruption.",
  alternates: { canonical: absoluteUrl("/services/one-day-bathroom-renovation") },
};

export default function OneDayBathroomRenovationPage() {
  return <ServiceDetailTemplate data={serviceDetailContent["one-day-bathroom-renovation"]} />;
}
