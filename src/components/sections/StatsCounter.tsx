"use client";

import { useEffect, useRef, useState } from "react";

// Exact WordPress stat counters (title + data-to-value read directly from
// the elementor-widget-counter markup in home.html). On the live site these
// are stuck at "0" — the count-up JS never fires in a static/headless
// capture — but the target values and "+" suffixes are real. See
// docs/migration/homepage-parity.md.
const stats = [
  {
    to: 10,
    suffix: "",
    label: "Years Of Experience",
    body: "Built on experience, consistency, and refined processes",
  },
  {
    to: 300,
    suffix: "+",
    label: "Projects Completed",
    body: "Over 300 successful projects delivered with quality and care",
  },
  {
    to: 10,
    suffix: "+",
    label: "Skilled Professionals",
    body: "A strong team supporting every stage of delivery",
  },
  {
    to: 40,
    suffix: "+",
    label: "Cities Served",
    body: "Local service across key areas around Seattle",
  },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.round(progress * to));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="font-heading text-5xl font-extrabold text-charcoal-950 sm:text-6xl">
      {value}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
      {stats.map((stat) => (
        <div key={stat.label}>
          <Counter to={stat.to} suffix={stat.suffix} />
          <div className="mt-4 border-t border-line pt-4">
            <p className="font-heading text-lg font-extrabold text-charcoal-950">{stat.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-800">{stat.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
