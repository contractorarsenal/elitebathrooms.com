import { ImageSlot } from "../ui/ImageSlot";
import { Breadcrumbs } from "../layout/Breadcrumbs";
import type { Crumb } from "@/lib/schema";

/**
 * Shared internal-page hero: dark real-bathroom photo, breadcrumb above a
 * left-aligned H1, optional short descriptor. Capped height (not full
 * viewport) — these are secondary pages, not the homepage.
 */
export function PageHero({
  crumbs,
  title,
  description,
  imageLabel,
  imageSrc,
  imageAlt,
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  description?: string;
  imageLabel: string;
  imageSrc?: string;
  imageAlt: string;
}) {
  return (
    <section className="relative flex min-h-[280px] items-end overflow-hidden bg-charcoal-950 pt-16 sm:min-h-[360px] lg:min-h-[420px] lg:pt-24">
      <ImageSlot cover src={imageSrc} alt={imageAlt} label={imageLabel} objectPosition="center 65%" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(18,19,22,0.94)_0%,rgba(18,19,22,0.8)_45%,rgba(18,19,22,0.5)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-8 sm:py-12">
        <Breadcrumbs items={crumbs} tone="dark" />
        <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-[1.05] text-warm-50 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-on-dark-muted sm:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
