import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { serviceDetailContent } from "@/data/service-detail-content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shower Remodel - Custom Walk-In & Frameless Glass Showers",
  description:
    "Shower remodel services in Seattle, WA: frameless glass enclosures, custom tile, and properly waterproofed shower pans and walls.",
  alternates: { canonical: absoluteUrl("/services/shower-remodel") },
};

export default function ShowerRemodelPage() {
  return <ServiceDetailTemplate data={serviceDetailContent["shower-remodel"]} />;
}
