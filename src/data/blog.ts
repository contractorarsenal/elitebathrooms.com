export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  sections: BlogSection[];
  relatedServiceSlug?: string;
  relatedAreaSlug?: string;
  status: "published" | "draft";
};

/**
 * Every published article here is written only from verified facts — our
 * own service definitions, our own process, and the one verified
 * waterproofing warranty. Nothing states a specific price, permit
 * requirement, or legal claim we haven't verified; where a topic needs
 * that kind of authoritative sourcing (cost figures, permit specifics),
 * it's listed below with status: "draft" and no content yet, rather than
 * published with invented numbers.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "tub-to-shower-vs-full-bathroom-remodel",
    title: "Tub-to-Shower Conversion vs. Full Bathroom Remodel",
    category: "Planning",
    excerpt:
      "Two different projects that solve two different problems. Here's how to tell which one your bathroom actually needs.",
    relatedServiceSlug: "tub-to-shower-conversion",
    relatedAreaSlug: "tacoma",
    status: "published",
    sections: [
      {
        heading: "What a Tub-to-Shower Conversion Actually Changes",
        paragraphs: [
          "A tub-to-shower conversion replaces an existing tub with a properly waterproofed walk-in shower, without touching the rest of the room. The layout, vanity, flooring, and everything outside the tub area generally stay as they are.",
          "It's the right call when the tub itself is the problem: a household that no longer needs it, or wants a walk-in shower instead, and the rest of the bathroom still works fine.",
        ],
      },
      {
        heading: "What a Full Bathroom Remodel Actually Changes",
        paragraphs: [
          "A full remodel rebuilds the room from the studs out: layout, waterproofing, tile, plumbing, electrical, and finish work, all coordinated as one project.",
          "It's the right call when more than one thing in the room needs to change (layout, storage, dated plumbing, or multiple fixtures at once), or when what's happening behind the walls needs to be addressed, not just what's visible.",
        ],
      },
      {
        heading: "How to Tell Which One You Need",
        paragraphs: [
          "If the honest answer to \"what's wrong with this bathroom\" is just the tub, a conversion probably covers it. If the answer involves the layout, the vanity, the flooring, or something you suspect is wrong underneath the surface, that points toward a full remodel.",
          "We don't guess at this over the phone. A consultation is where we look at the actual space and give you a straight answer about which project fits.",
        ],
      },
      {
        heading: "Waterproofing Doesn't Change Either Way",
        paragraphs: [
          "Whichever project fits, the waterproofing standard is the same: a fully sealed pan and wall assembly, backed by our 10-year waterproofing warranty against leaks.",
        ],
      },
    ],
  },
  {
    slug: "why-bathroom-waterproofing-matters",
    title: "Why Bathroom Waterproofing Matters",
    category: "Waterproofing",
    excerpt:
      "Tile is the last five percent of a bathroom. The waterproofing underneath it is what actually determines whether the room lasts.",
    relatedServiceSlug: "shower-remodel",
    status: "published",
    sections: [
      {
        heading: "Tile Isn't What Keeps Water Out",
        paragraphs: [
          "Grout lines aren't watertight, and tile alone was never designed to be a waterproofing layer. The actual barrier, the membrane and assembly underneath, is what determines whether water stays inside the shower or finds its way into the wall and subfloor.",
        ],
      },
      {
        heading: "What Proper Waterproofing Actually Involves",
        paragraphs: [
          "It starts with substrate preparation before a single tile is set, followed by a fully sealed pan, wall assembly, and niches, built to handle daily use, not just pass inspection on installation day.",
        ],
      },
      {
        heading: "What Happens When It's Done Wrong",
        paragraphs: [
          "Water finds the smallest gap over time. When waterproofing is skipped or rushed, the failure usually isn't visible until there's already damage behind the wall or under the floor, which is a far more expensive problem than the tile job itself.",
        ],
      },
      {
        heading: "Why We Back It With a 10-Year Warranty",
        paragraphs: [
          "Every bathroom we build (full remodels, shower remodels, and conversions alike) is backed by a 10-year waterproofing warranty against leaks. It's the part of the job you'll never see, which is exactly why we treat it as the part that matters most.",
        ],
      },
    ],
  },
  {
    slug: "one-day-bathroom-remodel-what-to-expect",
    title: "One-Day Bathroom Remodel: What It Includes and What It Doesn't",
    category: "Services",
    excerpt:
      "Fast, focused, and low-disruption, but not a fit for every bathroom. Here's exactly what's in scope.",
    relatedServiceSlug: "one-day-bathroom-renovation",
    status: "published",
    sections: [
      {
        heading: "What It Is",
        paragraphs: [
          "A one-day bathroom renovation is a streamlined renovation focused on key upgrades: tub or shower replacement, wall systems, fixtures, and finishing work. It relies on pre-planning, precise measurement, and prefabricated materials so the installation itself is fast and efficient.",
        ],
      },
      {
        heading: "What It Includes",
        paragraphs: [
          "Tub or shower replacement, prefabricated wall systems, fixture replacement, and finishing work, all planned and measured in advance so installation day moves quickly.",
        ],
      },
      {
        heading: "What It's Not Intended For",
        paragraphs: [
          "It's not built for major layout changes, significant structural changes, major plumbing or electrical relocation, or hidden structural or moisture issues that would require larger reconstruction. If any of those turn out to be part of the picture, a full bathroom remodel is the more realistic path.",
        ],
      },
      {
        heading: "Fast, Focused, Low-Disruption",
        paragraphs: [
          "The point of a one-day renovation isn't that it's the cheapest option. It's that it's fast and focused, with far less disruption to the rest of the house than a full remodel. Whether it fits your bathroom is something we can tell you directly during a consultation.",
        ],
      },
    ],
  },
  {
    slug: "how-long-does-a-bathroom-remodel-take",
    title: "How Long Does a Bathroom Remodel Take?",
    category: "Planning",
    excerpt:
      "There's no universal number, but there are real factors that determine your project's actual timeline.",
    relatedServiceSlug: "full-bathroom-remodel",
    relatedAreaSlug: "tacoma",
    status: "published",
    sections: [
      {
        heading: "Why There's No Universal Timeline",
        paragraphs: [
          "\"How long will this take\" depends entirely on scope. A tub-to-shower conversion and a full gut remodel are different projects with different timelines, and even two full remodels can differ significantly depending on materials and what's found once demolition starts.",
        ],
      },
      {
        heading: "What Actually Affects Duration",
        paragraphs: [
          "Scope of work, material lead times (especially custom tile or glass), permitting requirements for your city, and anything discovered behind the walls once demolition begins. All of these affect the schedule more than the size of the room does.",
        ],
      },
      {
        heading: "Conversions Move Faster Than Full Remodels",
        paragraphs: [
          "In general, a tub-to-shower conversion or one-day renovation moves through construction faster than a full bathroom remodel, simply because there's less being rebuilt. That's a relative difference, not a fixed number of days.",
        ],
      },
      {
        heading: "Getting a Project-Specific Timeline",
        paragraphs: [
          "We'd rather give you a real timeline based on your actual project than a generic range that doesn't hold up once we're inside the walls. That's part of what happens during your consultation.",
        ],
      },
    ],
  },

  // Planned topics — architecture ready, not published until sourced from
  // an authoritative reference (current Tacoma permit rules, real cost
  // data, etc.). No page is generated for these; listed on the hub as
  // upcoming so the content plan is visible without faking a source.
  { slug: "bathroom-remodel-cost-tacoma", title: "How Much Does a Bathroom Remodel Cost in Tacoma?", category: "Planning", excerpt: "", sections: [], status: "draft" },
  { slug: "bathroom-remodeling-permits-tacoma", title: "Bathroom Remodeling Permits in Tacoma", category: "Planning", excerpt: "", sections: [], status: "draft" },
  { slug: "what-is-included-full-bathroom-remodel", title: "What Is Included in a Full Bathroom Remodel?", category: "Services", excerpt: "", sections: [], status: "draft" },
  { slug: "curbless-shower-vs-traditional-shower", title: "Curbless Shower vs. Traditional Shower", category: "Design", excerpt: "", sections: [], status: "draft" },
  { slug: "heated-bathroom-floors-worth-it", title: "Heated Bathroom Floors: Are They Worth It?", category: "Design", excerpt: "", sections: [], status: "draft" },
  { slug: "how-to-plan-a-bathroom-remodel", title: "How to Plan a Bathroom Remodel", category: "Planning", excerpt: "", sections: [], status: "draft" },
  { slug: "what-to-expect-bathroom-demolition", title: "What to Expect During Bathroom Demolition", category: "Process", excerpt: "", sections: [], status: "draft" },
  { slug: "shower-replacement-vs-shower-remodel", title: "Shower Replacement vs. Shower Remodel", category: "Services", excerpt: "", sections: [], status: "draft" },
];

export function getPublishedPosts() {
  return blogPosts.filter((p) => p.status === "published");
}

export function getDraftPosts() {
  return blogPosts.filter((p) => p.status === "draft");
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug && p.status === "published");
}

/** ~200 wpm, computed from real section content — never hardcoded. */
export function readTimeMinutes(post: BlogPost) {
  const words = post.sections.reduce(
    (sum, s) => sum + s.heading.split(/\s+/).length + s.paragraphs.join(" ").split(/\s+/).length,
    0
  );
  return Math.max(1, Math.round(words / 200));
}
