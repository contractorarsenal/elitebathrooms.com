import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
await page.goto("http://localhost:3000/get-a-quote", { waitUntil: "networkidle" });

// Step 0: project type
await page.getByRole("button", { name: "Full Bathroom Remodel", exact: true }).click();
await page.getByRole("button", { name: "Continue" }).click();

// Step 1: zip + budget
await page.getByPlaceholder("ZIP code").fill("98402");
await page.getByRole("button", { name: "$10K to $20K", exact: true }).click();
await page.getByRole("button", { name: "Continue" }).click();

// Step 2: timeline
await page.getByRole("button", { name: "As soon as possible", exact: true }).click();
await page.getByRole("button", { name: "Continue" }).click();

// Step 3: details (optional, skip)
await page.getByRole("button", { name: "Continue" }).click();

// Step 4: contact + consent -- screenshot before filling anything
await page.screenshot({ path: "/tmp/quote-step4.png", fullPage: true });

const consentText = await page.locator("text=By checking this box, you agree to receive emails and text messages from Elite Bathrooms").count();
console.log("CONSENT_TEXT_FOUND:", consentText);

const privacyLink = await page.locator('a[href="/privacy-policy"]').count();
console.log("PRIVACY_LINK_FOUND:", privacyLink);

const submitDisabledBefore = await page.getByRole("button", { name: "Submit Request" }).isDisabled();
console.log("SUBMIT_DISABLED_BEFORE_CONSENT:", submitDisabledBefore);

// Fill required fields but do NOT check consent -- submit should stay disabled
await page.getByPlaceholder("First name").fill("Test");
await page.getByPlaceholder("Phone").fill("2065551234");
const stillDisabled = await page.getByRole("button", { name: "Submit Request" }).isDisabled();
console.log("SUBMIT_DISABLED_WITHOUT_CONSENT:", stillDisabled);

// Now check consent
await page.locator('input[type="checkbox"]').first().check();
const enabledAfterConsent = await page.getByRole("button", { name: "Submit Request" }).isDisabled();
console.log("SUBMIT_DISABLED_AFTER_CONSENT:", enabledAfterConsent);

await page.screenshot({ path: "/tmp/quote-step4-filled.png", fullPage: true });

await browser.close();
