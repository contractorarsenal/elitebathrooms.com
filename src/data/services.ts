export type Service = {
  slug: string;
  name: string;
  summary: string;
  intro: string;
  features: string[];
  heroImage: string;
  cardImage: string;
  /** Matches Project["type"] for mechanical related-work lookups — never a hardcoded, unverifiable claim. */
  projectType: string;
};

// Full remodeling is the primary offer; conversions/one-day work is folded
// in rather than given the oversized "1 DAY" treatment the old site used.
// Slugs match the original WordPress URLs exactly (full-bathroom-remodel,
// shower-remodel, bathtub-remodel) to preserve SEO equity with zero
// redirect hops; tub-to-shower-conversion consolidates the old
// bathroom-conversion + one-day-bathroom-renovation pages.
export const services: Service[] = [
  {
    slug: "full-bathroom-remodel",
    name: "Full Bathroom Remodel",
    summary:
      "Gut renovations built from the studs out — layout, waterproofing, tile, plumbing, electrical, and finish work handled end to end.",
    intro:
      "A full bathroom remodel means we're not working around what's already there — we're rebuilding the room correctly, from framing to final fixture. Design consultation, material selection, demolition, waterproofing, tile, plumbing, electrical, heated floors, vanities, painting, and custom glass all happen under one crew, so nothing gets lost between contractors.",
    features: [
      "Design consultation and material selection",
      "Full demolition and structural prep",
      "Substrate preparation and waterproofing",
      "Tile — floors, walls, showers, and niches",
      "Plumbing and electrical rough-in and finish",
      "Heated floor installation",
      "Vanities, lighting, and painting",
      "Custom frameless glass",
      "Final walkthrough and warranty documentation",
    ],
    heroImage: "/images/service-full-bathroom-remodel-hero.jpg",
    cardImage: "/images/project-bathroom-01.jpg",
    projectType: "Full Remodel",
  },
  {
    slug: "shower-remodel",
    name: "Shower Remodel",
    summary:
      "Frameless glass, large-format tile, and properly waterproofed pan and wall assemblies built to last.",
    intro:
      "Most shower failures aren't tile problems — they're waterproofing problems. We rebuild the pan and wall assembly correctly before a single tile goes up, then finish with the glass, fixtures, and tile pattern you actually want.",
    features: [
      "Full pan and wall waterproofing",
      "Large-format and mosaic tile options",
      "Frameless or semi-frameless glass",
      "Built-in niches and benches",
      "Rain heads, handhelds, and body sprays",
      "ADA-friendly and curbless configurations available",
    ],
    heroImage: "/images/service-shower-remodel-hero.jpg",
    cardImage: "/images/elite-installation.jpg",
    projectType: "Shower Remodel",
  },
  {
    slug: "tub-to-shower-conversion",
    name: "Tub-to-Shower Conversion",
    summary:
      "Fast, clean conversions for households that need a walk-in shower without a full gut remodel.",
    intro:
      "When a full remodel isn't necessary — or an existing tub no longer makes sense for the household — we convert it to a properly waterproofed walk-in shower without tearing the rest of the room apart.",
    features: [
      "Tub removal and disposal",
      "New waterproofed pan and wall assembly",
      "Glass enclosure or shower curtain option",
      "Grab bars and low-threshold entry available",
      "Matched tile and finish work",
    ],
    heroImage: "/images/service-tub-to-shower-hero.jpg",
    cardImage: "/images/elite-crew-planning.jpg",
    projectType: "Shower Remodel",
  },
  {
    slug: "bathtub-remodel",
    name: "Bathtub Remodel",
    summary:
      "Freestanding soaking tubs, tile surrounds, and fixture upgrades that anchor the room.",
    intro:
      "Whether it's a freestanding soaking tub or a rebuilt tub surround, the bathtub is usually the focal point of the room — worth getting the waterproofing, tile, and fixtures right the first time.",
    features: [
      "Freestanding and alcove tub installation",
      "Tile surround and deck options",
      "Waterproofed tub-to-wall transitions",
      "Filler and fixture upgrades",
      "Surround lighting and niches",
    ],
    heroImage: "/images/service-bathtub-remodel-hero.jpg",
    cardImage: "/images/elite-design-consultation.jpg",
    projectType: "Full Remodel",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
