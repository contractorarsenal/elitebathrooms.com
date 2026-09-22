import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { CheckIcon } from "../ui/icons";

const points = [
  "One crew handles design, demolition, waterproofing, tile, plumbing, electrical, and finish work",
  "No subcontractor hand-offs — the people who plan your project are the people who build it",
  "Every bathroom backed by a 10-year waterproofing warranty",
];

export function Positioning() {
  return (
    <section id="about" className="bg-warm-50 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          {/* TODO: /public/images/elite-crew-planning.jpg — crew reviewing plans outdoors, vans behind */}
          <ImageSlot
            alt="Elite Bathrooms crew reviewing project plans"
            aspectRatio="4/3"
            label="/images/elite-crew-planning.jpg"
            className="rounded-sm"
          />
        </Reveal>

        <Reveal>
          <SectionHeading
            eyebrow="Why Elite"
            title={
              <>
                We don&rsquo;t remodel everything.
                <br />
                We specialize in <span className="text-bronze-500">bathrooms</span>.
              </>
            }
            description="Most contractors spread across kitchens, additions, and whole-home remodels. Elite Bathrooms does one thing — bathrooms — which means deeper waterproofing knowledge, tighter tile work, and a crew that has solved the same problems hundreds of times over."
          />

          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-500" />
                <span className="text-sm leading-relaxed text-ink-muted sm:text-base">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
