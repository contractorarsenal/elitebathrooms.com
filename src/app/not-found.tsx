import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-charcoal-950 pt-16 lg:pt-24">
      <Container className="py-20 text-center sm:py-28">
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-bronze-400">404</span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-warm-50 sm:text-5xl">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-on-dark-muted">
          The page you&rsquo;re looking for may have moved or no longer exists. Here are a few
          places to start instead.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/bathroom-remodel-services" variant="secondary">
            View Services
          </Button>
          <Button href="/contact-us" variant="secondary">
            Contact Us
          </Button>
        </div>
      </Container>
    </main>
  );
}
