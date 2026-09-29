import Image from "next/image";
import Link from "next/link";
import { WpSectionHeading } from "../ui/WpSectionHeading";
import { ArrowUpRightIcon } from "../ui/icons";
import { areas } from "@/data/areas";
import { wpSourcedAreas } from "@/data/areas-wp-sourced";

// Exact WordPress service-area hub: intro + 4 real county map cards +
// "Explore Our Washington Service Area" pill grid of every city. Verbatim
// from wordpress-archive/html/service-area.html.
const counties = [
  {
    slug: "king-county",
    name: "King county",
    body: "Professional bathroom remodeling services for homeowners across Seattle, Bellevue, Redmond, Kent, Renton, Kirkland, and surrounding King County communities.",
  },
  {
    slug: "pierce-county",
    name: "Pierce county",
    body: "Custom bathroom renovations, shower remodels, and bathtub upgrades for homeowners throughout Tacoma, Puyallup, Lakewood, Gig Harbor, and nearby areas.",
  },
  {
    slug: "snohomish-county",
    name: "Snohomish county",
    body: "Remodeling solutions serving Everett, Lynnwood, Edmonds, Mukilteo, Bothell, and growing Snohomish County.",
  },
  {
    slug: "kitsap-county",
    name: "Kitsap county",
    body: "Reliable local bathroom remodeling services for homeowners in Bremerton, Poulsbo, Bainbridge Island, Silverdale, and surrounding Kitsap County communities.",
  },
];

export function ServiceAreaHubContent() {
  const allAreas = [
    ...areas.map((a) => ({ slug: a.slug, name: a.name })),
    ...wpSourcedAreas.map((a) => ({ slug: a.slug, name: a.name })),
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                <Image
                  src="/images/wordpress/service-area/service-areas-hub-intro.jpg"
                  alt="Elite Bathrooms crew"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
                Trusted <span className="text-bronze-500">Local Bathroom Remodel Experts</span>{" "}
                Serving Washington Homeowners
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-800">
                <p>
                  Finding the right contractor for a{" "}
                  <strong className="text-charcoal-950">local bathroom remodel</strong> is about
                  more than choosing someone nearby, it&apos;s about working with a team that
                  understands your goals, respects your home, and delivers quality craftsmanship
                  built to last. At Elite Bathrooms, we provide full-service bathroom remodeling
                  solutions for homeowners across Washington, helping transform outdated
                  bathrooms into modern, functional, and comfortable spaces designed for everyday
                  living.
                </p>
                <p>
                  Our bathroom remodeling services are tailored to the unique needs of each
                  homeowner. Whether you&apos;re planning a complete bathroom renovation, a
                  custom shower remodel, a bathtub upgrade, or a one-day bathroom conversion, our
                  team focuses on delivering personalized solutions that combine style,
                  durability, and practicality. We believe every bathroom should feel comfortable,
                  efficient, and visually connected to the rest of your home.
                </p>
                <p>
                  As a local bathroom remodeling company serving Washington communities, we
                  understand the importance of reliable communication, efficient project
                  management, and high-quality installation standards. From the first
                  consultation to the final walkthrough, we guide homeowners through every step
                  of the remodeling process. We help with layout planning, material selection,
                  fixture recommendations, waterproofing systems, lighting improvements, and
                  accessibility upgrades to ensure every project meets both functional and
                  aesthetic goals.
                </p>
                <p>
                  Homeowners throughout Washington choose Elite Bathrooms because we focus on
                  creating remodeling solutions that are built around real-life needs. We
                  understand that bathroom remodeling is a major investment, which is why we
                  prioritize transparency, craftsmanship, and attention to detail in every
                  project we complete.
                </p>
                <p>
                  Whether you live in a busy urban neighborhood, a growing suburban community, or
                  a quiet residential area, our team is committed to delivering reliable bathroom
                  remodeling services designed to improve comfort, functionality, and long-term
                  home value.
                </p>
              </div>
              <a
                href="/get-a-quote"
                className="mt-9 inline-flex items-center gap-4 rounded-full bg-bronze-500 py-1.5 pl-6 pr-1.5 text-base font-bold text-warm-50 transition-colors hover:bg-bronze-600"
              >
                Work With Us
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-50 text-bronze-500">
                  <ArrowUpRightIcon className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {counties.map((county) => (
              <div key={county.slug} className="overflow-hidden rounded-[20px] border border-line bg-white">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={`/images/wordpress/service-area/${county.slug}-map.jpg`}
                    alt={`${county.name} map`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-charcoal-950">
                    {county.name}, <span className="text-bronze-500">WA</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-800">{county.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-50 pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <WpSectionHeading
            eyebrow="Cities We Serve"
            title={
              <>
                Explore Our <span className="text-bronze-500">Washington Service Area</span>
              </>
            }
          />

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {allAreas.map((a) => (
              <Link
                key={a.slug}
                href={`/service-area/${a.slug}`}
                className="flex items-center gap-2 rounded-xl border border-line bg-warm-100 px-4 py-3 text-sm font-bold text-charcoal-950 transition-colors hover:border-bronze-500 hover:text-bronze-500"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
                  <path
                    d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                {a.name}, WA
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
