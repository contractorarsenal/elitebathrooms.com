import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { EstimateFlow } from "@/components/estimate/EstimateFlow";
import { CheckIcon } from "@/components/ui/icons";
import { localBusinessSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import type { Lead } from "@/lib/estimate/types";

export const metadata: Metadata = {
  title: "Bathroom Remodel Quote - Get Your Free Estimate Today",
  description:
    "Tell us about your bathroom project and get connected with the Elite Bathrooms team. Quick questions, no obligation, free consultation.",
  alternates: { canonical: absoluteUrl("/get-a-quote") },
};

const projectDetails = [
  "Type of project you’re planning",
  "Current bathroom condition",
  "Preferred style or inspiration",
  "Photos of the existing bathroom (if available)",
  "Expected timeline or budget range",
];

const whatHappensNext = [
  "A phone call within the next 48 hours",
  "Or an email response if we’re unable to reach you by phone",
  "Initial recommendations and project guidance",
  "Scheduling options for an in-home or virtual consultation",
];

type Props = {
  searchParams: Promise<{ name?: string; phone?: string; zip?: string }>;
};

export default async function GetAQuotePage({ searchParams }: Props) {
  const params = await searchParams;
  const [firstName = "", ...rest] = (params.name ?? "").trim().split(/\s+/).filter(Boolean);

  const prefill: Partial<Lead> = {
    firstName,
    lastName: rest.join(" "),
    phone: params.phone ?? "",
    zip: params.zip ?? "",
  };

  return (
    <main>
      <JsonLd data={localBusinessSchema()} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Get a Quote" }]}
        title="Bathroom Remodel Quote - Get Your Free Estimate Today"
      />

      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
                Take The <span className="text-bronze-500">First Step</span> Toward Your New
                Bathroom
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-800">
                <p>
                  Whether you&apos;re planning a shower remodel, bathtub replacement, one-day
                  bathroom conversion, or a complete bathroom renovation, our team will review
                  your request and help you explore the best solutions for your space, style,
                  and budget.
                </p>
                <p>
                  To help us provide a faster and more accurate response, please include as many
                  project details as possible, such as:
                </p>
              </div>
              <ul className="mt-5 space-y-2.5">
                {projectDetails.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal-800">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-relaxed text-charcoal-800">
                If you have inspiration photos, material ideas, or renovation plans, feel free to
                include them in your request. The more information we receive, the faster we can
                understand your vision and recommend the best approach for your project.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-charcoal-950">What Happens Next?</h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal-800">
                Once your request is submitted, our team will review your project details and
                contact you to discuss next steps. You can expect:
              </p>
              <ul className="mt-5 space-y-2.5">
                {whatHappensNext.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal-800">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 rounded-[24px] bg-white p-6 sm:p-10">
            <EstimateFlow prefill={prefill} />
          </div>
        </div>
      </section>
    </main>
  );
}
