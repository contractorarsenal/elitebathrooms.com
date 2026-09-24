import type { CSSProperties } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowRightIcon } from "../ui/icons";
import { PageHero } from "../sections/PageHero";
import { WaterproofingBanner } from "../sections/WaterproofingBanner";
import { RelatedProjects } from "../sections/RelatedProjects";
import { FaqAccordion } from "../sections/FaqAccordion";
import { ServiceAreaLinks } from "../sections/ServiceAreaLinks";
import { NextStepCTA } from "../sections/NextStepCTA";
import { services } from "@/data/services";
import { areaFaqs, planningPoints, whyEliteReasons, type Area } from "@/data/areas";

const processSteps = [
  { title: "Request an Estimate", body: "Tell us about the bathroom and what you want to change." },
  { title: "In-Home Consultation", body: "We look at the space and understand the scope." },
  { title: "Plan Before Demolition", body: "Layout, materials, and fixtures get determined." },
  { title: "Build & Final Walkthrough", body: "Elite manages the renovation and reviews it with you." },
];

export function AreaDetail({ area }: { area: Area }) {
  const faqs = [...areaFaqs, ...(area.faq ?? [])];

  return (
    <main>
      {/* 01 Hero */}
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Areas We Serve", href: "/areas-we-serve" },
          { name: area.name },
        ]}
        title={`Bathroom Remodeling in ${area.name}, WA`}
        description={area.intro}
        imageSrc="/images/team/elite-crew-planning.jpg"
        imageLabel="/images/team/elite-crew-planning.jpg"
        imageAlt={`Elite Bathrooms crew serving ${area.name}, WA`}
      />

      <section className="bg-warm-50 py-14 sm:py-16">
        <Container>
          <Reveal className="border border-line bg-warm-100 p-8 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze-500">
              {area.primary ? "Home Base" : "Service Area"}
            </span>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {area.localContext}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 02 Services */}
      <section className="bg-warm-50 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Services" title={`Bathroom remodeling services in ${area.name}`} description={area.serviceIntro} />
          <Reveal className="mt-10 divide-y divide-line border-t border-line">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex items-center justify-between gap-4 py-5 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-extrabold text-charcoal-950 group-hover:text-bronze-600">
                    {service.name}
                  </h3>
                  <p className="mt-1 max-w-lg text-sm leading-relaxed text-ink-muted">{service.summary}</p>
                </div>
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-bronze-500 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* 03 Planning a Bathroom Remodel */}
      <section className="bg-warm-100 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Planning a Remodel"
            title="What to decide before you start."
            description="The same questions apply everywhere we work; a consultation is where we help you answer them for your specific bathroom."
          />
          <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {planningPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 60}>
                <h3 className="text-base font-extrabold text-charcoal-950">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{point.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 04 Why Elite */}
      <section className="bg-charcoal-950 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Why Elite" title="Why homeowners choose Elite Bathrooms." tone="dark" />
          <Reveal className="mt-10">
            <ol className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {whyEliteReasons.map((reason, i) => (
                <li
                  key={reason.title}
                  className="stagger-item flex gap-4"
                  style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
                >
                  <span className="shrink-0 font-heading text-xl font-extrabold leading-none text-bronze-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-warm-50">{reason.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-on-dark-muted">{reason.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* 05 Projects */}
      <RelatedProjects />

      {/* 06 Waterproofing */}
      <WaterproofingBanner />

      {/* 07 Process */}
      <section className="bg-warm-50 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="How It Works" title="What happens after you reach out." />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <span className="font-heading text-3xl font-extrabold leading-none text-bronze-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-extrabold text-charcoal-950">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={280} className="mt-10">
            <Link
              href="/process"
              className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.06em] text-bronze-600 hover:text-bronze-500"
            >
              See Our Full Process
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* 08 Financing */}
      <section className="bg-bronze-500 py-14">
        <Container>
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-warm-50/80">
                Planning a Larger Remodel?
              </span>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight text-warm-50 sm:text-3xl">
                Financing is available for qualifying projects.
              </h2>
            </div>
            <Button href="/financing" variant="secondary" className="shrink-0">
              Learn About Financing
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* 09 FAQ */}
      <FaqAccordion faqs={faqs} title={`${area.name} Bathroom Remodeling FAQ`} />

      {/* 10 Areas Nearby */}
      <ServiceAreaLinks exceptSlug={area.slug} />

      {/* 11 Request Estimate */}
      <NextStepCTA variant="split" heading={`Ready to start your ${area.name} bathroom project?`} />
    </main>
  );
}
