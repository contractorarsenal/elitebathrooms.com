import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie Policy - Home Renovation and Remodel Services",
  // Not indexed while the content below is a placeholder pending legal
  // review — see the in-page notice and docs/migration/legal-pages-status.md.
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl("/cookie-policy") },
};

// STATUS: PENDING FINAL COMPLIANCE REVIEW. Do not treat this page as
// production-approved legal copy.
//
// The live WordPress Cookie Policy page's body content is a verbatim
// duplicate of the Privacy Policy (the wrong template was published under
// this title — confirmed by comparing both pages' full text; the real
// archived source is preserved untouched at
// wordpress-archive/html/cookie-policy.html for reference). A prior pass
// replaced it with AI-drafted cookie-disclosure language describing
// specific cookie categories, third-party behavior, and consent handling
// that were never verified against this site's actual tracking
// configuration — the tracking/cookie stack isn't finalized yet. That
// invented content has been removed. This page now shows only verified,
// factual business information and a clear pending-review notice, with no
// claims about what cookies are or are not set, how they're categorized,
// retention periods, third-party sharing, or consent mechanisms. Replace
// this with legal-approved copy once the Production tracking stack is
// finalized. See docs/migration/legal-pages-status.md.
export default function CookiePolicyPage() {
  return (
    <main>
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Cookie Policy" }]} title="Cookie Policy" />

      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-base leading-relaxed text-charcoal-800">
          <div className="rounded-2xl border border-bronze-500/40 bg-bronze-500/5 p-6">
            <p className="font-bold text-charcoal-950">This page is pending final compliance review.</p>
            <p className="mt-2">
              The cookie and tracking technologies used on this site have not yet been finalized,
              so this page does not yet describe specific cookie categories, third-party sharing,
              retention periods, or consent mechanisms. A complete Cookie Policy will be published
              here once that configuration is finalized and reviewed. In the meantime, please
              contact us directly with any questions.
            </p>
          </div>

          <p className="mt-8">
            Elite Bathrooms (Elite Tile &amp; Remodel LLC)
            <br />
            415 St Helens Ave #820, Tacoma, WA 98402, USA
            <br />
            Email: <a href="mailto:info@elitebathrooms.com" className="text-bronze-500">info@elitebathrooms.com</a>
            <br />
            Phone: (206) 369-2688
          </p>
        </div>
      </section>
    </main>
  );
}
