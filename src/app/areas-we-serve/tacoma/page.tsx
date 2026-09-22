import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { CompassIcon, DropletIcon, GridIcon, PhoneIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { areaFaqs } from "@/data/areas";
import { siteConfig } from "@/lib/site-config";
import { localBusinessSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Remodeling in Tacoma, WA",
  description:
    "Elite Bathrooms is a Tacoma-based bathroom remodeling contractor — full remodels, shower remodels, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
  alternates: { canonical: absoluteUrl("/areas-we-serve/tacoma") },
};

const whyElite = [
  {
    icon: DropletIcon,
    title: "Waterproofing",
    description: "Every bathroom we build in Tacoma is backed by a 10-year waterproofing warranty against leaks.",
  },
  {
    icon: CompassIcon,
    title: "Project Coordination",
    description: "Design, demolition, waterproofing, tile, plumbing, and electrical stay coordinated as one project.",
  },
  {
    icon: GridIcon,
    title: "Bathroom-Only Focus",
    description: "We don't spread across kitchens or additions — bathrooms are the only thing we build.",
  },
  {
    icon: PhoneIcon,
    title: "Direct Communication",
    description: "You work with the people planning your project, not a rotating cast of subcontractors.",
  },
];

export default function TacomaPage() {
  return (
    <main>
      <JsonLd data={localBusinessSchema()} />

      {/* HERO */}
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Areas We Serve", href: "/areas-we-serve" }, { name: "Tacoma" }]}
        title="Bathroom Remodeling in Tacoma, WA"
        description="Tacoma-based bathroom remodeling specialists — full remodels, shower remodels, and tub-to-shower conversions."
        imageLabel="/images/elite-team-hero.jpg"
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
              Elite Bathrooms is headquartered at {siteConfig.address.street} in Tacoma — this is
              where most of our crews start their day. We specialize exclusively in bathrooms:
              full bathroom remodels, shower remodels, bathtub remodels, tub-to-shower
              conversions, and one-day renovations, all backed by the same 10-year waterproofing
              warranty.
            </p>
          </Reveal>
          <Reveal delay={80} mask className="min-h-[320px] rounded-panel">
            <ImageSlot cover alt="Elite Bathrooms crew reviewing project plans" label="/images/elite-crew-planning.jpg" />
          </Reveal>
        </Container>
      </section>

      {/* SERVICES IN TACOMA */}
      <section className="bg-warm-100 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Services in Tacoma" title="Every bathroom service, in one place." />
          </Reveal>
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="flex h-full flex-col gap-2 rounded-card border border-line bg-warm-50 p-5 transition-colors hover:border-bronze-400"
              >
                <h3 className="text-sm font-extrabold text-charcoal-950">{service.name}</h3>
                <p className="text-xs leading-relaxed text-ink-muted">{service.summary}</p>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* WHY TACOMA HOMEOWNERS CHOOSE ELITE */}
      <section className="bg-charcoal-950 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why Elite"
              title="Why Tacoma homeowners choose Elite."
              tone="dark"
            />
          </Reveal>
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyElite.map((item, i) => (
              <div key={item.title} className="flex flex-col gap-3 rounded-card border border-charcoal-700 bg-charcoal-900 p-6" style={i ? { transitionDelay: `${i * 60}ms` } : undefined}>
                <item.icon className="h-6 w-6 text-bronze-400" />
                <h3 className="text-base font-extrabold text-warm-50">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-on-dark-muted">{item.description}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

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
              layouts, plumbing, and waterproofing from whenever the home was last updated —
              sometimes decades ago. That&rsquo;s usually the biggest factor in scoping a remodel: not
              just what the room looks like, but what&rsquo;s actually behind the walls and under the
              floor.
            </p>
            <p>
              A consultation is where we figure that out — whether a straightforward tub-to-shower
              conversion covers what you need, or whether the plumbing, layout, or moisture damage
              underneath means a full remodel is the more realistic path.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* PROJECTS */}
      <RelatedProjects />

      {/* REVIEWS */}
      <Testimonials />

      {/* FAQ */}
      <FaqAccordion faqs={areaFaqs} title="Tacoma Bathroom Remodeling FAQ" />

      {/* NEXT STEP */}
      <NextStepCTA heading="Ready to start your Tacoma bathroom project?" variant="banner" />
    </main>
  );
}
