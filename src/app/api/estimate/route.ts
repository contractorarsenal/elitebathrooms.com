import { NextResponse } from "next/server";
import type { Lead } from "@/lib/estimate/types";

/**
 * Estimate submission endpoint — this is the ONLY place that should ever
 * talk to Jobber.
 *
 * TODO(jobber): wire this up once credentials/API details are available.
 * Do not invent a Jobber client ID, API base URL, or auth flow here —
 * Jobber's client-creation / request-a-quote API needs real credentials
 * issued to this business. The `Lead` shape below (src/lib/estimate/types.ts)
 * is already normalized to match what that call will need. Until real
 * credentials exist, this route validates the payload and logs it
 * server-side so the full flow — including attribution — is testable
 * end to end without a fake integration pretending to be real.
 */
export async function POST(request: Request) {
  let payload: Partial<Lead>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!payload.firstName || !payload.phone) {
    return NextResponse.json({ error: "First name and phone are required" }, { status: 422 });
  }

  console.log("[estimate] new lead (Jobber integration pending):", {
    ...payload,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
