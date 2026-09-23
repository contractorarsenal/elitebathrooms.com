import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { areaFaqs, areas } from "@/data/areas";
import { siteConfig } from "@/lib/site-config";
import { localBusinessSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Remodeling in Tacoma, WA",
  description:
    "Elite Bathrooms is a Tacoma-based bathroom remodeling contractor: full remodels, shower remodels, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
  alternates: { canonical: absoluteUrl("/areas-we-serve/tacoma") },
};

const processSteps = [
  { title: "Request an Estimate", description: "Tell us about the bathroom and what you want to change." },
  { title: "In-Home Consultation", description: "We look at the space and understand the scope." },
  { title: "Plan Before Demolition", description: "Layout, materials, and fixtures get determined." },
  { title: "Build & Final Walkthrough", description: "Elite manages the renovation and reviews it with you." },
];

export default function TacomaPage() {
  return (
    <main>
      <JsonLd data={localBusinessSchema()} />

      {/* HERO */}
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Areas We Serve", href: "/areas-we-serve" }, { name: "Tacoma" }]}
        title="Bathroom Remodeling in Tacoma, WA"
        description="Tacoma-based bathroom remodeling specialists: full remodels, shower remodels, and tub-to-shower conversions."
        imageSrc="/images/team/elite-team-hero.jpg"
        imageLabel="/images/team/elite-team-hero.jpg"
        imageAlt="Elite Bathrooms crew and work vans, Tacoma"
      />

      {/* INTRO */}
      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Tacoma-Based</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-charcoal-950 sm:text-4xl">
              A bathroom remodeling contractor based right here in Tacoma.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Elite Bathrooms is headquartered at {siteConfig.address.street} in Tacoma. This is
              where most of our crews start their day. We specialize exclusively in bathrooms:
              full bathroom remodels, shower remodels, bathtub remodels, tub-to-shower
              conversions, and one-day renovations, all backed by the same 10-year waterproofing
              warranty.
            </p>
          </Reveal>
          <Reveal delay={80} mask className="min-h-[320px] rounded-panel">
            <ImageSlot
              cover
              src="/images/team/elite-crew-planning.jpg"
              alt="Elite Bathrooms crew reviewing project plans"
              label="/images/team/elite-crew-planning.jpg"
            />
          </Reveal>
        </Container>
      </section>

      {/* SERVICES IN TACOMA */}
      <section className="bg-warm-100 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Services in Tacoma" title="Every bathroom service, in one place." />
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

      {/* PROCESS */}
      <section className="bg-charcoal-950 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="How It Works" title="What happens after you reach out." tone="dark" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <span className="font-heading text-3xl font-extrabold leading-none text-bronze-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-extrabold text-warm-50">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-on-dark-muted">{step.description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={280} className="mt-10">
            <Link
              href="/process"
              className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.06em] text-bronze-400 hover:text-bronze-300"
            >
              See Our Full Process
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <WaterproofingBanner />

      {/* TACOMA HOME TYPES / REMODELING CONSIDERATIONS */}
      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>Planning a Remodel</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-charcoal-950 sm:text-4xl">
              Tacoma bathroom remodeling considerations.
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
            <p>
              Tacoma has a wide mix of home ages and styles, which means bathrooms often carry
              layouts, plumbing, and waterproofing from whenever the home was last updated,
              sometimes decades ago. That&rsquo;s usually the biggest factor in scoping a remodel: not
              just what the room looks like, but what&rsquo;s actually behind the walls and under the
              floor.
            </p>
            <p>
              A consultation is where we figure that out: whether a straightforward tub-to-shower
              conversion covers what you need, or whether the plumbing, layout, or moisture damage
              underneath means a full remodel is the more realistic path.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-6">
            <Link
              href="/projects"
              className="text-sm font-bold uppercase tracking-[0.06em] text-charcoal-950 underline-offset-4 hover:text-bronze-600 hover:underline"
            >
              View Projects ↓
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* PROJECTS */}
      <RelatedProjects />

      {/* REVIEWS */}
      <Testimonials />

      {/* SERVICE AREAS NEARBY */}
      <section className="bg-warm-100 py-16 sm:py-20">
        <Container>
          <Eyebrow>Also Serving</Eyebrow>
          <h2 className="mt-2 text-2xl font-extrabold text-charcoal-950 sm:text-3xl">
            Nearby service areas.
          </h2>
          <Reveal delay={80} className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {areas
              .filter((a) => a.slug !== "tacoma")
              .map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas-we-serve/${area.slug}`}
                  className="text-base font-bold text-charcoal-950 underline-offset-4 hover:text-bronze-600 hover:underline"
                >
                  {area.name}
                </Link>
              ))}
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <FaqAccordion faqs={areaFaqs} title="Tacoma Bathroom Remodeling FAQ" />

      {/* NEXT STEP */}
      <NextStepCTA heading="Ready to start your Tacoma bathroom project?" variant="banner" />
    </main>
  );
}
