"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Mounted once in the root layout. Renders nothing — pure side effect. */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
