import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ArrowRightIcon } from "../ui/icons";
import { areas } from "@/data/areas";

export function ServiceAreas() {
  const [tacoma, ...secondary] = areas;

  return (
    <section id="areas" className="bg-charcoal-950 py-20 sm:py-28">
      <Container>
        <SectionHeading
            eyebrow="Service Areas"
            title="Tacoma-based. Working across the South Sound and greater Seattle."
            tone="dark"
          />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <Link
              href={`/areas-we-serve/${tacoma.slug}`}
              className="group flex h-full flex-col justify-between rounded-panel border border-bronze-400/60 bg-bronze-500/10 p-7 transition-colors hover:border-bronze-400"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-bronze-400">
                  Home Base
                </span>
                <h3 className="mt-2 font-heading text-3xl font-extrabold text-warm-50">
                  {tacoma.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-on-dark-muted">{tacoma.blurb}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-400">
                Bathroom Remodeling in Tacoma
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            {secondary.map((area, i) => (
              <Reveal key={area.slug} delay={i * 60}>
                <Link
                  href={`/areas-we-serve/${area.slug}`}
                  className="flex h-full flex-col gap-2 rounded-card border border-warm-50/15 p-5 transition-colors hover:border-warm-50/40"
                >
                  <h3 className="text-base font-extrabold text-warm-50">{area.name}</h3>
                  <p className="text-xs leading-relaxed text-ink-on-dark-muted">{area.blurb}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

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
