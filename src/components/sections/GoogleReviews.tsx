import { StarIcon } from "../ui/icons";

// Exact WordPress "Check Out Our Google Reviews" heading. The live page
// embeds a Trustindex widget there whose review content never actually
// paints on screen (its Google-source data stays in an inert <template>,
// #trustindex-google-widget-html, that the widget's own JS never injects —
// a separate bug from the elementor-invisible ones). Because the widget
// never renders, there is no live visual layout to copy — but its review
// DATA is real and retrievable straight from that template's DOM, so per
// instruction these are verbatim reviews (name, star count, text) read
// directly from the live page, not invented. See
// docs/migration/homepage-parity.md.
const reviews = [
  {
    name: "Marcy Valades",
    stars: 5,
    text: "We highly recommend George and his crew. Carlos did a great job with our plumbing needs and Mikola was so fast and did a beautiful tile job.",
  },
  {
    name: "Haley Zayatz",
    stars: 5,
    text: "Had a wonderful experience working with this team, they are communicative, honest and professional. Not our cheapest choice but the great ones never are, you really get what you pay for and our tiling turned out better than I hoped!",
  },
  {
    name: "Maribeth Spencer",
    stars: 5,
    text: "Gheorghe and his crew remodeled my small bathroom and the results are beautiful and functional. They gave me a very competitive bid, showed up on time, worked very fast, and Gheorghe did his best to communicate clearly with me throughout the process.",
  },
];

export function GoogleReviews() {
  return (
    <section className="bg-warm-50 py-16 sm:py-20">
      <div className="mx-auto max-w-[1410px] px-4">
        <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
          Check Out Our <span className="text-bronze-500">Google Reviews</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-2xl border border-line bg-warm-100 p-6">
              <div className="flex gap-1 text-bronze-500">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-800">{review.text}</p>
              <p className="mt-4 text-sm font-bold text-charcoal-950">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
