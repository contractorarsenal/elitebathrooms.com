import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/FeaturedProjects";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Remodeling Projects",
  description:
    "Completed bathroom remodeling projects from Elite Bathrooms: full remodels, shower remodels, and conversions in Tacoma and the greater Seattle area.",
  alternates: { canonical: absoluteUrl("/projects") },
};

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Projects" }]}
        title="Bathrooms we've actually built."
        description="No stock photography, no AI renders. Every project here is a completed Elite Bathrooms job."
        imageLabel="/images/projects-hero.jpg"
        imageAlt="Completed Elite Bathrooms project"
      />

      <section className="bg-charcoal-950 py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={(i % 3) * 70} />
            ))}
          </div>
        </Container>
      </section>

      <NextStepCTA
        heading="Don't see your bathroom style yet?"
        variant="compact"
      />
    </main>
  );
}
