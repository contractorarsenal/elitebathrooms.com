"use client";

import { useState } from "react";
import Image from "next/image";
import { StatsCounter } from "./StatsCounter";

// Exact WordPress "Our Services" nested-tabs widget. Tab labels, order, and
// the image-per-tab mapping are read directly from the tab panel markup in
// wordpress-archive/html/home.html (advantage-01/04/05/06/08/07.jpg).
const tabs = [
  { n: "01", label: "Frameless Glass Shower Designs", image: "advantage-01.jpg" },
  { n: "02", label: "Luxury Freestanding Bathtubs", image: "advantage-04.jpg" },
  { n: "03", label: "Custom Double Vanity Installations", image: "advantage-05.jpg" },
  { n: "04", label: "Walk-In & ADA-Friendly Bathrooms", image: "advantage-06.jpg" },
  { n: "05", label: "Premium Tile & Waterproof Finishes", image: "advantage-08.jpg" },
  { n: "06", label: "Smart Bathroom Lighting & Modern Ambiance", image: "advantage-07.jpg" },
];

function CheckSquareIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 ${active ? "text-warm-50" : "text-charcoal-950"}`} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 12.2l2.8 2.8 6-6.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function OurServices() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-warm-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[1410px] px-4">
        <div className="mb-8 h-px w-[360px] max-w-[40vw] bg-line" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-charcoal-950">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
              Our Services
            </span>
          </div>
          <div>
            <h2 className="max-w-2xl font-heading text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.75rem]">
              <span className="text-bronze-500">Bathroom Renovations</span> Designed Around Your
              Needs
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal-800">
              We offer focused bathroom solutions for homeowners who want better function, cleaner
              design, and lasting quality. From targeted upgrades to specialized conversions, each
              service is handled with the same attention to planning, detail, and finish that
              defines every Elite Bathrooms project.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px]">
            <Image
              key={tabs[active].image}
              src={`/images/wordpress/${tabs[active].image}`}
              alt={tabs[active].label}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            {tabs.map((tab, i) => {
              const isActive = i === active;
              return (
                <button
                  key={tab.n}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-4 rounded-xl px-6 py-4 text-left font-heading text-base font-bold transition-colors ${
                    isActive ? "bg-bronze-500 text-warm-50" : "bg-warm-100 text-charcoal-950 hover:bg-line"
                  }`}
                >
                  <CheckSquareIcon active={isActive} />
                  {tab.n}. {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <StatsCounter />
      </div>
    </section>
  );
}
