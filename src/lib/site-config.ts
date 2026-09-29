export const siteConfig = {
  name: "Elite Bathrooms",
  domain: "elitebathrooms.com",
  phone: {
    display: "(206) 369-2688",
    href: "tel:+12063692688",
  },
  email: "info@elitebathrooms.com",
  address: {
    street: "415 St Helens Ave",
    city: "Tacoma",
    state: "WA",
    zip: "98402",
  },
  // Client-confirmed business hours — do not overwrite from the WordPress
  // frontend without explicit client sign-off on newer hours.
  hours: [
    { days: "Monday – Saturday", time: "8:00 AM – 6:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  // Verified by inspecting the live elitebathrooms.com footer directly.
  social: {
    facebook: "https://www.facebook.com/Elitetile.remodel/",
    instagram: "https://www.instagram.com/elitebathroomswa/",
  },
  warranty: {
    years: 10,
    label: "10-Year Waterproofing Warranty",
  },
  // Provided directly by the client — display as-is; update here if it changes.
  reviews: {
    rating: 5.0,
    count: 52,
    source: "Google",
  },
};

// Restructured per explicit client direction (supersedes the earlier
// verbatim-WordPress nav): Home / About / Services / Projects / Contact as
// the five top-level items, with About and Services carrying a dropdown.
// "Blog & Resources" lives only under About (not a 6th top-level item), and
// "Areas We Serve" lives only under Services, visually set apart at the
// bottom of that dropdown (see the `emphasized` flag below) rather than
// listing all 36 service-area cities in the navbar. `viewAllLabel` gives
// the mobile accordion body an explicit link to the parent's own hub page,
// only where that page isn't already one of the listed children (About's
// first child already covers /bathroom-remodel-company-seattle, so it has
// none — Services needs one, since its hub isn't repeated among the 6
// dropdown links).
export const primaryNav: {
  label: string;
  href: string;
  viewAllLabel?: string;
  children?: { label: string; href: string; description: string; emphasized?: boolean }[];
}[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/bathroom-remodel-company-seattle",
    children: [
      {
        label: "About Elite Bathrooms",
        href: "/bathroom-remodel-company-seattle",
        description: "Who we are and how we work",
      },
      {
        label: "Blog & Resources",
        href: "/blog",
        description: "Planning guides and remodeling advice",
      },
    ],
  },
  {
    label: "Services",
    href: "/bathroom-remodel-services",
    viewAllLabel: "View All Services",
    children: [
      {
        label: "Full Bathroom Remodel",
        href: "/services/full-bathroom-remodel",
        description: "Complete bathroom renovation",
      },
      {
        label: "Shower Remodel",
        href: "/services/shower-remodel",
        description: "Custom showers and replacements",
      },
      {
        label: "Bathtub Remodel",
        href: "/services/bathtub-remodel",
        description: "Tub replacement and surrounding upgrades",
      },
      {
        label: "Tub-to-Shower Conversion",
        href: "/services/bathroom-conversion",
        description: "Swap a tub for a walk-in shower",
      },
      {
        label: "One-Day Bathroom Renovation",
        href: "/services/one-day-bathroom-renovation",
        description: "Fast, focused bathroom upgrades",
      },
      {
        label: "Areas We Serve",
        href: "/service-area",
        description: "Every city and neighborhood we work in",
        emphasized: true,
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact-us" },
];

export const trustStats = [
  { label: "Bathroom Specialists" },
  { label: "5 Years in Business" },
  { label: "10-Year Waterproofing Warranty" },
  { label: "Financing Available" },
];
