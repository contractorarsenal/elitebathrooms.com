"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Wraps a block with a single opacity/translateY entrance animation that
 * fires once via IntersectionObserver. No JS runs at all under
 * prefers-reduced-motion (the CSS rule in globals.css is itself gated on
 * no-preference), and children render fully visible either way.
 *
 * `delay` (ms) staggers siblings in a Bento grid — set --reveal-delay and
 * let CSS handle the timing instead of a JS animation timeline.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  mask = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Also render a wipe-mask overlay (for image panels) instead of the default fade. */
  mask?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  if (mask) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}>
        {children}
        <div className="mask-panel pointer-events-none absolute inset-0 bg-charcoal-950" data-mask={shown ? "in" : undefined} />
      </div>
    );
  }

  return (
    <div ref={ref} data-reveal={shown ? "in" : undefined} className={className} style={style}>
      {children}
    </div>
  );
}
