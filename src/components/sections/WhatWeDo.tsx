import Image from "next/image";
import { ArrowUpRightIcon, CheckIcon } from "../ui/icons";

// Exact WordPress "What We Do" section: solid black background, giant
// faded "REMODEL" watermark type, real consultation photo (advantage-10.jpg
// from wp-content/uploads/2026/06/), verbatim copy from home.html.
const checklist = ["Full Bathroom Remodeling", "Bathtub Remodeling", "Shower Remodeling", "Tub-To-Shower Conversions"];

export function WhatWeDo() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24">
      {/* Measured from live DOM: font-size 390px, weight 400, color rgba(255,255,255,0.094), left offset ~10% at 1440. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[24.4rem] font-normal leading-none text-white/[0.094]"
      >
        remodel
      </span>

      <div className="relative mx-auto max-w-[1410px] px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-warm-50">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
              What We Do
            </span>

            <h2 className="mt-6 max-w-lg font-heading text-3xl font-extrabold leading-tight text-warm-50 sm:text-4xl lg:text-[2.5rem]">
              Where Spaces Inspire, and <span className="text-bronze-400">Design Comes Alive</span>
            </h2>

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-bold text-warm-50">
                  <CheckIcon className="h-4 w-4 shrink-0 text-bronze-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 max-w-md space-y-4 text-sm leading-relaxed text-warm-50/80">
              <p>
                Elite Bathrooms handles bathroom remodeling from planning and material selection
                through final walkthrough, coordinating the work so you are not managing every
                trade yourself.
              </p>
              <p>
                For focused updates, a one-day bathroom renovation may be an option when the
                existing layout and project conditions allow it. Larger projects follow the full
                remodeling process.
              </p>
            </div>

            <a
              href="/bathroom-remodel-services"
              className="mt-9 inline-flex items-center gap-4 rounded-full bg-warm-50 py-1.5 pl-6 pr-1.5 font-heading text-base font-bold text-charcoal-950 transition-colors hover:bg-warm-100"
            >
              View Bathroom Services
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bronze-500 text-warm-50">
                <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </a>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[28px]">
            <Image
              src="/images/wordpress/advantage-10.jpg"
              alt="Elite Bathrooms consultant reviewing renovation plans with a client"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
