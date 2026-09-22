import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { PhoneIcon } from "../ui/icons";
import { siteConfig } from "@/lib/site-config";

const miniSteps = [
  "Tell us about the project",
  "We review the scope",
  "We schedule the next step",
];

type Variant = "banner" | "split" | "compact";

/**
 * Reusable "what happens next" CTA for the bottom of service/area/project/
 * blog/about/process/financing pages. `variant` controls the visual
 * treatment so this doesn't look identical on every page.
 */
export function NextStepCTA({
  heading = "Ready to talk about your bathroom?",
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
                {siteConfig.phone.display}
              </a>
              <Button href="/get-a-quote" variant="primary">
                Request an Estimate
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
                Request an Estimate
              </Button>
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-charcoal-950/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-charcoal-950 hover:bg-charcoal-950/5"
              >
                <PhoneIcon className="h-4 w-4" />
                Call {siteConfig.phone.display}
              </a>
            </div>
          </Reveal>
          <Reveal delay={80} className="grid gap-3">
            {miniSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-3 rounded-card border border-line bg-warm-100 px-4 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bronze-500 text-xs font-extrabold text-warm-50">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-charcoal-950">{step}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>
    );
  }

  // banner (default)
  return (
    <section className="bg-charcoal-950 py-20 sm:py-24">
      <Container className="text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-tight text-warm-50 sm:text-4xl">
            {heading}
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {miniSteps.map((step, i) => (
              <span key={step} className="flex items-center gap-2 text-sm font-semibold text-ink-on-dark-muted">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-bronze-400 text-[11px] font-bold text-bronze-400">
                  {i + 1}
                </span>
                {step}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/get-a-quote" variant="primary">
              Request an Estimate
            </Button>
            <a
              href={siteConfig.phone.href}
              className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.06em] text-warm-50/80 hover:text-warm-50"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {siteConfig.phone.display}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
