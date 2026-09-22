import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getServiceBySlug } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const service = getServiceBySlug("one-day-bathroom-renovation")!;

export const metadata: Metadata = {
  title: "One-Day Bathroom Renovation in Tacoma",
  description:
    "A streamlined bathroom renovation for key upgrades — tub/shower replacement, wall systems, fixtures, and finishing work. Fast, focused, low-disruption.",
  alternates: { canonical: absoluteUrl("/services/one-day-bathroom-renovation") },
};

export default function OneDayBathroomRenovationPage() {
  return <ServiceDetail service={service} />;
}
