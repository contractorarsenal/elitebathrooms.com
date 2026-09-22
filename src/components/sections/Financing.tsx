import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function Financing() {
  return (
    <section className="bg-bronze-500 py-14">
      <Container>
        <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-warm-50/80">
              Financing Available
            </span>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight text-warm-50 sm:text-3xl">
              Bathroom projects made easier to plan for.
            </h2>
          </div>
          <Button href="/get-a-quote" variant="secondary" className="shrink-0">
            Ask About Financing
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
