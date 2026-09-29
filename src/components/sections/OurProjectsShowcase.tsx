"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "../ui/icons";

// Exact WordPress "Our Projects" section: a single-slide carousel (Elementor
// loop-carousel + flip-box), not a grid. The live carousel's JS
// (Swiper) never initializes on the live site, so its true resting state
// was captured by forcing the underlying flip-box's real background-image
// rule (a broken LiteSpeed lazy-background gate — see
// docs/migration/homepage-parity.md) and reading exact computed geometry:
// slide ~1376x592 (2.325:1), title 32px/700/white on hover, real project
// photos and hrefs read directly from each slide's own per-post <style>
// block and flip-box back link.
const slides = [
  { image: "project-32-01.jpg", title: "Luxury Full Bathroom Remodel", href: "/projects/luxury-full-bathroom-remodel" },
  { image: "project-20-04.jpg", title: "Double Vanity Upgrade", href: "/projects/double-vanity-upgrade" },
  { image: "project-38-05.jpg", title: "Bathroom Update With Glossy Tile", href: "/projects/bathtub-area-renovation-project" },
  { image: "project-49-13.jpg", title: "Old Bathroom Shower Upgrade", href: "/projects/old-bathroom-shower-upgrade" },
  { image: "project-31-12.jpg", title: "Green Tile Shower Remodel", href: "/projects/glass-shower-remodel" },
  { image: "project-29-02.jpg", title: "Heated Floor Bathroom Remodel", href: "/projects/heated-floor-bathroom" },
];

function ChevronIcon({ direction, className }: { direction: "left" | "right"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OurProjectsShowcase() {
  const [active, setActive] = useState(0);
  const go = (dir: 1 | -1) => setActive((i) => (i + dir + slides.length) % slides.length);

  return (
    <section className="bg-warm-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[1410px] px-4">
        <div className="mb-8 h-px w-[360px] max-w-[40vw] bg-line" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-charcoal-950">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
              Our Projects
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
              <span className="text-bronze-500">Bathroom Remodeling Projects</span>
              <br />
              That Define Our Style
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal-800">
              Our portfolio shows how thoughtful planning and skilled workmanship come together in
              real homes. From a small bathroom update to a modern bathroom with carefully
              selected finishes, each project reflects strong layout decisions, quality
              craftsmanship, and the level of detail that helps the space feel complete, polished,
              and built to last.
            </p>
          </div>
        </div>

        <div className="relative mt-14">
          <a
            href={slides[active].href}
            className="group relative block aspect-[1376/592] w-full overflow-hidden rounded-[24px]"
          >
            <Image
              key={slides[active].image}
              src={`/images/wordpress/${slides[active].image}`}
              alt={slides[active].title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/0 to-black/0 pb-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-[2rem] font-bold text-white">{slides[active].title}</h3>
            </div>
          </a>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 flex h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-charcoal-950 shadow-md transition-colors hover:bg-warm-100"
          >
            <ChevronIcon direction="left" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="absolute right-0 top-1/2 flex h-[50px] w-[50px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-charcoal-950 shadow-md transition-colors hover:bg-warm-100"
          >
            <ChevronIcon direction="right" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-line pt-8">
          <p className="text-base text-charcoal-800">We&apos;ve been working hard to impress you.</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border-b border-line pb-1 text-sm font-bold text-bronze-500 hover:border-bronze-500"
          >
            Check All Our Projects
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
