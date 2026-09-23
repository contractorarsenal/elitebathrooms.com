import Link from "next/link";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ArrowRightIcon } from "../ui/icons";
import { services } from "@/data/services";
import type { Service } from "@/data/services";

function LargeServiceCell({ service }: { service: Service }) {
  return (
    <Reveal scale className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-panel"
      >
        <ImageSlot
          cover
          src={service.cardImage}
          alt={`${service.name} by Elite Bathrooms`}
          label={service.cardImage}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/92 via-charcoal-950/35 to-transparent" />
        <div className="relative z-10 p-7 sm:p-9">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">
            Primary Service
          </span>
          <h3 className="mt-2 text-2xl font-extrabold leading-tight text-warm-50 sm:text-3xl">
            {service.name}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-on-dark-muted sm:text-base">
            {service.summary}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-warm-50">
            Learn More
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function ServiceCell({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal scale delay={delay} className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full min-h-[140px] flex-col justify-end overflow-hidden rounded-card"
      >
        <ImageSlot
          cover
          src={service.cardImage}
          alt={`${service.name} by Elite Bathrooms`}
          label={service.cardImage}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/25 to-transparent" />
        <div className="relative z-10 p-5">
          <h3 className="text-base font-extrabold leading-tight text-warm-50">{service.name}</h3>
          {service.positioning && (
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-bronze-400">
              {service.positioning}
            </p>
          )}
        </div>
      </Link>
    </Reveal>
  );
}

export function Services() {
  const [full, shower, bathtub, tubToShower, oneDay] = services;

  return (
    <section className="bg-warm-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
            eyebrow="Services"
            title="Full remodels, showers, tubs, and conversions."
            description="Five ways we work, all backed by the same waterproofing standard and coordinated as one project."
          />

        <div className="mt-10 grid gap-4 lg:min-h-[640px] lg:grid-cols-[1.35fr,1fr]">
          <LargeServiceCell service={full} />
          <div className="grid gap-4 lg:grid-rows-[1.15fr,0.85fr,0.8fr]">
            <ServiceCell service={shower} delay={60} />
            <ServiceCell service={tubToShower} delay={120} />
            <div className="grid grid-cols-2 gap-4">
              <ServiceCell service={bathtub} delay={180} />
              <ServiceCell service={oneDay} delay={240} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
