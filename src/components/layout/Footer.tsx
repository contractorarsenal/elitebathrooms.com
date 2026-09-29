import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { WatermarkText } from "../sections/WatermarkText";

// Exact WordPress footer: logo, description, Thumbtack badge, the same
// three link columns and contact block, copyright bar, and the giant
// "ELITE" watermark — verbatim from wordpress-archive/html/home.html,
// except the site-credit link, which points at this rebuild's own
// provider (Contractor Arsenal) rather than the old site's provider —
// see docs/migration/provider-cleanup.md for the full removal audit.
const companyLinks = [
  { label: "About Us", href: "/bathroom-remodel-company-seattle" },
  { label: "Our Services", href: "/bathroom-remodel-services" },
  { label: "Our Projects", href: "/projects" },
  { label: "Service Area", href: "/service-area" },
  { label: "Our Contacts", href: "/contact-us" },
  { label: "Get A Quote", href: "/get-a-quote" },
  { label: "Blog & Resources", href: "/blog" },
];

const serviceLinks = [
  { label: "Full Bathroom Remodel", href: "/services/full-bathroom-remodel" },
  { label: "Bathtub Remodel", href: "/services/bathtub-remodel" },
  { label: "Shower Remodel", href: "/services/shower-remodel" },
  { label: "One Day Conversion", href: "/services/one-day-bathroom-renovation" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal-900 text-warm-50">
      {/*
        Real footer background photo (wp-content/uploads/2025/06/footer-bg-1.jpg)
        — measured from live DOM: background-size:cover, no extra dark
        overlay layer, the photo's own natural dimness carries the legibility.
      */}
      <Image
        src="/images/wordpress/footer-bg-1.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1410px] px-5 pb-16 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.9fr]">
          <div>
            <Image
              src="/images/wordpress/logo_color_white.svg"
              alt="Elite Bathrooms"
              width={228}
              height={77}
              className="h-auto w-[170px]"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-warm-50/70">
              Elite Bathrooms provides professional bathroom remodeling services designed to
              improve comfort, function, and style in your home. From one-day bathroom conversions
              and shower remodels to bathtub upgrades and full bathroom renovations, our team
              focuses on quality work and lasting results. Proudly serving Seattle, WA and nearby
              areas.
            </p>
            <a
              href="https://www.thumbtack.com/wa/tacoma/bathroom-remodeling/elite-bathrooms/service/439700822396575829"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2"
            >
              <Image
                src="/images/wordpress/thumbtack-elite-pro.png"
                alt="Elite Bathrooms — Thumbtack Top Pro 2023"
                width={160}
                height={52}
                className="h-9 w-auto"
              />
            </a>
          </div>

          <div>
            {companyLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-1.5 font-heading text-base font-bold text-warm-50 hover:text-bronze-400"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            {serviceLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-1.5 font-heading text-base font-bold text-warm-50 hover:text-bronze-400"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <a href={siteConfig.phone.href} className="block font-heading text-xl font-extrabold text-bronze-400">
              {siteConfig.phone.display}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="mt-4 block font-heading text-lg font-extrabold text-warm-50">
              {siteConfig.email}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-warm-50/70">
              {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state}{" "}
              {siteConfig.address.zip}, United States
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-[1410px] px-5 py-6">
          <p className="text-center text-sm text-warm-50/60 sm:text-left">
            &copy; Copyright {new Date().getFullYear()} Elite Bathrooms. All rights reserved.
            Website by{" "}
            <a
              href="https://contractorarsenal.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-bronze-400 hover:underline"
            >
              Contractor Arsenal
            </a>
          </p>
        </div>
      </div>

      <div className="overflow-hidden pb-2 pt-4">
        <div className="mx-auto max-w-[1410px] overflow-hidden px-4">
          {/* Measured from live DOM: font-size 400px, weight 400, color rgba(255,251,244,0.25). */}
          <WatermarkText className="block text-[10rem] font-normal text-warm-50/25 sm:text-[16rem] lg:text-[25rem]">
            ELITE
          </WatermarkText>
        </div>
      </div>
    </footer>
  );
}
