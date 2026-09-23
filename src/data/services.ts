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
  /** Short positioning line, used on One-Day's bento cell and hero. */
  positioning?: string;
  /** "Good fit if" bullets for the Is This Right For You? section. */
  goodFor?: string[];
  /** Honest scope boundaries — shown so the service isn't oversold. */
  notFor?: string[];
  /** Cross-sell to a bigger service when this one isn't enough (One-Day → Full Remodel). */
  crossSell?: { label: string; description: string; slug: string };
};

// Slugs match the original WordPress URLs exactly (full-bathroom-remodel,
// shower-remodel, bathtub-remodel, one-day-bathroom-renovation) to preserve
// SEO equity with zero redirect hops. tub-to-shower-conversion consolidates
// the old bathroom-conversion page. Order matches the homepage/services-hub
// Bento weighting: Full Remodel first and largest, One-Day last and
// smallest — it's real, but it's not the primary offer.
export const services: Service[] = [
  {
    slug: "full-bathroom-remodel",
    name: "Full Bathroom Remodel",
    summary:
      "Gut renovations built from the studs out: layout, waterproofing, tile, plumbing, electrical, and finish work handled end to end.",
    intro:
      "A full bathroom remodel means we're not working around what's already there. We're rebuilding the room correctly, from framing to final fixture. Design consultation, material selection, demolition, waterproofing, tile, plumbing, electrical, heated floors, vanities, painting, and custom glass all happen under one coordinated project, so nothing gets lost between trades.",
    features: [
      "Design consultation and material selection",
      "Full demolition and structural prep",
      "Substrate preparation and waterproofing",
      "Tile: floors, walls, showers, and niches",
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
      "Most shower failures aren't tile problems. They're waterproofing problems. We rebuild the pan and wall assembly correctly before a single tile goes up, then finish with the glass, fixtures, and tile pattern you actually want.",
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
    slug: "bathtub-remodel",
    name: "Bathtub Remodel",
    summary:
      "Freestanding soaking tubs, tile surrounds, and fixture upgrades that anchor the room.",
    intro:
      "Whether it's a freestanding soaking tub or a rebuilt tub surround, the bathtub is usually the focal point of the room, so it's worth getting the waterproofing, tile, and fixtures right the first time.",
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
  {
    slug: "tub-to-shower-conversion",
    name: "Tub-to-Shower Conversion",
    summary:
      "Fast, clean conversions for households that need a walk-in shower without a full gut remodel.",
    intro:
      "When a full remodel isn't necessary, or an existing tub no longer makes sense for the household, we convert it to a properly waterproofed walk-in shower without tearing the rest of the room apart.",
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
    slug: "one-day-bathroom-renovation",
    name: "One-Day Bathroom Renovation",
    summary: "A streamlined renovation for key upgrades: fast, focused, and low-disruption.",
    intro:
      "A one-day bathroom renovation is a streamlined renovation focused on key upgrades: tub/shower replacement, wall systems, fixtures, and finishing work. It's built on pre-planning, precise measurement, and prefabricated materials so installation is fast and efficient.",
    features: [
      "Tub or shower replacement",
      "Prefabricated wall systems",
      "Fixture replacement",
      "Finishing work",
      "Pre-planned, precisely measured installation",
    ],
    goodFor: [
      "Surface-focused upgrades",
      "Same-layout replacements",
      "Tub or shower replacement",
      "Minimal downtime",
    ],
    notFor: [
      "Major layout changes",
      "Significant structural changes",
      "Major plumbing relocation",
      "Major electrical relocation",
      "Hidden structural or moisture issues requiring larger reconstruction",
    ],
    crossSell: {
      label: "Need more than a one-day update?",
      description: "Explore Full Bathroom Remodeling",
      slug: "full-bathroom-remodel",
    },
    positioning: "Fast. Focused. Low-disruption.",
    heroImage: "/images/service-one-day-renovation-hero.jpg",
    cardImage: "/images/elite-installation.jpg",
    projectType: "Shower Remodel",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
