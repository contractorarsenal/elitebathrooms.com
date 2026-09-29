import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

// WordPress has no archived 404 page to match (a 404 can't be crawled), so
// this stays a Next.js-only page — styled with the same design system
// (colors, pill eyebrow, pill buttons) as every rebuilt template for visual
// consistency, not copied from a WordPress reference.
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-charcoal-950 pt-16 lg:pt-24">
      <Container className="py-20 text-center sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-warm-50">
          <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
          404
        </span>
        <h1 className="mt-6 text-3xl font-extrabold leading-tight text-warm-50 sm:text-5xl">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-warm-50/70">
          The page you&rsquo;re looking for may have moved or no longer exists. Here are a few
          places to start instead.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-bronze-500 px-7 py-3 text-sm font-bold text-warm-50 transition-colors hover:bg-bronze-600"
          >
            Back to Home
          </Link>
          <Link
            href="/bathroom-remodel-services"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-bold text-warm-50 transition-colors hover:border-white/60"
          >
            View Services
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-bold text-warm-50 transition-colors hover:border-white/60"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </main>
  );
}
