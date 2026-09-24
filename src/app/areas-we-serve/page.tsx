import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { areas } from "@/data/areas";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Elite Bathrooms is based in Tacoma, WA and serves Seattle, Bellevue, Kirkland, Issaquah, Sammamish, and Puyallup.",
  alternates: { canonical: absoluteUrl("/areas-we-serve") },
};

export default function AreasWeServePage() {
  const [tacoma, ...secondary] = areas;

  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Areas We Serve" }]}
        title="Bathroom Remodeling Across the Puget Sound"
        description="Tacoma-based, working across the South Sound and greater Seattle."
        imageSrc="/images/team/elite-team-hero.jpg"
        imageLabel="/images/team/elite-team-hero.jpg"
        imageAlt="Elite Bathrooms crew and work vans"
      />

      {/* Tacoma: the featured home-base market */}
      <section className="bg-warm-50 py-16 sm:py-20">
        <Container>
          <Reveal>
            <Link
              href={`/areas-we-serve/${tacoma.slug}`}
              className="group flex flex-col gap-6 rounded-panel border border-bronze-400/60 bg-bronze-500/5 p-8 transition-colors hover:border-bronze-400 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-bronze-600">
                  Home Base
                </span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-charcoal-950">
                  {tacoma.name}
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted">
                  {tacoma.blurb}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold uppercase tracking-[0.08em] text-bronze-600">
                View Area
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Secondary markets */}
      <section className="bg-warm-100 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Also Serving" title="Every other market we work in." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((area, i) => (
              <Reveal key={area.slug} delay={i * 60}>
                <Link
                  href={`/areas-we-serve/${area.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-card border border-line bg-warm-50 p-6 transition-colors hover:border-bronze-400"
                >
                  <div>
                    <h3 className="text-lg font-extrabold text-charcoal-950">{area.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{area.blurb}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-600">
                    View Area
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <NextStepCTA variant="banner" />
    </main>
  );
}
