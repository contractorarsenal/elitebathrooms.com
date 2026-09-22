export type Testimonial = {
  name: string;
  rating: number;
  source: "Google" | "Thumbtack";
  quote: string;
};

// Names/ratings/source reflect real reviews visible on the live site.
// TODO: paste each review's exact verified text before launch — the
// summaries pulled during research were paraphrased, not verbatim, and a
// direct quote attributed to a real customer must match their actual words.
export const testimonials: Testimonial[] = [
  {
    name: "James C.",
    rating: 5,
    source: "Thumbtack",
    quote: "[TODO: paste verified review text — professional, punctual team with flexible scheduling]",
  },
  {
    name: "Mike G.",
    rating: 5,
    source: "Thumbtack",
    quote: "[TODO: paste verified review text — results exceeded expectations, transparent communication]",
  },
  {
    name: "Andrea H.",
    rating: 5,
    source: "Thumbtack",
    quote: "[TODO: paste verified review text — precise execution of custom tile design]",
  },
];
