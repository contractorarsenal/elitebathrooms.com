import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { JsonLd } from "../seo/JsonLd";

type Faq = { question: string; answer: string };

/** Native <details>/<summary> — zero JS for an accordion. */
export function FaqAccordion({ faqs, title = "Common Questions" }: { faqs: Faq[]; title?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="bg-warm-50 py-20 sm:py-28">
      <JsonLd data={schema} />
      <Container className="max-w-2xl">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title={title} />
        </Reveal>
        <Reveal className="mt-8 divide-y divide-line border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-charcoal-950 marker:content-none">
                {faq.question}
                <span className="shrink-0 text-xl text-bronze-500 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
