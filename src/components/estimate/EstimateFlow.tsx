"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { submitLead } from "@/lib/estimate/submit";
import { getAttribution } from "@/lib/attribution";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/estimate/web3forms";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/estimate/TurnstileWidget";
import {
  emptyLead,
  serviceTypeOptions,
  conversionReasonOptions,
  whichBathroomOptions,
  homeAgeOptions,
  timelineOptions,
  US_STATES,
  FILE_UPLOAD_MAX_BYTES,
  FILE_UPLOAD_MAX_FILES,
  FILE_UPLOAD_MIME_TYPES,
  type Lead,
  type ConversionReason,
  type WhichBathroom,
  type HomeAge,
} from "@/lib/estimate/types";

/**
 * Rebuilt to reproduce the real WordPress Gravity Form (gform_1,
 * /get-a-quote/) — NOT the earlier custom 5-step card design. Source of
 * truth: wordpress-archive/forms/gform_1.json (fields/labels),
 * wordpress-archive/html/get-a-quote.html's embedded
 * window.gf_form_conditional_logic[1] (the real show/hide rules), and the
 * live site (read-only) for measured colors/sizes. See
 * docs/migration/form-visual-diff/ for the parity screenshots and
 * docs/migration/production-cutover-checklist.md for the file-upload/
 * reCAPTCHA gaps this rebuild has relative to the original.
 *
 * Structure matches the real form exactly: ONE progressively-revealing
 * page (service type -> conditional reason -> which bathroom -> home age
 * -> timeline, each field appearing only once its prerequisite is
 * answered, never a full-page replace), then a real second page (AJAX
 * "Next", not a route change) for contact info/address/file/consent/spam
 * check, with "Previous"/"Submit".
 *
 * File uploads use Web3Forms' own Advanced File Uploader
 * (web3forms.com/client/script.js, a Pro-tier feature -- see
 * docs/migration/production-cutover-checklist.md §14) rather than any
 * storage this app owns: it wires a FilePond widget onto the `attachment`
 * input below, uploads each file straight to Web3Forms' storage, and
 * leaves a reference in a hidden field with that same name for every file
 * once done. Because that vendor script only scans the DOM once (no
 * MutationObserver), the input has to exist in the DOM from first paint --
 * it can't be mounted only once page 2 is reached -- so both "pages"
 * below are always mounted and only their visibility toggles with `page`.
 * At submit time, `new FormData(formRef.current)` harvests whatever
 * `attachment` entries the widget produced.
 */

