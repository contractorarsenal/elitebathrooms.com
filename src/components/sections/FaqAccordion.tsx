import { Container } from "../ui/Container";
import { WpSectionHeading } from "../ui/WpSectionHeading";
import { Reveal } from "../ui/Reveal";
import { JsonLd } from "../seo/JsonLd";

type Faq = { question: string; answer: string };

// Matches WordPress's real FAQ accordion exactly (e-n-accordion): separate
// white rounded cards per question (not a divided list), plain +/− toggle
// at the right edge. Native <details>/<summary> — zero JS.
export function FaqAccordion({
  faqs,
  title = "Common Questions",
}: {
  faqs: Faq[];
  title?: React.ReactNode;
}) {
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
    <section className="bg-warm-50 py-16 sm:py-24">
      <JsonLd data={schema} />
      <Container className="max-w-3xl">
        <WpSectionHeading eyebrow="Detailed Expert Answers" title={title} />
        <Reveal className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-line bg-white px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-charcoal-950 marker:content-none sm:text-lg">
                {faq.question}
                <span className="shrink-0 text-2xl font-light text-charcoal-950 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-800 sm:text-base">{faq.answer}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
