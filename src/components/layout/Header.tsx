"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { ArrowRightIcon, ChevronDownIcon, MenuIcon, PhoneIcon } from "../ui/icons";
import { MobileNav } from "./MobileNav";

function useIsActive(pathname: string) {
  return (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = useIsActive(pathname);

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Transparent-over-hero only applies on the homepage, and only before the
  // user scrolls past it. Every interior page starts solid immediately —
  // there's no dark hero photo behind the header to justify transparency,
  // and waiting for scroll left white nav text unreadable on light pages.
  const solid = !isHome || scrolled || menuOpen;

  return (
    <header
      className={`header-settle fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid
          ? "border-b border-charcoal-800 bg-charcoal-950 shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-[1360px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:px-8 lg:h-24">
        <Logo />

        <nav className="hidden items-center justify-center gap-6 lg:flex lg:gap-7 xl:gap-9">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return item.children ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1.5 py-2 text-[0.9rem] font-bold uppercase tracking-[0.03em] transition-colors ${
                    active ? "text-bronze-400" : "text-warm-50/95 hover:text-bronze-400"
                  }`}
                >
                  {item.label}
                  <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-bronze-400 transition-all duration-200 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
                {/*
                  The bridge wrapper sits flush against the trigger (top-full,
                  no margin) so there is never a dead hover gap between them —
                  the visual gap is `pt-4` padding *inside* this hoverable box
                  instead of a margin outside it. A margin-based gap breaks
                  `.group:hover` mid-transit because the cursor briefly leaves
                  every descendant of `.group` while crossing it.
                */}
                <div className="nav-dropdown absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-4">
                  <div className="rounded-card border border-charcoal-700 bg-charcoal-950 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                    {item.children.map((child, i) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center justify-between gap-3 rounded-[10px] px-4 py-3.5 transition-colors hover:bg-charcoal-800 ${
                          i === 0 ? "bg-charcoal-900/60" : ""
                        }`}
                      >
                        <span>
                          <span className="block text-sm font-bold uppercase tracking-[0.04em] text-warm-50">
                            {child.label}
                          </span>
                          <span className="mt-0.5 block text-[0.8rem] text-ink-on-dark-muted">
                            {child.description}
                          </span>
                        </span>
                        <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-bronze-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-2 text-[0.9rem] font-bold uppercase tracking-[0.03em] transition-colors ${
                  active ? "text-bronze-400" : "text-warm-50/95 hover:text-bronze-400"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-bronze-400 transition-all duration-200 ${
                    active ? "w-full" : "w-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex xl:gap-6">
          <a
            href={siteConfig.phone.href}
            aria-label={`Call ${siteConfig.name}`}
            className="flex items-center gap-2 text-[0.9rem] font-bold text-warm-50/90 transition-colors hover:text-bronze-400"
          >
            <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
            <span className="hidden xl:inline">Call Now</span>
          </a>
          <Button href="/get-a-quote" variant="primary">
            Request Estimate
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-warm-50 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
