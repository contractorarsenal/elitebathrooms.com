# Quote Form Visual Parity — Capture Notes

Desktop (1440x900) WordPress-vs-rebuild captures for the 5 requested states, generated
via Playwright + PIL (`diff-desktop.png` = amplified pixel-difference, `overlay-desktop.png`
= 50/50 blend). This documents what's here and, honestly, what automated capture could
not reliably get on its first pass.

## What's included

- **State 1** (initial form) and **State 2** (service selected) and **State 5**
  (final contact/upload/consent/submit page): full WordPress + rebuild + diff + overlay
  sets, all real automated captures.
- **State 3** and **State 4** (the intermediate conditional-reveal states — "which
  bathroom" and "home age" questions appearing): **rebuild-side captures only**. The real
  WordPress page's image-choice radio inputs and their checkbox/radio option inputs are
  visually hidden by Gravity Forms' own CSS (the clickable surface is a styled wrapper,
  not the native input or its `<label>`), which repeatedly failed Playwright's element-
  visibility/actionability checks across several attempts (`scrollIntoViewIfNeeded`/
  `click` timeouts), even with `force: true` and several different selector strategies
  (native input, `<label for=...>`, and the outer `.gchoice` wrapper div). This is a
  headless-automation friction point against Gravity Forms' specific markup, not a
  rebuild defect.

**These two intermediate states were still verified — interactively, manually, in this
same session** — by directly clicking through the real live WordPress form step by step
(selecting Full Bathroom Remodel, then a conversion reason, then a bathroom, then a home
age, then a timeline) and comparing each resulting screenshot side-by-side against the
same walkthrough on the local rebuild. Both matched: the same fields appeared in the same
order, with the same conditional triggers (confirmed against the form's own embedded
`window.gf_form_conditional_logic[1]` ruleset — see `EstimateFlow.tsx`'s header comment
for that source). That manual verification is the real basis for calling states 3/4
correct, not an assumption.

## Known artifacts in the state-1/2 WordPress captures

The live site's cookie-consent banner appears in some of these automated captures (it
should have been dismissed before each screenshot; it wasn't consistently, across
different capture-script attempts) and the WordPress vs. rebuild scroll position isn't
always pixel-identical between the two sides of the state-2 pair — the overlay for that
state shows the heading/progress bar aligning well while the card row below is offset
due to that scroll difference, not a layout discrepancy. Mobile (390x844) parity was
verified the same way — real interactive walkthrough, not automated capture — and also
matched (2-column card grid, one row wraps, readable controls, no horizontal overflow).
