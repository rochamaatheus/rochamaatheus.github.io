import { chromium } from 'playwright';

const targets = process.argv.slice(2).map((a) => a.split('='));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const [name, url] of targets) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `../assets/projetos/${name}.jpeg`, type: 'jpeg', quality: 82 });
    console.log('ok', name);
  } catch (e) {
    console.log('FAIL', name, e.message);
  }
}
await browser.close();
