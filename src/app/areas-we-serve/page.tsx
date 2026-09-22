import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { areas } from "@/data/areas";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Elite Bathrooms is based in Tacoma, WA and serves Seattle, Bellevue, Kirkland, Issaquah, Sammamish, and Puyallup.",
  alternates: { canonical: absoluteUrl("/areas-we-serve") },
};

export default function AreasWeServePage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Areas We Serve" }]}
        title="Tacoma-based. Working across the South Sound and greater Seattle."
        imageLabel="/images/elite-team-hero.jpg"
        imageAlt="Elite Bathrooms crew and work vans"
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas-we-serve/${area.slug}`}
                className={`border p-6 hover:border-bronze-400 ${
                  area.primary ? "border-bronze-400 bg-bronze-500/5" : "border-line bg-warm-100"
                }`}
              >
                {area.primary && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-bronze-600">
                    Home Base
                  </span>
                )}
                <h2 className="mt-1 text-lg font-extrabold text-charcoal-950">{area.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{area.blurb}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </main>
  );
}
