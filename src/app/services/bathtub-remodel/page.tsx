import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getServiceBySlug } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const service = getServiceBySlug("bathtub-remodel")!;

export const metadata: Metadata = {
  title: "Bathtub Remodeling in Tacoma",
  description:
    "Freestanding soaking tubs, tile surrounds, and waterproofed tub-to-wall transitions. Tacoma-based bathtub remodels backed by a 10-year waterproofing warranty.",
  alternates: { canonical: absoluteUrl("/services/bathtub-remodel") },
};

export default function BathtubRemodelPage() {
  return <ServiceDetail service={service} />;
}
