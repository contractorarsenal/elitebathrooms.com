import Image from "next/image";
import Link from "next/link";

// Real Elite Bathrooms header lockup, downloaded directly from the live
// WordPress site (wp-content/uploads/2026/02/logo_color_white.svg) — see
// docs/migration/homepage-parity.md. White wordmark + bronze shield glyph,
// intended for the dark/transparent header only.
const LOGO_SRC = "/images/wordpress/logo_color_white.svg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Elite Bathrooms home" className={`flex shrink-0 items-center ${className}`}>
      <Image
        src={LOGO_SRC}
        alt="Elite Bathrooms"
        width={228}
        height={77}
        priority
        className="h-auto w-[110px] sm:w-[150px] lg:w-[200px] xl:w-[220px]"
      />
    </Link>
  );
}
