import Image from "next/image";

// Exact WordPress "Who We Are" section (id="whoweare"). Layout and the
// three service cards are verbatim from wordpress-archive/html/home.html;
// the bio paragraph's "based in Tacoma" framing was later repositioned to
// lead with Greater Seattle Area per explicit client instruction (general
// brand positioning) -- Tacoma is kept as the real HQ location, not
// removed. On the live site those three white cards are gated behind a
// scroll-triggered animation whose final state never fires in a plain
// headless capture; the true final state was captured by forcing the live
// DOM's own elementor-invisible/visibility gates open (read-only, in a
// throwaway tab) and reading exact computed geometry from it. See
// docs/migration/homepage-parity.md.
const cards = [
  {
    lines: ["Bathtub", "Remodel"],
    icon: "/images/wordpress/icons/bathtub-remodel.svg",
    href: "/services/bathtub-remodel",
    body: "Replace the tub, surround, fixtures, and finishes so the entire area feels updated together.",
  },
  {
    lines: ["Shower", "Remodel"],
    icon: "/images/wordpress/icons/shower-remodel.svg",
    href: "/services/shower-remodel",
    body: "Update the tile, glass, fixtures, or layout to build a shower that works better for your space. We also handle tub-to-shower conversions.",
  },
  {
    lines: ["Full Bathroom", "Remodel"],
    icon: "/images/wordpress/icons/full-bathroom-remodel.svg",
    href: "/services/full-bathroom-remodel",
    body: "Full bathroom remodeling can include planning, demolition, waterproofing, tile, plumbing and electrical coordination, fixtures, glass, finishes, and final walkthrough.",
  },
];

export function WhoWeAre() {
  return (
    <section id="whoweare" className="bg-warm-50 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto max-w-[1410px] px-4">
        <div className="mb-8 h-px w-[360px] max-w-[40vw] bg-line" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-charcoal-950">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
              Who we are
            </span>
            <div className="relative mt-8 h-[350px] w-[250px]">
              <Image
                src="/images/wordpress/logo-crown.svg"
                alt=""
                fill
                className="object-contain object-left opacity-10"
                aria-hidden="true"
              />
            </div>
          </div>

          <div>
            <h2 className="max-w-2xl text-[2rem] font-extrabold leading-[1] text-charcoal-950 sm:text-4xl lg:text-[3rem] lg:leading-[48px]">
              We Don&apos;t Remodel Everything.{" "}
              <span className="text-bronze-500">We Do Bathrooms.</span>
            </h2>

            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal-800">
              <p>
                Elite Bathrooms is a{" "}
                <a href="/bathroom-remodel-company-seattle" className="font-semibold text-bronze-500 hover:underline">
                  bathroom remodeling company
                </a>{" "}
                serving the Greater Seattle Area, headquartered in Tacoma, Washington. For 5
                years, we have focused on one thing: bathrooms.
              </p>
              <p>
                From planning through final walkthrough, we keep the project coordinated under one
                point of responsibility. Our waterproofing work is backed by a 10-year warranty
                against leaks.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {cards.map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  className="group flex min-h-[366px] flex-col rounded-[24px] bg-white pb-[43px] pl-10 pr-10 pt-[38px] transition-shadow hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[1.8rem] font-extrabold leading-[1] text-charcoal-950">
                      {card.lines[0]}
                      <br />
                      {card.lines[1]}
                    </h3>
                    <Image src={card.icon} alt="" width={81} height={81} className="h-[81px] w-[81px] shrink-0" />
                  </div>
                  <div className="mt-auto">
                    <div className="h-px w-full bg-line" />
                    <p className="mt-4 text-sm leading-relaxed text-charcoal-800">{card.body}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
