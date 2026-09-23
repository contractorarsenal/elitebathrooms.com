import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-[70vh] items-center bg-warm-50 pb-14 pt-24 lg:pb-0 lg:pt-20">
      <Container className="max-w-xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze-500">
          Request Received
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-charcoal-950 sm:text-4xl">
          Thanks. We&rsquo;ll be in touch shortly.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          A member of our Tacoma team will follow up to schedule your consultation. If it&rsquo;s
          urgent, call us at{" "}
          <a href={siteConfig.phone.href} className="font-semibold text-bronze-600">
            {siteConfig.phone.display}
          </a>
          .
        </p>
        <Button href="/" variant="secondary" className="mt-8">
          Back to Home
        </Button>
      </Container>
    </main>
  );
}
