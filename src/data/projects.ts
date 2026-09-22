export type Project = {
  slug: string;
  title: string;
  type: string;
  image: string;
};

// Slugs and titles are carried over verbatim from the live site's project
// sitemap (real completed jobs) to preserve SEO equity and avoid inventing
// projects. TODO: attach verified city/scope copy and real photography per
// project before this leaves the design pass — none of that is fabricated
// here, only the real title/slug pairs are used.
export const projects: Project[] = [
  {
    slug: "luxury-full-bathroom-remodel",
    title: "Luxury Full Bathroom Remodel",
    type: "Full Remodel",
    image: "/images/project-bathroom-01.jpg",
  },
  {
    slug: "glass-shower-remodel",
    title: "Glass Shower Remodel",
    type: "Shower Remodel",
    image: "/images/project-bathroom-02.jpg",
  },
  {
    slug: "double-vanity-upgrade",
    title: "Double Vanity Upgrade",
    type: "Full Remodel",
    image: "/images/project-bathroom-03.jpg",
  },
  {
    slug: "heated-floor-bathroom",
    title: "Heated Floor Bathroom",
    type: "Full Remodel",
    image: "/images/project-bathroom-04.jpg",
  },
  {
    slug: "spa-inspired-bathroom",
    title: "Spa-Inspired Bathroom",
    type: "Full Remodel",
    image: "/images/project-bathroom-05.jpg",
  },
  {
    slug: "old-bathroom-shower-upgrade",
    title: "Old Bathroom Shower Upgrade",
    type: "Shower Remodel",
    image: "/images/project-bathroom-06.jpg",
  },
];
