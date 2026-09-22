import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaDetail } from "@/components/areas/AreaDetail";
import { areas, getAreaBySlug } from "@/data/areas";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// "tacoma" is excluded — it has its own dedicated authority page at
// /areas-we-serve/tacoma/page.tsx (Next.js resolves that static route
// ahead of this dynamic one for the literal "tacoma" path regardless).
export function generateStaticParams() {
  return areas.filter((a) => a.slug !== "tacoma").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};

  return {
    title: `Bathroom Remodeling in ${area.name}, WA`,
    description: area.blurb,
    alternates: { canonical: absoluteUrl(`/areas-we-serve/${area.slug}`) },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  return <AreaDetail area={area} />;
}
