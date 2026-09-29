import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Thank You - Bathroom Remodel And Home Renovation Services",
  robots: { index: false, follow: false },
};

// Verbatim structure and copy from wordpress-archive/html/thank-you.html.
export default function ThankYouPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Thank You" }]}
        title="Thank You - Bathroom Remodel And Home Renovation Services"
      />

      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
              <Image
                src="/images/wordpress/team/team-member-06.jpg"
                alt="Elite Bathrooms team member"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-lg font-extrabold text-bronze-500">Thank You!</span>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
                Your Response Has Been Received!
              </h1>
              <p className="mt-4 text-base leading-relaxed text-charcoal-800">
                We appreciate your time. Stay tuned for updates and next steps from us.
              </p>
              <Link
                href="/"
                className="mt-9 inline-flex items-center justify-center rounded-full border border-charcoal-950/15 px-7 py-3 text-sm font-bold text-charcoal-950 transition-colors hover:border-charcoal-950/40"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
