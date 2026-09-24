import type { CSSProperties } from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { PhoneIcon } from "../ui/icons";
import { siteConfig } from "@/lib/site-config";

const miniSteps = [
  "Tell us about your project",
  "We review the details",
  "We schedule the next step",
];

function StepNumber({ i, tone }: { i: number; tone: "light" | "dark" }) {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
        tone === "dark"
          ? "border border-bronze-400 text-bronze-400"
          : "bg-bronze-500 text-warm-50"
      }`}
    >
      {String(i + 1).padStart(2, "0")}
    </span>
  );
}

type Variant = "banner" | "split" | "compact";

/**
 * Reusable "what happens next" CTA for the bottom of service/area/project/
 * blog/about/process/financing pages. `variant` controls the visual
 * treatment so this doesn't look identical on every page.
 */
export function NextStepCTA({
  heading = "Here's what happens next.",
  variant = "banner",
}: {
  heading?: string;
  variant?: Variant;
}) {
  if (variant === "compact") {
    return (
      <section className="bg-charcoal-950 py-14">
        <Container>
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-extrabold text-warm-50 sm:text-2xl">{heading}</h2>
            <div className="flex flex-wrap items-center gap-4">
              <a href={siteConfig.phone.href} className="flex items-center gap-2 text-sm font-semibold text-warm-50/80 hover:text-bronze-400">
                <PhoneIcon className="h-4 w-4" />
                Call Now
              </a>
              <Button href="/get-a-quote" variant="primary">
                Request Estimate
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className="bg-warm-100 py-20 sm:py-24">
        <Container className="grid gap-10 rounded-panel border border-line bg-warm-50 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-2xl font-extrabold leading-tight text-charcoal-950 sm:text-3xl">
              {heading}
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/get-a-quote" variant="primary">
                Request Estimate
              </Button>
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-charcoal-950/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-charcoal-950 hover:bg-charcoal-950/5"
              >
                <PhoneIcon className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </Reveal>
          <Reveal delay={80} className="grid gap-3">
            {miniSteps.map((step, i) => (
              <div
                key={step}
                className="stagger-item flex items-center gap-3 rounded-card border border-line bg-warm-100 px-4 py-3"
                style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
              >
                <StepNumber i={i} tone="light" />
                <span className="text-sm font-semibold text-charcoal-950">{step}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>
    );
  }

  // banner (default) — asymmetric on desktop: heading + CTAs left, steps stacked right.
  return (
    <section className="bg-charcoal-950 py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold leading-tight text-warm-50 sm:text-4xl">
              {heading}
            </h2>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button href="/get-a-quote" variant="primary">
                Request Estimate
              </Button>
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-[0.06em] text-warm-50/80 hover:text-warm-50"
              >
                <PhoneIcon className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-3">
            {miniSteps.map((step, i) => (
              <div
                key={step}
                className="stagger-item flex items-center gap-3 rounded-card border border-charcoal-700 bg-charcoal-900 px-4 py-3"
                style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
              >
                <StepNumber i={i} tone="dark" />
                <span className="text-sm font-semibold text-warm-50/90">{step}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
