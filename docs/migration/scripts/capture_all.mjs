import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE = "http://localhost:3000";
const OUT = "/Users/dotcomjay/Documents/DEV/Client sites/Elite Bathrooms/docs/migration/parity-screenshots";

function slugify(p) {
  const s = p.replace(/^\/|\/$/g, "");
  return s ? s.replace(/\//g, "__") : "home";
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight + 2000) {
          clearInterval(timer);
          resolve(undefined);
        }
      }, 40);
    });
  });
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

async function capture(routes) {
  const browser = await chromium.launch();

  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    for (const [i, route] of routes.entries()) {
      const url = BASE + route;
      const slug = slugify(route);
      const outPath = path.join(OUT, viewport.name, `${slug}.png`);
      process.stderr.write(`[${viewport.name} ${i + 1}/${routes.length}] ${route}\n`);
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
        await scrollThrough(page);
        await page.screenshot({ path: outPath, fullPage: true });
      } catch (e) {
        process.stderr.write(`  ERROR: ${e.message}\n`);
      }
    }
    await page.close();
  }
  await browser.close();
}

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
// Sitemap now emits the apex domain (no www) — see src/lib/seo.ts's
// SITE_URL and the canonical-domain decision it documents.
const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map(
  (m) => m[1].replace("https://elitebathrooms.com", "").replace("https://www.elitebathrooms.com", "") || "/"
);
const routes = [...new Set(locs)].sort();
routes.push("/thank-you");
routes.push("/this-page-does-not-exist-parity-check");

fs.writeFileSync("/tmp/pw-scratch/routes.json", JSON.stringify(routes, null, 2));
console.error(`${routes.length} routes`);
await capture(routes);
console.error("DONE");
