import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { CheckIcon, CompassIcon, DropletIcon, GridIcon, BoltIcon, PaneIcon } from "../ui/icons";

const points = [
  "Design, waterproofing, tile, plumbing, electrical, and finish work coordinated as one project",
  "No hand-off gaps: the people who plan the project stay accountable for how it's built",
  "Every bathroom backed by a 10-year waterproofing warranty",
];

const capabilities = [
  { icon: CompassIcon, label: "Design", description: "Layout, materials, and fixtures planned before demolition starts." },
  { icon: DropletIcon, label: "Waterproofing", description: "Every wet area gets a fully sealed pan and wall assembly." },
  { icon: GridIcon, label: "Tile", description: "Floors, walls, showers, and niches, set true, sealed right." },
  { icon: BoltIcon, label: "Plumbing & Electrical", description: "Rough-in and finish work coordinated within the same project." },
  { icon: PaneIcon, label: "Glass & Finishes", description: "Custom glass, vanities, and lighting to complete the room." },
];

export function Positioning() {
  return (
    <section id="about" className="bg-warm-50 py-20 sm:py-28">
      <Container className="grid gap-5 lg:grid-cols-5">
        <Reveal scale className="flex flex-col justify-center rounded-panel border border-line bg-warm-100 p-8 lg:col-span-2 lg:p-10">
          <Eyebrow>Why Elite</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-charcoal-950 sm:text-4xl">
            We don&rsquo;t remodel everything.
            <br />
            We do <span className="text-bronze-500">bathrooms</span>.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Most contractors spread across kitchens, additions, and whole-home remodels. Elite
            Bathrooms does one thing, which means deeper waterproofing knowledge, tighter tile
            work, and a project that stays coordinated end to end.
          </p>

          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-500" />
                <span className="text-sm leading-relaxed text-ink-muted">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 lg:col-span-3">
          {capabilities.map((cap, i) => (
            <Reveal
              key={cap.label}
              scale
              delay={i * 70}
              className={i === capabilities.length - 1 ? "col-span-2" : ""}
            >
              <div className="flex h-full flex-col gap-3 rounded-card border border-line bg-warm-100 p-6 transition-colors hover:border-bronze-400">
                <cap.icon className="h-6 w-6 text-bronze-500" />
                <h3 className="font-heading text-base font-extrabold text-charcoal-950">{cap.label}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{cap.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
