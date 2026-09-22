import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { CheckIcon } from "../ui/icons";
import { PageHero } from "../sections/PageHero";
import { WaterproofingBanner } from "../sections/WaterproofingBanner";
import { RelatedProjects } from "../sections/RelatedProjects";
import { RelatedServices } from "../sections/RelatedServices";
import { ServiceAreaLinks } from "../sections/ServiceAreaLinks";
import { CtaBanner } from "../sections/CtaBanner";
import type { Service } from "@/data/services";

export function ServiceDetail({
  service,
  children,
}: {
  service: Service;
  /** Extra deep-content blocks for money pages (e.g. full-bathroom-remodel), rendered after the intro. */
  children?: React.ReactNode;
}) {
  return (
    <main>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name },
        ]}
        title={service.name}
        description={service.summary}
        imageLabel={service.heroImage}
        imageAlt={`${service.name} by Elite Bathrooms`}
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-muted">{service.intro}</p>
            <ul className="mt-8 space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-500" />
                  <span className="text-sm leading-relaxed text-ink sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <ImageSlot
              alt={`${service.name} by Elite Bathrooms`}
              aspectRatio="4/5"
              label={service.cardImage}
            />
          </Reveal>
        </Container>
      </section>

      {children}

      <WaterproofingBanner />
      <RelatedProjects projectType={service.projectType} />
      <RelatedServices exceptSlug={service.slug} />
      <ServiceAreaLinks />
      <CtaBanner
        title={`Ready to start your ${service.name.toLowerCase()}?`}
        description="Tell us about your project and we'll follow up to schedule a consultation."
      />
    </main>
  );
}
