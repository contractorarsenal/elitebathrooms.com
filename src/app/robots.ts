import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/get-a-quote/thank-you"],
      },
    ],
    sitemap: "https://www.elitebathrooms.com/sitemap.xml",
  };
}
