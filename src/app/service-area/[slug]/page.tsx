import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaDetail } from "@/components/areas/AreaDetail";
import { WpAreaDetail } from "@/components/areas/WpAreaDetail";
import { areas, getAreaBySlug } from "@/data/areas";
import { wpSourcedAreas, getWpSourcedAreaBySlug } from "@/data/areas-wp-sourced";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// "bathroom-remodel-tacoma" is excluded — it has its own dedicated authority page at
// /service-area/bathroom-remodel-tacoma/page.tsx (Next.js resolves that static route
// ahead of this dynamic one for the literal "bathroom-remodel-tacoma" path regardless).
//
// Two content sources render through this one route: the 7 verified markets
// (src/data/areas.ts, hand-written) and the other 29 WordPress service-area
// URLs (src/data/areas-wp-sourced.ts, migrated verbatim as a parity pass --
// see docs/migration/rebuild-reconciliation.md). Together they cover all 36
// live WordPress service-area URLs.
export function generateStaticParams() {
  const verified = areas.filter((a) => a.slug !== "bathroom-remodel-tacoma").map((a) => ({ slug: a.slug }));
  const wpSourced = wpSourcedAreas.map((a) => ({ slug: a.slug }));
  return [...verified, ...wpSourced];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (area) {
    return {
      title: `Bathroom Remodeling in ${area.name}, WA`,
      description: area.metadataDescription,
      alternates: { canonical: absoluteUrl(`/service-area/${area.slug}`) },
    };
  }
  const wpArea = getWpSourcedAreaBySlug(slug);
  if (wpArea) {
    return {
      title: wpArea.title,
      description: wpArea.metaDescription,
      alternates: { canonical: absoluteUrl(`/service-area/${wpArea.slug}`) },
    };
  }
  return {};
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (area) return <AreaDetail area={area} />;

  const wpArea = getWpSourcedAreaBySlug(slug);
  if (wpArea) return <WpAreaDetail area={wpArea} />;

  notFound();
}
