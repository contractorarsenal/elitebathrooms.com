export type Testimonial = {
  name: string;
  rating: number;
  source: "Google" | "Thumbtack";
  quote: string;
};

// Exact, verbatim excerpts copied directly from real Google reviews on
// elitebathrooms.com's live review widget (source-verified, not
// paraphrased). Each excerpt is a continuous run of the reviewer's own
// text, not a splice. No dates are included because the widget didn't
// expose stable, verifiable posting dates.
export const testimonials: Testimonial[] = [
  {
    name: "Rebecca De Angelis",
    rating: 5,
    source: "Google",
    quote:
      "We had such a great experience with Elite Bathrooms! From start to finish, the entire process was smooth, professional, and stress-free. Their communication was excellent, they showed up when they said they would, and the quality of their work exceeded our expectations.",
  },
  {
    name: "Aurel Balan",
    rating: 5,
    source: "Google",
    quote:
      "Elite Bathroom exceeded my expectations from start to finish. Their pricing was very fair and competitive, especially considering the outstanding quality of the work.",
  },
  {
    name: "Maribeth Spencer",
    rating: 5,
    source: "Google",
    quote:
      "Gheorghe and his crew remodeled my small bathroom and the results are beautiful and functional. They gave me a very competitive bid, showed up on time, worked very fast, and Gheorghe did his best to communicate clearly with me throughout the process.",
  },
];
