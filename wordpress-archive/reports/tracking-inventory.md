# Tracking Inventory

Detected from rendered page source only (client-side). No secrets recorded.

## Google Tag Manager

- `GTM-KMB5XPJH` (present site-wide)
- `GTM-MCGRC63R` (present site-wide)

Note: 2 distinct GTM containers were found loaded on the same pages. This is unusual; confirm with the client whether both are intentional (e.g. one for a third-party agency).

## Google tag (gtag.js) direct load

- `GT-PLWH3KWF` (loaded directly via googletagmanager.com/gtag/js, not only via GTM container)

## Not found in rendered page source (may be configured inside GTM, or absent)

- No direct GA4 Measurement ID (`G-XXXXXXX`) hardcoded in page source
- No Meta/Facebook Pixel (`fbq(...)`, `connect.facebook.net`) found
- No Microsoft Clarity (`clarity.ms/tag/...`) found
- No Google Ads conversion ID (`AW-XXXXXXX`) found in page source

## Other third-party scripts

- Trustindex (review widget, cdn.trustindex.io)

## Plugin footprint (from WP REST API namespaces, informs what may be injecting tracking/behavior)

- litespeed (cache + lazy-load + CSS/JS combine)
- rankmath (SEO, sitemaps, schema)
- elementor / elementor-pro / elementor-ai (page builder)
- hfe (Header Footer Elementor / Ultimate Addons for Elementor)
- complianz (cookie consent banner)
- trustindex (Google + Thumbtack review widgets)
- ai1wm (All-in-One WP Migration — relevant if a full WP export is ever wanted as a fallback)
- google-site-kit (likely source of the GTM/gtag wiring)
- nps-survey

