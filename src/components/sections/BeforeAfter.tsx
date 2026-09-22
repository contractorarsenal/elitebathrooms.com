"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { Eyebrow } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

// TODO: replace with real paired before/after project photos once available —
// see PHOTO: FINISHED BATHROOM in the build spec for the target look.
const pair = {
  beforeLabel: "/images/project-before-01.jpg",
  afterLabel: "/images/project-after-01.jpg",
};

function CompareSlider() {
  const [value, setValue] = useState(50);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-panel sm:aspect-[21/9]">
      <ImageSlot cover alt="After: finished bathroom" label={pair.afterLabel} />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <ImageSlot cover alt="Before: original bathroom" label={pair.beforeLabel} />
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-charcoal-950/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-warm-50">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-bronze-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-warm-50">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-warm-50"
        style={{ left: `${value}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-warm-50 bg-charcoal-950/60 text-warm-50">
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M7 6l-4 4 4 4M13 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section className="bg-warm-50 py-20 sm:py-28">
      <Container>
        <Reveal className="mb-8">
          <Eyebrow>Transformations</Eyebrow>
          <h2 className="mt-2 text-2xl font-extrabold text-charcoal-950 sm:text-3xl">
            Drag to compare.
          </h2>
        </Reveal>

        <Reveal>
          <CompareSlider />
        </Reveal>
      </Container>
    </section>
  );
}
