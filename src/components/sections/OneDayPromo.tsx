import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { CheckIcon, ArrowRightIcon } from "../ui/icons";
import { getServiceBySlug } from "@/data/services";

const goodFor = [
  "Tub replacement",
  "Shower replacement",
  "Tub-to-shower conversion",
  "Wall system replacement",
  "Same-layout updates",
];

/**
 * One-Day gets its own conversion-focused section instead of a fifth Bento
 * tile: different buying intent (fast, surface-focused) deserves different
 * presentation than the full remodel or core services above it.
 */
export function OneDayPromo() {
  const service = getServiceBySlug("one-day-bathroom-renovation")!;

  return (
    <section className="bg-charcoal-950 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal mask className="relative aspect-[4/5] rounded-panel lg:aspect-auto lg:h-full lg:min-h-[480px]">
          <ImageSlot
            cover
            src={service.cardImage}
            alt="One-day bathroom renovation by Elite Bathrooms"
            label={service.cardImage}
          />
          <span className="absolute left-6 top-6 rounded-full bg-bronze-500 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.04em] text-warm-50 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)]">
            1 Day
          </span>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze-400">
              One-Day Bathroom Renovation
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-warm-50 sm:text-4xl">
              Fast. Focused. Low disruption.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-on-dark-muted">
              For qualifying projects that keep the existing layout, a one-day renovation can
              replace the tub or shower, wall system, fixtures, and surrounding finishes with much
              less disruption than a full remodel.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8">
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

          <Reveal delay={200} className="mt-9 flex flex-col items-start gap-4 border-t border-charcoal-700 pt-8">
            <Button href="/services/one-day-bathroom-renovation" variant="primary">
              Explore One-Day Renovations
            </Button>
            <a
              href="/services/full-bathroom-remodel"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-on-dark-muted hover:text-warm-50"
            >
              Need more than this? Explore Full Bathroom Remodeling
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
