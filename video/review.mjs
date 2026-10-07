import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:5510/';
const out = process.argv[3] || 'C:/Users/Matheus/AppData/Local/Temp/claude/review';
const sizes = [
  { name: 'desktop', width: 1440, height: 900, mobile: false },
  { name: 'mobile', width: 390, height: 844, mobile: true },
];
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
for (const s of sizes) {
  const ctx = await browser.newContext({
    viewport: { width: s.width, height: s.height },
    deviceScaleFactor: 1,
    isMobile: s.mobile,
    hasTouch: s.mobile,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 300) {
    await page.mouse.wheel(0, 300);
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const overflow = await page.evaluate(() => {
    const w = document.documentElement.clientWidth;
    return [...document.querySelectorAll('body *')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.right > w + 1 && !el.closest('.marquee, #projetos-grid, #prototipos-grid, #mobile-menu, .blob, .bg-noise, pre');
      })
      .slice(0, 8)
      .map((el) => `${el.tagName}.${[...el.classList].slice(0, 3).join('.')} right=${Math.round(el.getBoundingClientRect().right)}`);
  });
  await page.screenshot({ path: `${out}-${s.name}.png`, fullPage: true });
  console.log(s.name, 'height', h, 'errors', JSON.stringify(errors), 'overflow', JSON.stringify(overflow));
  await ctx.close();
}
await browser.close();
