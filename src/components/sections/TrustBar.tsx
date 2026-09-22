import { Container } from "../ui/Container";
import { CheckIcon } from "../ui/icons";
import { trustStats } from "@/lib/site-config";

export function TrustBar() {
  return (
    <section className="border-b border-line bg-warm-100">
      <Container className="grid grid-cols-2 gap-y-5 py-6 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 sm:py-7">
        {trustStats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2.5">
            <CheckIcon className="h-4 w-4 shrink-0 text-bronze-500" />
            <span className="text-sm font-bold uppercase tracking-[0.02em] text-charcoal-950 sm:text-[0.8rem]">
              {stat.label}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
