export type Service = {
  slug: string;
  name: string;
  summary: string;
  image: string;
};

// Full remodeling is the primary offer; conversions/one-day work is folded
// in rather than given the oversized "1 DAY" treatment the old site used.
export const services: Service[] = [
  {
    slug: "full-bathroom-remodeling",
    name: "Full Bathroom Remodeling",
    summary:
      "Gut renovations built from the studs out — layout, waterproofing, tile, plumbing, electrical, and finish work handled end to end.",
    image: "/images/project-bathroom-01.jpg",
  },
  {
    slug: "shower-remodeling",
    name: "Shower Remodeling",
    summary:
      "Frameless glass, large-format tile, and properly waterproofed pan and wall assemblies built to last.",
    image: "/images/elite-installation.jpg",
  },
  {
    slug: "tub-to-shower-conversion",
    name: "Tub-to-Shower Conversions",
    summary:
      "Fast, clean conversions for households that need a walk-in shower without a full gut remodel.",
    image: "/images/elite-crew-planning.jpg",
  },
  {
    slug: "bathtub-remodeling",
    name: "Bathtub Remodeling",
    summary:
      "Freestanding soaking tubs, tile surrounds, and fixture upgrades that anchor the room.",
    image: "/images/elite-design-consultation.jpg",
  },
];
