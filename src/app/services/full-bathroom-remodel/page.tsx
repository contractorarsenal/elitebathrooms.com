import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getServiceBySlug } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const service = getServiceBySlug("full-bathroom-remodel")!;

export const metadata: Metadata = {
  title: "Full Bathroom Remodeling in Tacoma",
  description:
    "Elite Bathrooms builds full bathroom remodels in Tacoma and the greater Seattle area from the studs out — design, waterproofing, tile, plumbing, electrical, and finish work, backed by a 10-year waterproofing warranty.",
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
    <ServiceDetail service={service}>
      <section className="bg-warm-100 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How It Works"
              title="Six steps, one crew, start to finish."
              description="No subcontractor hand-offs — the people who plan your remodel are the people who build it."
            />
          </Reveal>
          <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <div key={step.title} className="border border-line bg-warm-50 p-6">
                <span className="font-heading text-sm font-extrabold text-bronze-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-extrabold text-charcoal-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            ))}
          </Reveal>
          <p className="mt-6 text-sm text-ink-muted">
            See the full walkthrough on our{" "}
            <Link href="/process" className="font-semibold text-bronze-600 hover:underline">
              process page
            </Link>
            .
          </p>
        </Container>
      </section>

      <FaqAccordion faqs={faqs} title="Full Remodel Questions" />
    </ServiceDetail>
  );
}
