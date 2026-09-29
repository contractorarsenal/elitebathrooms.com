# Legal Pages Status

## Cookie Policy — `/cookie-policy`

**Status: PENDING FINAL COMPLIANCE REVIEW.**

The live WordPress Cookie Policy page publishes the Privacy Policy's own body
text under the Cookie Policy title (a template mix-up on the WP side —
confirmed by diffing the two pages' full text). The real archived HTML is
preserved, untouched, at `wordpress-archive/html/cookie-policy.html`.

A prior pass in this rebuild wrote specific, AI-drafted cookie-disclosure
language (named cookie categories, third-party behavior, retention windows,
consent handling) that was never checked against this site's actual tracking
configuration, because the tracking/cookie stack isn't finalized. That
content has been removed. The page now shows verified business contact
information plus a clear "pending review" notice, and makes no claims about
what cookies are set, how they're categorized, how long they're retained, who
they're shared with, or how consent is captured.

**To close this out:** once the Production analytics/marketing tag stack is
finalized, write the Cookie Policy from that real configuration and have it
legally reviewed before removing the pending-review notice and re-enabling
indexing (`robots.index` is currently `false` on this page for that reason).

## Privacy Policy — `/privacy-policy`

**Status: reflects verified, currently-implemented behavior; pending final
legal review before it's treated as approved copy.**

Audited every factual claim against two sources of truth:

- `src/lib/site-config.ts` — verified business name, address, phone, email.
- `src/lib/estimate/types.ts` (the `Lead` type) and `src/lib/attribution.ts`
  — what the real quote/contact form actually collects.

Corrections made from the previous draft:

- Removed the claim that we collect a full **street address** — the form
  only ever collects a **ZIP code** (see the comment on `Lead.zip` in
  `estimate/types.ts`: "address is optional because the current flow only
  ever collects a ZIP, not a full street address").
- Removed **"media files shared with us"** — no file/photo upload field
  exists anywhere in the `Lead` type or the quote/contact flow.
- Removed the enumerated "automatic technical collection" list (IP address,
  browser type, OS, pages visited, referrer URL, access time) as a
  first-party analytics claim — no analytics/tracking platform is installed
  in this codebase (GTM containers were explicitly deferred; see
  `docs/migration/rebuild-reconciliation.md`). The only automatically
  recorded items are the landing page and marketing (`utm_*`) parameters
  already attached to a form submission, which the page now describes
  accurately instead of implying broader passive tracking.
- Kept the two previously-fixed mail-merge bugs corrected (email
  `info@elitebathrooms.com`, URL `https://elitebathrooms.com/`, not the WP
  broken merge-field output).
- Removed the second, unexplained Canadian address that appeared in the WP
  source's Contact Information section — it does not match any verified
  Elite Bathrooms business location and could not be confirmed, so it was
  dropped rather than reproduced.

**To close this out:** legal review of the wording itself (this pass audited
factual accuracy, not legal sufficiency), and a rewrite of the Cookies and
Tracking section once the Cookie Policy above is finalized.
