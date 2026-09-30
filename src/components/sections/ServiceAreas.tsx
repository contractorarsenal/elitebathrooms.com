import Link from "next/link";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { ArrowRightIcon } from "../ui/icons";
import { areas } from "@/data/areas";

// Headline/intro reposition general messaging to Greater Seattle Area per
// explicit client instruction; Tacoma stays the featured/first area below
// (still the real home base) and "Explore Tacoma" still links to its own
// real service-area page -- only the general marketing copy moved, not
// which area is featured or where it links.
export function ServiceAreas() {
  const [tacoma, ...secondary] = areas;

  return (
    <section id="areas" className="bg-charcoal-950 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow tone="dark">Service Areas</Eyebrow>
          <h2 className="mt-3 text-4xl font-extrabold leading-[1.02] tracking-tight text-warm-50 sm:text-5xl">
            Serving the Greater Seattle Area.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-on-dark-muted">
            Serving homeowners throughout the Greater Seattle Area, including Tacoma and
            surrounding Puget Sound communities.
          </p>
          <Button href={`/service-area/${tacoma.slug}`} variant="outline-light" className="mt-7">
            Explore Tacoma
          </Button>
        </Reveal>

        <Reveal delay={100} className="lg:border-l lg:border-charcoal-700 lg:pl-16">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">
            Also Serving
          </span>
          <ul className="mt-5 divide-y divide-charcoal-800 border-t border-charcoal-800">
            {secondary.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-area/${area.slug}`}
                  className="group flex items-center justify-between gap-4 py-4 text-lg font-bold text-warm-50 transition-colors hover:text-bronze-400"
                >
                  {area.name}
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-bronze-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
