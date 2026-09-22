import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Remodeling Services",
  description:
    "Full bathroom remodels, shower remodels, tub-to-shower conversions, and bathtub remodels — Tacoma-based, backed by a 10-year waterproofing warranty.",
  alternates: { canonical: absoluteUrl("/services") },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        title="Bathroom Remodeling Services"
        description="Four ways we work, all backed by the same waterproofing standard and the same crew."
        imageLabel="/images/services-hero.jpg"
        imageAlt="Elite Bathrooms crew at work on a bathroom remodel"
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group flex flex-col overflow-hidden border border-line bg-warm-100 ${
                  i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <ImageSlot
                  alt={`${service.name} by Elite Bathrooms`}
                  aspectRatio={i === 0 ? "16/9" : "4/3"}
                  label={service.cardImage}
                  className="transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h2 className="text-lg font-extrabold text-charcoal-950 sm:text-xl">
                    {service.name}
                  </h2>
                  <p className="text-sm leading-relaxed text-ink-muted">{service.summary}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-500">
                    Learn More
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <WaterproofingBanner />
      <CtaBanner />
    </main>
  );
}
