import Image from "next/image";
import type { Crumb } from "@/lib/schema";

/**
 * Shared internal-page hero, matching WordPress's real interior-page hero
 * exactly: every single interior page (About, Contact, Projects, Service
 * Areas, every service detail, Get a Quote) uses the identical background
 * photo — wp-content/uploads/2026/03/bg-fallback.jpg — confirmed by
 * checking the live computed background-image across 6+ different page
 * templates. Flat dark overlay, a single left-aligned H1 and nothing else —
 * no breadcrumb trail, no description paragraph, no CTA (confirmed empty
 * `.breadcrumb-wrap` and a hero container holding only the heading widget
 * in every archived interior page). `crumbs` is accepted for schema.org
 * BreadcrumbList JSON-LD elsewhere on the page, not rendered here. Any
 * `imageSrc` passed in is ignored — WordPress does not vary this image.
 */
export function PageHero(props: {
  // Accepted (not rendered here) so call sites can pass the same crumbs
  // used for this page's schema.org BreadcrumbList JSON-LD elsewhere.
  crumbs: Crumb[];
  title: React.ReactNode;
  description?: string;
  imageLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  const { title } = props;
  return (
    <section className="relative min-h-[320px] overflow-hidden bg-charcoal-950 sm:min-h-[420px] lg:min-h-[560px]">
      <Image
        src="/images/wordpress/bg-fallback.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal-950/70" />

      {/*
        Measured directly from the live DOM: H1 top at 128px (390 viewport)
        and 208px (1440 viewport) — not vertically centered, a fixed
        top offset that already clears the fixed header.
      */}
      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-4 pt-32 sm:pt-40 lg:pt-[208px]">
        <h1 className="max-w-3xl text-[2rem] font-extrabold leading-[1.1] text-warm-50 sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
      </div>
    </section>
  );
}
