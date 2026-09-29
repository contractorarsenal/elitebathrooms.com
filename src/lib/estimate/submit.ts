import {
  budgetOptions,
  preferredContactOptions,
  projectTypeOptions,
  timelineOptions,
  type Lead,
} from "./types";
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from "./web3forms";

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Client-side helper — posts directly to Web3Forms from the browser. There
 * used to be a server hop (`/api/estimate`), but Web3Forms' free-tier
 * access key rejects server-to-server calls outright (confirmed
 * empirically — see web3forms.ts) and only accepts calls from a real
 * browser, so that route has been removed rather than kept as a
 * known-broken pass-through. This file now owns everything that route used
 * to do: field-length/enum/email validation, the honeypot decision, and
 * building the Web3Forms payload — all still run before any network call,
 * so a bad submission never reaches Web3Forms regardless of the submit
 * button's disabled state.
 */

const MAX_LENGTHS: Partial<Record<keyof Lead, number>> = {
  firstName: 100,
  lastName: 100,
  phone: 30,
  email: 254,
  zip: 12,
  details: 5000,
  address: 300,
  source: 60,
  landingPage: 2048,
  referrer: 2048,
};

const VALID_PROJECT_TYPES = new Set(projectTypeOptions.map((o) => o.value));
const VALID_BUDGETS = new Set(budgetOptions.map((o) => o.value));
const VALID_TIMELINES = new Set(timelineOptions.map((o) => o.value));
const VALID_CONTACT_METHODS = new Set(preferredContactOptions.map((o) => o.value));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function labelFor<T extends string>(options: { value: T; label: string }[], value: T | null | undefined) {
  return options.find((o) => o.value === value)?.label;
}

/** Mirrors EstimateFlow's own required-field set (first name, phone,
 * consent) exactly, but never trusts the disabled-state/step gating
 * alone — every field is re-checked here for type, length, and (where
 * applicable) enum membership before anything is sent to Web3Forms. */
function validate(payload: Partial<Lead>): string | null {
  if (typeof payload.firstName !== "string" || payload.firstName.trim().length === 0) {
    return "First name is required.";
  }
  if (typeof payload.phone !== "string" || payload.phone.trim().length < 7) {
    return "A valid phone number is required.";
  }
  if (payload.consent !== true) {
    return "Consent is required.";
  }

  for (const [key, max] of Object.entries(MAX_LENGTHS) as [keyof Lead, number][]) {
    const value = payload[key];
    if (typeof value === "string" && value.length > max) {
      return `${key} is too long.`;
    }
  }

  if (typeof payload.email === "string" && payload.email.trim().length > 0 && !EMAIL_RE.test(payload.email.trim())) {
    return "Email address is not valid.";
  }
  if (payload.projectType != null && !VALID_PROJECT_TYPES.has(payload.projectType)) {
    return "Invalid project type.";
  }
  if (payload.budget != null && !VALID_BUDGETS.has(payload.budget)) {
    return "Invalid budget option.";
  }
  if (payload.timeline != null && !VALID_TIMELINES.has(payload.timeline)) {
    return "Invalid timeline option.";
  }
  if (payload.preferredContactMethod != null && !VALID_CONTACT_METHODS.has(payload.preferredContactMethod)) {
    return "Invalid preferred contact method.";
  }

  return null;
}

/** Human-readable summary for the Web3Forms notification email body,
 * using only fields actually present on this submission. */
