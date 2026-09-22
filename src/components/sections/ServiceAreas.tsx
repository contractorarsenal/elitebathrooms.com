import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { serviceAreas } from "@/lib/site-config";

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
          <span className="border border-bronze-400 bg-bronze-500/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.04em] text-bronze-400">
            {serviceAreas.primary.name} — HQ
          </span>
          {serviceAreas.secondary.map((area) => (
            <span
              key={area.slug}
              className="border border-warm-50/20 px-4 py-2 text-sm font-semibold text-warm-50/90"
            >
              {area.name}
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
