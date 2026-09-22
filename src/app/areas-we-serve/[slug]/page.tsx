import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaDetail } from "@/components/areas/AreaDetail";
import { areas, getAreaBySlug } from "@/data/areas";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
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
