import { NextResponse } from "next/server";
import type { EstimateRequest } from "@/lib/estimate/types";

/**
 * Estimate submission endpoint — this is the ONLY place that should ever
 * talk to Jobber.
 *
 * TODO(jobber): wire this up once credentials/API details are available.
 * Do not invent a Jobber client ID, API base URL, or auth flow here —
 * Jobber's request-a-quote / client-creation API needs real credentials
 * issued to this business. Until then this route validates the payload
 * and logs it server-side so the estimate flow is fully testable end to
 * end without a fake integration pretending to be real.
 */
export async function POST(request: Request) {
  let payload: Partial<EstimateRequest>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!payload.name || !payload.phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 422 });
  }

  console.log("[estimate] new request (Jobber integration pending):", payload);

  return NextResponse.json({ ok: true });
}
