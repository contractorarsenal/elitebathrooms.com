const STORAGE_KEY = "eb_attribution";

export type Attribution = {
  landingPage: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

/**
 * First-touch attribution capture. Runs once per browser (persisted in
 * localStorage so it survives across pages within the same visit and
 * later ones), never overwritten once set, never sent anywhere except as
 * part of an estimate submission. Silently no-ops if storage is
 * unavailable (private browsing, blocked storage, etc.) — attribution is
 * a nice-to-have, never a requirement for the form to work.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;

  try {
    if (window.localStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      landingPage: window.location.pathname + window.location.search,
      referrer: document.referrer || "",
      utm_source: params.get("utm_source") ?? undefined,
      utm_medium: params.get("utm_medium") ?? undefined,
      utm_campaign: params.get("utm_campaign") ?? undefined,
      utm_content: params.get("utm_content") ?? undefined,
      utm_term: params.get("utm_term") ?? undefined,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage unavailable — nothing to do.
  }
}

export function getAttribution(): Attribution {
  const fallback: Attribution = {
    landingPage: typeof window === "undefined" ? "" : window.location.pathname,
    referrer: "",
  };

  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    return { ...fallback, ...(JSON.parse(raw) as Attribution) };
  } catch {
    return fallback;
  }
}
