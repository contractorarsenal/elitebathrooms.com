import Link from "next/link";
import { JsonLd } from "../seo/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

/** Visual breadcrumb trail + matching BreadcrumbList JSON-LD, in one place so they can never drift apart. */
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em]">
          {items.map((item, i) => (
            <li key={item.name} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className={tone === "dark" ? "text-warm-50/40" : "text-ink-muted"}>/</span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className={
                    tone === "dark"
                      ? "text-warm-50/70 hover:text-bronze-400"
                      : "text-ink-muted hover:text-bronze-600"
                  }
                >
                  {item.name}
                </Link>
              ) : (
                <span className={tone === "dark" ? "text-bronze-400" : "text-bronze-600"}>
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
