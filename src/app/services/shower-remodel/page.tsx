import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getServiceBySlug } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const service = getServiceBySlug("shower-remodel")!;

export const metadata: Metadata = {
  title: "Shower Remodeling in Tacoma",
  description:
    "Frameless glass, large-format tile, and properly waterproofed shower pans and walls. Tacoma-based shower remodels backed by a 10-year waterproofing warranty.",
  alternates: { canonical: absoluteUrl("/services/shower-remodel") },
};

export default function ShowerRemodelPage() {
  return <ServiceDetail service={service} />;
}
