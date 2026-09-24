import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { areas } from "@/data/areas";
import { services } from "@/data/services";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { StarIcon, PhoneIcon, MailIcon } from "../ui/icons";

const companyLinks = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Financing", href: "/financing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-950 pb-14 text-warm-50 lg:pb-0">
      <Container className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-24">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-on-dark-muted">
            Tacoma-based bathroom remodeling specialists. Design, waterproofing, tile, plumbing,
            and finish work: one crew, start to finish.
          </p>
          <ul className="mt-6 space-y-2 text-sm font-semibold text-warm-50/90">
            <li className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 shrink-0 text-bronze-400" />
              {siteConfig.reviews.rating.toFixed(1)} Google Rating
            </li>
            <li>{siteConfig.reviews.count} Reviews</li>
            <li>{siteConfig.warranty.label}</li>
          </ul>
          <div className="mt-6 flex gap-4 text-ink-on-dark-muted">
            <a href={siteConfig.social.facebook} aria-label="Elite Bathrooms on Facebook" className="hover:text-bronze-400">
              Facebook
            </a>
            <a href={siteConfig.social.instagram} aria-label="Elite Bathrooms on Instagram" className="hover:text-bronze-400">
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-ink-on-dark-muted hover:text-warm-50">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">
            Areas We Serve
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {areas.map((area) => (
              <li key={area.slug}>
                <Link href={`/areas-we-serve/${area.slug}`} className="text-ink-on-dark-muted hover:text-warm-50">
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-ink-on-dark-muted hover:text-warm-50">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-charcoal-800">
        <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">
                Tacoma Office
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-on-dark-muted">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">
                Hours
              </h3>
              <ul className="mt-3 space-y-1 text-sm leading-relaxed text-ink-on-dark-muted">
                {siteConfig.hours.map((h) => (
                  <li key={h.days}>
                    {h.days}: {h.time}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
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
            <Button href="/get-a-quote" variant="primary">
              Request Estimate
            </Button>
          </div>
        </Container>
      </div>

      <div className="border-t border-charcoal-800">
        <Container className="flex flex-col gap-3 py-6 text-xs text-ink-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Elite Bathrooms. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-warm-50">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-warm-50">
              Cookie Policy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
