// Uso:
//   node render.mjs <desktop|mobile> snap 0.5,1,2.3      -> PNGs + folha de contato em out/snap-<f>.jpg
//   node render.mjs <desktop|mobile> full [fps] [workers] -> frames JPEG em frames/<f>/, cues e inspeção em out/
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const [, , F = 'desktop', mode = 'snap', a3 = '', a4 = ''] = process.argv;
const W = F === 'mobile' ? 1080 : 1920;
const H = F === 'mobile' ? 1920 : 1080;
const ROOT = process.cwd();
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
const server = createServer(async (req, res) => {
  try {
    const p = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    res.writeHead(200, { 'Content-Type': TYPES[extname(p)] || 'application/octet-stream' });
    res.end(await readFile(p));
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const port = server.address().port;
mkdirSync('out', { recursive: true });

const browser = await chromium.launch({ args: ['--force-color-profile=srgb', '--disable-lcd-text', '--hide-scrollbars'] });
async function openPage() {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => console.error('PAGEERROR', e.message));
  await page.goto(`http://localhost:${port}/scene.html?f=${F}&render=1`, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.ready);
  return page;
}

if (mode === 'cues') {
  const page = await openPage();
  const cues = await page.evaluate(() => window.CUES);
  writeFileSync(`out/cues-${F}.json`, JSON.stringify({ duration: 34, cues }, null, 1));
  console.log('cues', cues.length);
} else if (mode === 'snap') {
  const times = a3.split(',').map(Number);
  const page = await openPage();
  const shots = [];
  for (const t of times) {
    await page.evaluate((tt) => window.seek(tt), t);
    const p = `out/snap-${F}-${t.toFixed(2)}.png`;
    await page.screenshot({ path: p });
    shots.push(p);
  }
  console.log(JSON.stringify(shots));
} else {
  const fps = +a3 || 60;
  const workers = +a4 || 6;
  const dur = await (await openPage()).evaluate(() => window.DURATION);
  const total = Math.round(dur * fps);
  const dir = `frames/${F}`;
  mkdirSync(dir, { recursive: true });
  const done = new Set(existsSync(dir) ? readdirSync(dir) : []);
  const insp = {};
  const t0 = Date.now();
  let count = 0;
  await Promise.all(Array.from({ length: workers }, async (_, w) => {
    const page = await openPage();
    for (let i = w; i < total; i += workers) {
      const name = String(i).padStart(5, '0') + '.jpg';
      if (done.has(name) && i % 5) continue;
      await page.evaluate((tt) => window.seek(tt), i / fps);
      if (!done.has(name)) await page.screenshot({ path: `${dir}/${name}`, type: 'jpeg', quality: 94 });
      if (i % 5 === 0) insp[i] = await page.evaluate(() => window.inspect());
      count++;
      if (count % 120 === 0) console.log(`${count}/${total} frames, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
  }));
  const page = await openPage();
  const cues = await page.evaluate(() => window.CUES);
  writeFileSync(`out/cues-${F}.json`, JSON.stringify({ fps, total, duration: dur, cues }, null, 1));
  writeFileSync(`out/inspect-${F}.json`, JSON.stringify(insp));
  console.log('ok', total, 'frames em', ((Date.now() - t0) / 1000).toFixed(0), 's');
}
await browser.close();
server.close();
