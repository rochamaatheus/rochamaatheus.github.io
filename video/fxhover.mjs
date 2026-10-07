// Interações com mouse: cursor, inclinação, cenas dos serviços, repulsão das partículas
import { chromium } from 'playwright';

const out = 'C:/Users/Matheus/AppData/Local/Temp/claude/hover';
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://localhost:5510/', { waitUntil: 'networkidle' });
await page.waitForTimeout(3500);

const center = async (sel) => page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
const glide = async (x, y) => { await page.mouse.move(x, y, { steps: 12 }); };

// 1: repulsão no hero
await glide(1080, 260);
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}-1.png` });

// 2: serviços, hover no cartão do site (vira celular) e no do sistema
await page.evaluate(() => window.lenisInstance.scrollTo('#servicos', { immediate: true }));
await page.waitForTimeout(2600);
let [x, y] = await center('[data-vis="site"]');
await glide(x + 60, y - 20);
await page.waitForTimeout(1500);
[x, y] = await center('[data-vis="sys"]');
await glide(x, y);
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}-2.png` });

// 3: projetos, cursor com rótulo e cartão inclinado
await page.evaluate(() => window.lenisInstance.scrollTo('#projetos', { immediate: true }));
await page.waitForTimeout(2200);
[x, y] = await center('#projetos-grid article');
await glide(x + 180, y - 100);
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}-3.png` });
const state = await page.evaluate(() => ({ cursor: document.querySelector('.cursor').className, label: document.querySelector('.cursor-label').textContent, tilt: document.querySelector('#projetos-grid article').style.transform }));

// 4: rodapé, holofote seguindo o mouse
await page.evaluate(() => window.lenisInstance.scrollTo(document.documentElement.scrollHeight, { immediate: true }));
await page.waitForTimeout(2200);
[x, y] = await center('#wordmark');
await glide(x - 380, y);
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}-4.png` });

console.log(JSON.stringify(state), 'errors', JSON.stringify(errors));
await browser.close();
