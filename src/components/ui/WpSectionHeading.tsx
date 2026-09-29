// Exact WordPress section-heading pattern, reused across every interior
// page: thin decorative top-left line, pill eyebrow with a bronze dot, and
// a bold heading whose accented portion is passed in as a span. Matches the
// homepage's Who We Are / Our Services / Our Projects heading treatment
// pixel-for-pixel (see docs/migration/homepage-parity.md).
export function WpSectionHeading({
  eyebrow,
  title,
  className = "",
  tone = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={className}>
      <div className="mb-8 h-px w-[360px] max-w-[40vw] bg-line" />
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] ${
          tone === "dark" ? "border-white/20 text-warm-50" : "border-line text-charcoal-950"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
        {eyebrow}
      </span>
      <h2
        className={`mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.5rem] ${
          tone === "dark" ? "text-warm-50" : "text-charcoal-950"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
