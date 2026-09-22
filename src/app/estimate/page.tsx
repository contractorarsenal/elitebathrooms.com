import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EstimateFlow } from "@/components/estimate/EstimateFlow";
import type { EstimateRequest } from "@/lib/estimate/types";

export const metadata: Metadata = {
  title: "Request an Estimate",
  description:
    "Tell us about your bathroom project and get connected with Elite Bathrooms' Tacoma-based team.",
};

type Props = {
  searchParams: Promise<{ name?: string; phone?: string; zip?: string }>;
};

export default async function EstimatePage({ searchParams }: Props) {
  const params = await searchParams;

  const prefill: Partial<EstimateRequest> = {
    name: params.name ?? "",
    phone: params.phone ?? "",
    zip: params.zip ?? "",
  };

  return (
    <main className="bg-warm-50 pb-14 pt-16 lg:pb-0 lg:pt-20">
      <div className="border-b border-line bg-charcoal-950 py-14 sm:py-20">
        <Container>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze-400">
            Get Started
          </span>
          <h1 className="mt-3 max-w-xl text-3xl font-extrabold leading-[1.05] text-warm-50 sm:text-5xl">
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
