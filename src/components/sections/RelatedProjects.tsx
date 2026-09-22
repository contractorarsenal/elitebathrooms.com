import Link from "next/link";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
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
        <Reveal>
          <SectionHeading eyebrow="Related Work" title="See it built." />
        </Reveal>
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
          {matches.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative block min-h-[220px] overflow-hidden bg-charcoal-950"
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
                <h3 className="mt-1 text-lg font-extrabold leading-tight text-warm-50">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
