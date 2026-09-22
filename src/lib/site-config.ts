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
  social: {
    facebook: "https://www.facebook.com/elitebathrooms",
    instagram: "https://www.instagram.com/elitebathrooms",
  },
  warranty: {
    years: 10,
    label: "10-Year Waterproofing Warranty",
  },
};

// Primary nav points into homepage sections for now — dedicated /about,
// /services/[slug], /projects/[slug] and /areas-we-serve/[city] pages are
// the next build pass per the staged rollout plan. /estimate is real.
export const primaryNav = [
  { label: "Bathroom Remodeling", href: "/#services" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Areas We Serve", href: "/#areas" },
  { label: "About", href: "/#about" },
];

export const serviceAreas = {
  primary: { name: "Tacoma", slug: "tacoma" },
  secondary: [
    { name: "Seattle", slug: "seattle" },
    { name: "Bellevue", slug: "bellevue" },
    { name: "Kirkland", slug: "kirkland" },
    { name: "Issaquah", slug: "issaquah" },
    { name: "Sammamish", slug: "sammamish" },
    { name: "Puyallup", slug: "puyallup" },
  ],
};

export const trustStats = [
  { label: "Bathroom Specialists" },
  { label: "5 Years in Business" },
  { label: "10-Year Waterproofing Warranty" },
  { label: "Financing Available" },
];
