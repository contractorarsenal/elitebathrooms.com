import type { NextConfig } from "next";

// Legacy WordPress → new site URL map, preserving SEO equity.
// Source: elitebathrooms.com sitemap inventory (page/services/projects/service-area).
//
// Next.js strips trailing slashes (308) before matching custom redirects,
// so `source` here is written WITHOUT a trailing slash to match the
// already-normalized request path. Old project slugs (/projects/<slug>/)
// need no explicit rule — that trailing-slash normalization alone gets
// them to the identical new-site path once /projects/[slug] ships.
//
// Non-verified legacy city pages (outside the 7 client-verified service
// areas) fold into the /areas-we-serve hub rather than being rebuilt
// individually.
const legacyCitySlugs = [
  "newcastle",
  "mercer-island",
  "tukwila",
  "seatac",
  "des-moines",
  "burien",
  "shoreline",
  "bothel",
  "kent",
  "renton",
  "redmond",
  "federal-way",
  "mukilteo",
  "edmonds",
  "kenmore",
  "poulsbo",
  "lake-forest-park",
  "black-diamond",
  "mountlake-terrace",
  "bainbridge-island",
  "enumclaw",
  "everett",
  "lynnwood",
  "mill-creek",
  "covington",
  "auburn",
  "maple-valley",
  "snoqualmie",
  "woodinville",
];

const legacyCityRedirects = legacyCitySlugs.map((slug) => ({
  source: `/service-area/bathroom-remodel-${slug}`,
  destination: "/areas-we-serve",
  permanent: true,
}));

const verifiedAreaSlugs = [
  "tacoma",
  "seattle",
  "bellevue",
  "kirkland",
  "issaquah",
  "sammamish",
  "puyallup",
];

const verifiedAreaRedirects = verifiedAreaSlugs.map((slug) => ({
  source: `/service-area/bathroom-remodel-${slug}`,
  destination: `/areas-we-serve/${slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/bathroom-remodel-company-seattle", destination: "/about", permanent: true },
      { source: "/bathroom-remodeling-seattle", destination: "/about", permanent: true },
      { source: "/bathroom-remodel-services", destination: "/services", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/thank-you", destination: "/get-a-quote/thank-you", permanent: true },
      { source: "/service-area", destination: "/areas-we-serve", permanent: true },

      // Interim /estimate URL from the first build pass — now canonicalized
      // to /get-a-quote to match the original WordPress slug exactly.
      { source: "/estimate", destination: "/get-a-quote", permanent: true },
      { source: "/estimate/thank-you", destination: "/get-a-quote/thank-you", permanent: true },

      // /services/full-bathroom-remodel, /shower-remodel, /bathtub-remodel, and
      // /one-day-bathroom-renovation need no rule — those pages live at the
      // exact old WP slugs. Only /bathroom-conversion (retired) needs a rule.
      { source: "/services/bathroom-conversion", destination: "/services/tub-to-shower-conversion", permanent: true },

      ...verifiedAreaRedirects,
      ...legacyCityRedirects,
    ];
  },
};

export default nextConfig;
