import Link from "next/link";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { processSteps as steps } from "@/data/process";

export function Process() {
  return (
    <section className="bg-warm-100 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="Step-by-step, from idea to finished bathroom."
            align="center"
          />
        </Reveal>

        <Reveal className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              <ImageSlot alt={step.alt} aspectRatio="4/3" label={step.image} />
              <div>
                <span className="font-heading text-sm font-extrabold text-bronze-500">
                  {step.number}
                </span>
                <h3 className="mt-1 text-lg font-extrabold text-charcoal-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-8 text-center">
          <Link
            href="/process"
            className="text-sm font-bold uppercase tracking-[0.06em] text-bronze-600 hover:text-bronze-500"
          >
            See the Full Process →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
