"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { Button } from "../ui/Button";
import { MenuIcon, PhoneIcon } from "../ui/icons";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        solid ? "bg-charcoal-950 shadow-[0_1px_0_0_rgba(255,255,255,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:h-20">
        <Link href="/" className="flex items-center gap-2" aria-label="Elite Bathrooms home">
          {/* TODO: swap for real logo mark at /public/images/elite-logo.svg */}
          <span className="font-heading text-lg font-extrabold uppercase tracking-tight text-warm-50 sm:text-xl">
            Elite <span className="text-bronze-400">Bathrooms</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-[0.04em] text-warm-50/90 transition-colors hover:text-bronze-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={siteConfig.phone.href}
            className="flex items-center gap-2 text-sm font-semibold text-warm-50/90 transition-colors hover:text-bronze-400"
          >
            <PhoneIcon />
            {siteConfig.phone.display}
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
