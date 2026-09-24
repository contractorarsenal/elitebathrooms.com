import Link from "next/link";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/SectionHeading";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { CheckIcon, PlusIcon, ArrowRightIcon } from "../ui/icons";
import { PageHero } from "../sections/PageHero";
import { WaterproofingBanner } from "../sections/WaterproofingBanner";
import { RelatedProjects } from "../sections/RelatedProjects";
import { RelatedServices } from "../sections/RelatedServices";
import { ServiceAreaLinks } from "../sections/ServiceAreaLinks";
import { NextStepCTA } from "../sections/NextStepCTA";
import { getServiceBySlug, type Service } from "@/data/services";

export function ServiceDetail({
  service,
  children,
}: {
  service: Service;
  /** Extra deep-content blocks for money pages (e.g. full-bathroom-remodel), rendered after the intro. */
  children?: React.ReactNode;
}) {
  const crossSellService = service.crossSell ? getServiceBySlug(service.crossSell.slug) : undefined;

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
        imageSrc={service.heroImage}
        imageLabel={service.heroImage}
        imageAlt={`${service.name} by Elite Bathrooms`}
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>What&rsquo;s Included</Eyebrow>
            <p className="mt-3 text-lg leading-relaxed text-ink-muted">{service.intro}</p>

            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-500" />
                  <span className="text-sm leading-relaxed text-ink sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal mask className="min-h-[360px] rounded-panel">
            <ImageSlot cover src={service.cardImage} alt={`${service.name} by Elite Bathrooms`} label={service.cardImage} />
          </Reveal>
        </Container>
      </section>

      {(service.goodFor || service.notFor) && (
        <section className="bg-charcoal-950 py-16 sm:py-20">
          <Container>
            <Reveal>
              <Eyebrow tone="dark">Is This Right For You?</Eyebrow>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-warm-50 sm:text-3xl">
                Is {service.name.toLowerCase()} right for you?
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {service.goodFor && (
                <Reveal delay={60} className="rounded-card border border-charcoal-700 bg-charcoal-900 p-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-bronze-400">Good For</h3>
                  <ul className="mt-3 space-y-2.5">
                    {service.goodFor.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-warm-50/90">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {service.notFor && (
                <Reveal delay={120} className="rounded-card border border-charcoal-700 bg-charcoal-900 p-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-ink-on-dark-muted">
                    Not the Right Fit For
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {service.notFor.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink-on-dark-muted">
                        <PlusIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 rotate-45 text-ink-on-dark-muted" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>

            {crossSellService && (
              <Reveal delay={200} className="mt-8 border-t border-charcoal-700 pt-8">
                <p className="text-sm font-semibold text-ink-on-dark-muted">{service.crossSell?.label}</p>
                <Link
                  href={`/services/${crossSellService.slug}`}
                  className="mt-2 inline-flex items-center gap-1.5 text-base font-bold text-bronze-400 hover:text-bronze-300"
                >
                  {service.crossSell?.description}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            )}

            {!crossSellService && (
              <Reveal delay={200} className="mt-8 border-t border-charcoal-700 pt-8">
                <p className="text-sm font-semibold text-ink-on-dark-muted">Not sure?</p>
                <p className="mt-1 text-sm text-ink-on-dark-muted">Talk to our team.</p>
                <Button href="/get-a-quote" variant="primary" className="mt-4">
                  Request Estimate
                </Button>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      {children}

      <WaterproofingBanner />
      <RelatedProjects projectType={service.projectType} />
      <RelatedServices exceptSlug={service.slug} />
      <ServiceAreaLinks />
      <NextStepCTA variant="split" heading={`Ready to start your ${service.name.toLowerCase()}?`} />
    </main>
  );
}
