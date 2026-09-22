import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Remodeling Projects",
  description:
    "Completed bathroom remodeling projects from Elite Bathrooms — full remodels, shower remodels, and conversions in Tacoma and the greater Seattle area.",
  alternates: { canonical: absoluteUrl("/projects") },
};

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Projects" }]}
        title="Bathrooms we've actually built."
        description="No stock photography, no AI renders — every project here is a completed Elite Bathrooms job."
        imageLabel="/images/projects-hero.jpg"
        imageAlt="Completed Elite Bathrooms project"
      />

      <section className="bg-charcoal-950 py-20 sm:py-28">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative block min-h-[260px] overflow-hidden bg-charcoal-950"
              >
                <ImageSlot
                  cover
                  alt={`${project.title} — completed Elite Bathrooms project`}
                  label={project.image}
                  className="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-bronze-400">
                    {project.type}
                  </span>
                  <h2 className="mt-1 text-lg font-extrabold leading-tight text-warm-50">
                    {project.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Don't see your bathroom style yet?"
        description="Every project starts as a conversation. Tell us what you're picturing."
      />
    </main>
  );
}
