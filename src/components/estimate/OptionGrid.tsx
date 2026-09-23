import { CheckIcon } from "../ui/icons";

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
            className={`flex min-h-16 items-center justify-between gap-2 rounded-card border px-5 py-4 text-left text-base font-semibold transition-all duration-150 ${
              active
                ? "border-bronze-500 bg-bronze-500/10 text-charcoal-950 shadow-[0_2px_10px_-2px_rgba(175,124,69,0.35)]"
                : "border-line bg-warm-50 text-ink hover:border-charcoal-950/30"
            }`}
          >
            {option.label}
            {active && <CheckIcon className="h-4 w-4 shrink-0 text-bronze-500" />}
          </button>
        );
      })}
    </div>
  );
}
