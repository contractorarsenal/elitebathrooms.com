import Image from "next/image";
import Link from "next/link";

// TODO: swap to the real PNG once supplied: /images/brand/elite-bathrooms-logo.png
const LOGO_SRC = "/images/brand/elite-bathrooms-logo-placeholder.svg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Elite Bathrooms home" className={`block ${className}`}>
      <Image
        src={LOGO_SRC}
        alt="Elite Bathrooms"
        width={200}
        height={46}
        className="h-9 w-auto sm:h-10"
        priority
        unoptimized
      />
    </Link>
  );
}
