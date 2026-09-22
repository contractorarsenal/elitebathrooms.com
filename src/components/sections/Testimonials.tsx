import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { StarIcon } from "../ui/icons";
import { testimonials } from "@/data/testimonials";

function DevPlaceholder() {
  return (
    <div
      className="border border-dashed border-charcoal-950/25 bg-warm-50 p-8 text-center"
      data-dev-placeholder="testimonials"
    >
      <p className="text-sm font-bold uppercase tracking-[0.1em] text-charcoal-950/50">
        Developer placeholder — not for production
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
        Real reviews exist on Google and Thumbtack, but exact verbatim text hasn&rsquo;t been
        collected yet. This section renders nothing customer-facing until verified quotes are
        added to <code className="text-xs">src/data/testimonials.ts</code>.
      </p>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-warm-100 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Reviews" title="What homeowners say." align="center" />
        </Reveal>

        {testimonials.length === 0 ? (
          <Reveal className="mt-10">
            <DevPlaceholder />
          </Reveal>
        ) : (
          <Reveal className="mt-10 grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col gap-4 border border-line bg-warm-50 p-6">
                <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-bronze-500" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-ink-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center justify-between text-xs font-semibold uppercase tracking-[0.06em] text-charcoal-950">
                  <span>{t.name}</span>
                  <span className="text-ink-muted">via {t.source}</span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
