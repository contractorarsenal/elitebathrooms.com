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

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-3 text-3xl font-extrabold leading-[1.05] sm:text-4xl md:text-[2.75rem] ${
          tone === "dark" ? "text-warm-50" : "text-charcoal-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            tone === "dark" ? "text-ink-on-dark-muted" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
