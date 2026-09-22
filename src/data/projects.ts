export type Project = {
  slug: string;
  title: string;
  type: string;
  image: string;
};

// Slugs and titles are carried over verbatim from the live site's project
// sitemap (real completed jobs) to preserve SEO equity and avoid inventing
// projects. We deliberately do NOT attach a city, timeline, material list,
// price, or homeowner quote to any of these — none of that was verified,
// and the build spec is explicit that unverified project details must be
// omitted rather than guessed. TODO: replace image slots with real photos
// and add any of the above fields only once verified against source data.
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
  {
    slug: "bathtub-area-renovation-project",
    title: "Bathtub Area Renovation",
    type: "Full Remodel",
    image: "/images/project-bathroom-07.jpg",
  },
  {
    slug: "luxury-bathroom-renovation",
    title: "Luxury Bathroom Renovation",
    type: "Full Remodel",
    image: "/images/project-bathroom-08.jpg",
  },
  {
    slug: "ensuite-bathroom-project",
    title: "Ensuite Bathroom Project",
    type: "Full Remodel",
    image: "/images/project-bathroom-09.jpg",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
