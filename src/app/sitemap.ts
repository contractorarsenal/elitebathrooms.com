import type { MetadataRoute } from "next";

// Only lists routes that actually exist. Grows as /services, /projects,
// /about, /areas-we-serve, and /contact ship in the next build pass.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.elitebathrooms.com";

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/estimate`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${base}/cookie-policy`, changeFrequency: "yearly", priority: 0.1 },
  ];
}
