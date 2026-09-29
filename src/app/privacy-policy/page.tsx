import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: absoluteUrl("/privacy-policy") },
};

// AUDITED: every statement below is checked against either (a) verified
// Elite Bathrooms business information (site-config.ts), or (b) this
// codebase's actual, currently-implemented data collection — the quote and
// contact forms in src/lib/estimate/types.ts and src/lib/attribution.ts.
// Nothing here describes a third-party analytics/advertising/tracking
// integration, because none is currently installed (see
// docs/migration/rebuild-reconciliation.md — GTM containers were
// explicitly deferred). The live WordPress page's boilerplate technical-
// collection list (IP address, browser type, OS, pages visited, referrer,
// access time as a distinct enumerated "we collect this" claim) and its
// broken mail-merge fields have been removed rather than reproduced or
// guessed at — see the pending-review notice below and
// docs/migration/legal-pages-status.md. The real archived WordPress source
// is preserved untouched at wordpress-archive/html/privacy-policy.html.
export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} title="Privacy Policy" />

      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-base leading-relaxed text-charcoal-800">
          <div className="rounded-2xl border border-bronze-500/40 bg-bronze-500/5 p-6">
            <p className="font-bold text-charcoal-950">This page is pending final compliance review.</p>
            <p className="mt-2">
              It currently describes only the data our website forms actually collect today. It
              does not yet describe any analytics, advertising, or tracking technology, because
              none is finalized yet. This page will be updated once that configuration and its
              legal language are reviewed and approved.
            </p>
          </div>

          <p className="mt-8">
            <strong className="text-charcoal-950">Last Updated:</strong> {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <p className="mt-6">
            This Privacy Policy describes the practices of{" "}
            <strong className="text-charcoal-950">Elite Bathrooms (Elite Tile &amp; Remodel LLC)</strong>,
            located at <strong className="text-charcoal-950">415 St Helens Ave #820, Tacoma, WA 98402, USA</strong>,
            email: <a href="mailto:info@elitebathrooms.com" className="text-bronze-500">info@elitebathrooms.com</a>,
            phone: <strong className="text-charcoal-950">(206) 369-2688</strong>, regarding the
            collection, use, and disclosure of your personal information when you use{" "}
            <a href="https://elitebathrooms.com/" className="text-bronze-500">https://elitebathrooms.com/</a>{" "}
            (the &quot;Service&quot;).
          </p>
          <p className="mt-4">
            By submitting a form on the Service, you consent to the collection, use, and
            disclosure of your information in accordance with this Privacy Policy. If you do not
            consent, please do not submit the form.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold text-charcoal-950">Information We Collect</h2>
          <p className="mt-4">
            When you submit our quote request or contact form, we collect the information you
            provide, which may include:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>ZIP code</li>
            <li>Details about your project (type, budget range, timeline, and description)</li>
            <li>Your preferred method and time to be contacted</li>
          </ul>
          <p className="mt-4">
            We also record which page you submitted the form from and, where present, standard
            marketing-campaign parameters in the page&apos;s URL (for example{" "}
            <code className="text-sm">utm_source</code>), so we know how you found us.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold text-charcoal-950">How We Use Your Information</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Responding to your quote request or inquiry</li>
            <li>Contacting you about your project by phone, text, or email, per your preference</li>
            <li>Internal record-keeping for the project you inquired about</li>
          </ul>
          <p className="mt-4">
            If you checked the SMS/email consent box on our form, we may also send you
            non-marketing updates and service notifications by text or email, as described in
            that checkbox&apos;s own text at the time you submitted the form. Message and data
            rates may apply; you can opt out at any time by replying STOP, or get help by
            replying HELP.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold text-charcoal-950">Retention of Your Information</h2>
          <p className="mt-4">
            We retain the information you submit only for as long as necessary to respond to
            your inquiry and, if you become a customer, to deliver and document your project.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold text-charcoal-950">Your Rights</h2>
          <p className="mt-4">
            You may contact us at any time to request access to, correction of, or deletion of
            the information you have submitted to us, by emailing{" "}
            <a href="mailto:info@elitebathrooms.com" className="text-bronze-500">info@elitebathrooms.com</a>{" "}
            or calling (206) 369-2688.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold text-charcoal-950">Cookies and Tracking</h2>
          <p className="mt-4">
            See our{" "}
            <a href="/cookie-policy" className="text-bronze-500">Cookie Policy</a>, which is
            currently pending final compliance review.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold text-charcoal-950">Security</h2>
          <p className="mt-4">
            We implement reasonable safeguards to protect your personal information. However, no
            method of transmission or storage is completely secure.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold text-charcoal-950">Contact Information</h2>
          <p className="mt-4">
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
