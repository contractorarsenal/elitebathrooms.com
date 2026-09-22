import type { Attribution } from "@/lib/attribution";

export type ProjectType =
  | "full-remodel"
  | "shower-remodel"
  | "tub-to-shower"
  | "bathtub-remodel"
  | "not-sure";

export type Budget = "10-20k" | "20-35k" | "35-50k" | "50k-plus" | "not-sure";

export type Timeline = "asap" | "1-3-months" | "3-6-months" | "just-exploring";

export type PreferredContactMethod = "phone" | "text" | "email";

/**
 * Normalized lead payload — the shape /api/estimate accepts and the shape
 * a future Jobber client-creation call would be built from. `address` is
 * optional because the current flow only ever collects a ZIP, not a full
 * street address; `utm`/`landingPage`/`referrer` are captured passively via
 * lib/attribution.ts and never shown to the homeowner.
 */
export type Lead = {
  projectType: ProjectType | null;
  zip: string;
  budget: Budget | null;
  timeline: Timeline | null;
  details: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
  preferredContactMethod: PreferredContactMethod | null;
  source: string;
  landingPage: string;
  referrer: string;
  utm: Pick<Attribution, "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term">;
};

export const emptyLead: Lead = {
  projectType: null,
  zip: "",
  budget: null,
  timeline: null,
  details: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: undefined,
  preferredContactMethod: null,
  source: "get-a-quote",
  landingPage: "",
  referrer: "",
  utm: {},
};

export const projectTypeOptions: { value: ProjectType; label: string }[] = [
  { value: "full-remodel", label: "Full Bathroom Remodel" },
  { value: "shower-remodel", label: "Shower Remodel" },
  { value: "tub-to-shower", label: "Tub-to-Shower Conversion" },
  { value: "bathtub-remodel", label: "Bathtub Remodel" },
  { value: "not-sure", label: "Not Sure Yet" },
];

export const budgetOptions: { value: Budget; label: string }[] = [
  { value: "10-20k", label: "$10K – $20K" },
  { value: "20-35k", label: "$20K – $35K" },
  { value: "35-50k", label: "$35K – $50K" },
  { value: "50k-plus", label: "$50K+" },
  { value: "not-sure", label: "Not Sure Yet" },
];

export const timelineOptions: { value: Timeline; label: string }[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "just-exploring", label: "Just exploring" },
];

export const preferredContactOptions: { value: PreferredContactMethod; label: string }[] = [
  { value: "phone", label: "Call" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
];
