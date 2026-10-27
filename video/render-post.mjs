// Renderiza cada .slide do generator.html em PNG 1080x1350 (4:5).
// Uso (de dentro de video/): node render-post.mjs [pasta-em-posts/assets]
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'posts', 'assets', process.argv[2] || 'sinais-site');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.join(dir, 'generator.html')).href);
await page.evaluate(() => document.fonts.ready);
const slides = await page.$$('.slide');
for (let i = 0; i < slides.length; i++) {
  await slides[i].screenshot({ path: path.join(dir, `${i + 1}.png`) });
}
console.log(`${slides.length} slides gerados em ${dir}`);
await browser.close();
