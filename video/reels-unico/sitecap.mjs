// Captura sites reais quadro a quadro com relógio virtual: rAF, performance.now, Date e animações CSS
// só andam quando o script manda. Resultado: animações (WebGL, GSAP, CSS) fluidas e deterministas.
// Uso (de dentro de video/reels-unico/):
//   node sitecap.mjs shot <desktop|tablet|mobile> <url> <pontos>   -> prints para estudar o site
//   node sitecap.mjs clip <id> [fps] [escala]                         -> quadros em clips/<id>/ (definição em clips.json)
import { chromium } from 'playwright';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';

const DEVICES = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  tablet: { viewport: { width: 820, height: 1180 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const CLOCK = () => {
  const nativeNow = performance.now.bind(performance);
  const nativeDate = Date.now;
  const nativeRaf = window.requestAnimationFrame.bind(window);
  const nativeCaf = window.cancelAnimationFrame.bind(window);
  let frozen = false, vt = 0, dateOff = 0, seq = 0;
  let queue = new Map();
  performance.now = () => (frozen ? vt : nativeNow());
  Date.now = () => (frozen ? vt + dateOff : nativeDate());
  window.requestAnimationFrame = (cb) => {
    if (!frozen) return nativeRaf(cb);
    const id = 1e6 + ++seq;
    queue.set(id, cb);
    return id;
  };
  window.cancelAnimationFrame = (id) => (id > 1e6 ? queue.delete(id) : nativeCaf(id));
  const tickAnims = (dt) => {
    for (const a of document.getAnimations()) {
      if (a.timeline !== document.timeline) continue;
      if (!a.__vt) { a.__vt = 1; a.pause(); }
      a.currentTime = (a.currentTime || 0) + dt;
    }
  };
  window.__freeze = () => {
    vt = nativeNow() + 40;
    dateOff = nativeDate() - nativeNow();
    frozen = true;
    tickAnims(0);
  };
  window.__advance = (dt) => {
    vt += dt;
    tickAnims(dt);
    const run = queue;
    queue = new Map();
    for (const cb of run.values()) { try { cb(vt); } catch (e) { console.error(e); } }
  };
};

async function open(device, url) {
  const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--force-color-profile=srgb', '--hide-scrollbars'] });
  const ctx = await browser.newContext({ ...DEVICES[device], reducedMotion: 'no-preference' });
  await ctx.addInitScript(CLOCK);
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.error('PAGEERROR', e.message));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return { browser, page };
}

// Converte um alvo de rolagem (px, fração "0.4", seletor "#id" ou "#id@0.5" ou "max") em pixels
const resolveY = (page, target) => page.evaluate((p) => {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (typeof p === 'number') return Math.min(max, p);
  if (p === 'max') return max;
  if (/^[\d.]+$/.test(p)) return max * +p;
  const [sel, frac, off] = p.split('@');
  const el = document.querySelector(sel);
  if (!el) throw new Error('seletor ' + sel);
  const top = el.getBoundingClientRect().top + scrollY;
  return Math.max(0, Math.min(max, top + (frac ? (el.offsetHeight - innerHeight) * +frac : 0) + (+off || 0)));
}, target);

const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const [, , mode, a1, a2, a3, a4] = process.argv;

if (mode === 'shot') {
  const { browser, page } = await open(a1, a2);
  await page.waitForTimeout(3000);
  const dir = 'C:/Users/Matheus/AppData/Local/Temp/claude/reels-shots';
  mkdirSync(dir, { recursive: true });
  for (const [i, p] of (a3 || '0').split(',').entries()) {
    const y = await resolveY(page, /^\d+$/.test(p) ? +p : p);
    const cur = await page.evaluate(() => scrollY);
    for (let s = 1; s <= 12; s++) await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), cur + ((y - cur) * s) / 12), await page.waitForTimeout(50);
    await page.waitForTimeout(1800);
    const f = `${dir}/${a1}-${new URL(a2).hostname.split('.')[0]}-${i}.png`;
    await page.screenshot({ path: f });
    console.log(f, p, Math.round(y));
  }
  await browser.close();
} else if (mode === 'clip') {
  const def = JSON.parse(readFileSync('clips.json', 'utf8'))[a1];
  if (!def) throw new Error('clip ' + a1 + ' não existe em clips.json');
  const fps = +a2 || 60;
  const { browser, page } = await open(def.device, def.url);
  if (def.dismiss) {
    const b = page.getByRole('button', { name: def.dismiss, exact: true });
    if (await b.count()) await b.first().click();
  }
  await page.waitForTimeout(def.warm ?? 2500);
  if (def.setup) { await page.evaluate(def.setup); await page.waitForTimeout(600); }
  // Posição inicial antes de congelar, para a página já estar montada lá
  const keys = [];
  for (const [t, target] of def.scroll) keys.push([t, await resolveY(page, target)]);
  await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), keys[0][1]);
  await page.waitForTimeout(def.settle ?? 1500);
  await page.evaluate(() => window.__freeze());
  const out = `clips/${a1}`;
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  const pre = Math.round((def.pre ?? 0.3) * fps);
  const total = Math.round(def.dur * fps);
  const scale = +a3 || 1;
  const t0 = Date.now();
  for (let i = -pre; i < total; i++) {
    const t = Math.max(0, i / fps);
    let k = keys.findIndex(([kt]) => kt > t);
    let y;
    if (k === -1) y = keys[keys.length - 1][1];
    else if (k === 0) y = keys[0][1];
    else {
      const [ta, ya] = keys[k - 1], [tb, yb] = keys[k];
      y = ya + (yb - ya) * ease((t - ta) / (tb - ta));
    }
    await page.evaluate(([v, dt]) => { window.scrollTo({ top: v, behavior: 'instant' }); window.__advance(dt); }, [Math.round(y), 1000 / fps]);
    if (i < 0) continue;
    await page.screenshot({ path: `${out}/${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 90, scale: scale < 1 ? 'css' : 'device' });
  }
  console.log(a1, total, 'quadros em', ((Date.now() - t0) / 1000).toFixed(0), 's');
  await browser.close();
}