function buildMessage(payload: Partial<Lead>, isContactPage: boolean): string {
  const lines: string[] = [isContactPage ? "New contact request" : "New estimate request", ""];

  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(" ").trim();
  if (fullName) lines.push(`Name: ${fullName}`);
  if (payload.email) lines.push(`Email: ${payload.email}`);
  if (payload.phone) lines.push(`Phone: ${payload.phone}`);
  if (payload.zip) lines.push(`ZIP: ${payload.zip}`);

  const projectType = labelFor(projectTypeOptions, payload.projectType);
  const timeline = labelFor(timelineOptions, payload.timeline);
  const budget = labelFor(budgetOptions, payload.budget);
  const contactMethod = labelFor(preferredContactOptions, payload.preferredContactMethod);

  if (projectType || timeline || budget) {
    lines.push("");
    if (projectType) lines.push(`Project Type: ${projectType}`);
    if (timeline) lines.push(`Timeline: ${timeline}`);
    if (budget) lines.push(`Budget: ${budget}`);
  }

  if (contactMethod) {
    lines.push("");
    lines.push(`Preferred Contact Method: ${contactMethod}`);
  }

  if (payload.details && payload.details.trim().length > 0) {
    lines.push("");
    lines.push("Additional Details:");
    lines.push(payload.details.trim());
  }

  lines.push("");
  lines.push(`SMS Consent: ${payload.consent ? "Yes" : "No"}`);

  if (payload.landingPage) {
    lines.push("");
    lines.push(`Source Page: ${payload.landingPage}`);
  }

  return lines.join("\n");
}

export async function submitLead(payload: Lead & { botcheck: boolean }): Promise<SubmitResult> {
  // Web3Forms' own native honeypot convention is a hidden checkbox named
  // "botcheck" (see EstimateFlow.tsx) — a real visitor never checks it.
  // Checked here first, before validation or any network call: a bot that
  // tripped it gets a fake success with zero information leaked back and
  // nothing ever sent to Web3Forms.
  if (payload.botcheck) {
    return { ok: true };
  }

  const validationError = validate(payload);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const isContactPage = payload.source === "contact-us";

  const web3formsBody: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "Elite Bathrooms Website",
    subject: isContactPage ? "New Elite Bathrooms Contact Request" : "New Elite Bathrooms Estimate Request",
    message: buildMessage(payload, isContactPage),
  };

  // Individual structured fields, only for what was actually collected —
  // kept alongside `message` so submissions stay searchable/exportable in
  // the Web3Forms dashboard, not just readable as one text blob.
  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(" ").trim();
  if (fullName) web3formsBody.name = fullName;
  if (payload.email) {
    web3formsBody.email = payload.email;
    web3formsBody.replyto = payload.email;
  }
  if (payload.phone) web3formsBody.phone = payload.phone;
  if (payload.zip) web3formsBody.zip = payload.zip;

  const projectTypeLabel = labelFor(projectTypeOptions, payload.projectType);
  if (projectTypeLabel) web3formsBody.project_type = projectTypeLabel;
  const budgetLabel = labelFor(budgetOptions, payload.budget);
  if (budgetLabel) web3formsBody.budget = budgetLabel;
  const timelineLabel = labelFor(timelineOptions, payload.timeline);
  if (timelineLabel) web3formsBody.timeline = timelineLabel;
  const contactMethodLabel = labelFor(preferredContactOptions, payload.preferredContactMethod);
  if (contactMethodLabel) web3formsBody.preferred_contact_method = contactMethodLabel;

  if (payload.details) web3formsBody.details = payload.details;
  web3formsBody.sms_consent = payload.consent ? "Yes" : "No";
  web3formsBody.lead_source = isContactPage ? "Contact" : "Get a Quote";
  if (payload.landingPage) web3formsBody.source_page = payload.landingPage;
  if (payload.referrer) web3formsBody.referrer = payload.referrer;
  if (payload.utm?.utm_source) web3formsBody.utm_source = payload.utm.utm_source;
  if (payload.utm?.utm_medium) web3formsBody.utm_medium = payload.utm.utm_medium;
  if (payload.utm?.utm_campaign) web3formsBody.utm_campaign = payload.utm.utm_campaign;
  if (payload.utm?.utm_content) web3formsBody.utm_content = payload.utm.utm_content;
  if (payload.utm?.utm_term) web3formsBody.utm_term = payload.utm.utm_term;

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(web3formsBody),
    });

    const json = (await res.json().catch(() => null)) as { success?: boolean } | null;

    if (!res.ok || json?.success !== true) {
      return { ok: false, error: "Something went wrong submitting your request. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}
