import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { serviceDetailContent } from "@/data/service-detail-content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tub to Shower, ADA, & Aging-in-Place Bathroom Conversion",
  description:
    "Tub-to-shower and accessibility bathroom conversions in Seattle, WA: ADA-inspired features, low-threshold entry, and shower-to-tub conversions.",
  alternates: { canonical: absoluteUrl("/services/bathroom-conversion") },
};

export default function BathroomConversionPage() {
  return <ServiceDetailTemplate data={serviceDetailContent["bathroom-conversion"]} />;
}
