import { siteConfig } from "./site-config";
import { areas } from "@/data/areas";
import { absoluteUrl, SITE_URL } from "./seo";

/**
 * Structured data built only from verified facts (address, phone, verified
 * service areas). Deliberately omits: geo coordinates, aggregateRating,
 * review count, priceRange, and logo — none of that has been verified, and
 * fabricating any of it would be schema spam Google can penalize.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: SITE_URL,
    telephone: siteConfig.phone.display,
    email: siteConfig.email,
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    url: SITE_URL,
    telephone: siteConfig.phone.display,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    areaServed: areas.map((a) => ({
      "@type": "City",
      name: a.name,
    })),
  };
}

export type Crumb = { name: string; href?: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}
