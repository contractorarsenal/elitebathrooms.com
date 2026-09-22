"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { OptionGrid } from "./OptionGrid";
import { submitLead } from "@/lib/estimate/submit";
import { getAttribution } from "@/lib/attribution";
import {
  budgetOptions,
  emptyLead,
  preferredContactOptions,
  projectTypeOptions,
  timelineOptions,
  type Lead,
} from "@/lib/estimate/types";

const STEP_LABELS = ["Project", "Budget", "Timeline", "Details", "Contact"];

function StepShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-charcoal-950 sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 text-sm text-ink-muted sm:text-base">{description}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function EstimateFlow({ prefill }: { prefill: Partial<Lead> }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Lead>({ ...emptyLead, ...prefill });

  const isLastStep = step === STEP_LABELS.length - 1;

  function update<K extends keyof Lead>(key: K, value: Lead[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function canAdvance() {
    switch (step) {
      case 0:
        return Boolean(data.projectType);
      case 1:
        return data.zip.trim().length >= 5 && Boolean(data.budget);
      case 2:
        return Boolean(data.timeline);
      case 3:
        return true;
      case 4:
        return data.firstName.trim().length > 0 && data.phone.trim().length >= 7;
      default:
        return false;
    }
  }

  async function handleNext() {
    if (!canAdvance()) return;

    if (!isLastStep) {
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    setError(null);

    const attribution = getAttribution();
    const result = await submitLead({
      ...data,
      landingPage: attribution.landingPage,
      referrer: attribution.referrer,
      utm: {
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
        utm_term: attribution.utm_term,
      },
    });

    setSubmitting(false);

    if (result.ok) {
      router.push("/get-a-quote/thank-you");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-8 flex items-center gap-1.5" aria-hidden="true">
        {STEP_LABELS.map((label, i) => (
          <div
            key={label}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-bronze-500" : "bg-line"}`}
          />
        ))}
      </div>
      <p className="mb-6 text-xs font-bold uppercase tracking-[0.14em] text-bronze-500">
        Step {step + 1} of {STEP_LABELS.length} — {STEP_LABELS[step]}
      </p>

      {step === 0 && (
        <StepShell title="What kind of project is this?">
          <OptionGrid
            options={projectTypeOptions}
            value={data.projectType}
            onChange={(v) => update("projectType", v)}
          />
        </StepShell>
      )}

      {step === 1 && (
        <StepShell title="Where's the project, and what's your investment range?">
          <div className="space-y-6">
            <input
              type="text"
              inputMode="numeric"
              placeholder="ZIP code"
              value={data.zip}
              onChange={(e) => update("zip", e.target.value)}
              className="min-h-11 w-full border border-line bg-warm-50 px-4 text-sm text-ink placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none"
            />
            <OptionGrid
              options={budgetOptions}
              value={data.budget}
              onChange={(v) => update("budget", v)}
            />
          </div>
        </StepShell>
      )}

      {step === 2 && (
        <StepShell title="When are you hoping to start?">
          <OptionGrid
            options={timelineOptions}
            value={data.timeline}
            onChange={(v) => update("timeline", v)}
          />
        </StepShell>
      )}

      {step === 3 && (
        <StepShell
          title="Tell us about your bathroom."
          description="Optional, but the more detail you give us the more accurate your consultation will be."
        >
          <textarea
            rows={5}
            placeholder="Current layout, what you'd like to change, anything else we should know…"
            value={data.details}
            onChange={(e) => update("details", e.target.value)}
            className="w-full border border-line bg-warm-50 p-4 text-sm text-ink placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none"
          />
          {/* TODO: wire photo upload to storage once available — kept out of v1 to avoid a fake "upload" that goes nowhere. */}
        </StepShell>
      )}

      {step === 4 && (
        <StepShell title="Last step — how do we reach you?">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="First name"
              value={data.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="min-h-11 border border-line bg-warm-50 px-4 text-sm text-ink placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last name"
              value={data.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="min-h-11 border border-line bg-warm-50 px-4 text-sm text-ink placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="min-h-11 border border-line bg-warm-50 px-4 text-sm text-ink placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              className="min-h-11 border border-line bg-warm-50 px-4 text-sm text-ink placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none"
            />
            <div className="sm:col-span-2">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">
                Preferred contact method
              </p>
              <OptionGrid
                options={preferredContactOptions}
                value={data.preferredContactMethod}
                onChange={(v) => update("preferredContactMethod", v)}
                columns={3}
              />
            </div>
          </div>
        </StepShell>
      )}

      {error && <p className="mt-4 text-sm font-semibold text-red-700">{error}</p>}

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || submitting}
          className="min-h-11 px-4 text-sm font-semibold text-ink-muted underline-offset-4 hover:underline disabled:opacity-0"
        >
          Back
        </button>
        <Button
          type="button"
          variant="primary"
          onClick={handleNext}
          disabled={!canAdvance() || submitting}
          className="disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Submitting…" : isLastStep ? "Submit Request" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
