import Image from "next/image";
import { WpSectionHeading } from "../ui/WpSectionHeading";

// Exact WordPress "Top Bathroom Remodeling Services" card grid — same white
// card pattern as the homepage's Who We Are section (24px radius,
// 38/40/43px padding, icon top-right, divider, body text). Copy and hrefs
// verbatim from wordpress-archive/html/bathroom-remodel-services.html.
const cards = [
  {
    lines: ["Bathtub", "Remodel"],
    icon: "/images/wordpress/icons/bathtub-remodel.svg",
    href: "/services/bathtub-remodel",
    body: "Upgrade your dated alcove tub to a luxury soaking experience. We focus on ergonomic designs and heat-retentive materials that maintain water temperature longer—perfect for those chilly PNW evenings.",
  },
  {
    lines: ["Shower", "Remodel"],
    icon: "/images/wordpress/icons/shower-remodel.svg",
    href: "/services/shower-remodel",
    body: "Transition to a spa-like environment with frameless glass enclosures, custom niche storage, and high-pressure rainfall showerheads. Our systems feature multi-layered waterproofing membranes to ensure zero leaks for the life of the home.",
  },
  {
    lines: ["Full Bathroom", "Remodel"],
    icon: "/images/wordpress/icons/full-bathroom-remodel.svg",
    href: "/services/full-bathroom-remodel",
    body: "Complete full bathroom remodel services designed to transform outdated bathrooms into modern, functional, and luxurious spaces tailored to your lifestyle.",
  },
  {
    lines: ["One-Day", "Bathroom Remodel"],
    icon: "/images/wordpress/icons/one-day-remodel.svg",
    href: "/services/one-day-bathroom-renovation",
    body: "For homeowners who need a functional update without weeks of downtime. Using high-tech, custom-fit acrylic or composite systems, we can refresh your wet area in just 24 hours without sacrificing the “Elite” finish.",
  },
];

export function ServiceCardsGrid() {
  return (
    <section className="bg-warm-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[1410px] px-4">
        <WpSectionHeading
          eyebrow="Bathtub Remodel Types"
          title={
            <>
              Top <span className="text-bronze-500">Bathroom Remodeling</span> Services From Elite
              Bathrooms
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="group flex min-h-[340px] flex-col rounded-[24px] bg-white pb-[43px] pl-8 pr-8 pt-[38px] transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[1.5rem] font-extrabold leading-[1.1] text-charcoal-950">
                  {card.lines[0]}
                  <br />
                  {card.lines[1]}
                </h3>
                <Image src={card.icon} alt="" width={64} height={64} className="h-14 w-14 shrink-0" />
              </div>
              <div className="mt-auto">
                <div className="h-px w-full bg-line" />
                <p className="mt-4 text-sm leading-relaxed text-charcoal-800">{card.body}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
