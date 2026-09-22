export type Area = {
  slug: string;
  name: string;
  primary: boolean;
  blurb: string;
};

// The only 7 markets we're verified to actively serve. Do not add cities
// here without that verification — see the build spec's TACOMA section.
export const areas: Area[] = [
  {
    slug: "tacoma",
    name: "Tacoma",
    primary: true,
    blurb:
      "Tacoma is home base — our office is at 415 St Helens Ave, and it's where most of our crews start their day.",
  },
  {
    slug: "seattle",
    name: "Seattle",
    primary: false,
    blurb: "We regularly take on bathroom projects in Seattle alongside our Tacoma work.",
  },
  {
    slug: "bellevue",
    name: "Bellevue",
    primary: false,
    blurb: "Eastside homeowners in Bellevue work with the same crew and process as our Tacoma clients.",
  },
  {
    slug: "kirkland",
    name: "Kirkland",
    primary: false,
    blurb: "We serve Kirkland with the same waterproofing standard and process used across every market.",
  },
  {
    slug: "issaquah",
    name: "Issaquah",
    primary: false,
    blurb: "Issaquah homeowners get the same design-through-installation process as the rest of our service area.",
  },
  {
    slug: "sammamish",
    name: "Sammamish",
    primary: false,
    blurb: "We take on full remodels and conversions for Sammamish households.",
  },
  {
    slug: "puyallup",
    name: "Puyallup",
    primary: false,
    blurb: "Puyallup is close enough to Tacoma that scheduling and follow-up visits are straightforward.",
  },
];

export function getAreaBySlug(slug: string) {
  return areas.find((a) => a.slug === slug);
}

export const areaFaqs = [
  {
    question: "Do you handle permits?",
    answer:
      "Yes — permitting requirements vary by city and by scope of work, and we handle that as part of the project rather than leaving it to the homeowner.",
  },
  {
    question: "How long does a bathroom remodel take?",
    answer:
      "It depends on scope — a tub-to-shower conversion moves much faster than a full gut remodel. We'll give you a realistic timeline during your consultation once we know what the project actually involves.",
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
