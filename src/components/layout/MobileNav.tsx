"use client";

import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { Button } from "../ui/Button";
import { ChevronDownIcon, PhoneIcon } from "../ui/icons";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-nav"
      className={`fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-charcoal-950 transition-opacity duration-200 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <nav className="flex-1 overflow-y-auto px-6 py-6">
        {primaryNav.map((item) =>
          item.children ? (
            <details key={item.label} className="group border-b border-charcoal-700 py-1">
              {/*
                The whole row is the accordion toggle, full stop — no Link
                inside it. Nesting a Link inside <summary> made one tap do
                two conflicting things (navigate vs. expand) depending on
                exactly where the tap landed. "View All Services" below is
                the only way to navigate to /services from here now.
              */}
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-3 text-lg font-semibold uppercase tracking-wide text-warm-50 marker:content-none">
                {item.label}
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-warm-50/60 transition-transform group-open:rotate-180" />
              </summary>
              <div className="flex flex-col gap-0.5 pb-3 pl-4">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="min-h-11 py-2 text-sm font-bold uppercase tracking-wide text-bronze-400"
                >
                  View All Services
                </Link>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="min-h-11 py-2 text-sm font-semibold text-warm-50/75"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </details>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="block min-h-11 border-b border-charcoal-700 py-4 text-lg font-semibold uppercase tracking-wide text-warm-50"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* Bottom action region — visually separated from the nav list, not mixed into it. */}
      <div className="shrink-0 border-t border-charcoal-700 bg-charcoal-900 p-5" style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={siteConfig.phone.href}
            className="flex min-h-12 items-center justify-center gap-2 rounded-btn border border-warm-50/20 text-sm font-bold uppercase tracking-[0.04em] text-warm-50"
          >
            <PhoneIcon className="h-4 w-4" />
            Call Now
          </a>
          <Button href="/get-a-quote" variant="primary" className="min-h-12" onClick={onClose}>
            Request Estimate
          </Button>
        </div>
      </div>
    </div>
  );
}
