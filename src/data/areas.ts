export type Area = {
  slug: string;
  name: string;
  primary: boolean;
  /** Short line used in nav-style listings (footer, area hub cards, service area strips). */
  blurb: string;
  /** Longer hero/intro paragraph, unique per area — geography only, no invented local claims. */
  intro: string;
  /** One line introducing the services list for this area. */
  serviceIntro: string;
  /** Honest, non-fabricated geographic/coverage context (distance, region, travel). */
  localContext: string;
  /** 1-2 extra FAQs unique to this area, appended after the shared area FAQs. */
  faq?: { question: string; answer: string }[];
  metadataDescription: string;
};

// The only 7 markets we're verified to actively serve. Do not add cities
// here without that verification — see the build spec's TACOMA section.
//
// Copy is written to be genuinely useful and non-duplicate across areas
// without inventing anything city-specific we haven't verified: no claimed
// project counts, no "most homes here" generalizations, no permit specifics,
// no neighborhood expertise. Differentiation comes from real, safe
// geography (Eastside vs. South Sound vs. Tacoma home base) and from
// varying which parts of the process each intro leads with, not from
// fabricated local detail.
export const areas: Area[] = [
  {
    slug: "tacoma",
    name: "Tacoma",
    primary: true,
    blurb:
      "Tacoma is home base. Our office is at 415 St Helens Ave, and it's where most of our crews start their day.",
    intro:
      "Elite Bathrooms is headquartered in Tacoma, and Tacoma is where most of our projects and most of our crews start their day. We specialize exclusively in bathrooms: full remodels, shower remodels, bathtub remodels, tub-to-shower conversions, and one-day renovations, all backed by the same 10-year waterproofing warranty.",
    serviceIntro: "Every bathroom service we offer, available to Tacoma homeowners.",
    localContext:
      "Tacoma is our home base, not just a service area. Our office is at 415 St Helens Ave, and being local means shorter travel for consultations, easier scheduling, and faster follow-up visits after the project wraps.",
    faq: [
      {
        question: "Is Elite Bathrooms actually based in Tacoma?",
        answer:
          "Yes. Our office is at 415 St Helens Ave, Tacoma, WA 98402, and it's where most of our crews start their day before heading to a job site.",
      },
    ],
    metadataDescription:
      "Elite Bathrooms is a Tacoma-based bathroom remodeling contractor: full remodels, shower remodels, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
  },
  {
    slug: "seattle",
    name: "Seattle",
    primary: false,
    blurb: "We regularly take on bathroom projects in Seattle alongside our Tacoma work.",
    intro:
      "Elite Bathrooms takes on bathroom remodeling projects throughout Seattle alongside our Tacoma-based work. Whether it's a full gut remodel or a faster one-day renovation, Seattle homeowners get the same specialists, the same waterproofing standard, and the same coordinated process as every other market we serve.",
    serviceIntro: "Every bathroom service we offer, available to Seattle homeowners.",
    localContext:
      "Seattle sits about 30 to 40 minutes north of our Tacoma office depending on traffic, which is well within the range we schedule consultations and site visits in regularly.",
    metadataDescription:
      "Elite Bathrooms remodels bathrooms in Seattle, WA: full remodels, shower remodels, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
  },
  {
    slug: "bellevue",
    name: "Bellevue",
    primary: false,
    blurb: "Eastside homeowners in Bellevue work with the same crew and process as our Tacoma clients.",
    intro:
      "Bellevue homeowners on the Eastside work with the exact same crew, process, and waterproofing standard we use on every Elite Bathrooms project. From an initial consultation through the final walkthrough, nothing about the process changes based on which city you're in.",
    serviceIntro: "Every bathroom service we offer, available to Bellevue homeowners.",
    localContext:
      "Bellevue is on the Eastside of the greater Seattle area. We coordinate consultations and project scheduling around the drive from Tacoma, the same way we do for every market outside our home base.",
    metadataDescription:
      "Elite Bathrooms remodels bathrooms in Bellevue, WA: full remodels, shower remodels, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
  },
  {
    slug: "kirkland",
    name: "Kirkland",
    primary: false,
    blurb: "We serve Kirkland with the same waterproofing standard and process used across every market.",
    intro:
      "We serve Kirkland with the same waterproofing standard and coordinated process used across every market we work in. A full bathroom remodel, a shower remodel, or a tub-to-shower conversion all follow the same design-through-installation approach, regardless of which service area the project is in.",
    serviceIntro: "Every bathroom service we offer, available to Kirkland homeowners.",
    localContext:
      "Kirkland is on the Eastside, along Lake Washington. Like our other Eastside markets, we build travel time into scheduling so consultations and follow-up visits stay straightforward.",
    metadataDescription:
      "Elite Bathrooms remodels bathrooms in Kirkland, WA: full remodels, shower remodels, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
  },
  {
    slug: "issaquah",
    name: "Issaquah",
    primary: false,
    blurb: "Issaquah homeowners get the same design-through-installation process as the rest of our service area.",
    intro:
      "Issaquah homeowners get the same design-through-installation process as every other market we serve: a consultation to understand the project, a plan finalized before demolition, proper waterproofing behind the tile, and a final walkthrough once the work is done.",
    serviceIntro: "Every bathroom service we offer, available to Issaquah homeowners.",
    localContext:
      "Issaquah sits east of Lake Sammamish, further from our Tacoma office than our closer-in markets. We plan site visits and installation schedules accordingly, the same way we do for the rest of the Eastside.",
    metadataDescription:
      "Elite Bathrooms remodels bathrooms in Issaquah, WA: full remodels, shower remodels, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
  },
  {
    slug: "sammamish",
    name: "Sammamish",
    primary: false,
    blurb: "We take on full remodels and conversions for Sammamish households.",
    intro:
      "We take on full bathroom remodels, shower and bathtub remodels, and tub-to-shower conversions for households on the Sammamish Plateau. The scope of the project determines the plan, not which city it's in, and every job is backed by the same 10-year waterproofing warranty.",
    serviceIntro: "Every bathroom service we offer, available to Sammamish homeowners.",
    localContext:
      "Sammamish is on the eastern edge of our Eastside coverage. Consultations and project scheduling are coordinated the same way as our other Eastside markets, around the drive from Tacoma.",
    metadataDescription:
      "Elite Bathrooms remodels bathrooms in Sammamish, WA: full remodels, shower remodels, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
  },
  {
    slug: "puyallup",
    name: "Puyallup",
    primary: false,
    blurb: "Puyallup is close enough to Tacoma that scheduling and follow-up visits are straightforward.",
    intro:
      "Puyallup is close enough to our Tacoma office that scheduling consultations, site visits, and follow-up appointments is straightforward. South Sound homeowners get the same specialists and the same waterproofing standard as every Elite Bathrooms project.",
    serviceIntro: "Every bathroom service we offer, available to Puyallup homeowners.",
    localContext:
      "Puyallup is in the South Sound, close to our Tacoma home base. That short travel distance means scheduling flexibility and quick turnaround on follow-up visits after the project is complete.",
    metadataDescription:
      "Elite Bathrooms remodels bathrooms in Puyallup, WA: full remodels, shower remodels, and tub-to-shower conversions, backed by a 10-year waterproofing warranty.",
  },
];

