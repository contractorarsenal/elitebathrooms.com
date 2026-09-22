import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { StarIcon } from "../ui/icons";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-warm-100 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Reviews" title="What homeowners say." align="center" />
        </Reveal>

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
      </Container>
    </section>
  );
}
