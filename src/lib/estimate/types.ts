import type { Attribution } from "@/lib/attribution";

/**
 * Every field/option/conditional-rule below is extracted directly from the
 * real, live Gravity Form (`gform_1`, found on /get-a-quote/) — NOT
 * invented or inferred from the old custom 5-step rebuild. Sources used:
 * `wordpress-archive/forms/gform_1.json` (rendered field list + exact
 * labels), `wordpress-archive/html/get-a-quote.html`'s embedded
 * `window.gf_form_conditional_logic[1]` ruleset (the real show/hide
 * rules), and the live site itself (read-only) for anything the static
 * archive couldn't confirm. Option *values* below are the literal strings
 * Gravity Forms submits (e.g. "Bathtub Remodel", "10–25 years") — kept
 * verbatim rather than re-encoded, since that's what a human reads in the
 * Web3Forms submission.
 */

export type ServiceType = "Bathtub Remodel" | "Shower Remodel" | "Full Bathroom Remodel";

/**
 * Real field 7, "What is your primary reason for converting?" — the
 * conditional rule only reveals this when `serviceType` is EXACTLY "Full
 * Bathroom Remodel" (not Bathtub/Shower). That pairing reads oddly (a
 * "converting" question gated behind the *opposite* of a conversion), but
 * it's what the live form's own conditional logic does, and reproducing
 * the real form is the point — not second-guessing WordPress's own copy.
 */
export type ConversionReason = "Easier Access/Safety" | "Modernize Style" | "Easier to Clean" | "Increase Home Value";

export type WhichBathroom = "Master Bathroom" | "Guest/Hall Bathroom" | "Powder Room" | "Other";

/** Real field 8 is a checkbox group (multi-select capable), not a radio —
 * kept as multi-select to match, even though most homeowners will only
 * check one. */
export type HomeAge = "Under 10 years" | "10–25 years" | "25–50 years" | "50+ years (Historic)";

export type Timeline = "Immediately" | "Within 3 months" | "6+ months";

export type Lead = {
  serviceType: ServiceType | null;
  conversionReasons: ConversionReason[];
  whichBathroom: WhichBathroom[];
  homeAge: HomeAge[];
  timeline: Timeline | null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  additionalInfo: string;
  /**
   * SMS/email consent checkbox. Required to submit, matching the live
   * WordPress Gravity Forms "Consent" field (gfield_contains_required).
   * Text is copied verbatim from that field — see CONSENT_TEXT in
   * components/estimate/EstimateFlow.tsx.
   */
  consent: boolean;
  source: string;
  landingPage: string;
  referrer: string;
  utm: Pick<Attribution, "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term">;
};

export const emptyLead: Lead = {
  serviceType: null,
  conversionReasons: [],
  whichBathroom: [],
  homeAge: [],
  timeline: null,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  streetAddress: "",
  city: "",
  state: "",
  zip: "",
  additionalInfo: "",
  consent: false,
  source: "get-a-quote",
  landingPage: "",
  referrer: "",
  utm: {},
};

/** Real field 1 — image-choice cards. Icon assets are the exact original
 * WordPress files (wp-content/uploads/.../Bathroom-Icon.svg, Shower.svg,
 * Conversion.svg — confirmed byte-identical to what's already in
 * public/images/wordpress/icons/ under clearer names). */
export const serviceTypeOptions: { value: ServiceType; label: string; icon: string }[] = [
  { value: "Bathtub Remodel", label: "Bathtub Remodel", icon: "/images/wordpress/icons/bathtub-remodel.svg" },
  { value: "Shower Remodel", label: "Shower Remodel", icon: "/images/wordpress/icons/shower-remodel.svg" },
  {
    value: "Full Bathroom Remodel",
    label: "Full Bathroom Remodel",
    icon: "/images/wordpress/icons/full-bathroom-remodel.svg",
  },
];

export const conversionReasonOptions: { value: ConversionReason; label: string }[] = [
  { value: "Easier Access/Safety", label: "Easier Access/Safety" },
  { value: "Modernize Style", label: "Modernize Style" },
  { value: "Easier to Clean", label: "Easier to Clean" },
  { value: "Increase Home Value", label: "Increase Home Value" },
];

export const whichBathroomOptions: { value: WhichBathroom; label: string }[] = [
  { value: "Master Bathroom", label: "Master Bathroom" },
  { value: "Guest/Hall Bathroom", label: "Guest/Hall Bathroom" },
  { value: "Powder Room", label: "Powder Room" },
  { value: "Other", label: "Other" },
];

export const homeAgeOptions: { value: HomeAge; label: string }[] = [
  { value: "Under 10 years", label: "Under 10 years" },
  { value: "10–25 years", label: "10–25 years" },
  { value: "25–50 years", label: "25–50 years" },
  { value: "50+ years (Historic)", label: "50+ years (Historic)" },
];

export const timelineOptions: { value: Timeline; label: string }[] = [
  { value: "Immediately", label: "Immediately" },
  { value: "Within 3 months", label: "Within 3 months" },
  { value: "6+ months", label: "6+ months" },
];

/** Standard US state abbreviations for the real form's "State" select
 * (`input_13.4`) — generic, not WordPress-specific content. */
export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
] as const;

/**
 * Real field 21 file-upload limits are jpg/gif/png/pdf/jpeg, up to 256MB
 * each, up to 5 files — but Web3Forms' plan this project uses only
 * supports a SINGLE file up to 5MB (confirmed against their docs; see
 * docs/migration/production-cutover-checklist.md for the full writeup).
 * These constants reflect what this build can actually deliver, not the
 * original WordPress limit — the UI copy is written to match.
 */
export const FILE_UPLOAD_ACCEPT = ".jpg,.jpeg,.gif,.png,.pdf";
export const FILE_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;
