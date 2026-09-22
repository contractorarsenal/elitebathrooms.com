export type Testimonial = {
  name: string;
  rating: number;
  source: "Google" | "Thumbtack";
  quote: string;
};

// Intentionally empty. We have real review data on the live site, but not
// the exact verbatim text — the research pass only produced paraphrases,
// and a paraphrase attributed to a real customer's name is a fabricated
// quote even if the sentiment is accurate. Add entries here only with
// exact, copy-pasted review text. Until then Testimonials.tsx renders an
// explicit developer-only placeholder instead of fake-looking cards.
export const testimonials: Testimonial[] = [];
