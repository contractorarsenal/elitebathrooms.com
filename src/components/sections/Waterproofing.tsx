import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
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
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Built Behind the Tile"
            title={
              <>
                The part you can&rsquo;t see
                <br />
                matters the most.
              </>
            }
            description="Tile is the last five percent of a bathroom. The waterproofing underneath it is the part that determines whether the room survives the next ten years."
            tone="dark"
          />

          <ul className="mt-8 space-y-4">
            {details.map((detail) => (
              <li key={detail} className="flex items-start gap-3">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-400" />
                <span className="text-sm leading-relaxed text-ink-on-dark-muted sm:text-base">
                  {detail}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-warm-50/15 pt-8">
            <div className="flex items-end gap-4">
              <span className="font-heading text-6xl font-extrabold leading-none text-bronze-400 sm:text-7xl">
                10
              </span>
              <span className="pb-1 text-lg font-extrabold uppercase leading-tight text-warm-50 sm:text-xl">
                Years
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-ink-on-dark-muted">
              Waterproofing warranty against leaks
            </p>
          </div>
        </Reveal>

        <Reveal>
          {/* TODO: /public/images/elite-installation.jpg — installer waterproofing/tiling a wall */}
          <ImageSlot
            alt="Elite Bathrooms installer waterproofing a shower wall"
            aspectRatio="4/5"
            label="/images/elite-installation.jpg"
          />
        </Reveal>
      </Container>
    </section>
  );
}
