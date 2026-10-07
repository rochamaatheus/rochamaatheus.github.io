// Confere as correções: card do hero durante a digitação, gráfico do Sistema web quadro a quadro, trilho do processo
import { chromium } from 'playwright';

const out = 'C:/Users/Matheus/AppData/Local/Temp/claude/fix';
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
for (const kind of ['desktop', 'mobile']) {
  const mobile = kind === 'mobile';
  const ctx = await browser.newContext({ viewport: mobile ? { width: 390, height: 780 } : { width: 1440, height: 900 }, isMobile: mobile, hasTouch: mobile, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://localhost:5510/', { waitUntil: 'domcontentloaded' });
  if (mobile) await page.evaluate(() => window.scrollTo(0, 420));
  for (const t of [900, 1700, 2600]) {
    await page.waitForTimeout(t === 900 ? 900 : 800);
    const box = await page.evaluate(() => { const r = document.querySelector('#hero-visual').getBoundingClientRect(); return { x: Math.max(0, r.left - 40), y: Math.max(0, r.top - 50), width: Math.min(innerWidth - Math.max(0, r.left - 40), r.width + 80), height: r.height + 110 }; });
    await page.screenshot({ path: `${out}-${kind}-hero-${t}.png`, clip: box });
  }
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const el = document.querySelector('[data-vis="sys"]'); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 200); });
  for (let i = 0; i < 6; i++) {
    await page.waitForTimeout(220);
    const r = await page.evaluate(() => { const b = document.querySelector('[data-vis="sys"]').getBoundingClientRect(); return { x: b.left, y: b.top, width: b.width, height: b.height }; });
    await page.screenshot({ path: `${out}-${kind}-sys-${i}.png`, clip: r });
  }
  if (!mobile) {
    for (const f of [0.2, 0.3, 0.42, 0.55, 0.68, 0.8]) {
      await page.evaluate((f) => { const b = document.querySelector('#build'); window.scrollTo(0, b.getBoundingClientRect().top + scrollY + (b.offsetHeight - innerHeight) * f); }, f);
      await page.waitForTimeout(1300);
      await page.screenshot({ path: `${out}-rail-${f}.png`, clip: { x: 120, y: 240, width: 520, height: 480 } });
    }
  }
  console.log(kind, 'errors', JSON.stringify(errors));
  await ctx.close();
}
await browser.close();
