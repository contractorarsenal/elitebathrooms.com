import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { serviceDetailContent } from "@/data/service-detail-content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathtub Remodel - Custom Tub Upgrades & Replacement Experts",
  description:
    "Bathtub remodel and replacement services in Seattle, WA: freestanding tubs, alcove tubs, and jetted systems, installed with proper waterproofing.",
  alternates: { canonical: absoluteUrl("/services/bathtub-remodel") },
};

export default function BathtubRemodelPage() {
  return <ServiceDetailTemplate data={serviceDetailContent["bathtub-remodel"]} />;
}
