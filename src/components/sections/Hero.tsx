import { Button } from "../ui/Button";
import { ImageSlot } from "../ui/ImageSlot";
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
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-charcoal-950 lg:min-h-screen">
      {/*
        TODO: /public/images/elite-team-hero.jpg — wide crew + vans photo.
        Team occupies lower-middle/right; keep left side clear for copy.
        Mobile object-position recenters so the crew stays visible when cropped taller.
      */}
      <ImageSlot
        cover
        src={undefined}
        alt="Elite Bathrooms crew and work vans, Tacoma"
        objectPosition="70% 60%"
        mobileObjectPosition="65% 50%"
        priority
        label="/images/elite-team-hero.jpg"
      />

      {/* Layered gradient: stronger left (behind copy), lighter right (over crew/vans). */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(18,19,22,0.95)_0%,rgba(18,19,22,0.88)_35%,rgba(18,19,22,0.55)_68%,rgba(18,19,22,0.28)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-14 pt-36 sm:px-8 sm:pb-20 lg:pb-24">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze-400">
            Tacoma &amp; Puget Sound Bathroom Specialists
          </span>
          <h1 className="mt-4 max-w-xl text-[2.5rem] font-extrabold leading-[1.02] text-warm-50 sm:text-6xl lg:text-[4rem]">
            Bathroom remodeling <span className="text-bronze-400">built right.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-on-dark-muted sm:text-lg">
            Elite Bathrooms specializes exclusively in bathrooms — design, waterproofing, tile,
            plumbing, electrical, and finish work, coordinated as one project from first
            consultation to final walkthrough.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/get-a-quote" variant="primary">
              Request Estimate
            </Button>
            <Button href="/projects" variant="outline-light">
              View Projects
            </Button>
          </div>

          <ul className="mt-9 flex flex-col gap-3 border-t border-warm-50/15 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            {trust.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm font-semibold text-warm-50/90">
                {item.star && <StarIcon className="h-4 w-4 shrink-0 text-bronze-400" />}
                {item.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
