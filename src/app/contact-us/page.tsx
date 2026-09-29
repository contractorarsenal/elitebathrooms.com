import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { EstimateFlow } from "@/components/estimate/EstimateFlow";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { WpSectionHeading } from "@/components/ui/WpSectionHeading";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Elite Bathrooms Team - Talk To Our Sales Experts",
  description:
    "Contact Elite Bathrooms for a free consultation. Serving Seattle, WA and surrounding areas with bathroom remodeling, shower remodels, and bathtub upgrades.",
  alternates: { canonical: absoluteUrl("/contact-us") },
};

export default function ContactPage() {
  return (
    <main>
      <JsonLd data={localBusinessSchema()} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        title="Contact Elite Bathrooms Team - Talk To Our Sales Experts"
      />

      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                <Image
                  src="/images/wordpress/team/team-member-07.jpg"
                  alt="Elite Bathrooms team member on a call"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
                <span className="text-bronze-500">Contact Us</span> And Get Support From Our Team
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-800">
                <p>
                  Whether you&apos;re planning a one-day bathroom conversion, a custom shower
                  remodel, a bathtub upgrade, or a complete bathroom renovation, our team is here
                  to help every step of the way. At <strong className="text-charcoal-950">Elite Bathrooms</strong>,
                  we believe every successful remodeling project starts with clear communication,
                  honest advice, and a personalized approach tailored to your needs and budget.
                </p>
                <p>
                  Our team proudly serves homeowners across Seattle, WA and surrounding areas
                  with reliable bathroom remodeling solutions designed for comfort, style, and
                  long-term durability. From the first consultation to the final installation, we
                  focus on delivering quality workmanship, efficient service, and a smooth
                  remodeling experience.
                </p>
                <p>
                  Have questions about your project? Looking for design ideas or pricing
                  information? We&apos;re happy to help. Contact us today to schedule your free
                  consultation and discover how Elite Bathrooms can bring your vision to life
                  with modern, functional, and beautifully crafted bathroom solutions.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
                <div>
                  <h3 className="text-sm font-bold text-bronze-500">Address:</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-950">
                    {siteConfig.address.street},<br />
                    {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}, USA
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-bronze-500">Contacts:</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-950">
                    <a href={siteConfig.phone.href} className="block hover:text-bronze-500">
                      {siteConfig.phone.display}
                    </a>
                    <a href={`mailto:${siteConfig.email}`} className="mt-1 block hover:text-bronze-500">
                      {siteConfig.email}
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-bronze-500">Working Hours:</h3>
                  <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-charcoal-950">
                    {siteConfig.hours.map((h) => (
                      <p key={h.days}>
                        <strong>{h.days}:</strong> {h.time}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-bronze-500">Social:</h3>
                  <div className="mt-3 flex gap-2">
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Elite Bathrooms on Facebook"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-bronze-500 text-warm-50 hover:bg-bronze-600"
                    >
                      <FacebookIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Elite Bathrooms on Instagram"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-bronze-500 text-warm-50 hover:bg-bronze-600"
                    >
                      <InstagramIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-50 pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <WpSectionHeading
            eyebrow="Get A Free Quote"
            title={
              <>
                Talk To Our <span className="text-bronze-500">Bathroom Remodeling Experts</span>
              </>
            }
          />
          <div className="mt-10 rounded-[24px] bg-white p-6 sm:p-10">
            {/*
              `source: "contact-us"` (vs. EstimateFlow's own default
              "get-a-quote") is the only thing that distinguishes a Contact
              page submission from a Get a Quote one downstream — see
              lib/estimate/submit.ts's isContactPage check, which picks the
              Web3Forms subject line and `lead_source` field from this.
            */}
            <EstimateFlow prefill={{ source: "contact-us" }} />
          </div>
        </div>
      </section>
    </main>
  );
}
