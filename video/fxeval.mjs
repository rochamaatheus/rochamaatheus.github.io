// node fxeval.mjs <desktop|mobile> <scrollY|max|#sel> "<js antes do print>" <saida.png>
import { chromium } from 'playwright';
const [kind, where, js, out] = process.argv.slice(2);
const mobile = kind === 'mobile';
const browser = await chromium.launch({ args: (process.env.GL === 'sw' ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist']) });
const ctx = await browser.newContext({ viewport: mobile ? { width: 390, height: 780 } : { width: 1440, height: 900 }, isMobile: mobile, hasTouch: mobile, reducedMotion: 'no-preference' });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.log('ERR', e.message));
await page.goto('http://localhost:5510/', { waitUntil: 'networkidle' });
await page.waitForTimeout(3500);
await page.evaluate((w) => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const y = w === 'max' ? max : w.startsWith('#') ? document.querySelector(w).getBoundingClientRect().top + scrollY - 80 : +w;
  window.scrollTo(0, y);
}, where);
await page.waitForTimeout(2500);
if (js) console.log(JSON.stringify(await page.evaluate(js)));
await page.waitForTimeout(400);
await page.screenshot({ path: out });
await browser.close();
