import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { serviceDetailContent } from "@/data/service-detail-content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Full Bathroom Remodel Services in Seattle, WA",
  description:
    "Complete full bathroom remodel services in Seattle, WA. Layout redesign, waterproofing, tile, plumbing, electrical, and finish work handled end to end.",
  alternates: { canonical: absoluteUrl("/services/full-bathroom-remodel") },
};

export default function FullBathroomRemodelPage() {
  return <ServiceDetailTemplate data={serviceDetailContent["full-bathroom-remodel"]} />;
}
