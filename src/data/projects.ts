export type Project = {
  slug: string;
  title: string;
  type: string;
  image: string;
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
// TODO: replace image slots with real photos once available.
export const projects: Project[] = [
  {
    slug: "luxury-full-bathroom-remodel",
    title: "Luxury Full Bathroom Remodel",
    type: "Full Remodel",
    image: "/images/project-bathroom-01.jpg",
    tags: ["Full remodel", "Premium finishes", "Custom tile"],
    description:
      "A complete bathroom remodel focused on elevated finishes and a more refined everyday layout.",
  },
  {
    slug: "glass-shower-remodel",
    title: "Glass Shower Remodel",
    type: "Shower Remodel",
    image: "/images/project-bathroom-02.jpg",
    tags: ["Frameless glass", "Shower remodel", "Waterproofed pan"],
    description:
      "A shower remodel centered on a clean frameless glass enclosure and a properly waterproofed pan and wall assembly.",
  },
  {
    slug: "double-vanity-upgrade",
    title: "Double Vanity Upgrade",
    type: "Full Remodel",
    image: "/images/project-bathroom-03.jpg",
    tags: ["Double vanity", "Custom tile", "Updated lighting"],
    description:
      "A complete bathroom refresh focused on better storage, cleaner lines, and a more functional everyday layout.",
  },
  {
    slug: "heated-floor-bathroom",
    title: "Heated Floor Bathroom",
    type: "Full Remodel",
    image: "/images/project-bathroom-04.jpg",
    tags: ["Heated floors", "Full remodel", "Tile"],
    description:
      "A full remodel built around heated floors for a warmer, more comfortable everyday bathroom.",
  },
  {
    slug: "spa-inspired-bathroom",
    title: "Spa-Inspired Bathroom",
    type: "Full Remodel",
    image: "/images/project-bathroom-05.jpg",
    tags: ["Full remodel", "Spa-inspired finishes", "Tile"],
    description: "A full remodel designed around a calmer, spa-inspired material palette and layout.",
  },
  {
    slug: "old-bathroom-shower-upgrade",
    title: "Old Bathroom Shower Upgrade",
    type: "Shower Remodel",
    image: "/images/project-bathroom-06.jpg",
    tags: ["Shower remodel", "Updated fixtures", "Waterproofed pan"],
    description:
      "A shower-focused upgrade that replaced dated fixtures and rebuilt the pan and wall assembly correctly.",
  },
  {
    slug: "bathtub-area-renovation-project",
    title: "Bathtub Area Renovation",
    type: "Full Remodel",
    image: "/images/project-bathroom-07.jpg",
    tags: ["Bathtub remodel", "Tile surround", "Full remodel"],
    description: "A renovation centered on the bathtub area, including a rebuilt tile surround.",
  },
  {
    slug: "luxury-bathroom-renovation",
    title: "Luxury Bathroom Renovation",
    type: "Full Remodel",
    image: "/images/project-bathroom-08.jpg",
    tags: ["Full remodel", "Premium finishes", "Custom tile"],
    description: "A full renovation focused on elevated finishes throughout the room.",
  },
  {
    slug: "ensuite-bathroom-project",
    title: "Ensuite Bathroom Project",
    type: "Full Remodel",
    image: "/images/project-bathroom-09.jpg",
    tags: ["Full remodel", "Primary ensuite", "Tile"],
    description: "A full remodel of a primary ensuite bathroom.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
