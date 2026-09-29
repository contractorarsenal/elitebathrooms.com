import { PageHero } from "../sections/PageHero";
import { GoogleReviews } from "../sections/GoogleReviews";
import { OneDayPromoWp } from "../sections/OneDayPromoWp";
import { ThumbtackReviews } from "../sections/ThumbtackReviews";
import { WarrantyStrip } from "../sections/WarrantyStrip";
import { CheckIcon } from "../ui/icons";
import type { WpAreaBlock, WpSourcedArea } from "@/data/areas-wp-sourced";

/**
 * One shared, exact-WordPress-matching template for the 31 service-area
 * pages migrated verbatim from WordPress (parity migration — see
 * docs/migration/rebuild-reconciliation.md). Body content is the archived
 * WordPress copy, grouped by heading level and rendered in original order.
 * Every interior page (this one included) uses the same shared hero
 * background — confirmed directly against the live site, not per-area.
 */

function groupBlocks(blocks: WpAreaBlock[]) {
  const groups: (WpAreaBlock | { tag: "ul"; items: string[] })[] = [];
  for (const b of blocks) {
    if (b.tag === "li") {
      const last = groups[groups.length - 1];
      if (last && last.tag === "ul") {
        (last as { tag: "ul"; items: string[] }).items.push(b.text);
        continue;
      }
      groups.push({ tag: "ul", items: [b.text] });
    } else {
      groups.push(b);
    }
  }
  return groups;
}

function BlockBody({ blocks }: { blocks: WpAreaBlock[] }) {
  const grouped = groupBlocks(blocks);
  return (
    <div className="space-y-5">
      {grouped.map((g, i) => {
        if (g.tag === "ul") {
          return (
            <ul key={i} className="grid grid-cols-2 gap-x-6 gap-y-2 py-2 sm:grid-cols-3">
              {g.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-charcoal-800">
                  <CheckIcon className="h-3.5 w-3.5 shrink-0 text-bronze-500" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (g.tag === "h2") {
          return (
            <h2 key={i} className="pt-6 text-2xl font-extrabold leading-tight text-charcoal-950 sm:text-3xl">
              {g.text}
            </h2>
          );
        }
        if (g.tag === "h3") {
          return (
            <h3 key={i} className="pt-2 text-lg font-extrabold text-charcoal-950">
              {g.text}
            </h3>
          );
        }
        if (g.tag === "h4") {
          return (
            <h4 key={i} className="pt-1 text-base font-bold text-bronze-500">
              {g.text}
            </h4>
          );
        }
        return (
          <p key={i} className="max-w-3xl text-base leading-relaxed text-charcoal-800">
            {g.text}
          </p>
        );
      })}
    </div>
  );
}

export function WpAreaDetail({ area }: { area: WpSourcedArea }) {
  const [, ...body] = area.blocks;

  return (
    <main>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-area" },
          { name: area.name },
        ]}
        title={`Bathroom Remodeling in ${area.name}, WA`}
      />

      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <BlockBody blocks={body} />
        </div>
      </section>

      <GoogleReviews />
      <OneDayPromoWp />
      <ThumbtackReviews />
      <WarrantyStrip />
    </main>
  );
}
