// Compara posições do hero com a fonte real e com a reserva (fonte bloqueada): node fxfont.mjs
import { chromium } from 'playwright';
const browser = await chromium.launch();
const pos = async (block, w) => {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  if (block) await page.route('**/*.woff2', (r) => r.abort());
  await page.goto((process.env.URL || 'http://localhost:5511/'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => ['#hero-title', 'p[data-hero]', '[data-hero] a.btn-primary', '#hero-visual'].map((s) => { const b = document.querySelector(s).getBoundingClientRect(); return [Math.round(b.top), Math.round(b.height), Math.round(b.width)]; }));
  await ctx.close();
  return r;
};
for (const w of [390, 1440]) console.log(w, 'real', JSON.stringify(await pos(false, w)), 'reserva', JSON.stringify(await pos(true, w)));
await browser.close();
