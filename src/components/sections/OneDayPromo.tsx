import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { CheckIcon, ArrowRightIcon } from "../ui/icons";

const goodFor = [
  "Tub replacement",
  "Shower replacement",
  "Tub-to-shower conversion",
  "Wall system replacement",
  "Same-layout bathroom updates",
];

/**
 * One-Day gets its own conversion-focused section instead of a fifth Bento
 * tile: different buying intent (fast, surface-focused) deserves different
 * presentation than the full remodel or core services above it.
 */
export function OneDayPromo() {
  return (
    <section className="bg-charcoal-950 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr,1.2fr] lg:gap-16">
        <Reveal>
          <span className="font-heading text-7xl font-extrabold leading-none text-bronze-400 sm:text-8xl">
            1 Day
          </span>
          <p className="mt-4 text-2xl font-extrabold uppercase leading-tight text-warm-50 sm:text-3xl">
            Fast.
            <br />
            Focused.
            <br />
            Low-disruption.
          </p>
        </Reveal>

        <div>
          <Reveal delay={80}>
            <p className="max-w-lg text-lg leading-relaxed text-ink-on-dark-muted">
              A one-day bathroom renovation is designed for homeowners who want to replace a tub
              or shower and update the surrounding surfaces without completing a full gut
              renovation.
            </p>
          </Reveal>

          <Reveal delay={160} className="mt-8">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">
              Good Fit For
            </span>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {goodFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-warm-50/90 sm:text-base">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-col gap-4 border-t border-charcoal-700 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Button href="/services/one-day-bathroom-renovation" variant="primary">
              Explore One-Day Renovations
            </Button>
            <a
              href="/services/full-bathroom-remodel"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-on-dark-muted hover:text-warm-50"
            >
              Need more than this? View Full Bathroom Remodeling
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
