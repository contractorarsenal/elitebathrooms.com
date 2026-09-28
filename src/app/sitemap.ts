import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { areas } from "@/data/areas";
import { wpSourcedAreas } from "@/data/areas-wp-sourced";
import { getPublishedPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/bathroom-remodel-services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/service-area`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/bathroom-remodel-company-seattle`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/process`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/financing`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact-us`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/get-a-quote`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/cookie-policy`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: s.slug === "full-bathroom-remodel" ? 1 : 0.85,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const areaRoutes: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${SITE_URL}/service-area/${a.slug}`,
    changeFrequency: "monthly",
    priority: a.primary ? 0.9 : 0.7,
  }));

  // The 29 WordPress-sourced service-area pages (see
  // src/data/areas-wp-sourced.ts / docs/migration/rebuild-reconciliation.md)
  // were live and indexed on WordPress, so they're included here too,
  // just at a lower priority than the 7 verified markets.
  const wpAreaRoutes: MetadataRoute.Sitemap = wpSourcedAreas.map((a) => ({
    url: `${SITE_URL}/service-area/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getPublishedPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...areaRoutes, ...wpAreaRoutes, ...blogRoutes];
}
