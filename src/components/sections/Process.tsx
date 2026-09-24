import type { CSSProperties } from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { ImageSlot } from "../ui/ImageSlot";

// Homepage-specific "what happens next" framing — the customer journey,
// not the build methodology (that's the deeper /process page).
const steps = [
  { number: "01", title: "Request an Estimate", description: "Tell us what you want to change." },
  { number: "02", title: "In-Home Consultation", description: "We look at the bathroom and talk through the scope." },
  { number: "03", title: "Plan Before Demolition", description: "Layout, materials, fixtures, and project details are confirmed." },
  { number: "04", title: "Build", description: "The renovation work begins." },
  { number: "05", title: "Final Details", description: "Fixtures, finishes, cleanup, and final adjustments." },
  { number: "06", title: "Final Walkthrough", description: "We review the completed bathroom together." },
];

export function Process() {
  return (
    <section className="bg-warm-100 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Next Steps"
          title="Here's what happens next."
          description="A clear process from the first conversation through the final walkthrough."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal mask className="flex flex-col">
            <div className="aspect-[4/5] rounded-panel lg:aspect-auto lg:min-h-[440px] lg:flex-1">
              <ImageSlot
                cover
                src="/images/process/elite-installation.jpg"
                alt="Elite Bathrooms installer at work on a bathroom wall"
                label="/images/process/elite-installation.jpg"
                objectPosition="center 30%"
              />
            </div>
          </Reveal>

          <div>
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
                    className="stagger-item relative flex gap-6 py-5 first:pt-0 last:pb-0"
                    style={{ "--reveal-delay": `${150 + i * 110}ms` } as CSSProperties}
                  >
                    <span className="relative z-10 shrink-0 font-heading text-3xl font-extrabold leading-none text-bronze-500 sm:text-4xl">
                      {step.number}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-lg font-extrabold text-charcoal-950 sm:text-xl">{step.title}</h3>
                      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-muted sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200} className="mt-8 border-t border-line pt-8">
              <Button href="/get-a-quote" variant="primary">
                Request Estimate
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
