import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { getProjectBySlug, projects } from "@/data/projects";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

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
    description: `${project.title}: a completed ${project.type.toLowerCase()} by Elite Bathrooms.`,
    alternates: { canonical: absoluteUrl(`/projects/${project.slug}`) },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const relatedService = services.find((s) => s.projectType === project.type);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];

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
        imageAlt={`${project.title}: completed Elite Bathrooms project`}
      />

      <section className="bg-warm-50 py-14 sm:py-16">
        <Container>
          <Reveal className="flex flex-wrap items-center gap-3">
            <span className="border border-bronze-400 bg-bronze-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-600">
              {project.type}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line px-2.5 py-1 text-[11px] font-semibold text-ink-muted">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={80} className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
            {project.description}
          </Reveal>
        </Container>
      </section>

      {/* Gallery: mask reveal, selectively (case studies are a named best-location). */}
      <section className="bg-warm-50 pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {galleryLabels.map((label, i) => (
              <Reveal key={label} mask delay={i * 100} className="aspect-[4/5] rounded-card">
                <ImageSlot cover alt={`${project.title}: additional photo`} label={label} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <WaterproofingBanner />

      <NextStepCTA variant="compact" heading="Like this direction for your bathroom?" />

      {/* Related service + next project — keeps browsing going instead of dead-ending. */}
      <section className="border-b border-line bg-warm-100 py-10">
        <Container className="grid gap-4 sm:grid-cols-2">
          {relatedService && (
            <Link
              href={`/services/${relatedService.slug}`}
              className="group flex items-center justify-between rounded-card border border-line bg-warm-50 p-5 transition-colors hover:border-bronze-400"
            >
              <div>
                <Eyebrow className="text-[11px]">Related Service</Eyebrow>
                <span className="mt-1 block text-base font-extrabold text-charcoal-950">
                  {relatedService.name}
                </span>
              </div>
              <ArrowRightIcon className="h-4 w-4 shrink-0 text-bronze-500 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center justify-between rounded-card border border-line bg-warm-50 p-5 transition-colors hover:border-bronze-400"
          >
            <div>
              <Eyebrow className="text-[11px]">Next Project</Eyebrow>
              <span className="mt-1 block text-base font-extrabold text-charcoal-950">
                {nextProject.title}
              </span>
            </div>
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-bronze-500 transition-transform group-hover:translate-x-1" />
          </Link>
        </Container>
      </section>

      <RelatedProjects projectType={project.type} exceptSlug={project.slug} />
    </main>
  );
}
