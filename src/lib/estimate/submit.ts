import { US_STATES, type Lead } from "./types";
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from "./web3forms";

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Client-side helper — posts directly to Web3Forms from the browser (the
 * only architecture Web3Forms' free-tier key allows; see web3forms.ts).
 * Field set matches the real WordPress Gravity Form exactly (see
 * EstimateFlow.tsx's header comment for the source-of-truth files) — every
 * validation rule here mirrors that form's own required fields, re-checked
 * server-side-equivalent before any network call so a bad submission never
 * reaches Web3Forms regardless of the UI's own button-disabled state.
 *
 * `file` is optional and, when present, switches the request from a plain
 * JSON POST to multipart FormData (required for Web3Forms' file-upload
 * support) — capped at a single file, 5MB, matching this project's
 * Web3Forms plan (their Basic plan's real limit; the original WordPress
 * form allowed up to 5 files at 256MB each, which needs a Web3Forms Pro
 * plan this project isn't on — see
 * docs/migration/production-cutover-checklist.md).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_STATES = new Set<string>(US_STATES);

function validate(payload: Partial<Lead>): string | null {
  if (!payload.serviceType) return "Please select what we can help you transform.";
  if (payload.serviceType === "Full Bathroom Remodel" && (!payload.conversionReasons || payload.conversionReasons.length === 0)) {
    return "Please select your primary reason for converting.";
  }
  if (!payload.whichBathroom || payload.whichBathroom.length === 0) return "Please select which bathroom.";
  if (!payload.homeAge || payload.homeAge.length === 0) return "Please select the approximate age of your home.";
  if (!payload.timeline) return "Please select a timeline.";

  if (typeof payload.firstName !== "string" || payload.firstName.trim().length === 0 || payload.firstName.length > 100) {
    return "First name is required.";
  }
  if (typeof payload.lastName !== "string" || payload.lastName.trim().length === 0 || payload.lastName.length > 100) {
    return "Last name is required.";
  }
  if (typeof payload.phone !== "string" || payload.phone.trim().length < 7 || payload.phone.length > 30) {
    return "A valid phone number is required.";
  }
  if (typeof payload.email !== "string" || !EMAIL_RE.test(payload.email.trim()) || payload.email.length > 254) {
    return "A valid email address is required.";
  }
  if (typeof payload.streetAddress !== "string" || payload.streetAddress.trim().length === 0 || payload.streetAddress.length > 300) {
    return "A street address is required.";
  }
  if (typeof payload.city !== "string" || payload.city.trim().length === 0 || payload.city.length > 100) {
    return "A city is required.";
  }
  if (typeof payload.state !== "string" || !VALID_STATES.has(payload.state)) {
    return "A valid state is required.";
  }
  if (typeof payload.zip !== "string" || payload.zip.trim().length < 5 || payload.zip.length > 12) {
    return "A valid ZIP code is required.";
  }
  if (typeof payload.additionalInfo === "string" && payload.additionalInfo.length > 5000) {
    return "Additional information is too long.";
  }
  if (payload.consent !== true) {
    return "Consent is required.";
  }

  return null;
}

/** Human-readable summary for the Web3Forms notification email body. */
function buildMessage(payload: Partial<Lead>, isContactPage: boolean): string {
  const lines: string[] = [isContactPage ? "New contact request" : "New estimate request", ""];

  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(" ").trim();
  if (fullName) lines.push(`Name: ${fullName}`);
  if (payload.email) lines.push(`Email: ${payload.email}`);
  if (payload.phone) lines.push(`Phone: ${payload.phone}`);
  const address = [payload.streetAddress, payload.city, payload.state, payload.zip].filter(Boolean).join(", ");
  if (address) lines.push(`Address: ${address}`);

  if (payload.serviceType) {
    lines.push("");
    lines.push(`Service Type: ${payload.serviceType}`);
    if (payload.conversionReasons && payload.conversionReasons.length > 0) {
      lines.push(`Reason for Converting: ${payload.conversionReasons.join(", ")}`);
    }
    if (payload.whichBathroom && payload.whichBathroom.length > 0) {
      lines.push(`Which Bathroom: ${payload.whichBathroom.join(", ")}`);
    }
    if (payload.homeAge && payload.homeAge.length > 0) {
      lines.push(`Home Age: ${payload.homeAge.join(", ")}`);
    }
    if (payload.timeline) lines.push(`Timeline: ${payload.timeline}`);
  }

  if (payload.additionalInfo && payload.additionalInfo.trim().length > 0) {
    lines.push("");
    lines.push("Additional Information:");
    lines.push(payload.additionalInfo.trim());
  }

  lines.push("");
  lines.push(`SMS Consent: ${payload.consent ? "Yes" : "No"}`);

  if (payload.landingPage) {
    lines.push("");
    lines.push(`Source Page: ${payload.landingPage}`);
  }

  return lines.join("\n");
}

export async function submitLead(payload: Lead & { botcheck: boolean }, file: File | null): Promise<SubmitResult> {
  // Web3Forms' own native honeypot convention is a hidden checkbox named
  // "botcheck" — a real visitor never checks it. Checked first, before
  // validation or any network call.
  if (payload.botcheck) {
    return { ok: true };
  }

  const validationError = validate(payload);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const isContactPage = payload.source === "contact-us";

  const fields: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "Elite Bathrooms Website",
    subject: isContactPage ? "New Elite Bathrooms Contact Request" : "New Elite Bathrooms Estimate Request",
    message: buildMessage(payload, isContactPage),
    lead_source: isContactPage ? "Contact" : "Get a Quote",
  };

  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(" ").trim();
  if (fullName) fields.name = fullName;
  fields.first_name = payload.firstName;
  fields.last_name = payload.lastName;
  fields.email = payload.email;
  fields.replyto = payload.email;
  fields.phone = payload.phone;
  fields.street_address = payload.streetAddress;
  fields.city = payload.city;
  fields.state = payload.state;
  fields.zip = payload.zip;
  if (payload.serviceType) fields.service_type = payload.serviceType;
  if (payload.conversionReasons?.length) fields.conversion_reasons = payload.conversionReasons.join(", ");
  if (payload.whichBathroom?.length) fields.which_bathroom = payload.whichBathroom.join(", ");
  if (payload.homeAge?.length) fields.home_age = payload.homeAge.join(", ");
  if (payload.timeline) fields.timeline = payload.timeline;
  if (payload.additionalInfo) fields.additional_information = payload.additionalInfo;
  fields.sms_consent = payload.consent ? "Yes" : "No";
  if (payload.landingPage) fields.source_page = payload.landingPage;
  if (payload.referrer) fields.referrer = payload.referrer;
  if (payload.utm?.utm_source) fields.utm_source = payload.utm.utm_source;
  if (payload.utm?.utm_medium) fields.utm_medium = payload.utm.utm_medium;
  if (payload.utm?.utm_campaign) fields.utm_campaign = payload.utm.utm_campaign;
  if (payload.utm?.utm_content) fields.utm_content = payload.utm.utm_content;
  if (payload.utm?.utm_term) fields.utm_term = payload.utm.utm_term;

  try {
    let res: Response;

    if (file) {
      // Web3Forms requires multipart/form-data for file attachments, and
      // its own docs warn against setting Content-Type manually here — the
      // browser adds the correct multipart boundary header itself only
      // when it builds the body from a FormData object.
      const form = new FormData();
      Object.entries(fields).forEach(([k, v]) => form.append(k, v));
      form.append("attachment", file);
      res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: form });
    } else {
      res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
    }

    const json = (await res.json().catch(() => null)) as { success?: boolean } | null;

    if (!res.ok || json?.success !== true) {
      return { ok: false, error: "Something went wrong submitting your request. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}
