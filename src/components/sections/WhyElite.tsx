import type { CSSProperties } from "react";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { Eyebrow } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { DropletIcon, CheckIcon } from "../ui/icons";

const reasons = [
  {
    title: "Bathroom specialists",
    description: "We don't spread across kitchens or additions. Bathrooms are the only thing we build.",
  },
  {
    title: "Plan before we build",
    description: "Layout, materials, and fixtures are finalized before demolition, not decided mid-project.",
  },
  {
    title: "Waterproofing matters",
    description: "Every wet area gets a fully sealed pan and wall assembly, not just a tile job.",
  },
  {
    title: "Clear communication",
    description: "You work with the people planning your project, not a rotating cast of subcontractors.",
  },
];

export function WhyElite() {
  return (
    <section className="bg-warm-50 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal mask className="aspect-[4/5] rounded-panel lg:aspect-auto lg:h-full lg:min-h-[520px] lg:order-2">
          <ImageSlot
            cover
            src="/images/services/elite-double-vanity.jpg"
            alt="Completed double vanity bathroom by Elite Bathrooms"
            label="/images/services/elite-double-vanity.jpg"
          />
        </Reveal>

        <div className="lg:order-1">
          <Reveal>
            <Eyebrow>Why Elite</Eyebrow>
            <h2 className="mt-3 text-4xl font-extrabold leading-[1.02] tracking-tight text-charcoal-950 sm:text-5xl">
              Why should you choose Elite?
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <ol className="mt-9 space-y-7">
              {reasons.map((reason, i) => (
                <li
                  key={reason.title}
                  className="stagger-item flex gap-5"
                  style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                >
                  <span className="shrink-0 font-heading text-2xl font-extrabold leading-none text-bronze-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-charcoal-950 sm:text-xl">{reason.title}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-ink-muted sm:text-lg">
                      {reason.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={200} className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-card border border-line bg-warm-100 px-5 py-4">
              <DropletIcon className="h-6 w-6 shrink-0 text-bronze-500" />
              <span className="text-base font-extrabold text-charcoal-950">10-Year Waterproofing Warranty</span>
            </div>
            <div className="flex items-center gap-3 rounded-card border border-line bg-warm-100 px-5 py-4">
              <CheckIcon className="h-6 w-6 shrink-0 text-bronze-500" />
              <span className="text-base font-extrabold text-charcoal-950">Financing Available</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
