import Image from "next/image";
import { ArrowUpRightIcon, ArrowDownIcon } from "../ui/icons";

// Exact WordPress homepage hero: real crew-and-vans photo
// (wp-content/uploads/2026/09/elite-bathrooms-home-pic.png), full-bleed,
// with the transparent header sitting on top of it. Copy, button text, and
// link targets are verbatim from wordpress-archive/html/home.html.
export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-charcoal-950">
      <Image
        src="/images/wordpress/elite-bathrooms-home-pic.png"
        alt="The Elite Bathrooms crew in front of their branded service vans"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Uniform dark scrim for text legibility, matching the live site's overlay. */}
      <div className="absolute inset-0 bg-charcoal-950/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-charcoal-950/10" />

      {/*
        Measured directly from the live DOM (getComputedStyle/getBoundingClientRect
        at 1440x900): content block vertically centered (245px top/bottom gap on a
        900px section), h1 64px/800/leading-64px, paragraph 22.4px/leading-26.88px
        white, button 62px tall/100px radius/16px text/10px-25px padding, content
        column natural width ~986px (no manual line break — wraps naturally).
      */}
      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-4">
        <div className="max-w-[986px]">
          <h1 className="text-[2.4rem] font-extrabold leading-[1] lg:text-[4rem] lg:leading-[64px]">
            <span className="text-bronze-400">Bathroom Remodeling</span>{" "}
            <span className="text-warm-50">In</span>
            <br />
            <span className="text-warm-50">Tacoma, WA</span>
          </h1>
          <p className="mt-9 text-base leading-[1.2] text-white lg:mt-12 lg:text-[1.4rem] lg:leading-[26.88px]">
            Elite Bathrooms specializes in full bathroom remodels, shower remodels, bathtub
            remodels, tub-to-shower conversions, and one-day bathroom renovations for homeowners
            in Tacoma and select communities across the Puget Sound. We coordinate the project
            from planning through final walkthrough, backed by a 10-year waterproofing warranty
            against leaks.
          </p>
          <a
            href="/bathroom-remodel-company-seattle"
            className="mt-9 inline-flex h-[62px] items-center gap-4 rounded-full border border-warm-50/40 bg-charcoal-950/35 py-[10px] pl-[25px] pr-[10px] text-base font-bold text-warm-50 backdrop-blur-sm transition-colors hover:border-warm-50/70 lg:mt-16"
          >
            Why Elite Bathrooms
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bronze-500 text-warm-50">
              <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      <a
        href="#whoweare"
        aria-label="Scroll to Who We Are"
        className="absolute bottom-[52px] left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-warm-100 text-bronze-500 shadow-lg transition-transform hover:-translate-y-0.5"
      >
        <ArrowDownIcon className="h-5 w-5" />
      </a>
    </section>
  );
}
