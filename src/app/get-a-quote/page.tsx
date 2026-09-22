import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { EstimateFlow } from "@/components/estimate/EstimateFlow";
import { localBusinessSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import type { Lead } from "@/lib/estimate/types";

export const metadata: Metadata = {
  title: "Request an Estimate",
  description:
    "Tell us about your bathroom project and get connected with Elite Bathrooms' Tacoma-based team. Five quick questions, no obligation.",
  alternates: { canonical: absoluteUrl("/get-a-quote") },
};

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
    <main className="bg-warm-50 pb-14 pt-16 lg:pb-0 lg:pt-20">
      <JsonLd data={localBusinessSchema()} />
      <div className="border-b border-line bg-charcoal-950 py-14 sm:py-20">
        <Container>
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Get a Quote" }]}
            tone="dark"
          />
          <h1 className="mt-4 max-w-xl text-3xl font-extrabold leading-[1.05] text-warm-50 sm:text-5xl">
            Request Your Estimate
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-on-dark-muted sm:text-base">
            Five quick questions, then we&rsquo;ll follow up to schedule your consultation.
          </p>
        </Container>
      </div>

      <Container className="py-14 sm:py-20">
        <EstimateFlow prefill={prefill} />
      </Container>
    </main>
  );
}
