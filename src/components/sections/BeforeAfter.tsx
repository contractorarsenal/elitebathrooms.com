"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { Eyebrow } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { getBeforeAfterProject } from "@/data/projects";

function CompareSlider({ before, after }: { before: string; after: string }) {
  const [value, setValue] = useState(50);

  return (
    <>
      <ImageSlot cover src={after} alt="After: finished bathroom by Elite Bathrooms" label={after} />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <ImageSlot cover src={before} alt="Before: original bathroom" label={before} />
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
        <span className="handle-hint absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-warm-50 bg-charcoal-950/60 text-warm-50">
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
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-400"
      />
    </>
  );
}

export function BeforeAfter() {
  const project = getBeforeAfterProject();
  if (!project?.before) return null;

  return (
    <section className="bg-warm-50 py-20 sm:py-28">
      <Container>
        <Reveal className="mb-10">
          <Eyebrow>Transformations</Eyebrow>
          <h2 className="mt-3 text-4xl font-extrabold leading-[1.02] tracking-tight text-charcoal-950 sm:text-5xl">
            Drag to compare.
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">{project.title}</p>
        </Reveal>

        <Reveal mask className="aspect-[4/5] rounded-panel sm:aspect-[16/8]">
          <CompareSlider before={project.before} after={project.image} />
        </Reveal>
      </Container>
    </section>
  );
}
