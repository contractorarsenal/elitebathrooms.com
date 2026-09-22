"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps a block with a single opacity/translateY entrance animation that
 * fires once via IntersectionObserver. No JS runs at all under
 * prefers-reduced-motion (the CSS rule in globals.css is itself gated on
 * no-preference), and children render fully visible either way.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
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

  return (
    <div ref={ref} data-reveal={shown ? "in" : undefined} className={className}>
      {children}
    </div>
  );
}
