// Prints do site em várias posições de rolagem, com movimento liberado (reducedMotion: no-preference)
// uso: node fxshots.mjs desktop|mobile [pontos separados por vírgula, em fração da página ou #id]
import { chromium } from 'playwright';

const kind = process.argv[2] || 'desktop';
const points = (process.argv[3] || '0,#servicos,#build@0.1,#build@0.45,#build@0.7,#build@0.98,#projetos,#stack,max').split(',');
const out = process.env.OUT || 'C:/Users/Matheus/AppData/Local/Temp/claude/fx';
const mobile = kind === 'mobile';
const browser = await chromium.launch({ args: (process.env.GL === 'sw' ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist']) });
const ctx = await browser.newContext({
  viewport: process.env.VP ? { width: +process.env.VP.split('x')[0], height: +process.env.VP.split('x')[1] } : mobile ? { width: 390, height: 780 } : { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  isMobile: mobile,
  hasTouch: mobile,
  reducedMotion: process.env.RM || 'no-preference',
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
await page.goto((process.env.URL || 'http://localhost:5510/'), { waitUntil: 'networkidle' });
await page.waitForTimeout(3500);
const info = await page.evaluate(() => ({ cls: document.documentElement.className, canvas: [document.getElementById('fx-canvas').width, document.getElementById('fx-canvas').height] }));
console.log(kind, JSON.stringify(info));
for (const [n, p] of points.entries()) {
  const y = await page.evaluate((p) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (p === 'max') return max;
    if (p.startsWith('#')) {
      const [sel, frac] = p.split('@');
      const el = document.querySelector(sel);
      const top = el.getBoundingClientRect().top + scrollY;
      if (frac === undefined) return Math.min(max, top - 80);
      return Math.min(max, top + (el.offsetHeight - innerHeight) * +frac);
    }
    return max * +p;
  }, p);
  // rola em passos para os gatilhos dispararem em ordem
  const cur = await page.evaluate(() => scrollY);
  const steps = Math.max(1, Math.ceil(Math.abs(y - cur) / 400));
  for (let i = 1; i <= steps; i++) {
    await page.evaluate((v) => window.scrollTo(0, v), cur + ((y - cur) * i) / steps);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(2200);
  const name = `${out}-${kind}-${String(n).padStart(2, '0')}.png`;
  await page.screenshot({ path: name });
  console.log(name, p, Math.round(y));
}
console.log('errors', JSON.stringify(errors));
await browser.close();
