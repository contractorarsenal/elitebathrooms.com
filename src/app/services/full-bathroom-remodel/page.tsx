import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, CompassIcon, DropletIcon, GridIcon, BoltIcon, PaneIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { getServiceBySlug } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const service = getServiceBySlug("full-bathroom-remodel")!;

export const metadata: Metadata = {
  title: "Full Bathroom Remodeling in Tacoma",
  description:
    "Elite Bathrooms builds full bathroom remodels in Tacoma and the greater Seattle area from the studs out — design, waterproofing, tile, plumbing, electrical, and finish work, backed by a 10-year waterproofing warranty.",
  alternates: { canonical: absoluteUrl("/services/full-bathroom-remodel") },
};

const capabilities = [
  { icon: CompassIcon, label: "Design", description: "Layout, materials, and fixtures planned before demolition starts." },
  { icon: DropletIcon, label: "Waterproofing", description: "Every wet area gets a fully sealed pan and wall assembly." },
  { icon: GridIcon, label: "Tile", description: "Floors, walls, showers, and niches — set true, sealed right." },
  { icon: BoltIcon, label: "Plumbing & Electrical", description: "Rough-in and finish work coordinated within the same project." },
  { icon: PaneIcon, label: "Glass & Finishes", description: "Custom glass, vanities, and lighting to complete the room." },
];

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
      "A full remodel means rebuilding the room from the studs out — demolition, waterproofing, tile, plumbing, electrical, and finish work — rather than working around what's already there. Scope varies by project, which is why we start with a consultation.",
  },
  {
    question: "How much does a full bathroom remodel cost?",
    answer:
      "It depends on scope, materials, and layout changes. Our estimate process qualifies projects into ranges — $10K–$20K, $20K–$35K, $35K–$50K, and $50K+ — so you get a realistic starting point before a full consultation.",
  },
  {
    question: "Is the waterproofing warranty included?",
    answer: "Yes — every full bathroom remodel is backed by our 10-year waterproofing warranty against leaks.",
  },
  {
    question: "Do you handle permits for a full remodel?",
    answer: "Yes, permitting is handled as part of the project based on your city's requirements.",
  },
];

export default function FullBathroomRemodelPage() {
  return (
    <main>
      {/* 1. Hero */}
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Full Bathroom Remodel" },
        ]}
        title="Full Bathroom Remodel"
        description={service.summary}
        imageLabel={service.heroImage}
        imageAlt="Full bathroom remodel by Elite Bathrooms"
      />

      {/* 2. Quick overview strip */}
      <section className="border-b border-line bg-warm-100">
        <Container className="flex flex-col gap-5 py-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-3 sm:py-8">
          {["One Coordinated Project", "Studs Out, Done Right", "10-Year Waterproofing Warranty"].map((s) => (
            <span key={s} className="text-sm font-bold uppercase tracking-[0.06em] text-charcoal-950">
              {s}
            </span>
          ))}
        </Container>
      </section>

      {/* 3. What's included */}
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

      {/* 4. Large project image */}
      <section className="bg-warm-50 pb-20 sm:pb-28">
        <Container>
          <Reveal mask className="min-h-[320px] rounded-panel sm:min-h-[440px]">
            <ImageSlot cover alt="Completed full bathroom remodel by Elite Bathrooms" label="/images/project-bathroom-01.jpg" />
          </Reveal>
        </Container>
      </section>

      {/* 5. Bento capabilities grid */}
      <section className="bg-warm-100 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Capabilities" title="One project, every trade." align="center" />
          </Reveal>
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map((cap, i) => (
              <div key={cap.label} className="flex flex-col gap-3 rounded-card border border-line bg-warm-50 p-6" style={i ? { transitionDelay: `${i * 60}ms` } : undefined}>
                <cap.icon className="h-6 w-6 text-bronze-500" />
                <h3 className="font-heading text-sm font-extrabold text-charcoal-950">{cap.label}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{cap.description}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* 6. Waterproofing */}
      <WaterproofingBanner />

      {/* 7. Design + material planning */}
      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal mask className="min-h-[320px] rounded-panel lg:order-2">
            <ImageSlot cover alt="Design and material selection for a bathroom remodel" label="/images/elite-design-consultation.jpg" />
          </Reveal>
          <Reveal className="lg:order-1">
            <Eyebrow>Design &amp; Material Planning</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-charcoal-950 sm:text-4xl">
              Decided before demolition, not during it.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Layout, tile, fixtures, and glass get finalized during design — so once demolition
              starts, the plan is already set. That&rsquo;s what keeps a full remodel on schedule.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 8. Process */}
      <section className="bg-warm-100 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How It Works"
              title="Six steps, one project, start to finish."
              description="No hand-off gaps — the people who plan your remodel stay accountable for how it's built."
            />
          </Reveal>
          <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <div key={step.title} className="rounded-card border border-line bg-warm-50 p-6">
                <span className="font-heading text-sm font-extrabold text-bronze-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-extrabold text-charcoal-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* 9. Projects */}
      <RelatedProjects projectType="Full Remodel" />

      {/* 10. Reviews */}
      <Testimonials />

      {/* 11. FAQ */}
      <FaqAccordion faqs={faqs} title="Full Remodel Questions" />

      {/* 12 & 13. Next steps + estimate CTA */}
      <NextStepCTA heading="Ready to start your full bathroom remodel?" variant="banner" />
    </main>
  );
}
