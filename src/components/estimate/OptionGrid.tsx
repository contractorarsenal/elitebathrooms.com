export function OptionGrid<T extends string>({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T) => void;
  columns?: 2 | 3;
}) {
  return (
    <div className={`grid gap-3 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={`min-h-14 border px-4 py-3 text-left text-sm font-semibold transition-colors ${
              active
                ? "border-bronze-500 bg-bronze-500/10 text-charcoal-950"
                : "border-line bg-warm-50 text-ink hover:border-charcoal-950/30"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
