import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./FeaturedProjects";
import { projects } from "@/data/projects";

export function RelatedProjects({ projectType, exceptSlug }: { projectType?: string; exceptSlug?: string }) {
  const matches = projects
    .filter((p) => (projectType ? p.type === projectType : true))
    .filter((p) => p.slug !== exceptSlug)
    .slice(0, 3);

  if (matches.length === 0) return null;

  return (
    <section className="bg-warm-100 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Real Projects" title="See it built." />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {matches.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={i * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}
