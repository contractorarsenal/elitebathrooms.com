import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import { trustStats } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Elite Bathrooms",
  description:
    "Elite Bathrooms is a Tacoma-based bathroom remodeling specialist. We don't try to do everything. We do bathrooms, and we do them right.",
  alternates: { canonical: absoluteUrl("/about") },
};

const points = [
  "One crew handles design, demolition, waterproofing, tile, plumbing, electrical, and finish work",
  "No subcontractor hand-offs: the people who plan your project are the people who build it",
  "Every bathroom backed by a 10-year waterproofing warranty",
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
        title="We don't try to do everything."
        description="We do bathrooms, and we do them right."
        imageSrc="/images/team/elite-crew-vans.jpg"
        imageLabel="/images/team/elite-crew-vans.jpg"
        imageAlt="Elite Bathrooms crew and work vans, Tacoma"
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal mask className="aspect-[4/5] rounded-panel lg:aspect-auto lg:h-full lg:min-h-[520px]">
            <ImageSlot
              cover
              src="/images/team/elite-crew-planning.jpg"
              alt="Elite Bathrooms crew reviewing project plans"
              label="/images/team/elite-crew-planning.jpg"
            />
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Why Elite"
              title="Bathrooms are the only thing we build."
              description="Most contractors spread across kitchens, additions, and whole-home remodels. Elite Bathrooms does one thing: bathrooms. That means deeper waterproofing knowledge, tighter tile work, and a crew that has solved the same problems hundreds of times over."
            />

            <Reveal delay={240} className="mt-8">
            <ul className="space-y-4">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-bronze-500" />
                  <span className="text-sm leading-relaxed text-ink-muted sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6">
              {trustStats.map((stat) => (
                <span key={stat.label} className="text-sm font-bold text-charcoal-950">
                  {stat.label}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-warm-100 py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>The Crew</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-charcoal-950 sm:text-4xl">
              The same people who plan it, build it.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              There&rsquo;s no rotating cast of subcontractors on an Elite Bathrooms project. The
              crew that walks your space during the consultation is accountable for how it gets
              built, from demolition through the final walkthrough.
            </p>
          </Reveal>
          <Reveal mask delay={100} className="aspect-[4/3] rounded-panel">
            <ImageSlot
              cover
              src="/images/team/elite-team-portrait.jpg"
              alt="Elite Bathrooms crew portrait"
              label="/images/team/elite-team-portrait.jpg"
            />
          </Reveal>
        </Container>
      </section>

      <RelatedProjects />
      <Testimonials />
      <WaterproofingBanner />
      <NextStepCTA variant="banner" />
    </main>
  );
}
