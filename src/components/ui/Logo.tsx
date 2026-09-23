import Image from "next/image";
import Link from "next/link";

// Real Elite Bathrooms logomark, migrated from elitebathrooms.com. This is
// the icon only (no wordmark baked in), so it's paired with a text label
// rather than recreating the whole brand mark in CSS. Swap ICON_SRC for a
// full lockup PNG if the client supplies one later.
const ICON_SRC = "/images/brand/elite-logomark.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Elite Bathrooms home"
      className={`flex shrink-0 items-center gap-2.5 ${className}`}
    >
      <Image
        src={ICON_SRC}
        alt=""
        width={700}
        height={716}
        priority
        className="h-10 w-auto sm:h-12"
      />
      <span className="font-heading text-lg font-extrabold uppercase leading-none tracking-tight text-warm-50 sm:text-xl">
        Elite
        <br />
        <span className="text-bronze-400">Bathrooms</span>
      </span>
    </Link>
  );
}
