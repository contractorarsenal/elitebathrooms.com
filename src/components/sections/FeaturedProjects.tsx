import Link from "next/link";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { ArrowRightIcon } from "../ui/icons";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  large = false,
  delay = 0,
}: {
  project: Project;
  large?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={large ? "lg:row-span-2" : ""}>
      <Link href={`/projects/${project.slug}`} className="group flex h-full flex-col overflow-hidden rounded-panel border border-charcoal-800 bg-charcoal-900 transition-colors hover:border-bronze-500/50">
        {large ? (
          <Reveal mask className="aspect-[16/11]">
            <ImageSlot
              cover
              alt={`${project.title}: completed Elite Bathrooms project`}
              label={project.image}
              className="transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            />
          </Reveal>
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden">
            <ImageSlot
              cover
              alt={`${project.title}: completed Elite Bathrooms project`}
              label={project.image}
              className="transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            />
          </div>
        )}

        <div className={`flex flex-1 flex-col gap-3 p-6 ${large ? "sm:p-8" : ""}`}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-bronze-400">
              {project.type}
            </span>
            <h3 className={`mt-1 font-extrabold leading-tight text-warm-50 ${large ? "text-2xl sm:text-3xl" : "text-lg"}`}>
              {project.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-warm-50/15 px-2.5 py-1 text-[11px] font-semibold text-warm-50/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className={`text-sm leading-relaxed text-ink-on-dark-muted ${large ? "sm:text-base" : ""}`}>
            {project.description}
          </p>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-bold uppercase tracking-[0.08em] text-bronze-400">
            View Project
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function FeaturedProjects() {
  const [featured, second, third] = projects;

  return (
    <section id="projects" className="bg-charcoal-950 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Real Projects"
            title="Bathrooms we've actually built."
            description="No stock photography, no AI renders. Every project here is a completed Elite Bathrooms job."
            tone="dark"
          />
          <Reveal delay={200}>
            <Button href="/projects" variant="outline-light" className="self-start sm:self-auto">
              View All Projects
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <div className="lg:col-span-2 lg:row-span-2">
            <ProjectCard project={featured} large />
          </div>
          <ProjectCard project={second} delay={80} />
          <ProjectCard project={third} delay={160} />
        </div>
      </Container>
    </section>
  );
}
