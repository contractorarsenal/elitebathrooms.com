import { siteConfig } from "@/lib/site-config";
import { PhoneIcon } from "../ui/icons";

/**
 * Persistent bottom bar, mobile only. Static — no scroll-direction JS —
 * so it can never interfere with touch scrolling.
 */
export function MobileCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-charcoal-700 bg-charcoal-950 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={siteConfig.phone.href}
        className="flex min-h-14 flex-1 items-center justify-center gap-2 border-r border-charcoal-700 text-sm font-bold uppercase tracking-wide text-warm-50"
      >
        <PhoneIcon className="h-5 w-5" />
        Call Now
      </a>
      <a
        href="/get-a-quote"
        className="flex min-h-14 flex-1 items-center justify-center gap-2 bg-bronze-500 text-sm font-bold uppercase tracking-wide text-warm-50"
      >
        Request Estimate
      </a>
    </div>
  );
}
