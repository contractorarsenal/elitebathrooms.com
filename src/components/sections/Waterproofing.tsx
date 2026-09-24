import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/SectionHeading";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { CheckIcon } from "../ui/icons";

const details = [
  "Substrate preparation before a single tile is set",
  "Fully sealed shower pans, walls, and niches",
  "Moisture protection engineered for daily use, not just installation day",
];

export function Waterproofing() {
  return (
    <section id="waterproofing" className="bg-charcoal-950 py-20 sm:py-28">
      <Container>
        <Reveal className="mb-10 max-w-xl">
          <Eyebrow tone="dark">Built Behind the Tile</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-warm-50 sm:text-4xl md:text-[2.75rem]">
            The part you can&rsquo;t see
            <br />
            matters the most.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-on-dark-muted sm:text-lg">
            Tile is the last five percent of a bathroom. The waterproofing underneath it is the
            part that determines whether the room survives the next ten years.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2 lg:grid-rows-2">
          <Reveal mask className="min-h-[320px] rounded-panel lg:row-span-2 lg:min-h-full">
            <ImageSlot
              cover
              src="/images/waterproofing/elite-construction-framing.jpg"
              alt="Elite Bathrooms crew waterproofing an exposed-stud shower framing"
              label="/images/waterproofing/elite-construction-framing.jpg"
            />
          </Reveal>

          <Reveal scale delay={80} className="flex flex-col justify-center rounded-panel border border-charcoal-700 bg-charcoal-900 p-8 sm:p-10">
            <div className="flex items-end gap-4">
              <span className="font-heading text-8xl font-extrabold leading-none text-bronze-400 sm:text-9xl">
                10
              </span>
              <span className="pb-2 text-xl font-extrabold uppercase leading-tight text-warm-50 sm:text-2xl">
                Year
                <br />
                Warranty
              </span>
            </div>
            <span className="draw-line mt-3 h-px w-12 bg-bronze-500" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-ink-on-dark-muted">
              Waterproofing warranty against leaks
            </p>
          </Reveal>

          <Reveal scale delay={160} className="rounded-panel border border-charcoal-700 bg-charcoal-900 p-8 sm:p-10">
            <ul className="space-y-4">
              {details.map((detail) => (
                <li key={detail} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-400" />
                  <span className="text-base leading-relaxed text-ink-on-dark-muted sm:text-lg">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
