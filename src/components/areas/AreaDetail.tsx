import Link from "next/link";
import { PageHero } from "../sections/PageHero";
import { FaqAccordion } from "../sections/FaqAccordion";
import { GoogleReviews } from "../sections/GoogleReviews";
import { OneDayPromoWp } from "../sections/OneDayPromoWp";
import { ThumbtackReviews } from "../sections/ThumbtackReviews";
import { WarrantyStrip } from "../sections/WarrantyStrip";
import { ArrowRightIcon, CheckIcon } from "../ui/icons";
import { services } from "@/data/services";
import { areaFaqs, planningPoints, type Area } from "@/data/areas";

// Same shared visual template as the 31 WordPress-sourced area pages
// (WpAreaDetail) — hero, a real content block, then the standard
// reviews/promo/warranty sections — applied to the 7 hand-written verified
// markets too, using this area's own real (non-fabricated) copy fields.
export function AreaDetail({ area }: { area: Area }) {
  const faqs = [...areaFaqs, ...(area.faq ?? [])];

  return (
    <main>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-area" },
          { name: area.name },
        ]}
        title={`Bathroom Remodeling in ${area.name}, WA`}
      />

      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-charcoal-950">
                <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
                {area.primary ? "Home Base" : "Service Area"}
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl">
                Bathroom Remodeling In <span className="text-bronze-500">{area.name}, WA</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-charcoal-800">{area.intro}</p>
              <p className="mt-4 text-base leading-relaxed text-charcoal-800">{area.localContext}</p>
              <a
                href="/get-a-quote"
                className="mt-9 inline-flex items-center gap-4 rounded-full bg-bronze-500 py-1.5 pl-6 pr-1.5 text-base font-bold text-warm-50 transition-colors hover:bg-bronze-600"
              >
                Get A Free Quote
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-50 text-bronze-500">
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </a>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-charcoal-950">{area.serviceIntro}</h3>
              <div className="mt-6 divide-y divide-line border-t border-line">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span className="font-bold text-charcoal-950 group-hover:text-bronze-500">{service.name}</span>
                    <ArrowRightIcon className="h-4 w-4 shrink-0 text-bronze-500 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
              <div className="mt-10">
                <h3 className="text-base font-extrabold text-charcoal-950">What to decide before you start</h3>
                <ul className="mt-4 space-y-3">
                  {planningPoints.map((point) => (
                    <li key={point.title} className="flex items-start gap-2.5 text-sm text-charcoal-800">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze-500" />
                      <span>
                        <strong className="text-charcoal-950">{point.title}:</strong> {point.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion
        faqs={faqs}
        title={
          <>
            {area.name} Bathroom Remodeling <span className="text-bronze-500">FAQ</span>
          </>
        }
      />
      <GoogleReviews />
      <OneDayPromoWp />
      <ThumbtackReviews />
      <WarrantyStrip />
    </main>
  );
}
