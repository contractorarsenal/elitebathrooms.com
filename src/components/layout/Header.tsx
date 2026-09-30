"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  DotGridIcon,
  FacebookIcon,
  InstagramIcon,
  MenuIcon,
  PhoneIcon,
} from "../ui/icons";
import { MobileNav } from "./MobileNav";

function useIsActive(pathname: string) {
  return (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
}

/**
 * Desktop nav fix: "About" and "Services" are dropdown triggers, not
 * destinations -- clicking either must not navigate (only the real links
 * inside each dropdown do). The open/close mechanics are unchanged and
 * still pure CSS (`.group:hover`/`.group:focus-within` on `.nav-dropdown`
 * in globals.css) -- this fix only swaps the trigger element itself from
 * an `<a>`/`<Link>` (which always navigates on click) to a `<button
 * type="button">` (which never does), with identical classes so it's
 * visually indistinguishable from the plain nav links beside it.
 */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Mirrors the CSS `:hover`/`:focus-within` state that actually drives the
  // dropdown's visibility (see `.nav-dropdown` in globals.css) -- this state
  // is read-only with respect to that visibility, purely so `aria-expanded`
  // reports something accurate. It never gates showing/hiding the dropdown
  // itself, so there's no click-driven "stays open" state to get stuck.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
  // user scrolls past it — matches WordPress's "header-absolute" treatment,
  // which sits transparent on the hero photo and never needs a solid state
  // until the hero has scrolled by.
  const solid = !isHome || scrolled || menuOpen;

  return (
    <header
      className={`header-settle fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid
          ? "border-b border-charcoal-800 bg-charcoal-950 shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1770px] items-center justify-between gap-4 px-5 lg:h-24">
        <Logo className="lg:mr-[61px]" />

        <nav className="hidden items-center justify-center gap-[10px] lg:flex">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return item.children ? (
              <div
                key={item.label}
                className="group relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown((prev) => (prev === item.label ? null : prev))}
                onFocus={() => setOpenDropdown(item.label)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setOpenDropdown((prev) => (prev === item.label ? null : prev));
                  }
                }}
              >
                {/*
                  A dropdown trigger, not a destination -- see the desktop-nav
                  fix note above. Visually identical to the plain nav <Link>
                  below (same classes); only the element type changes.
                */}
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.label}
                  className={`relative flex cursor-pointer items-center gap-1.5 py-2 font-heading text-[1rem] font-bold uppercase tracking-normal transition-colors ${
                    active ? "text-bronze-400" : "text-warm-50 hover:text-bronze-400"
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
                </button>
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
                        } ${
                          // Areas We Serve (or any future emphasized entry) is
                          // visually set apart from the plain service links
                          // above it, not just another row in the list.
                          child.emphasized ? "mt-1.5 border-t border-charcoal-700 pt-4" : ""
                        }`}
                      >
                        <span>
                          <span
                            className={`block text-sm font-bold uppercase tracking-[0.04em] ${
                              child.emphasized ? "text-bronze-400" : "text-warm-50"
                            }`}
                          >
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
                className={`relative py-2 font-heading text-[1rem] font-bold uppercase tracking-normal transition-colors ${
                  active ? "text-bronze-400" : "text-warm-50 hover:text-bronze-400"
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

        <div className="hidden items-center gap-[10px] lg:flex">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Elite Bathrooms on Facebook"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-bronze-500 text-warm-50 transition-colors hover:bg-charcoal-800"
          >
            <FacebookIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Elite Bathrooms on Instagram"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-bronze-500 text-warm-50 transition-colors hover:bg-charcoal-800"
          >
            <InstagramIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href={siteConfig.phone.href}
            aria-label={`Call ${siteConfig.name}`}
            className="flex items-center gap-[13px] text-warm-50 transition-colors hover:text-bronze-400"
          >
            <PhoneIcon className="h-[30px] w-[30px]" />
            <span className="font-heading text-[18px] font-normal">{siteConfig.phone.display}</span>
          </a>
          <a
            href="/get-a-quote"
            className="inline-flex h-[38px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-bronze-500 px-[25px] text-base font-bold text-warm-50 transition-colors hover:bg-bronze-600"
          >
            Get A Quote
          </a>
          <a
            href="/contact-us"
            aria-label="Contact info"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-warm-50/25 text-warm-50 transition-colors hover:border-warm-50/60"
          >
            <DotGridIcon className="h-4 w-4" />
          </a>
        </div>

        <Button href="/get-a-quote" variant="primary" className="lg:hidden">
          Get A Quote
        </Button>

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
