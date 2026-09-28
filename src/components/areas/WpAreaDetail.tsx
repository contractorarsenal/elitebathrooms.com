import { PageHero } from "../sections/PageHero";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { WaterproofingBanner } from "../sections/WaterproofingBanner";
import { RelatedProjects } from "../sections/RelatedProjects";
import { ServiceAreaLinks } from "../sections/ServiceAreaLinks";
import { NextStepCTA } from "../sections/NextStepCTA";
import type { WpAreaBlock, WpSourcedArea } from "@/data/areas-wp-sourced";

/**
 * Renders one of the 29 service-area pages migrated verbatim from
 * WordPress (parity migration -- see docs/migration/rebuild-reconciliation.md).
 * Deliberately simpler than AreaDetail.tsx, which is reserved for the 7
 * hand-written verified markets: this component's body content is the
 * archived WordPress copy, grouped by heading level and rendered in the
 * original order, wrapped in the same shared site sections (projects,
 * waterproofing, nearby areas, CTA) used everywhere else for visual
 * consistency. It does not use FaqAccordion/area FAQ schema deliberately --
 * these pages' FAQ blocks render as plain content, matching "parity, not
 * a rewrite."
 */

function groupBlocks(blocks: WpAreaBlock[]) {
  // Groups consecutive "li" blocks into a single list, keeps everything else standalone.
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
    <div className="space-y-6">
      {grouped.map((g, i) => {
        if (g.tag === "ul") {
          return (
            <ul key={i} className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
              {g.items.map((item) => (
                <li key={item} className="text-sm text-ink-muted">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (g.tag === "h2") {
          return (
            <h2 key={i} className="pt-4 text-2xl font-extrabold leading-tight text-charcoal-950 sm:text-3xl">
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
            <h4 key={i} className="pt-1 text-base font-bold text-charcoal-950">
              {g.text}
            </h4>
          );
        }
        return (
          <p key={i} className="max-w-3xl text-base leading-relaxed text-ink-muted">
            {g.text}
          </p>
        );
      })}
    </div>
  );
}

export function WpAreaDetail({ area }: { area: WpSourcedArea }) {
  // blocks[0] is always the page's h1 (used as the PageHero title below);
  // the rest of the body renders from blocks[1:].
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
        imageSrc={area.heroImage ?? undefined}
        imageLabel={area.heroImage ?? "service-area hero"}
        imageAlt={`Elite Bathrooms bathroom remodeling in ${area.name}, WA`}
      />

      <section className="bg-warm-50 py-16 sm:py-20">
        <Container>
          <Reveal>
            <BlockBody blocks={body} />
          </Reveal>
        </Container>
      </section>

      <RelatedProjects />
      <WaterproofingBanner />
      <ServiceAreaLinks exceptSlug={area.slug} />
      <NextStepCTA variant="split" heading={`Ready to start your ${area.name} bathroom project?`} />
    </main>
  );
}
