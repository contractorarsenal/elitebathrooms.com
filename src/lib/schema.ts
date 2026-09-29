import { siteConfig } from "./site-config";
import { areas } from "@/data/areas";
import { absoluteUrl, SITE_URL } from "./seo";
import type { BlogPost } from "@/data/blog";

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

// Maps siteConfig.hours' plain-English day ranges to schema.org's
// dayOfWeek enum. Client-confirmed hours only — see site-config.ts.
const DAY_NAME_TO_SCHEMA: Record<string, string[]> = {
  Monday: ["Monday"],
  Tuesday: ["Tuesday"],
  Wednesday: ["Wednesday"],
  Thursday: ["Thursday"],
  Friday: ["Friday"],
  Saturday: ["Saturday"],
  Sunday: ["Sunday"],
};

function expandDayRange(days: string): string[] {
  if (!days.includes("–") && !days.includes("-")) return DAY_NAME_TO_SCHEMA[days] ?? [];
  const [start, end] = days.split(/–|-/).map((d) => d.trim());
  const order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const startIdx = order.indexOf(start);
  const endIdx = order.indexOf(end);
  if (startIdx === -1 || endIdx === -1) return [];
  return order.slice(startIdx, endIdx + 1);
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
    openingHoursSpecification: siteConfig.hours
      .filter((h) => h.time !== "Closed")
      .map((h) => {
        const [open, close] = h.time.split(/–|-/).map((t) => t.trim());
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: expandDayRange(h.days),
          opens: to24Hour(open),
          closes: to24Hour(close),
        };
      }),
  };
}

function to24Hour(time: string): string {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return time;
  const [, hourStr, minute, meridiem] = match;
  let hour = parseInt(hourStr, 10);
  if (meridiem.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (meridiem.toUpperCase() === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

// Blog structured data. Author is always the Elite Bathrooms organization,
// never a fabricated named person — no individual byline has been
// verified, so schema.org Person authorship would be invented. Dates come
// straight from BlogPost.publishedAt (the real date each article went
// live on this rebuild) — never a backdated or invented date.
export function blogCollectionSchema(postUrls: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bathroom Remodeling Resources",
    url: absoluteUrl("/blog"),
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: SITE_URL },
    hasPart: postUrls.map((url) => ({ "@type": "BlogPosting", "@id": url })),
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${post.slug}`),
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    ...(post.image ? { image: absoluteUrl(post.image) } : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt, dateModified: post.publishedAt } : {}),
    author: { "@type": "Organization", name: siteConfig.name, url: SITE_URL },
    publisher: { "@type": "Organization", name: siteConfig.name, url: SITE_URL },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
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
