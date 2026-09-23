import Link from "next/link";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

/**
 * Compact recurring version of the homepage's signature waterproofing
 * section — same "Built Behind the Tile" identity and the same single
 * verified fact (10-year warranty against leaks), sized for service,
 * project, and area pages so it reads as one consistent brand moment
 * sitewide without duplicating the full homepage treatment.
 */
export function WaterproofingBanner() {
  return (
    <section className="bg-charcoal-950 py-14 sm:py-16">
      <Container>
        <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze-400">
              Built Behind the Tile
            </span>
            <p className="mt-2 max-w-lg text-lg font-extrabold leading-snug text-warm-50 sm:text-xl">
              The part you can&rsquo;t see matters the most. That&rsquo;s why every bathroom is backed
              by a 10-year waterproofing warranty against leaks.
            </p>
          </div>
          <Link
            href="/#waterproofing"
            className="shrink-0 text-sm font-bold uppercase tracking-[0.06em] text-bronze-400 hover:text-bronze-300"
          >
            How We Waterproof →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
