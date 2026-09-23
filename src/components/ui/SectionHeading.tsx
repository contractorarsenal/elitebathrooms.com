"use client";

import type { CSSProperties } from "react";
import { useReveal } from "./useReveal";

export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={`block text-xs font-bold uppercase tracking-[0.18em] ${
        tone === "dark" ? "text-bronze-400" : "text-bronze-500"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Self-contained section-heading reveal: eyebrow, then headline, then
 * description each fade/rise in on their own stagger, driven by a single
 * IntersectionObserver (see useReveal). Callers should NOT wrap this in an
 * outer <Reveal> — that would double-animate it.
 *
 * The headline is intentionally NOT width-constrained (large type needs
 * room to breathe); only the description gets a readable measure.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const [ref, shown] = useReveal<HTMLDivElement>();
  const inAttr = shown ? "in" : undefined;

  return (
    <div ref={ref} className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <div data-reveal={inAttr}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        data-reveal={inAttr}
        style={{ "--reveal-delay": "80ms" } as CSSProperties}
        className={`mt-3 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl ${
          align === "center" ? "mx-auto" : ""
        } ${tone === "dark" ? "text-warm-50" : "text-charcoal-950"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal={inAttr}
          style={{ "--reveal-delay": "160ms" } as CSSProperties}
          className={`mt-4 max-w-[38rem] text-lg leading-relaxed sm:text-xl ${
            align === "center" ? "mx-auto" : ""
          } ${tone === "dark" ? "text-ink-on-dark-muted" : "text-ink-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
