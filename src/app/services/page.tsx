import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { FeaturedService } from "@/components/sections/FeaturedService";
import { OneDayPromo } from "@/components/sections/OneDayPromo";
import { getServiceBySlug } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bathroom Remodeling Services",
  description:
    "Full bathroom remodels, shower remodels, bathtub remodels, tub-to-shower conversions, and one-day renovations. Tacoma-based, backed by a 10-year waterproofing warranty.",
  alternates: { canonical: absoluteUrl("/services") },
};

const howToChoose = [
  {
    title: "Full Bathroom Remodel",
    fit: "More than one thing needs to change: layout, storage, dated plumbing, or several fixtures at once.",
  },
  {
    title: "Shower or Bathtub Remodel",
    fit: "The shower or tub itself is the problem, and the rest of the room still works fine.",
  },
  {
    title: "Tub-to-Shower Conversion",
    fit: "The household no longer needs the tub and wants a properly waterproofed walk-in shower instead.",
  },
  {
    title: "One-Day Renovation",
    fit: "You want a fast, surface-focused update with the same layout and minimal disruption.",
  },
];

const faqs = [
  {
    question: "How do I know which service I need?",
    answer:
      "It depends on what's actually wrong with the bathroom. If it's just the tub or shower, a conversion or remodel of that fixture usually covers it. If the layout, storage, or plumbing all need to change, a full remodel is the more realistic path. A consultation is where we give you a straight answer.",
  },
  {
    question: "Is waterproofing included in every service?",
    answer:
      "Yes. Every service that involves a shower or tub gets the same fully sealed pan and wall assembly, backed by our 10-year waterproofing warranty against leaks.",
  },
  {
    question: "How long does each service take?",
    answer:
      "A one-day renovation or tub-to-shower conversion moves through construction faster than a full remodel, simply because there's less being rebuilt. We'll give you a project-specific timeline during your consultation.",
  },
  {
    question: "Is financing available for any of these services?",
    answer: "Yes, financing is available for qualifying projects across every service we offer.",
  },
];

function SideBySideService({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug)!;
  return (
    <Reveal className="flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-panel">
        <ImageSlot cover src={service.cardImage} alt={`${service.name} by Elite Bathrooms`} label={service.cardImage} />
      </div>
      <h3 className="mt-5 text-2xl font-extrabold text-charcoal-950">{service.name}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted sm:text-base">{service.summary}</p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-600 hover:text-bronze-500"
      >
        Learn More
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </Link>
    </Reveal>
  );
}

export default function ServicesPage() {
  const tubToShower = getServiceBySlug("tub-to-shower-conversion")!;

  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        title="Bathroom Remodeling Services"
        description="Full remodels, showers, tubs, and conversions, all backed by the same waterproofing standard."
        imageSrc="/images/services/elite-glass-shower.jpg"
        imageLabel="/images/services/elite-glass-shower.jpg"
        imageAlt="Elite Bathrooms crew at work on a bathroom remodel"
      />

      <FeaturedService />

      <section className="bg-warm-100 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Shower & Bathtub" title="Shower and bathtub remodeling." />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8">
            <SideBySideService slug="shower-remodel" />
            <SideBySideService slug="bathtub-remodel" />
          </div>
        </Container>
      </section>

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal mask className="aspect-[4/3] rounded-panel">
            <ImageSlot
              cover
              src={tubToShower.cardImage}
              alt={`${tubToShower.name} by Elite Bathrooms`}
              label={tubToShower.cardImage}
            />
          </Reveal>
          <Reveal>
            <Eyebrow>Conversions</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-charcoal-950 sm:text-4xl">
              Tub-to-Shower Conversions
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              {tubToShower.intro}
            </p>
            <ul className="mt-6 space-y-2.5">
              {tubToShower.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink sm:text-base">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-500" />
                  {f}
                </li>
              ))}
            </ul>
            <Button href="/services/tub-to-shower-conversion" variant="primary" className="mt-7">
              Explore Tub-to-Shower Conversions
            </Button>
          </Reveal>
        </Container>
      </section>

      <OneDayPromo />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Not Sure Where to Start?" title="How to choose the right service." />
          <div className="mt-10 divide-y divide-line border-t border-line">
            {howToChoose.map((item, i) => (
              <Reveal key={item.title} delay={i * 60} className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="shrink-0 text-base font-extrabold text-charcoal-950 sm:w-64">{item.title}</span>
                <span className="text-sm leading-relaxed text-ink-muted sm:text-base">{item.fit}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <WaterproofingBanner />
      <RelatedProjects />
      <FaqAccordion faqs={faqs} title="Choosing a Service" />
      <NextStepCTA variant="split" heading="Ready to talk about your bathroom?" />
    </main>
  );
}
