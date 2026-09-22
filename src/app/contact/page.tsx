import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { EstimateFlow } from "@/components/estimate/EstimateFlow";
import { PhoneIcon } from "@/components/ui/icons";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Elite Bathrooms — Tacoma-based bathroom remodeling specialists. Call, email, or request an estimate online.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <main className="bg-warm-50 pb-14 pt-16 lg:pb-0 lg:pt-20">
      <JsonLd data={localBusinessSchema()} />

      <div className="border-b border-line bg-charcoal-950 py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr,1.2fr] lg:items-center lg:gap-16">
          <Reveal>
            <ImageSlot
              alt="Elite Bathrooms team member ready to help"
              aspectRatio="4/5"
              label="/images/elite-contact-team-member.jpg"
            />
          </Reveal>

          <Reveal>
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} tone="dark" />
            <h1 className="mt-4 max-w-md text-3xl font-extrabold leading-[1.05] text-warm-50 sm:text-5xl">
              Let&rsquo;s talk about your bathroom.
            </h1>

            <ul className="mt-8 space-y-3 text-sm sm:text-base">
              <li>
                <a
                  href={siteConfig.phone.href}
                  className="flex items-center gap-2 font-semibold text-warm-50 hover:text-bronze-400"
                >
                  <PhoneIcon className="h-4 w-4 text-bronze-400" />
                  {siteConfig.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-warm-50 hover:text-bronze-400"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-ink-on-dark-muted">
                {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state}{" "}
                {siteConfig.address.zip}
              </li>
            </ul>
          </Reveal>
        </Container>
      </div>

      <Container className="py-14 sm:py-20">
        <EstimateFlow prefill={{}} />
      </Container>
    </main>
  );
}
