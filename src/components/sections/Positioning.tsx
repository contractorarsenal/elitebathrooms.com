import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { Eyebrow } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { CheckIcon } from "../ui/icons";

const capabilities = [
  "Bathroom design",
  "Demolition",
  "Waterproofing",
  "Tile",
  "Fixtures and finishes",
  "Project coordination",
];

export function Positioning() {
  return (
    <section id="about" className="bg-warm-50 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>What Elite Does</Eyebrow>
          <h2 className="mt-3 text-4xl font-extrabold leading-[1.02] tracking-tight text-charcoal-950 sm:text-5xl">
            We don&rsquo;t remodel everything.
            <br />
            We do <span className="text-bronze-500">bathrooms</span>.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
            Most contractors spread across kitchens, additions, and whole-home remodels. Elite
            Bathrooms does one thing, which means deeper waterproofing knowledge, tighter tile
            work, and a project that stays coordinated end to end.
          </p>

          <ul className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-charcoal-950">
                <CheckIcon className="h-4 w-4 shrink-0 text-bronze-500" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal mask delay={100} className="aspect-[4/5] rounded-panel lg:aspect-auto lg:h-full lg:min-h-[480px]">
          <ImageSlot
            cover
            src="/images/team/elite-crew-planning.jpg"
            alt="Elite Bathrooms crew reviewing project plans"
            label="/images/team/elite-crew-planning.jpg"
          />
        </Reveal>
      </Container>
    </section>
  );
}
