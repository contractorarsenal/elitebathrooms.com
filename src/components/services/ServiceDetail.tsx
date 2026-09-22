import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { CheckIcon, PlusIcon } from "../ui/icons";
import { PageHero } from "../sections/PageHero";
import { WaterproofingBanner } from "../sections/WaterproofingBanner";
import { RelatedProjects } from "../sections/RelatedProjects";
import { RelatedServices } from "../sections/RelatedServices";
import { ServiceAreaLinks } from "../sections/ServiceAreaLinks";
import { NextStepCTA } from "../sections/NextStepCTA";
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
        description={service.positioning ?? service.summary}
        imageLabel={service.heroImage}
        imageAlt={`${service.name} by Elite Bathrooms`}
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-muted">{service.intro}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-bronze-600">
                  What&rsquo;s Included
                </h2>
                <ul className="mt-3 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-500" />
                      <span className="text-sm leading-relaxed text-ink sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.notFor && (
                <div className="rounded-card border border-line bg-warm-100 p-5">
                  <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">
                    Not Intended For
                  </h2>
                  <ul className="mt-3 space-y-2.5">
                    {service.notFor.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <PlusIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 rotate-45 text-ink-muted" />
                        <span className="text-sm leading-relaxed text-ink-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal mask className="min-h-[360px] rounded-panel">
            <ImageSlot cover alt={`${service.name} by Elite Bathrooms`} label={service.cardImage} />
          </Reveal>
        </Container>
      </section>

      {children}

      <WaterproofingBanner />
      <RelatedProjects projectType={service.projectType} />
      <RelatedServices exceptSlug={service.slug} />
      <ServiceAreaLinks />
      <NextStepCTA variant="split" heading={`Ready to start your ${service.name.toLowerCase()}?`} />
    </main>
  );
}
