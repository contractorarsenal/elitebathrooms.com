import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { services } from "@/data/services";
import type { Service } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Remodeling Services",
  description:
    "Full bathroom remodels, shower remodels, bathtub remodels, tub-to-shower conversions, and one-day renovations. Tacoma-based, backed by a 10-year waterproofing warranty.",
  alternates: { canonical: absoluteUrl("/services") },
};

function LargeCell({ service }: { service: Service }) {
  return (
    <Reveal scale className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-panel"
      >
        <ImageSlot cover src={service.cardImage} alt={`${service.name} by Elite Bathrooms`} label={service.cardImage} className="transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/92 via-charcoal-950/35 to-transparent" />
        <div className="relative z-10 p-7 sm:p-9">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">Primary Service</span>
          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-warm-50 sm:text-3xl">{service.name}</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-on-dark-muted sm:text-base">{service.summary}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-warm-50">
            Learn More
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function Cell({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal scale delay={delay} className="h-full">
      <Link href={`/services/${service.slug}`} className="group relative flex h-full min-h-[140px] flex-col justify-end overflow-hidden rounded-card">
        <ImageSlot cover src={service.cardImage} alt={`${service.name} by Elite Bathrooms`} label={service.cardImage} className="transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/25 to-transparent" />
        <div className="relative z-10 p-5">
          <h3 className="text-base font-extrabold leading-tight text-warm-50">{service.name}</h3>
          {service.positioning && (
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-bronze-400">{service.positioning}</p>
          )}
        </div>
      </Link>
    </Reveal>
  );
}

export default function ServicesPage() {
  const [full, shower, bathtub, tubToShower, oneDay] = services;

  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        title="Bathroom Remodeling Services"
        description="Five ways we work, all backed by the same waterproofing standard and coordinated as one project."
        imageSrc="/images/services/elite-glass-shower.jpg"
        imageLabel="/images/services/elite-glass-shower.jpg"
        imageAlt="Elite Bathrooms crew at work on a bathroom remodel"
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container>
          <div className="grid gap-4 lg:min-h-[640px] lg:grid-cols-[1.35fr,1fr]">
            <LargeCell service={full} />
            <div className="grid gap-4 lg:grid-rows-[1.15fr,0.85fr,0.8fr]">
              <Cell service={shower} delay={60} />
              <Cell service={tubToShower} delay={120} />
              <div className="grid grid-cols-2 gap-4">
                <Cell service={bathtub} delay={180} />
                <Cell service={oneDay} delay={240} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <WaterproofingBanner />
      <NextStepCTA variant="split" heading="Ready to talk about your bathroom?" />
    </main>
  );
}
