"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
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
    <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
      <ImageSlot cover alt="After: finished bathroom" label={pair.afterLabel} />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <ImageSlot cover alt="Before: original bathroom" label={pair.beforeLabel} />
      </div>

      <span className="absolute left-3 top-3 rounded bg-charcoal-950/80 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-warm-50">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded bg-bronze-500 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-warm-50">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-warm-50"
        style={{ left: `${value}%` }}
      />

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
        <Reveal>
          <SectionHeading
            eyebrow="Transformations"
            title="See the difference, drag to compare."
            align="center"
          />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <CompareSlider />
        </Reveal>
      </Container>
    </section>
  );
}
