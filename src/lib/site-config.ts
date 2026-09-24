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
  hours: [
    { days: "Monday to Saturday", time: "8 AM to 6 PM" },
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

export const primaryNav: {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
}[] = [
  {
    label: "Services",
    href: "/services",
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
        label: "Tub-to-Shower",
        href: "/services/tub-to-shower-conversion",
        description: "Convert an unused tub into a practical shower",
      },
      {
        label: "One-Day Renovation",
        href: "/services/one-day-bathroom-renovation",
        description: "Fast, focused bathroom upgrades",
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Areas We Serve", href: "/areas-we-serve" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const trustStats = [
  { label: "Bathroom Specialists" },
  { label: "5 Years in Business" },
  { label: "10-Year Waterproofing Warranty" },
  { label: "Financing Available" },
];
