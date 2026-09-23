import type { CSSProperties } from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { ImageSlot } from "../ui/ImageSlot";

// Homepage-specific "what happens next" framing — the customer journey,
// not the build methodology (that's the deeper /process page).
const steps = [
  { number: "01", title: "Request an Estimate", description: "Tell us about the bathroom and what you want to change." },
  { number: "02", title: "In-Home Consultation", description: "We look at the space, talk through goals, and understand the scope." },
  { number: "03", title: "Plan Before Demolition", description: "Layout, materials, fixtures, and project details are determined." },
  { number: "04", title: "Build", description: "The renovation begins." },
  { number: "05", title: "Final Details", description: "Installation, finishing, cleanup." },
  { number: "06", title: "Final Walkthrough", description: "Review the finished bathroom together." },
];

export function Process() {
  return (
    <section className="bg-warm-100 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Next Steps" title="Here's what happens next." />
          <Reveal delay={200}>
            <Button href="/get-a-quote" variant="primary" className="shrink-0">
              Start Your Project
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16">
          <Reveal className="relative">
            {/* Vertical connector: static track + bronze line that draws top to bottom. */}
            <div
              className="pointer-events-none absolute left-[27px] top-3 bottom-3 w-px bg-line"
              aria-hidden="true"
            />
            <div
              className="draw-line-y pointer-events-none absolute left-[27px] top-3 bottom-3 w-px bg-bronze-500"
              aria-hidden="true"
            />

            <div className="flex flex-col">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="stagger-item relative flex gap-6 py-6 first:pt-0 last:pb-0"
                  style={{ "--reveal-delay": `${150 + i * 110}ms` } as CSSProperties}
                >
                  <span className="relative z-10 shrink-0 font-heading text-4xl font-extrabold leading-none text-bronze-500 sm:text-5xl">
                    {step.number}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-xl font-extrabold text-charcoal-950 sm:text-2xl">{step.title}</h3>
                    <p className="mt-1.5 max-w-sm text-base leading-relaxed text-ink-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal mask delay={150} className="min-h-[360px] rounded-panel lg:min-h-full">
            <ImageSlot
              cover
              src="/images/process/elite-installation.jpg"
              alt="Elite Bathrooms installer at work on a bathroom wall"
              label="/images/process/elite-installation.jpg"
              objectPosition="center 30%"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
