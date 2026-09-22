import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Walk your space with a designer and talk through goals, budget, and timeline.",
    image: "/images/elite-design-consultation.jpg",
    alt: "Elite Bathrooms designer consulting with a homeowner",
  },
  {
    number: "02",
    title: "Design & Material Selection",
    description: "Finalize layout, fixtures, and finishes down to the grout line.",
    image: "/images/elite-process-planning.jpg",
    alt: "Bathroom plans and material selections laid out for review",
  },
  {
    number: "03",
    title: "Construction",
    description: "Demolition, waterproofing, tile, plumbing, and electrical — one crew, start to finish.",
    image: "/images/elite-installation.jpg",
    alt: "Elite Bathrooms installer at work on a bathroom wall",
  },
  {
    number: "04",
    title: "Final Walkthrough",
    description: "Inspect every detail together before we call the project done.",
    image: "/images/elite-project-handover.jpg",
    alt: "Elite Bathrooms team member walking a homeowner through the finished bathroom",
  },
];

export function Process() {
  return (
    <section className="bg-warm-100 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="Step-by-step, from idea to finished bathroom."
            align="center"
          />
        </Reveal>

        <Reveal className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              <ImageSlot alt={step.alt} aspectRatio="4/3" label={step.image} />
              <div>
                <span className="font-heading text-sm font-extrabold text-bronze-500">
                  {step.number}
                </span>
                <h3 className="mt-1 text-lg font-extrabold text-charcoal-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
