import Image from "next/image";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { StarIcon } from "../ui/icons";
import { siteConfig } from "@/lib/site-config";

const trust = [
  { label: `${siteConfig.reviews.rating.toFixed(1)} Google Rating`, star: true },
  { label: `${siteConfig.reviews.count} Reviews` },
  { label: "10-Year Waterproofing Warranty" },
  { label: "Financing Available" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-charcoal-950 lg:min-h-[94vh]">
      {/* Real Elite Bathrooms crew member and branded truck, migrated from elitebathrooms.com. */}
      <Image
        src="/images/team/elite-team-hero.jpg"
        alt="Elite Bathrooms technician with a branded work truck"
        fill
        priority
        sizes="100vw"
        className="photo-el object-cover"
        style={{ "--obj-desktop": "62% 38%", "--obj-mobile": "70% 40%" } as React.CSSProperties}
      />

      {/* Layered gradient: strong left for copy legibility, the photo stays visible on the right. */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(18,19,22,0.93)_0%,rgba(18,19,22,0.82)_32%,rgba(18,19,22,0.4)_62%,rgba(18,19,22,0.12)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-charcoal-950/20" />

      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-5 py-28 sm:px-8 lg:py-32">
        <div className="max-w-2xl">
          <Reveal duration={600}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze-400">
              Bathroom Remodeling in Tacoma
            </span>
          </Reveal>
          <Reveal duration={600} delay={90}>
            <h1 className="mt-5 text-[3.25rem] font-extrabold uppercase leading-[0.98] tracking-tight text-warm-50 sm:text-7xl lg:text-[5.5rem]">
              Built right
              <br />
              from the <span className="text-bronze-400">studs out.</span>
            </h1>
          </Reveal>
          <Reveal duration={600} delay={180}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-on-dark-muted sm:text-xl">
              Elite Bathrooms specializes exclusively in bathrooms: design, waterproofing, tile,
              plumbing, electrical, and finish work, coordinated as one project from first
              consultation to final walkthrough.
            </p>
          </Reveal>
          <Reveal duration={600} delay={270}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/get-a-quote" variant="primary">
                Request Estimate
              </Button>
              <Button href="/projects" variant="outline-light">
                View Projects
              </Button>
            </div>
          </Reveal>
          <Reveal duration={600} delay={360}>
            <ul className="mt-10 flex flex-col gap-3 border-t border-warm-50/15 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              {trust.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm font-semibold text-warm-50/90">
                  {item.star && <StarIcon className="h-4 w-4 shrink-0 text-bronze-400" />}
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
