"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { ChevronDownIcon, MenuIcon, PhoneIcon } from "../ui/icons";
import { MobileNav } from "./MobileNav";

function useIsActive(pathname: string) {
  return (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = useIsActive(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Transparent-over-hero → solid charcoal on scroll. Plain color-transition,
  // no backdrop-filter, so this stays cheap to paint on every frame.
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`header-settle fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid
          ? "border-b border-charcoal-800 bg-charcoal-950 shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-[1360px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:px-8 lg:h-20">
        <Logo />

        <nav className="hidden items-center justify-center gap-5 lg:flex lg:gap-6 xl:gap-8">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return item.children ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1 py-2 text-sm font-semibold uppercase tracking-[0.04em] transition-colors ${
                    active ? "text-bronze-400" : "text-warm-50/90 hover:text-bronze-400"
                  }`}
                >
                  {item.label}
                  <ChevronDownIcon className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-bronze-400 transition-all duration-200 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
                <div className="nav-dropdown absolute left-1/2 top-full mt-3 w-80 -translate-x-1/2 rounded-card border border-charcoal-700 bg-charcoal-950 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-[10px] px-4 py-3 transition-colors hover:bg-charcoal-800"
                    >
                      <span className="block text-xs font-bold uppercase tracking-[0.06em] text-warm-50">
                        {child.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-on-dark-muted">
                        {child.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-2 text-sm font-semibold uppercase tracking-[0.04em] transition-colors ${
                  active ? "text-bronze-400" : "text-warm-50/90 hover:text-bronze-400"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-bronze-400 transition-all duration-200 ${
                    active ? "w-full" : "w-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex xl:gap-5">
          <a
            href={siteConfig.phone.href}
            aria-label={`Call ${siteConfig.phone.display}`}
            className="flex items-center gap-2 text-sm font-semibold text-warm-50/80 transition-colors hover:text-bronze-400"
          >
            <PhoneIcon />
            <span className="hidden xl:inline">{siteConfig.phone.display}</span>
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
