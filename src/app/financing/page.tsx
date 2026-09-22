import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Financing",
  description: "Financing is available for Elite Bathrooms remodeling projects.",
  alternates: { canonical: absoluteUrl("/financing") },
};

export default function FinancingPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Financing" }]}
        title="Financing Available"
        description="Bathroom projects made easier to plan for."
        imageLabel="/images/elite-design-consultation.jpg"
        imageAlt="Elite Bathrooms designer consulting with a homeowner"
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-muted">
              We offer financing options for qualifying bathroom remodeling projects. Every
              household&rsquo;s situation is different, so the specifics — rates, terms, and
              qualification — are best discussed directly during your consultation rather than
              quoted generically here.
            </p>
            <Button href="/get-a-quote" variant="primary" className="mt-8">
              Ask About Financing
            </Button>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        title="Ready to talk through your options?"
        description="Tell us about your project and we'll cover financing as part of your consultation."
      />
    </main>
  );
}
