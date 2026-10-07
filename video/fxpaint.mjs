// Mede a primeira pintura (FCP) e quando cada fonte termina, no site publicado e no local: node fxpaint.mjs <url>
import { chromium } from 'playwright';
const url = process.argv[2];
const browser = await chromium.launch({ channel: 'chrome' });
for (let i = 0; i < 3; i++) {
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  await page.goto(url + (url.includes('?') ? '&' : '?') + 'r=' + Math.random(), { waitUntil: 'load' });
  await page.waitForTimeout(3500);
  const r = await page.evaluate(() => ({
    paint: performance.getEntriesByType('paint').map((p) => `${p.name}:${Math.round(p.startTime)}`),
    lcp: performance.getEntriesByType('largest-contentful-paint').map((p) => Math.round(p.startTime)),
    fonts: performance.getEntriesByType('resource').filter((e) => /woff2|css/.test(e.name)).map((e) => `${e.name.split('/').pop().slice(0, 18)}:${Math.round(e.responseEnd)}`),
    load: Math.round(performance.getEntriesByType('navigation')[0].loadEventEnd),
  }));
  console.log(JSON.stringify(r));
  await ctx.close();
}
await browser.close();
