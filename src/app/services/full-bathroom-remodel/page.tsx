import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { getServiceBySlug } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const service = getServiceBySlug("full-bathroom-remodel")!;

export const metadata: Metadata = {
  title: "Full Bathroom Remodeling in Tacoma",
  description:
    "Elite Bathrooms builds full bathroom remodels in Tacoma and the greater Seattle area from the studs out: design, waterproofing, tile, plumbing, electrical, and finish work, backed by a 10-year waterproofing warranty.",
  alternates: { canonical: absoluteUrl("/services/full-bathroom-remodel") },
};

const processSteps = [
  { title: "Design Consultation", body: "Walk your space with a designer and talk through goals, budget, and layout options." },
  { title: "Material Selection", body: "Finalize tile, fixtures, vanity, and glass down to the details." },
  { title: "Demolition & Waterproofing", body: "Full teardown, substrate prep, and a fully waterproofed shower/tub assembly before anything is tiled." },
  { title: "Tile, Plumbing & Electrical", body: "Tile, rough-in and finish plumbing, electrical, and heated floors if selected." },
  { title: "Finish Work", body: "Vanities, lighting, painting, custom glass, and final details." },
  { title: "Final Walkthrough", body: "Inspect every detail together, and review your waterproofing warranty documentation." },
];

const faqs = [
  {
    question: "What does a full bathroom remodel in Tacoma typically involve?",
    answer:
      "A full remodel means rebuilding the room from the studs out: demolition, waterproofing, tile, plumbing, electrical, and finish work, rather than working around what's already there. Scope varies by project, which is why we start with a consultation.",
  },
  {
    question: "How much does a full bathroom remodel cost?",
    answer:
      "It depends on scope, materials, and layout changes. Our estimate process qualifies projects into ranges ($10K to $20K, $20K to $35K, $35K to $50K, and $50K+), so you get a realistic starting point before a full consultation.",
  },
  {
    question: "Is the waterproofing warranty included?",
    answer: "Yes, every full bathroom remodel is backed by our 10-year waterproofing warranty against leaks.",
  },
  {
    question: "Do you handle permits for a full remodel?",
    answer: "Permitting requirements vary by city and scope of work. Ask us during your consultation whether your project needs a permit and how that's handled.",
  },
];

export default function FullBathroomRemodelPage() {
  return (
    <main>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Full Bathroom Remodel" },
        ]}
        title="Full Bathroom Remodel"
        description={service.summary}
        imageSrc={service.heroImage}
        imageLabel={service.heroImage}
        imageAlt="Full bathroom remodel by Elite Bathrooms"
      />

      <section className="border-b border-line bg-warm-100">
        <Container className="flex flex-col gap-5 py-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-3 sm:py-8">
          {["One Coordinated Project", "Studs Out, Done Right", "10-Year Waterproofing Warranty"].map((s) => (
            <span key={s} className="text-sm font-bold uppercase tracking-[0.06em] text-charcoal-950">
              {s}
            </span>
          ))}
        </Container>
      </section>

      {/* What's included */}
      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>What&rsquo;s Included</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-charcoal-950 sm:text-4xl">
              Everything a full remodel involves.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">{service.intro}</p>
          </Reveal>
          <Reveal delay={80}>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-500" />
                  <span className="text-sm leading-relaxed text-ink sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Large finished bathroom */}
      <section className="bg-warm-50 pb-20 sm:pb-28">
        <Container>
          <Reveal mask className="min-h-[320px] rounded-panel sm:min-h-[480px]">
            <ImageSlot
              cover
              src="/images/projects/luxury-full-bathroom-remodel-03.jpg"
              alt="Completed full bathroom remodel by Elite Bathrooms"
              label="/images/projects/luxury-full-bathroom-remodel-03.jpg"
            />
          </Reveal>
        </Container>
      </section>

      {/* Is this right for you? */}
      <section className="bg-charcoal-950 py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow tone="dark">Is This Right For You?</Eyebrow>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-warm-50 sm:text-3xl">
              Is a full bathroom remodel right for you?
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Your layout no longer works",
                "You want to replace most or all finishes",
                "Plumbing or electrical upgrades are part of the project",
                "You want a fully coordinated renovation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-on-dark-muted sm:text-base">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="shrink-0 border-t border-charcoal-700 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <p className="text-sm font-semibold text-ink-on-dark-muted">Not sure?</p>
            <p className="mt-1 text-sm text-ink-on-dark-muted">Talk to our team.</p>
            <Button href="/get-a-quote" variant="primary" className="mt-4">
              Request Estimate
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* Design + material planning */}
      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal mask className="min-h-[320px] rounded-panel lg:order-2">
            <ImageSlot
              cover
              src="/images/process/elite-design-consultation.jpg"
              alt="Design and material selection for a bathroom remodel"
              label="/images/process/elite-design-consultation.jpg"
            />
          </Reveal>
          <Reveal className="lg:order-1">
            <Eyebrow>Design &amp; Material Planning</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-charcoal-950 sm:text-4xl">
              Decided before demolition, not during it.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Layout, tile, fixtures, and glass get finalized during design, so once demolition
              starts, the plan is already set. That&rsquo;s what keeps a full remodel on schedule.
            </p>
          </Reveal>
        </Container>
      </section>

      <WaterproofingBanner />

      {/* Process: large numbers, not equal cards */}
      <section className="bg-warm-100 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="Six steps, one project, start to finish."
            description="No hand-off gaps: the people who plan your remodel stay accountable for how it's built."
          />
          <Reveal className="mt-12 divide-y divide-line border-t border-line">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="stagger-item flex flex-col gap-1.5 py-6 sm:flex-row sm:items-baseline sm:gap-8"
                style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
              >
                <span className="font-heading text-3xl font-extrabold leading-none text-bronze-500 sm:w-16 sm:shrink-0 sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-charcoal-950">{step.title}</h3>
                  <p className="mt-1 max-w-lg text-sm leading-relaxed text-ink-muted sm:text-base">{step.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <RelatedProjects projectType="Full Remodel" />
      <BeforeAfter />
      <Testimonials />
      <FaqAccordion faqs={faqs} title="Full Remodel Questions" />
      <NextStepCTA heading="Ready to start your full bathroom remodel?" variant="banner" />
    </main>
  );
}
