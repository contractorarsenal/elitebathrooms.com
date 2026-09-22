import Link from "next/link";
import { primaryNav, serviceAreas, siteConfig } from "@/lib/site-config";
import { Container } from "../ui/Container";

export function Footer() {
  const areas = [serviceAreas.primary, ...serviceAreas.secondary];

  return (
    <footer className="bg-charcoal-950 pb-14 text-warm-50 lg:pb-0">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <span className="font-heading text-xl font-extrabold uppercase tracking-tight">
            Elite <span className="text-bronze-400">Bathrooms</span>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-on-dark-muted">
            Tacoma-based bathroom specialists. Design, waterproofing, tile, plumbing, and finish
            work — one crew, start to finish.
          </p>
          <div className="mt-5 flex gap-4 text-ink-on-dark-muted">
            <a href={siteConfig.social.facebook} aria-label="Elite Bathrooms on Facebook" className="hover:text-bronze-400">
              Facebook
            </a>
            <a href={siteConfig.social.instagram} aria-label="Elite Bathrooms on Instagram" className="hover:text-bronze-400">
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">Company</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="min-h-11 text-ink-on-dark-muted hover:text-warm-50">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {/* TODO: point to a dedicated /contact page once it ships next pass. */}
              <Link href="/estimate" className="text-ink-on-dark-muted hover:text-warm-50">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">
            Service Areas
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {areas.map((area) => (
              <li key={area.slug} className="text-ink-on-dark-muted">
                {area.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-bronze-400">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-on-dark-muted">
            <li>
              <a href={siteConfig.phone.href} className="hover:text-warm-50">
                {siteConfig.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-warm-50">
                {siteConfig.email}
              </a>
            </li>
            <li>
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
            </li>
          </ul>
        </div>
      </Container>

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
