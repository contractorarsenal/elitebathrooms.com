import { StarIcon } from "../ui/icons";

// Exact WordPress "Check Out Our Thumbtack Reviews" heading. Same situation
// as GoogleReviews: the Trustindex Thumbtack widget (.ti-widget.ti-thum)
// never visibly renders on the live site (still shows an empty gray box
// after a full scroll-through), but its review DATA is present and
// retrievable in the live DOM. Verbatim reviews (name, star count, text)
// read directly from the live page — not invented. See
// docs/migration/homepage-parity.md.
const reviews = [
  {
    name: "James C.",
    stars: 5,
    text: "Gheorghe reached out immediately to set up an appointment within a few days. The price was competitive and he was flexible to schedule the work around my travel schedule. The team that came out for the job were professional and punctual, and easy to communicate with.",
  },
  {
    name: "Mike G.",
    stars: 5,
    text: "How often can you say that a renovation project ended up better than expected? That's how we feel about working with Gheorghe of Elite Tile & Remodel and his team of incredible craftsman. Gheorghe is fair, transparent, and just simply knows what he's doing.",
  },
  {
    name: "Pam K.",
    stars: 5,
    text: "The team from Elite tile were great to work with. Prompt, fast, and with precision for our tile work around the fireplace. Highly recommend and will be contacting them again for a future bathroom renovation.",
  },
];

export function ThumbtackReviews() {
  return (
    <section className="bg-warm-50 pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1410px] px-4">
        <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
          Check Out Our <span className="text-bronze-500">Thumbtack Reviews</span>
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
