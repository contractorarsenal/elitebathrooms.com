"use client";

import type { CSSProperties } from "react";
import { useReveal } from "./useReveal";

/**
 * Wraps a block with a single entrance animation that fires once via
 * IntersectionObserver. No JS-driven motion runs at all under
 * prefers-reduced-motion (the CSS rules in globals.css are themselves
 * gated on no-preference), and children render fully visible either way.
 *
 * `delay` (ms) staggers siblings in a Bento grid or a staggered hero,
 * `scale` adds a very slight .985→1 scale-in for Bento tiles, `mask`
 * renders a wipe-mask overlay instead of a plain fade (image panels only,
 * used selectively — see call sites).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  duration,
  scale = false,
  mask = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  scale?: boolean;
  mask?: boolean;
}) {
  const [ref, shown] = useReveal<HTMLDivElement>();

  const style = {
    ...(delay ? { "--reveal-delay": `${delay}ms` } : {}),
    ...(duration ? { "--reveal-duration": `${duration}ms` } : {}),
  } as CSSProperties;

  if (mask) {
    return (
      <div
        ref={ref}
        data-reveal={shown ? "in" : undefined}
        className={`relative overflow-hidden ${className}`}
        style={style}
      >
        {children}
        <div className="mask-panel pointer-events-none absolute inset-0 bg-charcoal-950" data-mask={shown ? "in" : undefined} />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-reveal={shown ? "in" : undefined}
      className={`${scale ? "reveal-scale" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
