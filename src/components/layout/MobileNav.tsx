"use client";

import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { Button } from "../ui/Button";
import { ChevronDownIcon, PhoneIcon } from "../ui/icons";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-nav"
      className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-charcoal-950 transition-opacity duration-200 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <nav className="flex h-full flex-col overflow-y-auto px-6 py-6">
        {primaryNav.map((item) =>
          item.children ? (
            <details key={item.label} className="group border-b border-charcoal-700 py-1">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-3 text-lg font-semibold uppercase tracking-wide text-warm-50 marker:content-none">
                <Link href={item.href} onClick={onClose}>
                  {item.label}
                </Link>
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-warm-50/60 transition-transform group-open:rotate-180" />
              </summary>
              <div className="flex flex-col pb-3 pl-3">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="min-h-11 py-2.5 text-base font-medium text-warm-50/80"
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
              className="min-h-11 border-b border-charcoal-700 py-4 text-lg font-semibold uppercase tracking-wide text-warm-50"
            >
              {item.label}
            </Link>
          )
        )}

        <a
          href={siteConfig.phone.href}
          className="mt-6 flex min-h-11 items-center gap-2 text-lg font-semibold text-bronze-400"
        >
          <PhoneIcon className="h-5 w-5" />
          {siteConfig.phone.display}
        </a>

        <Button href="/get-a-quote" variant="primary" className="mt-6 w-full" onClick={onClose}>
          Request an Estimate
        </Button>
      </nav>
    </div>
  );
}
