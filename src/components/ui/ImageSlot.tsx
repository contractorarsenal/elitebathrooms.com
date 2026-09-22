import Image from "next/image";
import type { CSSProperties } from "react";

type ImageSlotProps = {
  /** Pass the real photo path once it exists in /public. Omit to render a labeled placeholder. */
  src?: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "16/10", "4/5". Ignored when `cover` is set. */
  aspectRatio?: string;
  /** Fill the positioned parent (e.g. a hero section) instead of sizing via aspect-ratio. */
  cover?: boolean;
  objectPosition?: string;
  mobileObjectPosition?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Intended future filename, shown only in placeholder mode — does not fetch anything. */
  label?: string;
};

/**
 * Reserves the exact geometry (aspect-ratio + object-position, desktop and
 * mobile) that the real photo will occupy, so dropping in a file at `src`
 * later requires no layout changes. See PHOTOGRAPHY SYSTEM in the build spec
 * for what each named slot should contain.
 */
export function ImageSlot({
  src,
  alt,
  aspectRatio = "4/3",
  cover = false,
  objectPosition = "center",
  mobileObjectPosition,
  sizes = "100vw",
  priority = false,
  className = "",
  label,
}: ImageSlotProps) {
  const style = {
    ...(cover ? {} : { aspectRatio }),
    "--obj-desktop": objectPosition,
    "--obj-mobile": mobileObjectPosition ?? objectPosition,
  } as CSSProperties;

  const sizingClass = cover ? "absolute inset-0" : "relative";

  if (src) {
    return (
      <div className={`${sizingClass} overflow-hidden ${className}`} style={style}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="photo-el object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizingClass} overflow-hidden bg-[linear-gradient(135deg,var(--color-charcoal-800),var(--color-charcoal-950))] ${className}`}
      style={style}
      role="img"
      aria-label={alt}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-bronze-400">
          Photo pending
        </span>
        <span className="max-w-xs text-sm text-ink-on-dark-muted">{alt}</span>
        {label && (
          <code className="mt-1 rounded bg-black/30 px-2 py-1 text-[11px] text-ink-on-dark-muted">
            {label}
          </code>
        )}
      </div>
    </div>
  );
}
