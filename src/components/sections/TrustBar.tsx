import { Container } from "../ui/Container";
import { StarIcon } from "../ui/icons";
import { siteConfig } from "@/lib/site-config";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="font-heading text-3xl font-extrabold text-charcoal-950 sm:text-4xl">
        {value}
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted sm:text-sm">
        {label}
      </span>
    </div>
  );
}

/** Editorial horizontal strip — large typography, not four boxed SaaS stat cards. */
export function TrustBar() {
  return (
    <section className="border-b border-line bg-warm-100">
      <Container className="flex flex-col gap-5 py-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-10 sm:gap-y-4 sm:py-8">
        <div className="flex items-center gap-2.5">
          <div className="flex" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-4 w-4 text-bronze-500" />
            ))}
          </div>
          <Stat value={siteConfig.reviews.rating.toFixed(1)} label={`Google · ${siteConfig.reviews.count} Reviews`} />
        </div>

        <div className="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />

        <Stat value="10-Year" label="Waterproofing Warranty" />

        <div className="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />

        <span className="text-xs font-bold uppercase tracking-[0.1em] text-charcoal-950 sm:text-sm">
          Financing Available
        </span>
      </Container>
    </section>
  );
}
