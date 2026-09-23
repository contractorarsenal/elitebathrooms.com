import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ArrowRightIcon } from "../ui/icons";
import { services } from "@/data/services";

export function RelatedServices({ exceptSlug }: { exceptSlug: string }) {
  const others = services.filter((s) => s.slug !== exceptSlug);

  return (
    <section className="bg-warm-50 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Other Services" title="Other ways we work." />
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
          {others.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group border border-line bg-warm-100 p-6"
            >
              <h3 className="text-lg font-extrabold text-charcoal-950">{service.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{service.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-500">
                Learn More
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
