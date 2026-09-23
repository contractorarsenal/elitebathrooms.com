import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { Eyebrow } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { CheckIcon } from "../ui/icons";
import { getServiceBySlug } from "@/data/services";

const capabilities = [
  "Design consultation and material selection",
  "Full demolition and structural prep",
  "Waterproofed pan and wall assembly",
  "Tile, plumbing, and electrical coordination",
  "Vanities, fixtures, and custom glass",
  "Final walkthrough and warranty documentation",
];

/**
 * The homepage's main service: a large, uncarded split section, not a
 * Bento tile. This is the primary offer, so it gets its own section rather
 * than competing for space with the other four services.
 */
export function FeaturedService() {
  const service = getServiceBySlug("full-bathroom-remodel")!;

  return (
    <section className="bg-warm-50 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal mask className="aspect-[4/5] rounded-panel lg:aspect-auto lg:h-full lg:min-h-[560px]">
          <ImageSlot
            cover
            src={service.heroImage}
            alt="Completed full bathroom remodel by Elite Bathrooms"
            label={service.heroImage}
          />
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>The Primary Service</Eyebrow>
            <h2 className="mt-3 text-4xl font-extrabold leading-[1.02] tracking-tight text-charcoal-950 sm:text-5xl">
              Full Bathroom Remodeling
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
              Complete bathroom renovations from demolition through final walkthrough. Layout,
              waterproofing, tile, plumbing, electrical coordination, fixtures, glass, and
              finishes, handled as one project.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {capabilities.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-500" />
                  <span className="text-sm leading-relaxed text-ink sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <Button href="/services/full-bathroom-remodel" variant="primary" className="mt-9">
              Explore Full Bathroom Remodeling
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
