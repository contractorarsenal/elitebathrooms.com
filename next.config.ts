import type { NextConfig } from "next";

// No redirects are configured here yet.
//
// An earlier build pass (before the WordPress-parity migration) set up
// redirects in the opposite direction from what's needed now: it treated
// clean, invented Next.js slugs (/about, /contact, /areas-we-serve,
// /get-a-quote/thank-you, /services (as a hub), /services/tub-to-shower-conversion,
// /estimate) as canonical and 301'd the WordPress production URLs to them.
// Per the client's decision (see docs/migration/rebuild-reconciliation.md),
// WordPress URLs are now the canonical routes themselves — every one of
// those Next.js-only paths has been renamed to match WordPress exactly, so
// the old redirect rules were redirecting the correct URLs to routes that
// no longer exist. Removed rather than "fixed", per the explicit
// instruction not to implement redirect cleanup until parity routes are
// established.
//
// Candidates for a later redirect pass (old interim-only Next.js paths that
// may have been linked/bookmarked/indexed during earlier development,
// forwarding them to their real WordPress-matching route):
//   /about                          -> /bathroom-remodel-company-seattle
//   /contact                        -> /contact-us
//   /services                       -> /bathroom-remodel-services
//   /services/tub-to-shower-conversion -> /services/bathroom-conversion
//   /areas-we-serve                 -> /service-area
//   /areas-we-serve/:slug           -> /service-area/bathroom-remodel-:slug
//   /get-a-quote/thank-you          -> /thank-you
//   /estimate, /estimate/thank-you  -> /get-a-quote, /thank-you
//
// The real 301 map from the *live WordPress* URLs (all 36 service-area
// pages, etc.) belongs to the eventual WordPress cutover, not here — see
// docs/migration/rebuild-reconciliation.md and the migration master
// prompt's Phase 21 (URL PRESERVATION).
const nextConfig: NextConfig = {};

export default nextConfig;
