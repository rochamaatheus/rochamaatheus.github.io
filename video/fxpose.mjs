// Testa rotações de uma forma do campo de partículas: node fxpose.mjs <indice> "<rx,ry,rz>;<rx,ry,rz>..." [seletor]
import { chromium } from 'playwright';

const idx = +process.argv[2];
const poses = process.argv[3].split(';').map((p) => p.split(',').map(Number));
const sel = process.argv[4] || 'max';
const browser = await chromium.launch({ args: (process.env.GL === 'sw' ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist']) });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
const page = await ctx.newPage();
await page.goto('http://localhost:5510/', { waitUntil: 'networkidle' });
await page.waitForTimeout(3200);
await page.evaluate((sel) => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const el = sel === 'max' ? null : document.querySelector(sel);
  window.scrollTo(0, el ? el.getBoundingClientRect().top + scrollY - 80 : max);
}, sel);
await page.waitForTimeout(2500);
for (const [n, r] of poses.entries()) {
  await page.evaluate(([i, r]) => { window.__fxKeys[i].rot = () => r; }, [idx, r]);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `C:/Users/Matheus/AppData/Local/Temp/claude/pose-${n}.png` });
  console.log(n, r.join(','));
}
await browser.close();
