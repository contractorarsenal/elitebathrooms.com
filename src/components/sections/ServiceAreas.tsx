import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { areas } from "@/data/areas";

export function ServiceAreas() {
  return (
    <section id="areas" className="bg-charcoal-950 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Service Areas"
            title="Tacoma-based. Working across the South Sound and greater Seattle."
            tone="dark"
          />
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center gap-3">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas-we-serve/${area.slug}`}
              className={
                area.primary
                  ? "border border-bronze-400 bg-bronze-500/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.04em] text-bronze-400 hover:bg-bronze-500/20"
                  : "border border-warm-50/20 px-4 py-2 text-sm font-semibold text-warm-50/90 hover:border-warm-50/50"
              }
            >
              {area.name}
              {area.primary && " — HQ"}
            </Link>
          ))}
        </Reveal>

        <Reveal className="mt-6">
          <Link
            href="/areas-we-serve"
            className="text-sm font-bold uppercase tracking-[0.06em] text-bronze-400 hover:text-bronze-300"
          >
            See All Service Areas →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
