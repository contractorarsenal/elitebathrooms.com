import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getServiceBySlug } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const service = getServiceBySlug("tub-to-shower-conversion")!;

export const metadata: Metadata = {
  title: "Tub-to-Shower Conversion in Tacoma",
  description:
    "Fast, clean tub-to-shower conversions in Tacoma and the greater Seattle area, properly waterproofed, without a full gut remodel.",
  alternates: { canonical: absoluteUrl("/services/tub-to-shower-conversion") },
};

export default function TubToShowerConversionPage() {
  return <ServiceDetail service={service} />;
}
