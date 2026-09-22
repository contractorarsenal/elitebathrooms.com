import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function CtaBanner({
  title = "Ready to talk about your bathroom?",
  description = "Tell us about your project and we'll follow up to schedule a consultation.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-warm-100 py-16 sm:py-20">
      <Container>
        <Reveal className="flex flex-col items-start gap-6 border border-line bg-warm-50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-extrabold text-charcoal-950 sm:text-3xl">{title}</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
              {description}
            </p>
          </div>
          <Button href="/get-a-quote" variant="primary" className="shrink-0">
            Request an Estimate
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
