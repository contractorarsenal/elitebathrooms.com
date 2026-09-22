import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getProjectBySlug, projects } from "@/data/projects";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: `${project.title} — a completed ${project.type.toLowerCase()} by Elite Bathrooms.`,
    alternates: { canonical: absoluteUrl(`/projects/${project.slug}`) },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const relatedService = services.find((s) => s.projectType === project.type);

  // Additional angles are reserved gallery slots, not a claim that these
  // exact photos exist yet — see PHOTOGRAPHY SYSTEM in the build spec.
  const galleryLabels = [1, 2, 3].map(
    (n) => `/images/${project.slug}-${String(n).padStart(2, "0")}.jpg`
  );

  return (
    <main>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.title },
        ]}
        title={project.title}
        imageLabel={project.image}
        imageAlt={`${project.title} — completed Elite Bathrooms project`}
      />

      <section className="bg-warm-50 py-14 sm:py-16">
        <Container>
          <Reveal className="flex flex-wrap items-center gap-3">
            <span className="border border-bronze-400 bg-bronze-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-600">
              {project.type}
            </span>
            {relatedService && (
              <Link
                href={`/services/${relatedService.slug}`}
                className="text-xs font-bold uppercase tracking-[0.08em] text-ink-muted underline-offset-4 hover:text-bronze-600 hover:underline"
              >
                See the {relatedService.name} service →
              </Link>
            )}
            <Link
              href="/areas-we-serve"
              className="text-xs font-bold uppercase tracking-[0.08em] text-ink-muted underline-offset-4 hover:text-bronze-600 hover:underline"
            >
              See where we work →
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="bg-warm-50 pb-20 sm:pb-28">
        <Container>
          <Reveal className="grid gap-4 sm:grid-cols-3">
            {galleryLabels.map((label) => (
              <ImageSlot
                key={label}
                alt={`${project.title} — additional photo`}
                aspectRatio="4/5"
                label={label}
              />
            ))}
          </Reveal>
        </Container>
      </section>

      <WaterproofingBanner />
      <RelatedProjects projectType={project.type} exceptSlug={project.slug} />
      <CtaBanner
        title="Want a bathroom like this one?"
        description="Tell us about your project and we'll follow up to schedule a consultation."
      />
    </main>
  );
}
