import { chromium } from 'playwright';

const SITES = {
  kamino: 'https://agenciakamino.com.br/',
  crm: 'https://crm.agenciakamino.com.br/',
  mobcorp: 'https://mobcorp.eco.br/',
  pontocego: 'https://pontocegodamarcenaria.com.br/',
  portfolio: 'https://rochamaatheus.github.io/',
};
const only = process.argv.slice(2);
const browser = await chromium.launch();
for (const [name, url] of Object.entries(SITES)) {
  if (only.length && !only.includes(name)) continue;
  for (const v of [
    { tag: 'd', width: 1440, height: 900, dpr: 1, mobile: false, maxH: 5200 },
    { tag: 'm', width: 390, height: 844, dpr: 2, mobile: true, maxH: 4200 },
  ]) {
    const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: v.dpr, isMobile: v.mobile, hasTouch: v.mobile });
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(2000);
      // Rola a pagina inteira para disparar lazy-load e animacoes de entrada
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < Math.min(h, v.maxH); y += 400) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(150);
      }
      for (const label of [/^recusar$/i, /somente necess/i, /^rejeitar/i]) {
        const btn = page.getByRole('button', { name: label });
        if (await btn.count()) { await btn.first().click().catch(() => {}); await page.waitForTimeout(500); }
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1500);
      // Fixa elementos fixos/sticky no topo para nao repetirem no print de pagina inteira
      await page.addStyleTag({ content: '.wa-fab,[class*="whatsapp" i][class*="float" i]{display:none!important}' });
      const clipH = Math.min(h, v.maxH);
      await page.screenshot({ path: `shots/full-${name}-${v.tag}.jpg`, type: 'jpeg', quality: 88, clip: { x: 0, y: 0, width: v.width, height: clipH }, fullPage: true });
      console.log('ok', name, v.tag, h);
    } catch (e) {
      console.log('FAIL', name, v.tag, e.message.split('\n')[0]);
    }
    await ctx.close();
  }
}
await browser.close();
