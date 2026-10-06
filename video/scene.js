// Cena do vídeo: timeline GSAP pausada e determinística. window.seek(t) desenha o instante t.
const P = new URLSearchParams(location.search);
const F = P.get('f') === 'mobile' ? 'mobile' : 'desktop';
const M = F === 'mobile';
document.body.classList.add(F);
const W = M ? 1080 : 1920;
const H = M ? 1920 : 1080;
const DURATION = 34;
const CUES = [];
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
gsap.registerPlugin(MorphSVGPlugin);
gsap.ticker.lagSmoothing(0);

function cue(t, type, gain = 1, pan = 0) { CUES.push({ t: +t.toFixed(4), type, gain, pan }); }
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const rand = rng(7);
const pascal = (n) => n.split('-').map((s) => s[0].toUpperCase() + s.slice(1)).join('');
function icon(name, size = 28, sw = 2) {
  let n = lucide.icons[pascal(name)];
  if (typeof n[0] === 'string') n = n[2];
  const inner = n.map(([t, a]) => `<${t} ${Object.entries(a).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}
const WA = '<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z"/></svg>';

const DOT = 'M24,20.5 C25.93,20.5 27.5,22.07 27.5,24 C27.5,25.93 25.93,27.5 24,27.5 C22.07,27.5 20.5,25.93 20.5,24 C20.5,22.07 22.07,20.5 24,20.5 Z';
const BOX = 'M15,2 H33 C40.18,2 46,7.82 46,15 V33 C46,40.18 40.18,46 33,46 H15 C7.82,46 2,40.18 2,33 V15 C2,7.82 7.82,2 15,2 Z';
const logoSVG = (id) => `<svg class="logo-svg" viewBox="0 0 48 48"><path class="lg-box" id="${id}Box" d="${DOT}" fill="#8a63ff" stroke="url(#lg)" stroke-width="0"/><path class="lg-m" d="M14 33 V16 L24 27 L34 16 V33" fill="none" stroke="url(#lg)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><circle class="lg-dot" cx="34" cy="32.5" r="1.9" fill="#c668ff"/></svg>`;

const L = M
  ? {
      logo1: 320, name1Y: 1180, name1Size: 96,
      hookSize: 138, hookLines: [['Seu', 'negócio'], ['merece', 'mais'], ['que', 'um'], ['#tmpl']], hookB: [['merece', 'um'], ['projeto'], ['~sob medida.']], hookTop: 640,
      hchips: [[80, 400, 'palette', 'Visual próprio'], [430, 1290, 'code-xml', '100% código próprio'], [120, 1400, 'message-circle', 'Direto comigo']],
      svc: (i) => ({ x: 90, y: 330 + i * 360, w: 900, h: 330 }), tagY: 1385, tagSize: 52,
      browser: { x: 95, y: 450, w: 520, h: 360, r: -4 }, phone: { x: 420, y: 380, w: 560, h: 960 }, label: { x: 85, y: 1250, w: 910, h: 230 }, pheadY: 270,
      bScroll: [700, 700, 600, 500], pScroll: [2400, 2000, 1800, 1500],
      tile: [420, 262], cols: 5, rows: 6, panel: { x: 90, y: 620, w: 900, h: 600 }, p1: 84, p2: 118,
      chat: { x: 90, y: 480, w: 900, h: 560 }, title6Y: 290,
      s7: { l1: 112, l2: 130, y1: 280, y2: 400, stat: (i) => ({ x: 90, y: 610 + i * 225, w: 900, h: 200 }), rows: [1310, 1400] },
      logo8: 230, logo8Y: 420, ctaTop: 590, ctaSize: 112, ctaLines: ['Vamos tirar', 'a sua ideia', '#do papel?'], pillsTop: 1080, signY: 1010,
    }
  : {
      logo1: 270, name1Y: 720, name1Size: 84,
      hookSize: 168, hookLines: [['Seu', 'negócio'], ['merece', 'mais', 'que'], ['um', '#tmpl']], hookB: [['merece', 'um', 'projeto'], ['~sob medida.']], hookTop: 270,
      hchips: [[170, 150, 'palette', 'Visual próprio'], [1330, 175, 'code-xml', '100% código próprio'], [770, 880, 'message-circle', 'Direto comigo']],
      svc: (i) => ({ x: 132 + i * 568, y: 200, w: 520, h: 640 }), tagY: 900, tagSize: 58,
      browser: { x: 150, y: 170, w: 1240, h: 760, r: 0 }, phone: { x: 1440, y: 200, w: 340, h: 720 }, label: { x: 90, y: 790, w: 660, h: 210 }, pheadY: 60,
      bScroll: [1300, 1100, 950, 800], pScroll: [1300, 1100, 1000, 900],
      tile: [520, 325], cols: 6, rows: 4, panel: { x: 150, y: 300, w: 840, h: 480 }, p1: 92, p2: 124,
      chat: { x: 150, y: 270, w: 720, h: 640 }, title6Y: 110,
      s7: { l1: 128, l2: 150, y1: 110, y2: 245, stat: (i) => ({ x: 215 + i * 510, y: 500, w: 470, h: 230 }), rows: [790, 905] },
      logo8: 190, logo8Y: 250, ctaTop: 395, ctaSize: 112, ctaLines: ['Vamos tirar a sua ideia', '#do papel?'], pillsTop: 700, signY: 930,
    };

const PROJ = [
  { n: 'Agência Kamino', t: 'Site + infraestrutura', u: 'agenciakamino.com.br', k: 'kamino', tint: '#2f5bff' },
  { n: 'Kamino CRM', t: 'SaaS em produção', u: 'crm.agenciakamino.com.br', k: 'crm', tint: '#3d7bff' },
  { n: 'Mobcorp Fleet', t: 'Site, sistema e app', u: 'mobcorp.eco.br', k: 'mobcorp', tint: '#8a63ff' },
  { n: 'O Ponto Cego da Marcenaria', t: 'Landing page', u: 'pontocegodamarcenaria.com.br', k: 'pontocego', tint: '#5b4cff' },
];
const PROTOS = ['liderarh', 'wesen', 'lynch', 'ties', 'az3'];

function build() {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  const show = (sel, a, b) => { tl.set(sel, { visibility: 'visible' }, a); if (b != null) tl.set(sel, { visibility: 'hidden' }, b); };
  const flash = (t, o = 0.8) => { tl.fromTo('#flash', { opacity: 0 }, { opacity: o, duration: 0.035, ease: 'none', immediateRender: false }, t - 0.035); tl.to('#flash', { opacity: 0, duration: 0.55, ease: 'power2.out' }, t); };
  const shake = (t, a = 16) => tl.to('#cam', { keyframes: [{ x: a, y: -a * 0.6 }, { x: -a * 0.8, y: a * 0.5 }, { x: a * 0.5, y: a * 0.35 }, { x: -a * 0.3, y: -a * 0.2 }, { x: 0, y: 0 }], duration: 0.36, ease: 'none' }, t);
  const blur = (sel, from, to, t, d) => tl.fromTo(sel, { filter: `blur(${from}px)` }, { filter: `blur(${to}px)`, duration: d, ease: 'power2.out', immediateRender: false }, t);

  // FUNDO: auroras, grade, partículas, sempre em movimento
  const au = M
    ? [['#au1', 1100, 700, -200, '#7341f0'], ['#au2', 900, -250, 1100, '#c668ff'], ['#au3', 1000, 300, 1500, '#3b2bb8']]
    : [['#au1', 1100, 1150, -350, '#7341f0'], ['#au2', 900, -250, 450, '#c668ff'], ['#au3', 1000, 700, 650, '#3b2bb8']];
  au.forEach(([s, size, x, y, c], i) => {
    gsap.set(s, { width: size, height: size, left: x, top: y, background: c });
    tl.fromTo(s, { x: 0, y: 0, scale: 1 }, { x: (i % 2 ? -1 : 1) * 260, y: (i === 1 ? -1 : 1) * 180, scale: 1.18, duration: 6.8 + i, ease: 'sine.inOut', repeat: 5, yoyo: true }, 0);
  });
  tl.fromTo('#grid', { backgroundPosition: '0px 0px' }, { backgroundPosition: `0px ${120 * DURATION * 1.4}px`, duration: DURATION, ease: 'none' }, 0);
  const pc = $('#particles');
  for (let i = 0; i < 46; i++) {
    const d = document.createElement('div');
    d.className = 'particle';
    const s = 3 + rand() * 6;
    gsap.set(d, { left: rand() * W, top: rand() * H, width: s, height: s, opacity: 0.25 + rand() * 0.6 });
    pc.appendChild(d);
    tl.fromTo(d, { y: 0, x: 0 }, { y: -(220 + rand() * 520), x: (rand() - 0.5) * 220, duration: DURATION, ease: 'none' }, 0);
    tl.fromTo(d, { scale: 1 }, { scale: 0.3, duration: 1.2 + rand() * 1.6, repeat: 18, yoyo: true, ease: 'sine.inOut' }, rand() * 2);
  }
  const tint = (t, c1, c2, d = 0.8) => { tl.to('#au1', { backgroundColor: c1, duration: d, ease: 'power1.inOut' }, t); if (c2) tl.to('#au3', { backgroundColor: c2, duration: d, ease: 'power1.inOut' }, t); };

  // S1: ponto vira logo, nome, zoom atravessando
  const lg1 = $('#logo1');
  lg1.innerHTML = logoSVG('l1');
  gsap.set(lg1, { width: L.logo1, height: L.logo1, xPercent: -50, yPercent: -50, y: M ? -120 : -80 });
  const name1 = $('#name1');
  name1.className = 'chk';
  name1.style.top = L.name1Y + 'px';
  name1.style.fontSize = L.name1Size + 'px';
  name1.innerHTML = 'Matheus Rocha'.split('').map((c) => `<span class="ch">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
  const m1 = $('#logo1 .lg-m');
  const m1len = m1.getTotalLength();
  show('#s1', 0, 2.3);
  tl.fromTo(lg1, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' }, 0.05);
  cue(0.05, 'pop', 0.9);
  cue(0.25, 'riser', 0.9);
  tl.fromTo('#l1Box', { morphSVG: DOT, fill: '#8a63ff', strokeWidth: 0, rotation: -180, transformOrigin: '50% 50%' }, { morphSVG: BOX, fill: '#120f1f', strokeWidth: 2, rotation: 0, duration: 0.7, ease: 'expo.inOut' }, 0.32);
  cue(0.34, 'swish', 0.7);
  tl.fromTo(m1, { strokeDasharray: m1len, strokeDashoffset: m1len }, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' }, 0.82);
  cue(0.85, 'shimmer', 0.6);
  tl.fromTo('#logo1 .lg-dot', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(4)' }, 1.3);
  cue(1.3, 'pop', 0.7, 0.3);
  tl.fromTo('#name1 .ch', { y: 70, opacity: 0, rotate: 8 }, { y: 0, opacity: 1, rotate: 0, duration: 0.6, stagger: 0.025 }, 1.1);
  tl.to('#name1 .ch', { y: -40, opacity: 0, duration: 0.25, stagger: 0.01, ease: 'power2.in' }, 1.72);
  tl.to(lg1, { scale: 16, duration: 0.55, ease: 'power3.in', transformOrigin: '50% 62%' }, 1.72);
  tl.to(lg1, { opacity: 0, duration: 0.12, ease: 'none' }, 2.12);
  cue(1.72, 'whoosh', 1, 0);

  // S2: gancho. "merece mais que um template." vira "merece um projeto sob medida." no drop
  const hook = $('#hook');
  hook.className = 'chk';
  hook.style.fontSize = L.hookSize + 'px';
  hook.style.top = L.hookTop + 'px';
  const wspan = (w) => (w === '#tmpl'
    ? `<span class="w" id="tmpl"><span id="tmplText" style="display:inline-block">template.</span><span id="strike"></span></span>`
    : w[0] === '~' ? `<span class="w serif grad" style="font-size:1.16em;line-height:.8;padding:0 .06em">${w.slice(1)}</span>` : `<span class="w">${w}</span>`);
  const lines = (arr, cls) => arr.map((ln) => `<span class="ln ${cls}">${ln.map(wspan).join('')}</span>`).join('');
  hook.innerHTML = lines(L.hookLines.slice(0, 1), 'l1') +
    `<span style="position:relative;display:block"><span id="hookA" style="display:block">${lines(L.hookLines.slice(1), 'la')}</span>` +
    `<span id="hookB" style="position:absolute;left:0;right:0;top:0;display:block">${lines(L.hookB, 'lb')}</span></span>`;
  const hc = $('#hchips');
  L.hchips.forEach(([x, y, ic, txt]) => {
    const c = document.createElement('div');
    c.className = 'chip glass hchip chk';
    c.style.left = x + 'px';
    c.style.top = y + 'px';
    c.style.fontSize = M ? '30px' : '34px';
    c.innerHTML = icon(ic, 30) + txt;
    hc.appendChild(c);
  });
  show('#s2', 2.0, 6.05);
  tl.fromTo('#s2', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, 2.0);
  const wordsA = $$('#hook .l1 .w, #hookA .w');
  const wordsB = $$('#hookB .w');
  gsap.set(wordsB, { opacity: 0 });
  const wt = [2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5];
  wordsA.forEach((w, i) => {
    const t = wt[Math.min(i, wt.length - 1)];
    tl.fromTo(w, { opacity: 0, scale: 1.9, y: -30, filter: 'blur(16px)' }, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.34, immediateRender: true }, t);
    cue(t, w.id === 'tmpl' ? 'thud' : 'click', w.id === 'tmpl' ? 1 : 0.7, (i % 2 ? 0.35 : -0.35));
  });
  tl.to('#tmplText', { keyframes: [
    { x: -10, skewX: 14, textShadow: '8px 0 #ff2e63, -8px 0 #00e0ff', duration: 0.05 },
    { x: 12, skewX: -10, textShadow: '-10px 0 #ff2e63, 10px 0 #00e0ff', duration: 0.05 },
    { x: -6, skewX: 6, textShadow: '5px 0 #ff2e63, -5px 0 #00e0ff', duration: 0.05 },
    { x: 8, skewX: -4, textShadow: '-4px 0 #ff2e63, 4px 0 #00e0ff', duration: 0.05 },
    { x: 0, skewX: 0, textShadow: '0px 0 rgba(0,0,0,0), 0px 0 rgba(0,0,0,0)', duration: 0.05 }], ease: 'none' }, 3.72);
  cue(3.72, 'glitch', 0.8);
  tl.fromTo('#strike', { scaleX: 0 }, { scaleX: 1, duration: 0.18, ease: 'power3.out' }, 3.82);
  cue(3.82, 'swipe', 0.8);
  const outA = $$('#hookA .w');
  tl.to(outA, { rotationX: -95, opacity: 0, y: -24, transformPerspective: 700, transformOrigin: '50% 100%', duration: 0.18, stagger: 0.015, ease: 'power2.in' }, 3.86);
  tl.fromTo(wordsB, { opacity: 0, rotationX: 95, y: 30, transformPerspective: 700, transformOrigin: '50% 0%' }, { opacity: 1, rotationX: 0, y: 0, duration: 0.6, stagger: 0.04, ease: 'back.out(2.2)', immediateRender: false }, 4.0);
  flash(4.0, 0.85); shake(4.0, 20);
  cue(4.0, 'impact', 1);
  tl.fromTo(hook, { scale: 1 }, { scale: 1.05, duration: 1.6, ease: 'sine.inOut' }, 4.0);
  $$('.hchip').forEach((c, i) => {
    tl.fromTo(c, { scale: 0, opacity: 0, rotate: -8 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out(2.6)' }, 4.25 + i * 0.25);
    tl.to(c, { y: i % 2 ? 14 : -14, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 4.6 + i * 0.1);
    cue(4.25 + i * 0.25, 'pop', 0.6, [-0.5, 0.5, 0][i]);
  });
  tl.to([...$$('#hook .l1 .w'), ...wordsB], { y: -260, opacity: 0, filter: 'blur(18px)', duration: 0.32, stagger: 0.025, ease: 'power3.in' }, 5.62);
  tl.to('.hchip', { scale: 0, opacity: 0, duration: 0.25, stagger: 0.04, ease: 'power3.in' }, 5.6);
  cue(5.66, 'whoosh', 0.85, 0.2);

  // S3: serviços
  const S3 = [
    { w: 'Sites.', ic: 'monitor-smartphone', sub: 'que aparecem no Google e trazem cliente', ill: 'site' },
    { w: 'Sistemas.', ic: 'layout-dashboard', sub: 'que organizam a sua operação', ill: 'chart' },
    { w: 'IA.', ic: 'bot', sub: 'que atende no WhatsApp 24h', ill: 'chat' },
  ];
  const s3 = $('#s3');
  S3.forEach((s, i) => {
    const r = L.svc(i);
    const ws = M ? 96 : 100;
    const ill = M ? { x: 540, y: 40, w: 320, h: 250 } : { x: 44, y: 390, w: 432, h: 206 };
    const el = document.createElement('div');
    el.className = 'svc';
    Object.assign(el.style, { left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px', overflow: 'visible' });
    let illHTML = '';
    if (s.ill === 'site') {
      illHTML = `<div class="wf" style="left:0;right:0;top:0;height:30px;border-radius:0;background:rgba(255,255,255,.07)"></div>
        <div class="wf w1" style="left:22px;top:52px;width:58%;height:22px"></div>
        <div class="wf w1" style="left:22px;top:86px;width:44%;height:22px;background:linear-gradient(90deg,#8a63ff,#c668ff)"></div>
        <div class="wf w1" style="left:22px;top:124px;width:70%;height:10px;opacity:.6"></div>
        <div class="wf w1" style="left:22px;top:142px;width:52%;height:10px;opacity:.6"></div>
        <div class="wf w1 btn" style="left:22px;bottom:18px;width:120px;height:30px;border-radius:99px;background:#8a63ff"></div>
        <div class="wf w1" style="right:22px;top:52px;width:28%;bottom:18px;border-radius:14px;background:rgba(198,104,255,.25)"></div>`;
    } else if (s.ill === 'chart') {
      illHTML = [0.35, 0.55, 0.42, 0.72, 0.6, 0.92].map((h, k) => `<div class="bar" data-h="${h}" style="left:${7 + k * 15.2}%;height:${h * 78}%"></div>`).join('') +
        `<div class="wf" style="left:16px;right:16px;top:18px;height:3px;opacity:.4"></div>`;
    } else {
      illHTML = `<div class="bub in b1" style="left:16px;top:22px;font-size:${M ? 20 : 21}px">Tem horário amanhã?</div>
        <div class="bub out b2" style="right:16px;top:${M ? 98 : 92}px;font-size:${M ? 20 : 21}px">Tenho às 14h. Agendo?</div>
        <div class="bub in b3" style="left:16px;top:${M ? 174 : 152}px;font-size:${M ? 20 : 21}px">Pode sim!</div>`;
    }
    el.innerHTML = `<div class="svc-bg glass" style="position:absolute;inset:0;border-radius:40px"></div>
      <div class="ic" style="position:absolute;left:${M ? 40 : 44}px;top:${M ? 40 : 44}px">${icon(s.ic, 42, 1.8)}</div>
      <h3 class="chk" style="position:absolute;left:${M ? 40 : 44}px;top:${M ? 140 : 150}px;font-size:${ws}px">${s.w}</h3>
      <p class="chk" style="position:absolute;left:${M ? 42 : 46}px;top:${M ? 248 : 272}px;width:${M ? 470 : 430}px;font-size:${M ? 28 : 30}px;line-height:1.25">${s.sub}</p>
      <div class="ill" style="left:${ill.x}px;top:${ill.y}px;width:${ill.w}px;height:${ill.h}px">${illHTML}</div>`;
    s3.appendChild(el);
    gsap.set(el, { transformPerspective: 1200, rotationY: 0.01, force3D: true });
  });
  const tag = document.createElement('div');
  tag.className = 'abs chk';
  Object.assign(tag.style, { left: 0, right: 0, top: L.tagY + 'px', textAlign: 'center', fontSize: L.tagSize + 'px', fontWeight: 600, letterSpacing: '-0.04em' });
  tag.innerHTML = 'Se envolve código, <span class="serif grad" style="font-size:1.2em">eu resolvo.</span>';
  s3.appendChild(tag);
  show('#s3', 5.95, 10.15);
  $$('#s3 .svc').forEach((el, i) => {
    const t = 6.0 + i * 0.5;
    tl.fromTo($('h3', el), { opacity: 0, scale: 2.4, x: M ? 0 : 30, filter: 'blur(14px)', transformOrigin: '0% 50%' }, { opacity: 1, scale: 1, x: 0, filter: 'blur(0px)', duration: 0.42 }, t);
    tl.fromTo($('.svc-bg', el), { scaleX: 0.25, scaleY: 0.18, borderRadius: '400px', opacity: 0 }, { scaleX: 1, scaleY: 1, borderRadius: '40px', opacity: 1, duration: 0.7 }, t + 0.08);
    tl.fromTo($('.ic', el), { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(3)' }, t + 0.22);
    tl.fromTo($('p', el), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, t + 0.3);
    tl.fromTo($('.ill', el), { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, t + 0.4);
    tl.to(el, { yPercent: i % 2 ? -2 : 2, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 7.4 + i * 0.12);
    cue(t, 'thud', 0.85, [-0.4, 0, 0.4][i]);
    cue(t + 0.1, 'swish', 0.5, [-0.4, 0, 0.4][i]);
    cue(t + 0.22, 'pop', 0.45, [-0.4, 0, 0.4][i]);
  });
  tl.fromTo('#s3', { scale: 1 }, { scale: 1.04, duration: 3.4, ease: 'sine.inOut' }, 6.2);
  tl.fromTo(tag, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, 7.55);
  cue(7.55, 'swish', 0.5);
  tl.fromTo('#s3 .w1', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.45, stagger: 0.08 }, 7.9);
  tl.to('#s3 .btn', { scale: 1.15, duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 8.6);
  tl.fromTo('#s3 .bar', { scaleY: 0 }, { scaleY: 1, duration: 0.7, stagger: 0.09, ease: 'elastic.out(1, .6)' }, 8.0);
  [8.0, 8.09, 8.18, 8.27, 8.36, 8.45].forEach((t, k) => cue(t, 'tick', 0.35, -0.2 + k * 0.08));
  tl.fromTo('#s3 .b1', { opacity: 0, scale: 0.5, transformOrigin: '0% 100%' }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, 8.3);
  tl.fromTo('#s3 .b2', { opacity: 0, scale: 0.5, transformOrigin: '100% 100%' }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, 8.85);
  tl.fromTo('#s3 .b3', { opacity: 0, scale: 0.5, transformOrigin: '0% 100%' }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, 9.25);
  cue(8.3, 'ding', 0.55, 0.4); cue(8.85, 'send', 0.55, 0.4); cue(9.25, 'ding', 0.45, 0.4);
  $$('#s3 .svc').forEach((el, i) => {
    const r = L.svc(i);
    tl.to(el, { x: W / 2 - (r.x + r.w / 2), y: H / 2 - (r.y + r.h / 2), scale: 0.3, rotationY: (i - 1) * 35, opacity: 0, transformPerspective: 1200, duration: 0.48, ease: 'power3.in' }, 9.55 + i * 0.03);
  });
  tl.to(tag, { opacity: 0, y: 30, duration: 0.3, ease: 'power2.in' }, 9.55);
  cue(9.55, 'whoosh', 0.9);

  // S4: projetos reais
  const B = L.browser, PH = L.phone, LB = L.label;
  Object.assign($('#browser').style, { left: B.x + 'px', top: B.y + 'px', width: B.w + 'px', height: B.h + 'px' });
  gsap.set('#browser', { rotation: B.r, transformPerspective: 1600, rotationX: 0.01, force3D: true });
  const vpH = B.h - 54;
  $('#bvp').style.height = vpH + 'px';
  Object.assign($('#phone').style, { left: PH.x + 'px', top: PH.y + 'px', width: PH.w + 'px', height: PH.h + 'px' });
  const scrW = PH.w - 32, scrH = PH.h - 32;
  $('#phead').style.top = L.pheadY + 'px';
  Object.assign($('#plabel').style, { left: LB.x + 'px', top: LB.y + 'px', width: LB.w + 'px', height: LB.h + 'px' });
  $('#bstrip').innerHTML = PROJ.map((p) => `<div class="slot" style="width:${B.w}px"><img src="shots/full-${p.k}-d.jpg"></div>`).join('');
  $('#pstrip').innerHTML = PROJ.map((p) => `<div class="slot" style="width:${scrW}px"><img src="shots/full-${p.k}-m.jpg"></div>`).join('');
  $('#urlSwap').innerHTML = PROJ.map((p) => `<div style="top:0">${p.u}</div>`).join('');
  const ts = M ? 62 : 54;
  $('#plabel').innerHTML = `<div class="abs mono" style="right:34px;top:30px;font-size:22px;color:#c7b6ff"><span class="swap" id="numSwap" style="display:inline-block;width:40px;height:26px;vertical-align:top">${PROJ.map((_, i) => `<div>0${i + 1}</div>`).join('')}</span><span style="color:#6f6990">/04</span></div>
    <div class="abs mono" style="left:38px;top:32px;font-size:22px;letter-spacing:.12em;color:#c7b6ff;text-transform:uppercase"><span class="swap chk" id="typeSwap" style="display:block;width:${LB.w - 200}px;height:28px">${PROJ.map((p) => `<div>${p.t}</div>`).join('')}</span></div>
    <div class="abs" style="left:38px;top:${M ? 78 : 72}px;"><span class="swap t chk" id="nameSwap" style="display:block;width:${LB.w - 70}px;height:${Math.round(ts * 1.25)}px;font-size:${ts}px">${PROJ.map((p) => `<div style="${p.n.length > 20 ? `font-size:${M ? 54 : 44}px;top:${M ? 6 : 8}px` : ''}">${p.n}</div>`).join('')}</span></div>
    <div class="abs mono" style="left:38px;bottom:${M ? 34 : 30}px;font-size:${M ? 26 : 22}px;color:#a19bc2;display:flex;gap:10px;align-items:center">${icon('globe', M ? 26 : 22)}<span class="swap" id="urlSwap2" style="display:inline-block;width:${LB.w - 120}px;height:${M ? 32 : 28}px">${PROJ.map((p) => `<div>${p.u}</div>`).join('')}</span></div>`;
  show('#s4', 9.8, 18.6);
  tl.fromTo('#browser', { scale: 0.22, opacity: 0, rotationX: 30, transformPerspective: 1600 }, { scale: 1, opacity: 1, rotationX: 0.01, duration: 0.75 }, 9.82);
  tl.fromTo('#phone', { y: M ? 1700 : 900, rotation: 12 }, { y: 0, rotation: M ? 2 : 4, duration: 0.8 }, 10.0);
  tl.fromTo('#pheadChip', { y: -160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, 10.1);
  tl.fromTo('#plabel', { x: -160, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 10.2);
  flash(10.0, 0.45); shake(10.0, 10);
  cue(10.0, 'impact', 0.8); cue(10.05, 'whoosh', 0.6, 0.6); cue(10.12, 'pop', 0.5);
  const swapTo = (sel, i, t) => {
    const kids = $$(`${sel} > div`);
    kids.forEach((k, j) => {
      if (j === i - 1) tl.to(k, { yPercent: -110, opacity: 0, duration: 0.35, ease: 'power3.in' }, t);
      if (j === i) tl.fromTo(k, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, immediateRender: false }, t + 0.18);
    });
  };
  ['#urlSwap', '#numSwap', '#typeSwap', '#nameSwap', '#urlSwap2'].forEach((s) => $$(`${s} > div`).forEach((k, j) => gsap.set(k, { opacity: j ? 0 : 1, yPercent: j ? 110 : 0 })));
  PROJ.forEach((p, i) => {
    const s = 10.0 + i * 2;
    const bImg = $$('#bstrip img')[i];
    const pImg = $$('#pstrip img')[i];
    tl.fromTo(bImg, { y: 0 }, { y: -L.bScroll[i], duration: 1.75, ease: 'power1.inOut' }, s + 0.15);
    tl.fromTo(pImg, { y: 0 }, { y: -L.pScroll[i], duration: 1.75, ease: 'power1.inOut' }, s + 0.2);
    if (i > 0) {
      const t = s - 0.2;
      tl.set(['#bstrip', '#pstrip'], { filter: 'url(#mblur)' }, t);
      tl.to('#mblurG', { attr: { stdDeviation: '70 0' }, duration: 0.19, ease: 'power2.in' }, t);
      tl.to('#mblurG', { attr: { stdDeviation: '0 0' }, duration: 0.19, ease: 'power2.out' }, t + 0.19);
      tl.set(['#bstrip', '#pstrip'], { filter: 'none' }, t + 0.4);
      tl.to('#bstrip', { x: -i * B.w, duration: 0.38, ease: 'expo.inOut' }, t);
      tl.to('#pstrip', { x: -i * scrW, duration: 0.38, ease: 'expo.inOut' }, t + 0.04);
      ['#urlSwap', '#numSwap', '#typeSwap', '#nameSwap', '#urlSwap2'].forEach((sel) => swapTo(sel, i, t));
      tl.to('#phone', { rotation: M ? (i % 2 ? -1.5 : 2) : (i % 2 ? -3 : 4), duration: 0.6, ease: 'back.out(2)' }, t + 0.1);
      tl.to('#browser', { rotation: B.r + (i % 2 ? 0.8 : -0.8), duration: 0.6, ease: 'back.out(2)' }, t + 0.1);
      cue(t, 'whoosh', 0.75, i % 2 ? -0.5 : 0.5);
      cue(t + 0.38, 'click', 0.5);
    }
    tint(s, p.tint);
  });
  tl.to(['#browser', '#phone', '#plabel', '#pheadChip'], { scale: 0.9, filter: 'blur(6px)', duration: 0.5, ease: 'power2.in' }, 17.65);

  // S5: protótipos (íris)
  const wall = $('#wall');
  const [tw, th] = L.tile;
  const gap = 34;
  const ww = L.cols * tw + (L.cols - 1) * gap, wh = L.rows * th + (L.rows - 1) * gap;
  Object.assign(wall.style, { width: ww + 'px', height: wh + 'px', marginLeft: -ww / 2 + 'px', marginTop: -wh / 2 + 'px' });
  let k = 0;
  for (let r = 0; r < L.rows; r++) for (let c = 0; c < L.cols; c++) {
    const t = document.createElement('div');
    t.className = 'tile';
    Object.assign(t.style, { left: c * (tw + gap) + 'px', top: r * (th + gap) + 'px', width: tw + 'px', height: th + 'px' });
    t.innerHTML = `<img src="shots/${PROTOS[(k + r * 2) % PROTOS.length]}.jpeg">`;
    wall.appendChild(t);
    k++;
  }
  $('#s5').style.background = 'radial-gradient(circle at 70% 40%, #1b1240, #08070f 70%)';
  if (M) $('#wallShade').style.background = 'radial-gradient(ellipse at 50% 48%, rgba(8,7,15,.9), rgba(8,7,15,.35) 75%)';
  const PN = L.panel;
  Object.assign($('#protoPanel').style, { left: PN.x + 'px', top: PN.y + 'px', width: PN.w + 'px', height: PN.h + 'px' });
  $('#protoPanel').innerHTML = `<div class="abs mono chk" style="left:56px;top:54px;font-size:24px;letter-spacing:.16em;color:#c7b6ff">PROPOSTAS E PROTÓTIPOS</div>
    <div class="abs" style="left:56px;top:${M ? 112 : 104}px;overflow:hidden;padding-bottom:10px"><div class="pl chk" style="font-size:${L.p1}px;font-weight:600;letter-spacing:-.05em;white-space:nowrap">Antes de fechar,</div></div>
    <div class="abs" style="left:52px;top:${M ? 205 : 196}px;overflow:hidden;padding:0 10px 14px 4px"><div class="pl serif grad chk" style="font-size:${L.p2}px;line-height:1.05;white-space:nowrap">eu mostro.</div></div>
    <div class="abs chk" id="protoSub" style="left:56px;top:${M ? 405 : 350}px;font-size:${M ? 36 : 32}px;line-height:1.35;color:#a19bc2">Layouts e protótipos para<br>decidir junto, quando faz sentido.</div>`;
  gsap.set('#protoPanel', { transformPerspective: 1400, rotationY: 0.01, force3D: true });
  show('#s5', 17.85, 22.15);
  tl.fromTo('#s5', { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(80% at 50% 50%)', duration: 0.6, ease: 'expo.inOut' }, 17.85);
  cue(17.85, 'swell', 0.9);
  tl.fromTo(wall, { rotationX: 26, rotationZ: -13, transformPerspective: 2400, x: 260, y: 120, scale: 1.25 }, { x: -260, y: -120, scale: 1.08, duration: 4.2, ease: 'none' }, 17.9);
  tl.fromTo('#wall .tile', { z: -500, opacity: 0 }, { z: 0, opacity: 1, duration: 0.8, stagger: { each: 0.018, from: 'random' } }, 17.95);
  tl.fromTo('#protoPanel', { scale: 0.88, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, duration: 0.7 }, 18.3);
  tl.fromTo('#protoPanel .pl', { yPercent: 115 }, { yPercent: 0, duration: 0.75, stagger: 0.22 }, 18.45);
  cue(18.3, 'thud', 0.7); cue(18.45, 'swish', 0.5); cue(18.67, 'swish', 0.5);
  tl.fromTo('#protoSub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 19.0);
  cue(19.0, 'swish', 0.5);
  tl.to(wall, { rotationX: 75, yPercent: -35, opacity: 0, duration: 0.45, ease: 'power3.in' }, 21.55);
  tl.to('#protoPanel', { rotationY: -80, transformPerspective: 1400, opacity: 0, x: -120, duration: 0.42, ease: 'power3.in' }, 21.58);
  tl.to('#s5', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 21.72);
  cue(21.6, 'whoosh', 0.8, -0.4);

  // S6: processo
  const s6 = $('#s6');
  const C = L.chat;
  s6.innerHTML = `
    <div class="abs chk" id="t6" style="left:${M ? 0 : 160}px;${M ? 'right:0;text-align:center;' : ''}top:${L.title6Y}px;font-size:${M ? 84 : 80}px;font-weight:600;letter-spacing:-.05em;line-height:1.08;white-space:nowrap">
      <span class="t6w" style="display:inline-block">Do</span> <span class="t6w" style="display:inline-block">WhatsApp</span> <span class="t6w" style="display:inline-block">ao ar,</span>${M ? '<br>' : ' '}<span class="t6w serif grad" style="display:inline-block;font-size:1.2em">em 4 passos.</span></div>
    <div id="chat" class="glass" style="left:${C.x}px;top:${C.y}px;width:${C.w}px;height:${C.h}px">
      <div style="height:112px;display:flex;align-items:center;gap:22px;padding:0 32px;border-bottom:1.5px solid rgba(255,255,255,.1);background:rgba(16,14,27,.55)">
        <div style="width:66px;height:66px">${logoSVG('c6').replace(DOT, BOX).replace('fill="#8a63ff" stroke="url(#lg)" stroke-width="0"', 'fill="#120f1f" stroke="url(#lg)" stroke-width="2"')}</div>
        <div><div style="font-size:30px;font-weight:600">Matheus Rocha</div><div style="font-size:22px;color:#25d366;display:flex;align-items:center;gap:8px"><i style="width:10px;height:10px;border-radius:50%;background:#25d366;display:block"></i>online</div></div>
        <div style="margin-left:auto;width:46px;height:46px;color:#25d366">${WA}</div>
      </div>
      <div class="msg in chk" id="m1" style="top:${M ? 140 : 145}px">Oi, Matheus! Preciso de um site para a minha empresa.<span class="tm mono">10:24</span></div>
      <div class="typing" id="typ" style="top:${M ? 300 : 335}px"><i></i><i></i><i></i></div>
      <div class="msg out chk" id="m2" style="top:${M ? 290 : 320}px">Bora! Te mando a proposta ainda hoje.<span class="tm mono">10:25 ✓✓</span></div>
      <div class="msg in chk" id="m3" style="top:${M ? 432 : 495}px">Fechado! Vamos nessa.<span class="tm mono">10:26</span></div>
    </div>`;
  const STEPS = [['Conversa', 'Você me conta o problema.'], ['Proposta', 'Escopo, prazo e valor fechados.'], ['Construção', 'Do zero, com você acompanhando.'], ['No ar', 'Publicado, com suporte depois.']];
  STEPS.forEach(([h, p], i) => {
    const st = document.createElement('div');
    st.className = 'step';
    const nS = M ? 64 : 78;
    if (M) Object.assign(st.style, { left: (i % 2 ? 560 : 90) + 'px', top: 1080 + Math.floor(i / 2) * 200 + 'px', width: '430px', gap: '22px' });
    else Object.assign(st.style, { left: '960px', top: 280 + i * 165 + 'px', width: '820px' });
    st.innerHTML = `<div class="n" style="width:${nS}px;height:${nS}px;font-size:${M ? 22 : 26}px">0${i + 1}<span class="ok">${icon('check', M ? 30 : 36, 3)}</span></div>
      <div><h4 class="chk" style="font-size:${M ? 40 : 50}px">${h}</h4><p class="chk" style="font-size:${M ? 27 : 31}px;margin-top:6px;${M ? 'width:330px' : ''}">${p}</p></div>`;
    s6.appendChild(st);
  });
  if (!M) {
    const pl = document.createElement('div');
    pl.id = 'pline';
    Object.assign(pl.style, { left: 960 + 38 + 'px', top: 280 + 39 + 'px', width: '3px', height: 3 * 165 + 'px' });
    pl.innerHTML = '<i></i>';
    s6.insertBefore(pl, s6.querySelector('.step'));
  }
  gsap.set('#chat', { transformPerspective: 1600, rotationY: 0.01, force3D: true });
  show('#s6', 21.85, 25.97);
  tl.fromTo('.t6w', { yPercent: 120, opacity: 0, rotate: 6 }, { yPercent: 0, opacity: 1, rotate: 0, duration: 0.6, stagger: 0.09 }, 21.9);
  cue(21.9, 'swish', 0.6);
  tl.fromTo('#chat', { x: M ? 0 : -200, y: M ? 200 : 60, opacity: 0, rotationY: M ? 0 : 25, transformPerspective: 1600 }, { x: 0, y: 0, opacity: 1, rotationY: 0.01, duration: 0.75 }, 22.0);
  cue(22.0, 'whoosh', 0.7, -0.5);
  tl.fromTo('#m1', { scale: 0.4, opacity: 0, transformOrigin: '0% 100%' }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, 22.4);
  cue(22.4, 'ding', 0.7, -0.4);
  tl.fromTo('#typ', { opacity: 0, scale: 0.6, transformOrigin: '0% 100%' }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }, 22.75);
  tl.fromTo('#typ i', { y: 0 }, { y: -10, duration: 0.16, stagger: 0.08, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 22.8);
  tl.to('#typ', { opacity: 0, scale: 0.6, duration: 0.15 }, 23.3);
  tl.fromTo('#m2', { scale: 0.4, opacity: 0, transformOrigin: '100% 100%' }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, 23.35);
  cue(23.35, 'send', 0.7, -0.4);
  tl.fromTo('#m3', { scale: 0.4, opacity: 0, transformOrigin: '0% 100%' }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, 25.15);
  cue(25.15, 'ding', 0.6, -0.4);
  $$('#s6 .step').forEach((st, i) => {
    const t = 23.5 + i * 0.5;
    tl.fromTo(st, { x: M ? 0 : 80, y: M ? 50 : 0, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.55 }, t);
    tl.fromTo($('.ok', st), { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(3)' }, t + 0.22);
    cue(t, 'swish', 0.4, 0.4);
    cue(t + 0.22, 'pop', 0.6 + i * 0.05, 0.4);
  });
  tl.fromTo('#s6', { scale: 1 }, { scale: 1.05, duration: 3.6, ease: 'sine.inOut' }, 22.0);
  tl.to('#chat', { y: -14, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 23.0);
  if (!M) tl.fromTo('#pline i', { scaleY: 0 }, { scaleY: 1, duration: 1.7, ease: 'none' }, 23.6);

  // Transição: blob em morph cobre a tela e revela S7
  const blob = document.createElement('div');
  blob.id = 'blobDiv';
  Object.assign(blob.style, { position: 'absolute', left: W / 2 - 100 + 'px', top: H / 2 - 100 + 'px', width: '200px', height: '200px', background: 'linear-gradient(135deg, #7341f0, #a25cff 55%, #e07bff)', transform: 'scale(0)' });
  $('#cam').appendChild(blob);
  const cover = Math.hypot(W, H) / 160;
  tl.fromTo(blob, { scale: 0, rotation: 0, borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%' }, { scale: cover, rotation: 90, borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%', duration: 0.42, ease: 'power3.in' }, 25.5);
  tl.to(blob, { x: W * 0.42, y: -H * 0.42, scale: 0, rotation: 220, borderRadius: '70% 30% 46% 54% / 30% 39% 61% 70%', duration: 0.62, ease: 'power3.inOut' }, 26.02);
  cue(25.5, 'riser_short', 0.7); cue(26.0, 'impact_soft', 0.9); cue(26.05, 'whoosh', 0.6, 0.6);

  // S7: números e stack
  const s7 = $('#s7');
  const S7 = L.s7;
  s7.innerHTML = `<div class="abs" style="left:0;right:0;top:${S7.y1}px;text-align:center;overflow:hidden;padding-bottom:12px"><div class="l7 chk" style="font-size:${S7.l1}px;font-weight:600;letter-spacing:-.055em;line-height:1">Do zero ao ar.</div></div>
    <div class="abs" style="left:0;right:0;top:${S7.y2}px;text-align:center;overflow:hidden;padding-bottom:18px"><div class="l7 serif grad chk" style="font-size:${S7.l2}px;line-height:1.02;display:inline-block;padding:0 .08em">direto comigo.</div></div>`;
  [['70', '+', 'repositórios no GitHub'], ['4', '', 'sistemas e sites em produção'], ['100', '%', 'código próprio, sem template']].forEach(([v, suf, l], i) => {
    const r = S7.stat(i);
    const d = document.createElement('div');
    d.className = 'stat glass';
    Object.assign(d.style, { left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px' });
    d.innerHTML = M
      ? `<div class="v chk" style="position:absolute;left:44px;top:50%;transform:translateY(-50%);font-size:104px"><span class="cnt" data-v="${v}">0</span><b>${suf}</b></div><div class="l chk" style="position:absolute;left:330px;top:50%;transform:translateY(-50%);font-size:32px;width:520px;line-height:1.25">${l}</div>`
      : `<div class="v chk" style="position:absolute;left:44px;top:38px;font-size:108px"><span class="cnt" data-v="${v}">0</span><b>${suf}</b></div><div class="l chk" style="position:absolute;left:46px;bottom:36px;font-size:28px">${l}</div>`;
    s7.appendChild(d);
  });
  const STACK = [['TypeScript', 'React', 'Next.js', 'Vue', 'Tailwind', 'Node.js', 'PHP', 'Laravel', 'Python'], ['PostgreSQL', 'MySQL', 'Docker', 'Linux', 'Nginx', 'N8N', 'OpenAI', 'Claude', 'WhatsApp API']];
  const rowsWrap = document.createElement('div');
  Object.assign(rowsWrap.style, { position: 'absolute', inset: 0, WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 11%, #000 89%, transparent 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, #000 11%, #000 89%, transparent 100%)' });
  s7.appendChild(rowsWrap);
  STACK.forEach((items, ri) => {
    const row = document.createElement('div');
    row.className = 'row';
    row.style.top = S7.rows[ri] + 'px';
    const html = items.map((s) => `<span class="chip glass" style="font-size:${M ? 30 : 34}px">${s}</span>`).join('');
    row.innerHTML = html + html + html;
    rowsWrap.appendChild(row);
  });
  show('#s7', 25.97, 30.05);
  tl.fromTo('#s7', { scale: 1.03 }, { scale: 1, duration: 3.4, ease: 'sine.out' }, 26.0);
  tl.fromTo('#s7 .l7', { yPercent: 115 }, { yPercent: 0, duration: 0.8, stagger: 0.18 }, 26.15);
  cue(26.15, 'swish', 0.55); cue(26.33, 'swish', 0.55);
  $$('#s7 .stat').forEach((d, i) => {
    const t = 26.55 + i * 0.25;
    tl.fromTo(d, { y: 80, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, t);
    cue(t, 'pop', 0.6, [-0.4, 0, 0.4][i]);
    const el = $('.cnt', d);
    const o = { v: 0 };
    tl.to(o, { v: +el.dataset.v, duration: 1.0, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); } }, t + 0.1);
  });
  for (let t = 26.7; t < 27.9; t += 0.1) cue(t, 'tick', 0.22, (t * 7) % 1 - 0.5);
  $$('#s7 .row').forEach((row, ri) => {
    const wRow = row.scrollWidth / 3;
    const dir = ri ? 1 : -1;
    tl.fromTo(row, { x: ri ? -wRow : 0, opacity: 0 }, { x: ri ? -wRow + 700 : -700, opacity: 1, duration: 3.0, ease: 'none' }, 26.9);
    tl.fromTo(row, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 26.9 + ri * 0.15);
    cue(26.9 + ri * 0.15, 'swish', 0.4, dir * 0.6);
  });
  tl.to('#s7', { scale: 0.04, rotation: 10, opacity: 0, filter: 'blur(10px)', duration: 0.48, ease: 'power3.in', transformOrigin: '50% 50%' }, 29.52);
  cue(29.48, 'suck', 0.85);

  // S8: chamada final
  const lg8 = $('#logo8');
  lg8.innerHTML = logoSVG('l8');
  gsap.set(lg8, { width: L.logo8, height: L.logo8, xPercent: -50, yPercent: -50, top: L.logo8Y, left: '50%' });
  const m8 = $('#logo8 .lg-m');
  const m8len = m8.getTotalLength();
  const cta = $('#cta');
  cta.style.top = L.ctaTop + 'px';
  cta.style.fontSize = L.ctaSize + 'px';
  cta.className = 'chk';
  cta.innerHTML = L.ctaLines.map((l) => (l[0] === '#'
    ? `<span class="ln"><span class="serif grad" style="font-size:1.22em;line-height:.95;padding:0 .08em">${l.slice(1)}</span></span>`
    : `<span class="ln"><span>${l}</span></span>`)).join('');
  const pills = $('#pills');
  Object.assign(pills.style, { position: 'absolute', left: 0, right: 0, top: L.pillsTop + 'px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '26px', flexWrap: 'wrap', flexDirection: M ? 'column' : 'row' });
  const ph = M ? 112 : 112, pf = M ? 40 : 38;
  pills.innerHTML = [
    ['wa', WA, '(47) 99965-3593'],
    ['glass', icon('globe', pf), 'rochamaatheus.github.io'],
    ['glass', icon('instagram', pf), '@rocha.maatheus'],
  ].map(([cls, ic, txt]) => `<div class="pill ${cls} chk" style="position:relative;height:${ph}px;padding:0 ${M ? 44 : 38}px 0 ${M ? 18 : 16}px;font-size:${pf}px"><span class="pi" style="width:${ph - 30}px;height:${ph - 30}px;${cls === 'wa' ? 'background:rgba(255,255,255,.2);padding:14px' : 'background:rgba(138,99,255,.25);color:#ddd3ff'}">${ic}</span>${txt}<span class="shine"></span></div>`).join('');
  const sign = $('#sign');
  sign.style.top = L.signY + 'px';
  sign.style.fontSize = (M ? 24 : 24) + 'px';
  sign.className = 'mono chk';
  sign.textContent = M ? 'Dev full-stack · Joinville, SC' : 'Matheus Rocha · Dev full-stack · Joinville, SC';
  show('#s8', 29.9, null);
  tl.fromTo(lg8, { scale: 0 }, { scale: 1, duration: 0.45, ease: 'back.out(3)' }, 29.92);
  cue(29.95, 'pop', 0.9);
  tl.fromTo('#l8Box', { morphSVG: DOT, fill: '#8a63ff', strokeWidth: 0, rotation: 180, transformOrigin: '50% 50%' }, { morphSVG: BOX, fill: '#120f1f', strokeWidth: 2, rotation: 0, duration: 0.65, ease: 'expo.inOut' }, 30.05);
  cue(30.05, 'swish', 0.6);
  tl.fromTo(m8, { strokeDasharray: m8len, strokeDashoffset: m8len }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, 30.45);
  tl.fromTo('#logo8 .lg-dot', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(4)' }, 30.9);
  cue(30.9, 'pop', 0.6, 0.3);
  tl.fromTo('#cta .ln > span', { yPercent: 115 }, { yPercent: 0, duration: 0.8, stagger: 0.2 }, 30.5);
  L.ctaLines.forEach((_, i) => cue(30.5 + i * 0.2, 'swish', 0.5, (i - 1) * 0.3));
  tl.fromTo('#pills .pill', { scale: 0.5, y: 50, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(2.2)' }, 31.25);
  [0, 1, 2].forEach((i) => cue(31.25 + i * 0.2, 'pop', 0.7, [-0.4, 0, 0.4][i]));
  tl.fromTo('#sign', { opacity: 0, letterSpacing: '0.5em' }, { opacity: 1, letterSpacing: '0.14em', duration: 1 }, 31.8);
  flash(32.0, 0.35); shake(32.0, 8);
  cue(32.0, 'impact', 0.9); cue(32.05, 'shimmer', 0.7);
  tl.fromTo('#pills .shine', { xPercent: -120 }, { xPercent: 120, duration: 0.9, stagger: 0.12, ease: 'power2.inOut' }, 32.0);
  tl.fromTo('#pills .wa', { scale: 1 }, { scale: 1.06, duration: 0.5, yoyo: true, repeat: 2, ease: 'sine.inOut' }, 32.3);
  tl.fromTo('#s8', { scale: 1 }, { scale: 1.035, duration: 4, ease: 'sine.inOut' }, 30.0);
  tl.to(lg8, { y: -10, duration: 1, yoyo: true, repeat: 2, ease: 'sine.inOut' }, 31.0);

  tl.set({}, {}, DURATION);
  return tl;
}

let TL = null;
window.DURATION = DURATION;
window.FORMAT = F;
window.CUES = CUES;
window.ready = (async () => {
  await document.fonts.ready;
  await Promise.all(['600 100px Geist', '400 100px "Geist Mono"', 'italic 400 100px "Instrument Serif"'].map((f) => document.fonts.load(f)));
  TL = build();
  await Promise.all($$('img').map((i) => (i.complete ? i.decode().catch(() => {}) : new Promise((r) => { i.onload = () => i.decode().then(r, r); i.onerror = r; }))));
  TL.time(0);
  return true;
})();
window.seek = (t) => { TL.time(t, false); };
if (P.get('bgonly')) {
  const st = document.createElement('style');
  st.textContent = '.scene, #blobDiv { display: none !important; }';
  document.head.appendChild(st);
}
window.inspect = () => {
  // Retângulos dos textos visíveis, para checar cortes e zonas seguras
  const out = [];
  for (const el of $$('.chk')) {
    const r = el.getBoundingClientRect();
    let o = 1, n = el, vis = true;
    while (n && n.nodeType === 1) { const cs = getComputedStyle(n); o *= +cs.opacity; if (cs.visibility === 'hidden' || cs.display === 'none') vis = false; n = n.parentElement; }
    if (vis && o > 0.6 && r.width > 2) out.push({ id: el.id || el.className.split(' ')[0] + ':' + el.textContent.trim().slice(0, 24), x: Math.round(r.left), y: Math.round(r.top), r: Math.round(r.right), b: Math.round(r.bottom) });
  }
  return out;
};
if (!P.get('render')) {
  // Prévia: toca em tempo real e repete
  window.ready.then(() => {
    const t0 = performance.now();
    const loop = () => { const t = ((performance.now() - t0) / 1000) % DURATION; TL.time(t); requestAnimationFrame(loop); };
    loop();
  });
}
