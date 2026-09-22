import Link from "next/link";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { areas } from "@/data/areas";

export function ServiceAreaLinks({ exceptSlug }: { exceptSlug?: string }) {
  const list = areas.filter((a) => a.slug !== exceptSlug);

  return (
    <section className="border-t border-line bg-warm-50 py-12">
      <Container>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <span className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
            Also serving
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {list.map((area) => (
              <Link
                key={area.slug}
                href={`/areas-we-serve/${area.slug}`}
                className="text-sm font-semibold text-charcoal-950 underline-offset-4 hover:text-bronze-600 hover:underline"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
