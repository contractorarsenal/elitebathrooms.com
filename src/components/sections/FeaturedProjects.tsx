import Link from "next/link";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block overflow-hidden bg-charcoal-950 ${
        large ? "min-h-[320px] sm:min-h-[420px] lg:min-h-full" : "min-h-[220px]"
      }`}
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
        <h3 className="mt-1 text-lg font-extrabold leading-tight text-warm-50 sm:text-xl">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}

export function FeaturedProjects() {
  const [featured, second, third] = projects;

  return (
    <section id="projects" className="bg-charcoal-950 py-20 sm:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Real Projects"
            title="Bathrooms we've actually built."
            description="No stock photography, no AI renders — every project here is a completed Elite Bathrooms job."
            tone="dark"
          />
          <Button href="/projects" variant="outline-light" className="self-start sm:self-auto">
            View All Projects
          </Button>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <ProjectCard project={featured} large />
          </div>
          <ProjectCard project={second} />
          <ProjectCard project={third} />
        </div>
      </Container>
    </section>
  );
}
