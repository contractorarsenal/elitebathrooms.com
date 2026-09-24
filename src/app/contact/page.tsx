import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { EstimateFlow } from "@/components/estimate/EstimateFlow";
import { PhoneIcon, MailIcon } from "@/components/ui/icons";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Elite Bathrooms, Tacoma-based bathroom remodeling specialists. Call, email, or request an estimate online.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <main className="bg-warm-50 pb-14 pt-16 lg:pb-0 lg:pt-24">
      <JsonLd data={localBusinessSchema()} />

      <div className="border-b border-line bg-charcoal-950 py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <Reveal mask className="aspect-[4/5] rounded-panel">
            <ImageSlot
              cover
              src="/images/team/elite-consultation-alt.jpg"
              alt="Elite Bathrooms team member ready to help"
              label="/images/team/elite-consultation-alt.jpg"
            />
          </Reveal>

          <div>
            <Reveal>
              <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} tone="dark" />
              <h1 className="mt-4 max-w-md text-4xl font-extrabold leading-[1.02] tracking-tight text-warm-50 sm:text-6xl">
                Contact Elite Bathrooms
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-on-dark-muted">
                Planning a bathroom remodel? Tell us what you&rsquo;re working on and we&rsquo;ll
                help you figure out the right next step.
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/get-a-quote" variant="primary">
                Request Estimate
              </Button>
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-warm-50/25 px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-warm-50 transition-colors hover:border-warm-50/50"
              >
                <PhoneIcon className="h-4 w-4" />
                Call Now
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-warm-50/25 px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-warm-50 transition-colors hover:border-warm-50/50"
              >
                <MailIcon className="h-4 w-4" />
                Email Us
              </a>
            </Reveal>

            <Reveal delay={160} className="mt-10 grid gap-8 border-t border-charcoal-700 pt-8 sm:grid-cols-2">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">
                  Tacoma Office
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-on-dark-muted">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </p>
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">
                  Business Hours
                </h2>
                <ul className="mt-3 space-y-1 text-sm leading-relaxed text-ink-on-dark-muted">
                  {siteConfig.hours.map((h) => (
                    <li key={h.days}>
                      {h.days}: {h.time}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-ink-on-dark-muted">
                  Serving Tacoma and select communities across the Puget Sound.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      <Container className="py-16 sm:py-24">
        <EstimateFlow prefill={{}} />
      </Container>
    </main>
  );
}
