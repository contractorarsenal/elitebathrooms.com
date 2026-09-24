import Link from "next/link";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ArrowRightIcon, CheckIcon } from "../ui/icons";
import { services } from "@/data/services";

const scope: Record<string, string[]> = {
  "shower-remodel": ["Waterproofed pan and walls", "Frameless or semi-frameless glass", "Built-in niches and benches"],
  "bathtub-remodel": ["Freestanding or alcove tubs", "Tile surround and deck", "Waterproofed tub-to-wall transitions"],
  "tub-to-shower-conversion": ["Tub removal and disposal", "New waterproofed shower pan", "Grab bars and low-threshold entry"],
};

function ServiceCard({ slug, delay }: { slug: string; delay: number }) {
  const service = services.find((s) => s.slug === slug)!;

  return (
    <Reveal delay={delay} className="flex h-full flex-col">
      <Link href={`/services/${service.slug}`} className="group flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden rounded-panel">
          <ImageSlot
            cover
            src={service.cardImage}
            alt={`${service.name} by Elite Bathrooms`}
            label={service.cardImage}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <h3 className="mt-5 text-xl font-extrabold text-charcoal-950 sm:text-2xl">{service.name}</h3>
        <p className="mt-2.5 text-base leading-relaxed text-ink-muted">{service.summary}</p>
        <ul className="mt-4 space-y-2.5">
          {scope[service.slug].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm font-semibold text-ink-muted">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze-500" />
              {item}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-600">
          Learn More
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

export function CoreServices() {
  return (
    <section className="bg-warm-100 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Core Services"
          title="Showers, tubs, and conversions."
          description="Three more ways we work, each backed by the same waterproofing standard as a full remodel."
        />
        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6">
          <ServiceCard slug="shower-remodel" delay={0} />
          <ServiceCard slug="bathtub-remodel" delay={80} />
          <ServiceCard slug="tub-to-shower-conversion" delay={160} />
        </div>
      </Container>
    </section>
  );
}
