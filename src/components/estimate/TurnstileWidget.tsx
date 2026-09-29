"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Script from "next/script";
import { TURNSTILE_SITE_KEY } from "@/lib/estimate/turnstile";

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
  theme?: "light" | "dark" | "auto";
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export type TurnstileWidgetHandle = { reset: () => void };

/**
 * Real Cloudflare Turnstile, occupying the same visual slot the placeholder
 * "Are you human?" box used to (see docs/migration/production-cutover-checklist.md
 * §14). Explicit render (not the `cf-turnstile` div auto-render convention)
 * so a failed/expired submission can call `.reset()` and get a fresh token
 * without a full page reload.
 */
export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, { onToken: (token: string) => void; onExpire: () => void }>(
  function TurnstileWidget({ onToken, onExpire }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [scriptReady, setScriptReady] = useState(false);
    const [renderError, setRenderError] = useState(false);

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (window.turnstile && widgetIdRef.current) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      if (!scriptReady || !containerRef.current || !window.turnstile || widgetIdRef.current) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: onToken,
        "expired-callback": onExpire,
        "error-callback": () => setRenderError(true),
      });
      // onToken/onExpire are stable across this component's lifetime (passed
      // from EstimateFlow's top-level state setters), so this effect only
      // needs to re-run when the script itself becomes ready.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scriptReady]);

    if (!TURNSTILE_SITE_KEY) {
      return (
        <p className="text-xs font-semibold text-red-600">
          Spam verification is not configured yet. Please contact us directly instead of using this form.
        </p>
      );
    }

    return (
      <>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onReady={() => setScriptReady(true)}
        />
        <div ref={containerRef} />
        {renderError && (
          <p className="mt-2 text-xs font-semibold text-red-600">
            Spam verification failed to load. Please refresh the page and try again.
          </p>
        )}
      </>
    );
  }
);