// Verbatim from the live WordPress Gravity Forms "Consent" field.
const CONSENT_TEXT =
  "By checking this box, you agree to receive emails and text messages from Elite Bathrooms, including non-marketing updates, schedule updates, and service notifications. Message frequency varies. Message and data rates may apply. You may opt out at any time by replying STOP or get help by replying HELP. View our";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Real WP selected-state indicator color (measured on the live form via
// computed styles: rgb(32,76,229)) -- Gravity Forms' own default focus/
// selected blue, not a brand color, but this is a "match closely"
// rebuild, not a restyle.
const SELECTED_RING = "border-[#204CE5] ring-2 ring-[#204CE5]/30";

function toggleInArray<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function ProgressBar({ page }: { page: 1 | 2 }) {
  const pct = page === 1 ? 50 : 100;
  return (
    <div className="mx-auto mt-6 h-[10px] w-full max-w-3xl rounded-full bg-[#112337]/10">
      <div
        className="h-[10px] rounded-full bg-bronze-500 transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ServiceCard({
  option,
  selected,
  onSelect,
}: {
  option: (typeof serviceTypeOptions)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={`relative flex cursor-pointer flex-col rounded-[3px] border bg-white p-[15px] shadow-[0_0_0_0_rgba(18,25,97,0.05),0_2px_5px_0_rgba(18,25,97,0.1),0_1px_1px_0_rgba(18,25,97,0.15)] transition-colors ${
        selected ? SELECTED_RING : "border-[#686E77]/35 hover:border-bronze-400"
      }`}
    >
      <input
        type="radio"
        name="serviceType"
        value={option.value}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      {selected && (
        <span className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-bronze-500 text-white">
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
            <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <span className="relative mb-3 block aspect-square w-full overflow-hidden rounded-[2px]">
        <Image src={option.icon} alt="" fill className="object-contain p-2" />
      </span>
      <span className="flex items-center gap-2">
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
            selected ? "border-[#204CE5]" : "border-[#686E77]/50"
          }`}
        >
          {selected && <span className="h-2 w-2 rounded-full bg-[#204CE5]" />}
        </span>
        <span className="text-sm font-medium text-[#112337]">{option.label}</span>
      </span>
    </label>
  );
}

function CheckOption({
  label,
  selected,
  onToggle,
  type = "checkbox",
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
  type?: "checkbox" | "radio";
}) {
  return (
    <label
      className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border bg-white px-3.5 py-2.5 text-sm font-medium text-[#112337] transition-colors ${
        selected ? SELECTED_RING : "border-[#686E77]/30 hover:border-bronze-400"
      }`}
    >
      <input
        type={type}
        checked={selected}
        onChange={onToggle}
        className="h-4 w-4 shrink-0 accent-[#204CE5]"
      />
      {label}
    </label>
  );
}

function Field({
  label,
  required,
  description,
  children,
}: {
  label: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-bold text-[#112337]">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </p>
      {description && <p className="mt-0.5 text-xs text-ink-muted">{description}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

const textInputClass =
  "min-h-11 w-full rounded-md border border-[#686E77]/30 bg-white px-4 text-sm text-[#112337] placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none";

export function EstimateFlow({ prefill }: { prefill: Partial<Lead> }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [page, setPage] = useState<1 | 2>(1);
  const [data, setData] = useState<Lead>({ ...emptyLead, ...prefill });
  const [botcheck, setBotcheck] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptedNext, setAttemptedNext] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  function update<K extends keyof Lead>(key: K, value: Lead[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  const showConversionReasons = data.serviceType === "Full Bathroom Remodel";
  const showWhichBathroom = data.serviceType !== null;
  const showHomeAge = showWhichBathroom && data.whichBathroom.length > 0;
  const showTimeline = showHomeAge && data.homeAge.length > 0;

  function page1Valid() {
    if (!data.serviceType) return false;
    if (showConversionReasons && data.conversionReasons.length === 0) return false;
    if (data.whichBathroom.length === 0) return false;
    if (data.homeAge.length === 0) return false;
    if (!data.timeline) return false;
    return true;
  }

  function page2Valid() {
    return (
      data.firstName.trim().length > 0 &&
      data.lastName.trim().length > 0 &&
      data.phone.trim().length >= 7 &&
      EMAIL_RE.test(data.email.trim()) &&
      data.streetAddress.trim().length > 0 &&
      data.city.trim().length > 0 &&
      data.state.trim().length > 0 &&
      data.zip.trim().length >= 5 &&
      data.consent
    );
  }

  function handleNext() {
    setAttemptedNext(true);
    if (!page1Valid()) return;
    setPage(2);
  }

  async function handleSubmit() {
    setAttemptedSubmit(true);
    if (submitting) return;
    if (!page2Valid()) return;

    if (!turnstileToken) {
      setError("Please complete the human verification above before submitting.");
      return;
    }

    setSubmitting(true);
    setError(null);

    // Web3Forms' Advanced File Uploader widget (see the header comment)
    // injects a hidden `attachment` input for every file it finished
    // uploading -- this is the only way to retrieve those reference
    // strings, since the vendor script exposes no JS callback for them.
    const attachmentKeys = formRef.current
      ? Array.from(new FormData(formRef.current).getAll("attachment")).map(String).filter(Boolean)
      : [];

    const attribution = getAttribution();
    const result = await submitLead(
      {
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
        botcheck,
      },
      turnstileToken,
      attachmentKeys
    );

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      return;
    }

    router.push("/thank-you");
  }

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="mx-auto w-full max-w-3xl">
      {/* Web3Forms' Advanced File Uploader widget -- see the header comment. */}
      <Script src="https://web3forms.com/client/script.js" strategy="afterInteractive" />

      {/* Honeypot -- zero-size, real visitors never see/reach it. */}
      <input
        type="checkbox"
        name="botcheck"
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        style={{ clip: "rect(0,0,0,0)" }}
      />

      <h2 className="text-center text-[2rem] font-extrabold leading-[1.05] text-charcoal-950 sm:text-[2.75rem]">
        Get a <span className="text-bronze-500">Free Quote</span> for Your Bathroom Remodel
      </h2>
      <ProgressBar page={page} />

      <div className="mt-10 space-y-8">
        {/*
          Both "pages" stay mounted at all times (visibility toggled via
          CSS, not conditional JSX) -- see the header comment on why the
          Advanced File Uploader input needs to exist in the DOM from
          first paint.
        */}
        <div className={page === 1 ? "space-y-8" : "hidden"}>
            <Field label="What can we help you transform today?" required>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {serviceTypeOptions.map((opt) => (
                  <ServiceCard
                    key={opt.value}
                    option={opt}
                    selected={data.serviceType === opt.value}
                    onSelect={() => update("serviceType", opt.value)}
                  />
                ))}
              </div>
              {attemptedNext && !data.serviceType && (
                <p className="mt-2 text-xs font-semibold text-red-600">Please select an option.</p>
              )}
            </Field>

            {showConversionReasons && (
              <Field label="What is your primary reason for converting?" required description="(multiple selections allowed)">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {conversionReasonOptions.map((opt) => (
                    <CheckOption
                      key={opt.value}
                      label={opt.label}
                      selected={data.conversionReasons.includes(opt.value)}
                      onToggle={() =>
                        update(
                          "conversionReasons",
                          toggleInArray<ConversionReason>(data.conversionReasons, opt.value)
                        )
                      }
                    />
                  ))}
                </div>
                {attemptedNext && data.conversionReasons.length === 0 && (
                  <p className="mt-2 text-xs font-semibold text-red-600">Please select at least one option.</p>
                )}
              </Field>
            )}

            {showWhichBathroom && (
              <Field label="Which bathroom are we remodeling?" required description="(multiple selections allowed)">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {whichBathroomOptions.map((opt) => (
                    <CheckOption
                      key={opt.value}
                      label={opt.label}
                      selected={data.whichBathroom.includes(opt.value)}
                      onToggle={() => update("whichBathroom", toggleInArray<WhichBathroom>(data.whichBathroom, opt.value))}
                    />
                  ))}
                </div>
                {attemptedNext && data.whichBathroom.length === 0 && (
                  <p className="mt-2 text-xs font-semibold text-red-600">Please select at least one option.</p>
                )}
              </Field>
            )}

            {showHomeAge && (
              <Field label="What is the approximate age of your home?" required>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {homeAgeOptions.map((opt) => (
                    <CheckOption
                      key={opt.value}
                      label={opt.label}
                      selected={data.homeAge.includes(opt.value)}
                      onToggle={() => update("homeAge", toggleInArray<HomeAge>(data.homeAge, opt.value))}
                    />
                  ))}
                </div>
                {attemptedNext && data.homeAge.length === 0 && (
                  <p className="mt-2 text-xs font-semibold text-red-600">Please select at least one option.</p>
                )}
              </Field>
            )}

            {showTimeline && (
              <Field label="When would you like this project completed?" required>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {timelineOptions.map((opt) => (
                    <CheckOption
                      key={opt.value}
                      type="radio"
                      label={opt.label}
                      selected={data.timeline === opt.value}
                      onToggle={() => update("timeline", opt.value)}
                    />
                  ))}
                </div>
                {attemptedNext && !data.timeline && (
                  <p className="mt-2 text-xs font-semibold text-red-600">Please select an option.</p>
                )}
              </Field>
            )}

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="min-h-12 rounded-full bg-bronze-500 px-9 py-[15px] text-base font-bold text-white transition-colors hover:bg-bronze-600"
              >
                Next
              </button>
            </div>
        </div>

        <div className={page === 2 ? "space-y-8" : "hidden"}>
            <Field label="Full Name" required>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="First"
                    value={data.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className={textInputClass}
                  />
                  <p className="mt-1 text-xs text-ink-muted">First</p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last"
                    value={data.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className={textInputClass}
                  />
                  <p className="mt-1 text-xs text-ink-muted">Last</p>
                </div>
              </div>
              {attemptedSubmit && (!data.firstName.trim() || !data.lastName.trim()) && (
                <p className="mt-2 text-xs font-semibold text-red-600">Please enter your full name.</p>
              )}
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Phone" required>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={textInputClass}
                />
                {attemptedSubmit && data.phone.trim().length < 7 && (
                  <p className="mt-2 text-xs font-semibold text-red-600">A valid phone number is required.</p>
                )}
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={textInputClass}
                />
                {attemptedSubmit && !EMAIL_RE.test(data.email.trim()) && (
                  <p className="mt-2 text-xs font-semibold text-red-600">A valid email address is required.</p>
                )}
              </Field>
            </div>

            <Field label="Address" required>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={data.streetAddress}
                    onChange={(e) => update("streetAddress", e.target.value)}
                    className={textInputClass}
                  />
                  <p className="mt-1 text-xs text-ink-muted">Street Address</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      value={data.city}
                      onChange={(e) => update("city", e.target.value)}
                      className={textInputClass}
                    />
                    <p className="mt-1 text-xs text-ink-muted">City</p>
                  </div>
                  <div>
                    <select
                      value={data.state}
                      onChange={(e) => update("state", e.target.value)}
                      className={`${textInputClass} appearance-none`}
                    >
                      <option value="">Select a state</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-ink-muted">State</p>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={data.zip}
                    onChange={(e) => update("zip", e.target.value)}
                    className={`max-w-xs ${textInputClass}`}
                  />
                  <p className="mt-1 text-xs text-ink-muted">ZIP Code</p>
                </div>
              </div>
              {attemptedSubmit &&
                (!data.streetAddress.trim() || !data.city.trim() || !data.state.trim() || data.zip.trim().length < 5) && (
                  <p className="mt-2 text-xs font-semibold text-red-600">A complete address is required.</p>
                )}
            </Field>

            <Field label="Additional Information">
              <textarea
                rows={5}
                value={data.additionalInfo}
                onChange={(e) => update("additionalInfo", e.target.value)}
                className="w-full rounded-md border border-[#686E77]/30 bg-white p-4 text-sm text-[#112337] focus:border-bronze-500 focus:outline-none"
              />
            </Field>

            <Field label="Add pictures, plans, drafts">
              {/*
                Web3Forms' Advanced File Uploader takes over this input
                (via `data-advanced`) and replaces it with its own
                drag-and-drop widget: drop zone, "Select files" trigger,
                selected-file list, per-file remove, and upload progress
                are all its native behavior -- see the header comment.
              */}
              <input
                type="file"
                name="attachment"
                data-advanced="true"
                data-form-id={WEB3FORMS_ACCESS_KEY}
                data-max-files={String(FILE_UPLOAD_MAX_FILES)}
                data-max-file-size={`${FILE_UPLOAD_MAX_BYTES / (1024 * 1024)}MB`}
                data-content="Drop files here or click to upload"
                accept={FILE_UPLOAD_MIME_TYPES.join(",")}
                multiple
              />
              <p className="mt-2 text-xs text-ink-muted">
                Accepted file types: jpg, gif, png, pdf, jpeg. Max. file size: {FILE_UPLOAD_MAX_BYTES / (1024 * 1024)}{" "}
                MB. Max. files: {FILE_UPLOAD_MAX_FILES}.
              </p>
            </Field>

            <label className="flex items-start gap-3 rounded-md border border-[#686E77]/20 bg-white p-4 text-xs leading-relaxed text-ink-muted">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-bronze-500 focus:ring-bronze-500"
              />
              <span>
                {CONSENT_TEXT}{" "}
                <Link href="/privacy-policy" className="underline hover:text-bronze-600">
                  Privacy Policy
                </Link>
                .<span className="text-red-600">*</span>
              </span>
            </label>
            {attemptedSubmit && !data.consent && (
              <p className="text-xs font-semibold text-red-600">Consent is required to submit.</p>
            )}

            {/*
              Real Cloudflare Turnstile, occupying the same visual slot the
              original WordPress form's reCAPTCHA v2 checkbox used. The
              honeypot field above remains a second, independent spam layer.
              See TurnstileWidget.tsx and
              docs/migration/production-cutover-checklist.md §14.
            */}
            <div>
              <p className="text-sm font-bold text-[#112337]">Are you human?</p>
              <div className="mt-3">
                <TurnstileWidget
                  ref={turnstileRef}
                  onToken={(token) => {
                    setTurnstileToken(token);
                    setError(null);
                  }}
                  onExpire={() => setTurnstileToken(null)}
                />
              </div>
            </div>

            {error && <p className="text-sm font-semibold text-red-700">{error}</p>}

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setPage(1)}
                disabled={submitting}
                className="min-h-12 rounded-full border border-[#686E77]/40 bg-white px-8 text-base font-bold text-[#112337] transition-colors hover:border-charcoal-950/60 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="min-h-12 rounded-full bg-bronze-500 px-9 text-base font-bold text-white transition-colors hover:bg-bronze-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </div>
        </div>
      </div>
    </form>
  );
}
