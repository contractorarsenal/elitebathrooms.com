import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";

// Homepage-specific "what happens next" framing — the customer journey,
// not the build methodology (that's the deeper /process page). Deliberately
// not built as four identical image cards like the rest of the site.
const steps = [
  { number: "01", title: "Request an Estimate", description: "Tell us what you want to remodel." },
  { number: "02", title: "In-Home Consultation", description: "We review the space, discuss goals, and understand the project." },
  { number: "03", title: "Plan the Project", description: "Scope, materials, layout, and schedule are coordinated." },
  { number: "04", title: "Build", description: "Elite manages the renovation process." },
  { number: "05", title: "Final Walkthrough", description: "Review the finished bathroom together." },
];

export function Process() {
  return (
    <section className="bg-warm-100 py-20 sm:py-28">
      <Container>
        <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Next Steps" title="Here's what happens next." />
          <Button href="/get-a-quote" variant="primary" className="shrink-0">
            Start Your Project
          </Button>
        </Reveal>

        <Reveal className="relative mt-14 grid gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
          <div
            className="pointer-events-none absolute inset-x-0 top-5 hidden h-px bg-line lg:block"
            aria-hidden="true"
          />
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col gap-3">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-bronze-500 bg-warm-100 font-heading text-sm font-extrabold text-bronze-600">
                {step.number}
              </span>
              <h3 className="text-base font-extrabold text-charcoal-950">{step.title}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
