import type { Lead } from "./types";

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Client-side helper — posts to our own /api/estimate route handler, which
 * is the isolation boundary for the real Jobber integration (see that
 * file's TODO). Nothing here talks to Jobber directly, and no Jobber
 * credentials/endpoints are assumed anywhere in this codebase yet.
 */
export async function submitLead(payload: Lead): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { ok: false, error: "Something went wrong submitting your request." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — please check your connection and try again." };
  }
}
