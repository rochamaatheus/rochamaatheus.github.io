// Revisão mobile: FPS com CPU 4x mais lenta, menu, carrossel, modal de demo, vídeo, paisagem
import { chromium } from 'playwright';

const out = 'C:/Users/Matheus/AppData/Local/Temp/claude/mob';
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
await page.goto('http://localhost:5510/', { waitUntil: 'networkidle' });
const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await page.waitForTimeout(3000);

const fps = await page.evaluate(async () => {
  let f = 0, worst = 0, last = performance.now(), done = false, long = 0;
  const tick = (t) => { f++; const d = t - last; worst = Math.max(worst, d); if (d > 50) long++; last = t; if (!done) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  const t0 = performance.now();
  const H = document.documentElement.scrollHeight - innerHeight;
  for (let i = 0; i <= 120; i++) { window.scrollTo(0, (H * i) / 120); await new Promise((r) => setTimeout(r, 80)); }
  done = true;
  return { fps: Math.round(f / ((performance.now() - t0) / 1000)), worstMs: Math.round(worst), framesOver50ms: long };
});
console.log('fps cpu4x', JSON.stringify(fps));
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });

// menu
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.tap('#menu-toggle');
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}-menu.png` });
await page.tap('#mobile-menu a[href="#projetos"]');
await page.waitForTimeout(1500);
const afterMenu = await page.evaluate(() => ({ y: Math.round(scrollY), top: Math.round(document.querySelector('#projetos').getBoundingClientRect().top), overflow: document.body.style.overflow }));
console.log('menu -> projetos', JSON.stringify(afterMenu));

// carrossel: arrasta o primeiro trilho
await page.evaluate(() => document.querySelector('#projetos-grid').scrollTo({ left: 330, behavior: 'instant' }));
await page.waitForTimeout(600);
await page.screenshot({ path: `${out}-carousel.png` });

// modal de demo
await page.evaluate(() => document.querySelector('#prototipos').scrollIntoView());
await page.waitForTimeout(1200);
await page.tap('#prototipos-grid [data-demo]');
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}-modal.png` });
await page.tap('#demo-modal [data-close]');
await page.waitForTimeout(600);
const modalClosed = await page.evaluate(() => !document.querySelector('#demo-modal').classList.contains('active') && document.body.style.overflow === '');
console.log('modal fecha', modalClosed);

// vídeo: toque liga o som
await page.evaluate(() => document.querySelector('#video').scrollIntoView());
await page.waitForTimeout(1500);
await page.tap('#showreel');
const vid = await page.evaluate(() => ({ muted: document.querySelector('#showreel').muted, src: document.querySelector('#showreel').currentSrc.split('/').pop() }));
console.log('video', JSON.stringify(vid));

// paisagem
await page.setViewportSize({ width: 844, height: 390 });
await page.waitForTimeout(800);
for (const f of [0.15, 0.9]) {
  await page.evaluate((f) => { const b = document.querySelector('#build'); window.scrollTo(0, b.getBoundingClientRect().top + scrollY + (b.offsetHeight - innerHeight) * f); }, f);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${out}-land-${f}.png` });
}
console.log('errors', JSON.stringify(errors));
await browser.close();
