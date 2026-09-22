import Link from "next/link";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ArrowRightIcon } from "../ui/icons";
import { services } from "@/data/services";
import type { Service } from "@/data/services";

function ServiceCard({ service, wide = false }: { service: Service; wide?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group flex flex-col overflow-hidden border border-line bg-warm-100 ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <ImageSlot
        alt={`${service.name} by Elite Bathrooms`}
        aspectRatio={wide ? "16/9" : "4/3"}
        label={service.image}
        className="transition-transform duration-300 ease-out group-hover:scale-[1.02]"
      />
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-lg font-extrabold text-charcoal-950 sm:text-xl">{service.name}</h3>
        <p className="text-sm leading-relaxed text-ink-muted">{service.summary}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-500">
          Learn More
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function Services() {
  return (
    <section className="bg-warm-50 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Bathroom renovations designed around your needs."
            description="Four ways we work, all backed by the same waterproofing standard and the same crew."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <ServiceCard service={services[0]} wide />
          {services.slice(1).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
