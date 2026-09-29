import Image from "next/image";
import { PageHero } from "../sections/PageHero";
import { FaqAccordion } from "../sections/FaqAccordion";
import { GoogleReviews } from "../sections/GoogleReviews";
import { OneDayPromoWp } from "../sections/OneDayPromoWp";
import { ThumbtackReviews } from "../sections/ThumbtackReviews";
import { WarrantyStrip } from "../sections/WarrantyStrip";
import { ArrowUpRightIcon, CheckIcon } from "../ui/icons";

export type ServiceDetailData = {
  slug: string;
  heroTitle: string;
  introEyebrowWord: string;
  introHeadingAccent: string;
  introHeadingRest: string;
  introParagraphs: string[];
  introImage: string;
  types?: { image: string; accentWord: string; restOfTitle: string; body: string }[];
  benefitsHeading: string;
  benefits: string[];
  timelineRow: { type: string; timeline: string; bestFor: string };
  faqs: { question: string; answer: string }[];
};

// One shared, exact-WordPress-matching template for every service detail
// page (/services/[slug]) — real archived content/images are fed in per
// service, not redesigned per page. Section order and visual pattern
// verbatim from wordpress-archive/html/services__*.html.
export function ServiceDetailTemplate({ data }: { data: ServiceDetailData }) {
  return (
    <main>
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/bathroom-remodel-services" }]} title={data.heroTitle} />

      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                <Image src={data.introImage} alt={data.heroTitle} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
                <span className="text-bronze-500">{data.introEyebrowWord}</span> {data.introHeadingRest}
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-800">
                {data.introParagraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <a
                href="/get-a-quote"
                className="mt-9 inline-flex items-center gap-4 rounded-full bg-bronze-500 py-1.5 pl-6 pr-1.5 text-base font-bold text-warm-50 transition-colors hover:bg-bronze-600"
              >
                Book A Free Consultation
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-50 text-bronze-500">
                  <ArrowUpRightIcon className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {data.types && data.types.length > 0 && (
        <section className="bg-warm-50 pb-16 sm:pb-24">
          <div className="mx-auto max-w-[1410px] px-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {data.types.map((t) => (
                <div key={t.image} className="rounded-[24px] bg-white p-3">
                  <div className="relative aspect-square overflow-hidden rounded-[18px]">
                    <Image src={t.image} alt={`${t.accentWord} ${t.restOfTitle}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-extrabold text-charcoal-950">
                      <span className="text-bronze-500">{t.accentWord}</span> {t.restOfTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-800">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-black py-16 sm:py-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-warm-50">
            <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
            {data.slug === "full-bathroom-remodel" ? "Complete Bathroom Advantages" : "Why It's Worth It"}
          </span>
          <h2 className="mt-6 max-w-xl text-3xl font-extrabold leading-tight text-warm-50 sm:text-4xl lg:text-[2.5rem]">
            <span className="text-bronze-400">Benefits</span> {data.benefitsHeading}
          </h2>
          <ul className="mt-9 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {data.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm font-bold text-warm-50">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze-400" />
                {b}
              </li>
            ))}
          </ul>
          <a
            href="/get-a-quote"
            className="mt-9 inline-flex items-center gap-4 rounded-full border border-white/30 py-1.5 pl-6 pr-1.5 text-base font-bold text-warm-50 transition-colors hover:border-white/60"
          >
            Get Your Quote
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bronze-500 text-warm-50">
              <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </a>
        </div>
      </section>

      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <div className="overflow-hidden rounded-[20px] border border-line">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="bg-charcoal-950 text-warm-50">
                    <th className="px-6 py-5 text-sm font-bold">Bathroom Remodel Type</th>
                    <th className="px-6 py-5 text-sm font-bold text-[#c8cf9f]">Typical Timeline</th>
                    <th className="px-6 py-5 text-sm font-bold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-line bg-white">
                    <td className="px-6 py-5 text-sm font-bold text-charcoal-950">{data.timelineRow.type}</td>
                    <td className="bg-[#d6dcb4] px-6 py-5 text-sm font-bold text-charcoal-950">{data.timelineRow.timeline}</td>
                    <td className="px-6 py-5 text-sm leading-relaxed text-charcoal-800">{data.timelineRow.bestFor}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion
        faqs={data.faqs}
        title={
          <>
            Frequently Asked Questions About <span className="text-bronze-500">{data.introEyebrowWord} {data.introHeadingRest}</span>
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
