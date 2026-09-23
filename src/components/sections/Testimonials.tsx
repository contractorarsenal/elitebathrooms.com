import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { StarIcon } from "../ui/icons";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/lib/site-config";

function DevPlaceholder() {
  return (
    <div
      className="rounded-panel border border-dashed border-charcoal-950/25 bg-warm-50 p-8 text-center"
      data-dev-placeholder="testimonials"
    >
      <p className="text-sm font-bold uppercase tracking-[0.1em] text-charcoal-950/50">
        Developer placeholder: not for production
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
        Real reviews exist on Google, but exact verbatim text hasn&rsquo;t been collected yet.
        This section renders nothing customer-facing until verified quotes are added to{" "}
        <code className="text-xs">src/data/testimonials.ts</code>.
      </p>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4 text-bronze-500" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="bg-warm-100 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionHeading eyebrow="Reviews" title="What homeowners say." align="center" />
          <Reveal delay={220} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Stars rating={5} />
              <span className="text-sm font-bold text-charcoal-950">
                {siteConfig.reviews.rating.toFixed(1)} on {siteConfig.reviews.source}
              </span>
              <span className="text-sm text-ink-muted">({siteConfig.reviews.count} reviews)</span>
            </div>
            <span className="draw-line h-px w-16 bg-bronze-400" aria-hidden="true" />
          </Reveal>
        </div>

        {testimonials.length === 0 ? (
          <Reveal className="mt-10">
            <DevPlaceholder />
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal className="flex flex-col justify-center gap-5 rounded-panel border border-line bg-warm-50 p-8 sm:p-10">
              <Stars rating={featured.rating} />
              <blockquote className="text-xl font-semibold leading-snug text-charcoal-950 sm:text-2xl">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <span className="text-sm font-bold uppercase tracking-[0.06em] text-ink-muted">
                {featured.name} · via {featured.source}
              </span>
            </Reveal>

            <div className="grid gap-5">
              {rest.slice(0, 2).map((t, i) => (
                <Reveal
                  key={t.name}
                  delay={(i + 1) * 80}
                  className="flex flex-col gap-3 rounded-card border border-line bg-warm-50 p-6"
                >
                  <Stars rating={t.rating} />
                  <blockquote className="text-sm leading-relaxed text-ink-muted">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <span className="text-xs font-bold uppercase tracking-[0.06em] text-charcoal-950">
                    {t.name} · via {t.source}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
