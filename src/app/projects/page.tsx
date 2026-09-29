import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsHubIntro } from "@/components/sections/ProjectsHubIntro";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { ThumbtackReviews } from "@/components/sections/ThumbtackReviews";
import { WarrantyStrip } from "@/components/sections/WarrantyStrip";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Renovation Projects - Modern & Functional Bathrooms",
  description:
    "Completed bathroom renovation projects from Elite Bathrooms: full remodels, shower remodels, and conversions in Seattle and the greater Puget Sound area.",
  alternates: { canonical: absoluteUrl("/projects") },
};

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Projects" }]}
        title="Bathroom Renovation Projects - Modern & Functional Bathrooms"
      />
      <ProjectsHubIntro />
      <ProjectsGrid />
      <GoogleReviews />
      <ThumbtackReviews />
      <WarrantyStrip />
    </main>
  );
}