export function getAreaBySlug(slug: string) {
  return areas.find((a) => a.slug === slug);
}

export const areaFaqs = [
  {
    question: "Do you handle permits?",
    answer:
      "Yes. Permitting requirements vary by city and by scope of work, and we handle that as part of the project rather than leaving it to the homeowner.",
  },
  {
    question: "How long does a bathroom remodel take?",
    answer:
      "It depends on scope. A tub-to-shower conversion moves much faster than a full gut remodel. We'll give you a realistic timeline during your consultation once we know what the project actually involves.",
  },
  {
    question: "Do I need to move out during the project?",
    answer:
      "Not usually, unless it's your only bathroom. We work to keep disruption to the rest of the house to a minimum.",
  },
  {
    question: "What's covered under the waterproofing warranty?",
    answer:
      "Every bathroom we build is backed by a 10-year waterproofing warranty against leaks. Ask us for the specifics during your consultation.",
  },
];

/** Shared "planning a remodel" content, reused across area pages with the area name interpolated. */
export const planningPoints = [
  {
    title: "Scope",
    body: "What actually needs to change: just a tub or shower, or the layout, storage, and finishes throughout the room.",
  },
  {
    title: "Layout",
    body: "Whether the existing footprint works or needs to be reconfigured, which affects plumbing and timeline.",
  },
  {
    title: "Fixtures & Materials",
    body: "Tile, vanity, glass, and fixtures selected during design, before demolition starts.",
  },
  {
    title: "Waterproofing",
    body: "A fully sealed pan and wall assembly behind every shower and tub, not an afterthought.",
  },
  {
    title: "Timeline",
    body: "Realistic scheduling based on scope and material lead times, not a generic estimate.",
  },
  {
    title: "Budget",
    body: "A straightforward conversation about investment range, with financing available for qualifying projects.",
  },
];

/** Shared "why Elite" reasons, reused across area pages. */
export const whyEliteReasons = [
  { title: "Bathroom specialization", body: "We don't spread across kitchens or additions. Bathrooms are the only thing we build." },
  { title: "Proper preparation", body: "Layout, materials, and fixtures are planned before demolition starts, not decided mid-project." },
  { title: "Waterproofing", body: "Every wet area gets a fully sealed pan and wall assembly, backed by a 10-year warranty." },
  { title: "Project coordination", body: "Design, demolition, waterproofing, tile, plumbing, and electrical stay coordinated as one project." },
  { title: "Communication", body: "You work with the people planning your project, not a rotating cast of subcontractors." },
];
