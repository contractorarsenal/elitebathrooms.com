import { chromium } from "playwright";
import fs from "fs";

const BASE = "http://localhost:3000";
const OUT = "/Users/dotcomjay/Documents/DEV/Client sites/Elite Bathrooms/docs/migration/parity-screenshots/interactions";
const results = [];

function log(name, pass, detail) {
  results.push({ name, pass, detail: detail || "" });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  -- " + detail : ""}`);
}

const browser = await chromium.launch();

// ---------- DESKTOP ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Services dropdown (hover)
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Services", exact: true }).first().hover();
  await page.waitForTimeout(400);
  const dropdownOpacity = await page.locator(".nav-dropdown").first().evaluate((el) => getComputedStyle(el).opacity);
  log("desktop: services dropdown opens on hover", dropdownOpacity === "1", `opacity=${dropdownOpacity}`);
  await page.screenshot({ path: `${OUT}/desktop-services-dropdown-open.png` });

  // Click a dropdown child link
  const fullRemodelLink = page.locator(".nav-dropdown a", { hasText: "Full Bathroom Remodel" });
  const href = await fullRemodelLink.getAttribute("href");
  log("desktop: dropdown child link href correct", href === "/services/full-bathroom-remodel", href);

  // Phone link
  const phoneHref = await page.locator('a[href^="tel:"]').first().getAttribute("href");
  log("desktop: header phone link", phoneHref === "tel:+12063692688", phoneHref);

  // Major button: header "Request Estimate"
  const headerCta = page.getByRole("link", { name: "Request Estimate" }).first();
  await log0(headerCta, "desktop: header Request Estimate button visible");

  await page.close();
}

async function log0(locator, name) {
  const visible = await locator.isVisible().catch(() => false);
  log(name, visible);
}

// ---------- MOBILE ----------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });

  // Hamburger menu
  const hamburger = page.getByRole("button", { name: /open menu/i });
  await hamburger.click();
  await page.waitForTimeout(400);
  const navOpen = await page.locator("#mobile-nav").evaluate((el) => getComputedStyle(el).opacity);
  log("mobile: hamburger opens nav", navOpen === "1", `opacity=${navOpen}`);
  await page.screenshot({ path: `${OUT}/mobile-hamburger-menu-open.png`, fullPage: false });

  // Expand Services accordion inside mobile nav
  const servicesDetails = page.locator("#mobile-nav details").first();
  await servicesDetails.locator("summary").click();
  await page.waitForTimeout(300);
  const detailsOpen = await servicesDetails.evaluate((el) => el.open);
  log("mobile: nav Services accordion expands", detailsOpen === true);
  await page.screenshot({ path: `${OUT}/mobile-nav-services-expanded.png`, fullPage: false });

  // Click a nav link, confirm navigation + menu closes
  await page.locator("#mobile-nav").getByRole("link", { name: "Full Bathroom Remodel" }).click();
  await page.waitForURL("**/services/full-bathroom-remodel");
  log("mobile: nav link navigates correctly", page.url().endsWith("/services/full-bathroom-remodel"), page.url());
  await page.waitForTimeout(350); // let the 200ms opacity transition finish
  const navClosedOpacity = await page.locator("#mobile-nav").evaluate((el) => getComputedStyle(el).opacity);
  log("mobile: nav closes after link click", navClosedOpacity === "0", `opacity=${navClosedOpacity}`);

  // Sticky mobile CTA present at bottom, Call Now + Request Estimate hrefs correct
  const stickyBar = page.locator("div.fixed.inset-x-0.bottom-0").last();
  const stickyVisible = await stickyBar.isVisible();
  log("mobile: sticky bottom CTA bar visible", stickyVisible);
  const callHref = await stickyBar.locator('a[href^="tel:"]').getAttribute("href");
  log("mobile: sticky CTA call link", callHref === "tel:+12063692688", callHref);
  const quoteHref = await stickyBar.locator('a[href="/get-a-quote"]').getAttribute("href");
  log("mobile: sticky CTA quote link", quoteHref === "/get-a-quote", quoteHref);

  // FAQ accordion on a page that has one (services hub)
  await page.goto(`${BASE}/bathroom-remodel-services`, { waitUntil: "networkidle" });
  const faqSummary = page.locator("main summary").first();
  await faqSummary.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const faqCountBefore = await page.locator("details[open]").count();
  await faqSummary.click();
  await page.waitForTimeout(200);
  const faqCountAfter = await page.locator("details[open]").count();
  log("mobile: FAQ accordion expands on click", faqCountAfter > faqCountBefore, `${faqCountBefore} -> ${faqCountAfter}`);
  await page.screenshot({ path: `${OUT}/mobile-faq-accordion-open.png`, fullPage: false });

  await page.close();
}

// ---------- 404 ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const resp = await page.goto(`${BASE}/this-does-not-exist-qa`, { waitUntil: "networkidle" });
  log("404: correct HTTP status", resp.status() === 404, `status=${resp.status()}`);
  const has404 = await page.locator("text=We couldn").count();
  log("404: correct content renders", has404 > 0);
  await page.close();
}

// ---------- CONTACT FORM FLOW (same component, different page) ----------
{
  const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
  await page.goto(`${BASE}/contact-us`, { waitUntil: "networkidle" });
  const hasForm = await page.getByRole("button", { name: "Full Bathroom Remodel", exact: true }).count();
  log("contact-us: quote form embedded and interactive", hasForm > 0);
  await page.close();
}

// ---------- QUOTE FORM FULL SUBMIT -> THANK YOU ----------
{
  const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
  await page.goto(`${BASE}/get-a-quote`, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Full Bathroom Remodel", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("ZIP code").fill("98402");
  await page.getByRole("button", { name: "$10K to $20K", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "As soon as possible", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click(); // details step, skip
  await page.getByPlaceholder("First name").fill("QA");
  await page.getByPlaceholder("Last name").fill("Test");
  await page.getByPlaceholder("Phone").fill("2065551234");
  await page.locator('input[type="checkbox"]').first().check();
  await page.screenshot({ path: `${OUT}/desktop-quote-step5-consent-checked.png`, fullPage: true });

  await page.getByRole("button", { name: "Submit Request" }).click();
  await page.waitForURL("**/thank-you", { timeout: 10000 }).catch(() => {});
  log("quote flow: submits and routes to /thank-you", page.url().endsWith("/thank-you"), page.url());
  await page.screenshot({ path: `${OUT}/desktop-thank-you-after-submit.png`, fullPage: true });

  await page.close();
}

await browser.close();

const pass = results.filter((r) => r.pass).length;
const fail = results.filter((r) => !r.pass).length;
console.log(`\n${pass} passed, ${fail} failed`);
fs.writeFileSync("/tmp/interaction_qa_results.json", JSON.stringify(results, null, 2));
