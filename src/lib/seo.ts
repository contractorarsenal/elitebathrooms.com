// Apex domain, no www — matches WordPress's own long-standing canonical
// (confirmed via <link rel="canonical"> on the live site and archived
// pages: https://elitebathrooms.com/, never the www host). At Production,
// www.elitebathrooms.com must 301 to this apex domain at the DNS/Cloudflare
// layer — see docs/migration/production-cutover-checklist.md.
export const SITE_URL = "https://elitebathrooms.com";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
