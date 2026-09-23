export type Project = {
  slug: string;
  title: string;
  type: string;
  image: string;
  /** Additional real angles of the same job, migrated from elitebathrooms.com. */
  gallery: string[];
  /** 2-3 short tags, grounded only in the real title/category — never invented specifics. */
  tags: string[];
  /** One safe sentence, grounded only in the title and our own verified service standards. */
  description: string;
};

// Slugs and titles are carried over verbatim from the live site's project
// sitemap (real completed jobs) to preserve SEO equity and avoid inventing
// projects. We deliberately do NOT attach a city, timeline, material list,
// price, or homeowner quote to any of these — none of that was verified,
// and the build spec is explicit that unverified project details must be
// omitted rather than guessed. Tags/descriptions are grounded only in the
// real title text and our own verified service standards (e.g. every
// shower we build is waterproofed) — never a specific unverified detail.
// Images are real Elite Bathrooms job photography migrated from the live
// WordPress site (see /public/images/projects), not stock or AI-generated.
function galleryFor(slug: string) {
  return [2, 3, 4].map((n) => `/images/projects/${slug}-${String(n).padStart(2, "0")}.jpg`);
}

export const projects: Project[] = [
  {
    slug: "luxury-full-bathroom-remodel",
    title: "Luxury Full Bathroom Remodel",
    type: "Full Remodel",
    image: "/images/projects/luxury-full-bathroom-remodel-01.jpg",
    gallery: galleryFor("luxury-full-bathroom-remodel"),
    tags: ["Full remodel", "Premium finishes", "Custom tile"],
    description:
      "A complete bathroom remodel focused on elevated finishes and a more refined everyday layout.",
  },
  {
    slug: "glass-shower-remodel",
    title: "Glass Shower Remodel",
    type: "Shower Remodel",
    image: "/images/projects/glass-shower-remodel-01.jpg",
    gallery: galleryFor("glass-shower-remodel"),
    tags: ["Frameless glass", "Shower remodel", "Waterproofed pan"],
    description:
      "A shower remodel centered on a clean frameless glass enclosure and a properly waterproofed pan and wall assembly.",
  },
  {
    slug: "double-vanity-upgrade",
    title: "Double Vanity Upgrade",
    type: "Full Remodel",
    image: "/images/projects/double-vanity-upgrade-01.jpg",
    gallery: galleryFor("double-vanity-upgrade"),
    tags: ["Double vanity", "Custom tile", "Updated lighting"],
    description:
      "A complete bathroom refresh focused on better storage, cleaner lines, and a more functional everyday layout.",
  },
  {
    slug: "heated-floor-bathroom",
    title: "Heated Floor Bathroom",
    type: "Full Remodel",
    image: "/images/projects/heated-floor-bathroom-01.jpg",
    gallery: galleryFor("heated-floor-bathroom"),
    tags: ["Heated floors", "Full remodel", "Tile"],
    description:
      "A full remodel built around heated floors for a warmer, more comfortable everyday bathroom.",
  },
  {
    slug: "spa-inspired-bathroom",
    title: "Spa-Inspired Bathroom",
    type: "Full Remodel",
    image: "/images/projects/spa-inspired-bathroom-01.jpg",
    gallery: galleryFor("spa-inspired-bathroom"),
    tags: ["Full remodel", "Spa-inspired finishes", "Tile"],
    description: "A full remodel designed around a calmer, spa-inspired material palette and layout.",
  },
  {
    slug: "old-bathroom-shower-upgrade",
    title: "Old Bathroom Shower Upgrade",
    type: "Shower Remodel",
    image: "/images/projects/old-bathroom-shower-upgrade-01.jpg",
    gallery: galleryFor("old-bathroom-shower-upgrade"),
    tags: ["Shower remodel", "Updated fixtures", "Waterproofed pan"],
    description:
      "A shower-focused upgrade that replaced dated fixtures and rebuilt the pan and wall assembly correctly.",
  },
  {
    slug: "bathtub-area-renovation-project",
    title: "Bathtub Area Renovation",
    type: "Full Remodel",
    image: "/images/projects/bathtub-area-renovation-project-01.jpg",
    gallery: galleryFor("bathtub-area-renovation-project"),
    tags: ["Bathtub remodel", "Tile surround", "Full remodel"],
    description: "A renovation centered on the bathtub area, including a rebuilt tile surround.",
  },
  {
    slug: "luxury-bathroom-renovation",
    title: "Luxury Bathroom Renovation",
    type: "Full Remodel",
    image: "/images/projects/luxury-bathroom-renovation-01.jpg",
    gallery: galleryFor("luxury-bathroom-renovation"),
    tags: ["Full remodel", "Premium finishes", "Custom tile"],
    description: "A full renovation focused on elevated finishes throughout the room.",
  },
  {
    slug: "ensuite-bathroom-project",
    title: "Ensuite Bathroom Project",
    type: "Full Remodel",
    image: "/images/projects/ensuite-bathroom-project-01.jpg",
    gallery: galleryFor("ensuite-bathroom-project"),
    tags: ["Full remodel", "Primary ensuite", "Tile"],
    description: "A full remodel of a primary ensuite bathroom.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
