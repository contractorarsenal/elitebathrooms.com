import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { WaterproofingBanner } from "@/components/sections/WaterproofingBanner";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { processSteps } from "@/data/process";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "From consultation to final walkthrough — how Elite Bathrooms plans and builds every bathroom remodel.",
  alternates: { canonical: absoluteUrl("/process") },
};

export default function ProcessPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Process" }]}
        title="Step-by-step, from idea to finished bathroom."
        imageLabel="/images/elite-process-planning.jpg"
        imageAlt="Bathroom plans and material selections laid out for review"
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container className="space-y-16 sm:space-y-20">
          {processSteps.map((step, i) => (
            <Reveal
              key={step.number}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <ImageSlot alt={step.alt} aspectRatio="4/3" label={step.image} />
              <div>
                <span className="font-heading text-sm font-extrabold text-bronze-500">
                  {step.number}
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-charcoal-950 sm:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <WaterproofingBanner />
      <CtaBanner />
    </main>
  );
}
