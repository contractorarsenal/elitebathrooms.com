import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, PlusIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { getServiceBySlug } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const service = getServiceBySlug("one-day-bathroom-renovation")!;

export const metadata: Metadata = {
  title: "One-Day Bathroom Renovation in Tacoma",
  description:
    "A streamlined bathroom renovation for key upgrades: tub/shower replacement, wall systems, fixtures, and finishing work. Fast, focused, low-disruption.",
  alternates: { canonical: absoluteUrl("/services/one-day-bathroom-renovation") },
};

const getsReplaced = [
  "Tub or shower unit",
  "Wall surround system",
  "Fixtures: faucet, showerhead, drain",
  "Grab bars and accessories, if selected",
  "Finish trim around the new install",
];

const comparison = [
  { label: "Timeline", oneDay: "Fast, planned installation", full: "Longer, full construction schedule" },
  { label: "Layout", oneDay: "Stays the same", full: "Can be reconfigured" },
  { label: "Scope", oneDay: "Tub/shower and surrounding surfaces", full: "Entire room, studs out" },
  { label: "Best for", oneDay: "Surface-focused upgrades", full: "Multiple things changing at once" },
];

const faqs = [
  {
    question: "Does \"one-day\" mean the entire bathroom is done in one day?",
    answer:
      "It refers to the installation itself moving quickly because of pre-planning, precise measurement, and prefabricated materials. It's not a fit for every bathroom, which is why we confirm scope during a consultation before scheduling.",
  },
  {
    question: "Is waterproofing still included?",
    answer: "Yes. The new wall system and shower base are installed as a properly sealed assembly, backed by our 10-year waterproofing warranty against leaks.",
  },
  {
    question: "What if my bathroom needs more than a one-day renovation covers?",
    answer:
      "If the layout, plumbing, or electrical need to change, or there's hidden structural or moisture damage, we'll tell you directly and talk through a full bathroom remodel instead.",
  },
];

export default function OneDayBathroomRenovationPage() {
  return (
    <main>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "One-Day Bathroom Renovation" },
        ]}
        title="One-Day Bathroom Renovation"
        description={service.summary}
        imageSrc={service.heroImage}
        imageLabel={service.heroImage}
        imageAlt="One-day bathroom renovation by Elite Bathrooms"
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>What It Is</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-charcoal-950 sm:text-4xl">
              Fast, focused, low-disruption.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">{service.intro}</p>
          </Reveal>
          <Reveal mask delay={100} className="aspect-[4/3] rounded-panel">
            <ImageSlot cover src={service.cardImage} alt="One-day bathroom renovation detail" label={service.cardImage} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-charcoal-950 py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal className="rounded-panel border border-charcoal-700 bg-charcoal-900 p-6 sm:p-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-bronze-400">Good Fit For</h3>
              <ul className="mt-4 space-y-2.5">
                {service.goodFor?.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-warm-50/90 sm:text-base">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80} className="rounded-panel border border-charcoal-700 bg-charcoal-900 p-6 sm:p-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-ink-on-dark-muted">Not the Right Fit For</h3>
              <ul className="mt-4 space-y-2.5">
                {service.notFor?.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-on-dark-muted sm:text-base">
                    <PlusIcon className="mt-1 h-3.5 w-3.5 shrink-0 rotate-45 text-ink-on-dark-muted" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Scope" title="What gets replaced." />
          <Reveal className="mt-10 grid gap-3 sm:grid-cols-2">
            {getsReplaced.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-card border border-line bg-warm-100 p-5">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-500" />
                <span className="text-sm font-semibold text-charcoal-950 sm:text-base">{item}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-warm-100 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>How Preparation Works</Eyebrow>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight text-charcoal-950 sm:text-3xl">
              Measured and planned before we arrive.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Materials are pre-planned and precisely measured ahead of time, so the wall system,
              tub or shower, and fixtures are ready to install rather than fabricated on site.
              That preparation is what makes the installation itself fast.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Eyebrow>Installation Day</Eyebrow>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight text-charcoal-950 sm:text-3xl">
              A planned, efficient install.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              The old tub or shower comes out, the new waterproofed wall system and base go in,
              and fixtures and finish trim are completed the same visit, with far less disruption
              to the rest of the house than a full remodel.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Comparison" title="One-day renovation vs. full remodel." />
          <Reveal className="mt-10 divide-y divide-line border-t border-line">
            {comparison.map((row) => (
              <div key={row.label} className="grid grid-cols-3 gap-4 py-4 text-sm sm:text-base">
                <span className="font-bold text-charcoal-950">{row.label}</span>
                <span className="text-ink-muted">{row.oneDay}</span>
                <span className="text-ink-muted">{row.full}</span>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-4 pb-2 pt-4 text-xs font-bold uppercase tracking-[0.06em] text-ink-muted">
              <span />
              <span>One-Day Renovation</span>
              <span>Full Remodel</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <WaterproofingBanner />
      <RelatedProjects projectType={service.projectType} />
      <Testimonials />
      <FaqAccordion faqs={faqs} title="One-Day Renovation Questions" />

      <section className="bg-charcoal-950 py-16 sm:py-20">
        <Container className="flex flex-col items-start gap-4">
          <p className="text-sm font-semibold text-ink-on-dark-muted">{service.crossSell?.label}</p>
          <Button href="/services/full-bathroom-remodel" variant="outline-light">
            {service.crossSell?.description}
          </Button>
        </Container>
      </section>

      <NextStepCTA heading="Ready to start your one-day renovation?" variant="banner" />
    </main>
  );
}
