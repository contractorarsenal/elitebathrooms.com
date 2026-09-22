export type ProjectType =
  | "full-remodel"
  | "shower-remodel"
  | "tub-to-shower"
  | "bathtub-remodel"
  | "not-sure";

export type InvestmentRange = "10-20k" | "20-35k" | "35-50k" | "50k-plus" | "not-sure";

export type Timeline = "asap" | "1-3-months" | "3-6-months" | "just-exploring";

export type EstimateRequest = {
  projectType: ProjectType | null;
  zip: string;
  investmentRange: InvestmentRange | null;
  timeline: Timeline | null;
  details: string;
  name: string;
  phone: string;
  email: string;
};

export const emptyEstimateRequest: EstimateRequest = {
  projectType: null,
  zip: "",
  investmentRange: null,
  timeline: null,
  details: "",
  name: "",
  phone: "",
  email: "",
};

export const projectTypeOptions: { value: ProjectType; label: string }[] = [
  { value: "full-remodel", label: "Full Bathroom Remodel" },
  { value: "shower-remodel", label: "Shower Remodel" },
  { value: "tub-to-shower", label: "Tub-to-Shower Conversion" },
  { value: "bathtub-remodel", label: "Bathtub Remodel" },
  { value: "not-sure", label: "Not Sure Yet" },
];

export const investmentRangeOptions: { value: InvestmentRange; label: string }[] = [
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
