import Link from "next/link";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { PageHero } from "../sections/PageHero";
import { WaterproofingBanner } from "../sections/WaterproofingBanner";
import { FaqAccordion } from "../sections/FaqAccordion";
import { ServiceAreaLinks } from "../sections/ServiceAreaLinks";
import { CtaBanner } from "../sections/CtaBanner";
import { services } from "@/data/services";
import { areaFaqs, type Area } from "@/data/areas";
import { siteConfig } from "@/lib/site-config";

export function AreaDetail({ area }: { area: Area }) {
  return (
    <main>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Areas We Serve", href: "/areas-we-serve" },
          { name: area.name },
        ]}
        title={`Bathroom Remodeling in ${area.name}, WA`}
        description={area.blurb}
        imageLabel="/images/elite-crew-planning.jpg"
        imageAlt={`Elite Bathrooms crew serving ${area.name}, WA`}
      />

      {area.primary && (
        <section className="bg-warm-50 py-14 sm:py-16">
          <Container>
            <Reveal className="border border-line bg-warm-100 p-8 sm:p-10">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze-500">
                Home Base
              </span>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Our office is at {siteConfig.address.street}, {siteConfig.address.city},{" "}
                {siteConfig.address.state} {siteConfig.address.zip} — most projects, and most of
                our crews, start their day here.
              </p>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title={`Bathroom services available in ${area.name}`}
            />
          </Reveal>
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="border border-line bg-warm-100 p-5 hover:border-bronze-400"
              >
                <h3 className="text-base font-extrabold text-charcoal-950">{service.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{service.summary}</p>
              </Link>
            ))}
          </Reveal>

          <Reveal className="mt-10">
            <Button href="/projects" variant="outline-dark">
              Browse Our Projects
            </Button>
          </Reveal>
        </Container>
      </section>

      <WaterproofingBanner />
      <FaqAccordion faqs={areaFaqs} title={`${area.name} Bathroom Remodeling FAQ`} />
      <ServiceAreaLinks exceptSlug={area.slug} />
      <CtaBanner
        title={`Ready to start your ${area.name} bathroom project?`}
        description="Tell us about your project and we'll follow up to schedule a consultation."
      />
    </main>
  );
}
