const fs = require('fs');
const src = fs.readFileSync('../index.html', 'utf8') + fs.readFileSync('../assets/js/site.js', 'utf8');
const names = new Set([...src.matchAll(/data-lucide="([a-z0-9-]+)"/g)].map((m) => m[1]));
for (const m of src.matchAll(/icone: '([a-z0-9-]+)'/g)) names.add(m[1]);
(async () => {
if (!fs.existsSync('./lucide.umd.js')) {
  const r = await fetch('https://cdn.jsdelivr.net/npm/lucide@0.460.0/dist/umd/lucide.min.js');
  fs.writeFileSync('./lucide.umd.js', await r.text());
}
const L = require('./lucide.umd.js');
const icons = L.icons || L;
const pascal = (n) => n.split('-').map((s) => s[0].toUpperCase() + s.slice(1)).join('');
const out = {};
for (const n of names) {
  let ic = icons[pascal(n)];
  if (!ic) { console.error('MISSING', n); continue; }
  if (typeof ic[0] === 'string') ic = ic[2];
  out[n] = ic.map(([t, a]) => `<${t} ${Object.entries(a).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`).join('');
}
const js = `// Subconjunto dos ícones Lucide 0.460.0 (licença ISC) usados no site. Gerado por video/build-icons.cjs
window.ICONS = ${JSON.stringify(out)};
window.renderIcons = (root = document) =>
  root.querySelectorAll('i[data-lucide]').forEach((el) => {
    const d = ICONS[el.dataset.lucide];
    if (!d) return;
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const attrs = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', class: el.getAttribute('class') || '' };
    for (const k in attrs) s.setAttribute(k, attrs[k]);
    s.innerHTML = d;
    el.replaceWith(s);
  });
`;
fs.writeFileSync('../assets/js/icons.js', js);
console.log(names.size, 'icons', js.length, 'bytes:', [...names].join(','));
})();
