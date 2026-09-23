"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires `shown = true` once, the first time the returned ref intersects the
 * viewport, then disconnects. Shared by Reveal and SectionHeading so both
 * use the exact same trigger logic instead of drifting apart.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
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

  return [ref, shown] as const;
}
