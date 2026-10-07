// Projetos reais: abrem o site em nova aba
const PROJETOS = [
  {
    titulo: 'Agência Kamino',
    tipo: 'Site + infraestrutura',
    descricao: 'Construí o site institucional da agência e hoje mantenho toda a VPS e os clientes de desenvolvimento.',
    tags: ['Site', 'VPS', 'SEO'],
    img: 'assets/projetos/agenciakamino.webp',
    url: 'https://agenciakamino.com.br/',
    span: 'md:col-span-7',
  },
  {
    titulo: 'Kamino CRM',
    tipo: 'SaaS em produção',
    descricao: 'CRM para WhatsApp com atendimento por IA 24h, funil de vendas e automações, do primeiro contato até a venda.',
    tags: ['Next.js', 'IA', 'WhatsApp'],
    img: 'assets/projetos/crm-kamino.webp',
    url: 'https://crm.agenciakamino.com.br/',
    span: 'md:col-span-5',
  },
  {
    titulo: 'Mobcorp Fleet',
    tipo: 'Site, sistema e app',
    descricao: 'Site institucional, sistema de gestão web e aplicativo Android/iOS para transporte executivo 100% elétrico.',
    tags: ['Web', 'Android', 'iOS'],
    img: 'assets/projetos/mobcorp.webp',
    url: 'https://mobcorp.eco.br/',
    span: 'md:col-span-5',
  },
  {
    titulo: 'O Ponto Cego da Marcenaria',
    tipo: 'Landing page',
    descricao: 'Página de captação para a imersão presencial do Giba Klein, voltada a donos de lojas do setor moveleiro.',
    tags: ['Landing page', 'Conversão'],
    img: 'assets/projetos/pontocego.webp',
    url: 'https://pontocegodamarcenaria.com.br/',
    span: 'md:col-span-7',
  },
];

// Propostas e protótipos apresentados a clientes: abrem no modal
const PROTOTIPOS = [
  {
    titulo: 'LIDERARH Check',
    tipo: 'Protótipo de app',
    descricao: 'App de check-in emocional e riscos psicossociais (NR-01), com visões de colaborador, líder e RH.',
    stack: 'HTML · Tailwind · jQuery',
    img: 'assets/projetos/liderarh.webp',
    demo: 'https://rochamaatheus.github.io/liderarh-check-prototipo/',
    repo: 'https://github.com/rochamaatheus/liderarh-check-prototipo',
    span: 'md:col-span-2',
  },
  {
    titulo: 'Wesen Clínica',
    tipo: 'Identidade visual',
    descricao: 'Três caminhos de identidade para a landing page de uma clínica: clássico, premium e editorial.',
    stack: 'TypeScript · CSS',
    img: 'assets/projetos/wesen.webp',
    demo: 'https://rochamaatheus.github.io/wesen-clinica/',
    repo: 'https://github.com/rochamaatheus/wesen-clinica',
  },
  {
    titulo: 'Lynch Store',
    tipo: 'Wireframe de loja',
    descricao: 'Nova vitrine de uma loja geek e cosplay, com catálogo, coleções, brechó e pedido pelo WhatsApp.',
    stack: 'HTML · CSS · JS',
    img: 'assets/projetos/lynch.webp',
    demo: 'https://rochamaatheus.github.io/site-lynch-store/',
    repo: 'https://github.com/rochamaatheus/site-lynch-store',
  },
  {
    titulo: 'Ties Comunicação',
    tipo: 'Estudo de layout',
    descricao: 'Três rascunhos de layout para o novo site, com o mesmo conteúdo organizado de jeitos diferentes.',
    stack: 'HTML · CSS',
    img: 'assets/projetos/ties.webp',
    demo: 'https://rochamaatheus.github.io/ties-comunicacao/',
    repo: 'https://github.com/rochamaatheus/ties-comunicacao',
  },
  {
    titulo: 'AZ3 Usinagem',
    tipo: 'Estudo de layout',
    descricao: 'Duas propostas de estrutura para o site de uma usinagem industrial, lado a lado para comparar.',
    stack: 'HTML · CSS',
    img: 'assets/projetos/az3.webp',
    demo: 'https://rochamaatheus.github.io/az3-apresentacao/',
    repo: 'https://github.com/rochamaatheus/az3-apresentacao',
  },
];

const STACK = [
  { grupo: 'Front-end', icone: 'layout-template', itens: ['TypeScript', 'React', 'Next.js', 'Vue', 'Tailwind'] },
  { grupo: 'Back-end', icone: 'server', itens: ['Node.js', 'PHP', 'Laravel', 'Python', 'PostgreSQL', 'MySQL'] },
  { grupo: 'IA e automação', icone: 'bot', itens: ['OpenAI', 'Claude', 'N8N', 'Evolution API', 'WhatsApp'] },
  { grupo: 'Infra e dados', icone: 'cloud-cog', itens: ['Docker', 'Linux / VPS', 'Nginx', 'Traefik', 'Meta e Google Ads', 'GTM'] },
];

const MARQUEE = ['Sites', 'Sistemas', 'IA no WhatsApp', 'Painéis', 'Automação', 'SEO', 'Landing pages', 'Apps', 'Sob medida', 'Do zero ao ar'];

const CODE_LINES = [
  [['k', 'const'], ['t', ' matheus '], ['d', '= {']],
  [['p', '  entrega'], ['d', ':  ['], ['s', "'sites'"], ['d', ', '], ['s', "'sistemas'"], ['d', ', '], ['s', "'IA'"], ['d', '],']],
  [['p', '  extra'], ['d', ':    '], ['s', "'o que o negócio precisar'"], ['d', ',']],
  [['p', '  foco'], ['d', ':     '], ['s', "'resolver, sem enrolação'"], ['d', ',']],
  [['p', '  base'], ['d', ':     '], ['s', "'Joinville, SC'"], ['d', ',']],
  [['p', '  processo'], ['d', ': '], ['s', "'do zero ao ar, direto comigo'"], ['d', ',']],
  [['p', '  disponivel'], ['d', ': '], ['k', 'true'], ['d', ',']],
  [['d', '}']],
];
const CODE_CLASS = { k: 'text-violet-400', t: 'text-ink', d: 'text-dim', p: 'text-violet-300', s: 'text-fuchsia-400' };

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
// As animações sempre rodam, mesmo com "reduzir movimento" ligado no sistema; ?motion=0 desliga (teste/acessibilidade)
const reduceMotion = /[?&]motion=0/.test(location.search);
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const hasGsap = typeof window.gsap !== 'undefined';
if (!hasGsap) document.documentElement.classList.remove('js', 'motion');

function projectCard(p) {
  return `
    <article data-reveal data-tilt class="spot lift group w-[84%] shrink-0 snap-center overflow-hidden rounded-3xl border border-line bg-card md:w-auto ${p.span}">
      <a href="${p.url}" target="_blank" rel="noopener" data-cursor="Abrir site" class="block">
        <div class="relative aspect-[16/10] overflow-hidden bg-surface2 md:aspect-auto md:h-[21rem]">
          <img src="${p.img}" alt="Página inicial de ${p.titulo}" loading="lazy" decoding="async" width="1200" height="750"
               data-parallax class="h-[112%] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
          <div class="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80"></div>
          <span class="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full glass-card text-ink opacity-0 -translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <i data-lucide="arrow-up-right" class="h-5 w-5"></i>
          </span>
        </div>
        <div class="p-6 md:p-7">
          <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <h3 class="text-xl md:text-2xl font-semibold tracking-tight text-ink">${p.titulo}</h3>
            <span class="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-violet-300">${p.tipo}</span>
          </div>
          <p class="mt-3 text-[15px] leading-relaxed text-dim">${p.descricao}<span class="sr-only"> (abre o site em nova aba)</span></p>
          <div class="mt-5 flex flex-wrap gap-2">${p.tags.map((t) => `<span class="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-dim">${t}</span>`).join('')}</div>
        </div>
      </a>
    </article>`;
}

function prototypeCard(p) {
  return `
    <article data-reveal data-tilt class="spot lift group flex w-[78%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-line bg-card md:w-auto ${p.span || ''}">
      <button type="button" data-demo="${p.demo}" data-title="${p.titulo}" data-cursor="Ver demo" class="block w-full text-left" aria-label="Abrir demonstração de ${p.titulo}">
        <div class="relative aspect-[16/10] overflow-hidden bg-surface2 md:aspect-auto md:h-56">
          <img src="${p.img}" alt="Prévia de ${p.titulo}" loading="lazy" decoding="async" width="1200" height="750"
               class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
          <div class="absolute inset-0 grid place-items-center bg-bg/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span class="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white">
              <i data-lucide="play" class="h-4 w-4"></i> Abrir demo
            </span>
          </div>
        </div>
      </button>
      <div class="flex flex-1 flex-col p-5">
        <div class="flex items-center justify-between gap-3">
          <h4 class="text-lg font-semibold tracking-tight text-ink">${p.titulo}</h4>
          <a href="${p.repo}" target="_blank" rel="noopener" aria-label="Código de ${p.titulo} no GitHub" class="text-mute transition-colors hover:text-violet-300"><i data-lucide="github" class="h-4 w-4"></i></a>
        </div>
        <p class="mt-1 font-mono text-[11px] uppercase tracking-wide text-violet-300">${p.tipo}</p>
        <p class="mt-3 flex-1 text-sm leading-relaxed text-dim">${p.descricao}</p>
        <p class="mt-4 border-t border-line pt-4 font-mono text-[11px] text-mute">${p.stack}</p>
      </div>
    </article>`;
}

function stackCard(s) {
  return `
    <div data-reveal class="spot rounded-3xl border border-line bg-card p-6">
      <div class="flex items-center gap-3">
        <span class="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/15 text-violet-300"><i data-lucide="${s.icone}" class="h-5 w-5"></i></span>
        <h3 class="font-semibold text-ink">${s.grupo}</h3>
      </div>
      <div class="mt-5 flex flex-wrap gap-2">${s.itens.map((i) => `<span class="chip rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[13px] text-dim transition-colors hover:border-violet-400/60 hover:text-ink">${i}</span>`).join('')}</div>
    </div>`;
}

$('#projetos-grid').innerHTML = PROJETOS.map(projectCard).join('');
$('#prototipos-grid').innerHTML = PROTOTIPOS.map(prototypeCard).join('');
$('#stack-grid').innerHTML = STACK.map(stackCard).join('');

const marqueeChunk = MARQUEE.map(
  (w) => `<span class="mx-7 text-2xl md:text-3xl font-semibold tracking-tight text-dim/80">${w}</span><span class="serif-accent text-2xl md:text-3xl text-violet-400">✦</span>`
).join('');
$$('[data-marquee-chunk]').forEach((el) => (el.innerHTML = marqueeChunk));
const track = $('[data-marquee]');
track.innerHTML += track.innerHTML;

$('#ano').textContent = new Date().getFullYear();
if (window.renderIcons) renderIcons();

// Janela de código: monta as linhas (com ou sem digitação)
const codeEl = $('#code-typed');
function renderCode(chars) {
  let left = chars;
  let html = '';
  for (const line of CODE_LINES) {
    for (const [cls, text] of line) {
      if (left <= 0) break;
      const piece = text.slice(0, left);
      left -= piece.length;
      html += `<span class="${CODE_CLASS[cls]}">${piece.replace(/</g, '&lt;')}</span>`;
    }
    if (left <= 0) break;
    html += '\n';
    left -= 1;
  }
  codeEl.innerHTML = `${html}<span class="text-violet-400 cursor-blink" aria-hidden="true">▍</span>`;
}
const totalChars = CODE_LINES.reduce((n, l) => n + l.reduce((m, [, t]) => m + t.length, 0) + 1, 0);

// Menu mobile
const menuToggle = $('#menu-toggle');
const mobileMenu = $('#mobile-menu');
const [lineA, lineB] = $$('#menu-icon line');
function setMenu(open) {
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menuToggle.setAttribute('aria-expanded', String(open));
  lineA.style.transform = open ? 'translateY(4px) rotate(45deg)' : '';
  lineB.style.transform = open ? 'translateY(-4px) rotate(-45deg)' : '';
  if (window.lenisInstance) open ? lenisInstance.stop() : lenisInstance.start();
}
menuToggle.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
$$('#mobile-menu a').forEach((l) => l.addEventListener('click', () => setMenu(false)));

// Modal de demo
const modal = $('#demo-modal');
const frame = $('#demo-frame');
const loading = $('#demo-loading');
let lastFocus = null;
function openDemo(url, title) {
  lastFocus = document.activeElement;
  $('#demo-title-text').textContent = title;
  $('#demo-newtab').href = url;
  loading.style.display = 'flex';
  frame.src = url;
  modal.classList.add('active');
  document.documentElement.classList.add('cursor-native');
  document.body.style.overflow = 'hidden';
  if (window.lenisInstance) lenisInstance.stop();
  setTimeout(() => $('[data-close]', modal).focus(), 60);
}
function closeDemo() {
  modal.classList.remove('active');
  document.documentElement.classList.remove('cursor-native');
  document.body.style.overflow = '';
  if (window.lenisInstance) lenisInstance.start();
  setTimeout(() => (frame.src = 'about:blank'), 350);
  if (lastFocus) lastFocus.focus();
}
frame.addEventListener('load', () => { if (frame.src !== 'about:blank') loading.style.display = 'none'; });
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-demo]');
  if (btn) openDemo(btn.dataset.demo, btn.dataset.title);
});
$('[data-close]', modal).addEventListener('click', closeDemo);
modal.addEventListener('click', (e) => { if (e.target === modal) closeDemo(); });
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (modal.classList.contains('active')) closeDemo();
  else if (mobileMenu.classList.contains('open')) setMenu(false);
});

// Vídeo: toca sem som quando aparece na tela, pausa quando sai
const reel = $('#showreel');
const reelBtn = $('#reel-sound');
if (reel) {
  // Vertical (9:16) no celular, horizontal (16:9) a partir do tablet; troca também ao redimensionar
  const mqMobile = window.matchMedia('(max-width: 767px)');
  let reelVisible = false;
  let reelNear = false;
  const pickReel = () => {
    const kind = mqMobile.matches ? 'mobile' : 'desktop';
    if (reel.dataset.current === kind) return;
    reel.dataset.current = kind;
    if (reelNear) reel.poster = reel.dataset[`${kind}Poster`];
    reel.src = reel.dataset[kind];
    if (reelVisible) reel.play().catch(() => {});
  };
  pickReel();
  mqMobile.addEventListener('change', pickReel);
  // A capa só baixa quando o vídeo está chegando perto da tela (não disputa a primeira pintura)
  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    reelNear = true;
    reel.poster = reel.dataset[`${reel.dataset.current}Poster`];
    obs.disconnect();
  }, { rootMargin: '900px 0px' }).observe(reel);
  new IntersectionObserver((entries) => entries.forEach((e) => {
    reelVisible = e.isIntersecting;
    if (e.isIntersecting) reel.play().catch(() => {});
    else reel.pause();
  }), { threshold: 0.35 }).observe(reel);
  const reelFrame = $('#video-frame');
  const toggleSound = () => {
    reel.muted = !reel.muted;
    if (!reel.muted) { reel.currentTime = 0; reel.play().catch(() => {}); }
    $('#reel-label').textContent = reel.muted ? 'Ativar som' : 'Som ativado';
    $('#reel-icon-off').classList.toggle('hidden', !reel.muted);
    $('#reel-icon-on').classList.toggle('hidden', reel.muted);
    reelFrame.dataset.cursor = reel.muted ? 'Ativar som' : 'Silenciar';
  };
  reelFrame.dataset.cursor = 'Ativar som';
  reelBtn.addEventListener('click', toggleSound);
  reel.addEventListener('click', toggleSound);
}

// Copiar e-mail
const copyBtn = $('#copy-email');
copyBtn.addEventListener('click', async () => {
  const label = $('#copy-email-label');
  try {
    await navigator.clipboard.writeText('matheus@agenciakamino.com.br');
    label.textContent = 'copiado ✓';
    label.classList.add('text-emerald-400');
  } catch {
    window.location.href = 'mailto:matheus@agenciakamino.com.br';
  }
  setTimeout(() => { label.textContent = 'copiar'; label.classList.remove('text-emerald-400'); }, 2200);
});

// Nav: vidro ao rolar, pílula na seção ativa, botão do WhatsApp some no topo e no contato
const nav = $('#nav');
const pill = $('.nav-pill');
const navLinks = $$('[data-nav]');
const fab = $('.wa-fab');
function movePill(link) {
  if (!link) { pill.style.opacity = '0'; return; }
  pill.style.opacity = '1';
  pill.style.left = `${link.offsetLeft}px`;
  pill.style.width = `${link.offsetWidth}px`;
  navLinks.forEach((l) => l.classList.toggle('text-ink', l === link));
}
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('glass', y > 20);
  nav.classList.toggle('border-line', y > 20);
  nav.classList.toggle('shadow-2xl', y > 20);
  const mid = y + window.innerHeight * 0.4;
  let active = null;
  navLinks.forEach((l) => {
    const sec = $(l.getAttribute('href'));
    if (sec && sec.offsetTop <= mid && sec.offsetTop + sec.offsetHeight > mid) active = l;
  });
  if (!active && $('#prototipos').offsetTop <= mid && $('#stack').offsetTop + $('#stack').offsetHeight > mid) {
    active = navLinks.find((l) => l.getAttribute('href') === '#projetos');
  }
  movePill(active);
  const contato = $('#contato').getBoundingClientRect();
  // No celular o botão cobriria o palco do processo enquanto ele está fixo na tela
  const build = $('#build').getBoundingClientRect();
  const inBuild = window.innerWidth < 1024 && build.top < 1 && build.bottom > window.innerHeight;
  fab.classList.toggle('hide', y < 400 || contato.top < window.innerHeight * 0.6 || inBuild);
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

// Luz que acompanha o cursor nos cartões
document.addEventListener('pointermove', (e) => {
  const card = e.target.closest('.spot');
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - r.left}px`);
  card.style.setProperty('--my', `${e.clientY - r.top}px`);
}, { passive: true });

if (!hasGsap || reduceMotion) {
  // Sem GSAP a cópia do código (estática no HTML) já aparece; com movimento reduzido mostra o código pronto
  if (hasGsap) renderCode(totalChars);
  $$('[data-count]').forEach((el) => (el.textContent = el.dataset.count));
  fitBuildStage();
} else {
  initMotion();
}

function initMotion() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Imagens têm tamanho fixo e as fontes de reserva têm as mesmas medidas: o layout não muda no 'load',
  // então a recalibragem completa que o ScrollTrigger faria ali só custaria tempo
  ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,resize' });

  // Rolagem suave só em desktop com mouse; no touch fica o scroll nativo
  if (finePointer && window.Lenis) {
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    window.lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Hero entra só com CSS (primeira pintura); aqui fica a digitação da janela de código
  const typing = { n: 0 };
  gsap.to(typing, { n: totalChars, duration: 2.6, ease: 'none', delay: 1.1, onUpdate: () => renderCode(Math.round(typing.n)) });

  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });


  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.09, overwrite: true }),
  });

  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: end > 10 ? 1.8 : 1,
      ease: 'power3.out',
      onUpdate: () => (el.textContent = Math.round(obj.v)),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // O que fica abaixo da dobra monta depois do carregamento, em tarefas curtas separadas por momentos ociosos,
  // para não travar a thread principal enquanto a página aparece
  const idle = (fn) => new Promise((done) => {
    const run = () => { fn(); done(); };
    if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 1200 });
    else setTimeout(run, 60);
  });
  const afterLoad = new Promise((r) => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })));
  // Cada seção só monta as animações quando o visitante chega perto dela
  const whenNear = (el, fn) => {
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      idle(fn);
    }, { rootMargin: '120% 0px' });
    io.observe(el);
  };
  afterLoad
    .then(() => idle(initParticles))
    .then(() => idle(initExtras))
    .then(() => {
      whenNear($('#servicos'), initServices);
      whenNear($('#processo'), initBuild);
      return document.fonts.ready;
    })
    .then(() => $$('[data-split]').forEach((h) => whenNear(h, () => splitHeading(h))));

  // Marquee contínuo que acelera com a velocidade da rolagem
  const half = track.scrollWidth / 2;
  let x = 0;
  let boost = 0;
  ScrollTrigger.create({ onUpdate: (self) => (boost = Math.min(Math.abs(self.getVelocity()) / 120, 14)) });
  gsap.ticker.add((_, dt) => {
    boost *= 0.92;
    x -= (0.6 + boost) * (dt / 16.7);
    if (x <= -half) x += half;
    track.style.transform = `translate3d(${x}px,0,0) skewX(${(-Math.min(boost, 14) * 0.45).toFixed(2)}deg)`;
  });

  // Parallax leve nas imagens dos projetos
  if (window.innerWidth >= 768) {
    $$('[data-parallax]').forEach((img) => {
      gsap.fromTo(img, { yPercent: 0 }, {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: img.closest('article'), start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }

  // Parallax do visual do hero com o mouse
  if (finePointer) {
    const visual = $('#hero-visual');
    const qx = gsap.quickTo(visual, 'x', { duration: 1, ease: 'power3.out' });
    const qy = gsap.quickTo(visual, 'y', { duration: 1, ease: 'power3.out' });
    const glow = $('.cursor-glow');
    const gx = gsap.quickTo(glow, 'x', { duration: 0.8, ease: 'power3.out' });
    const gy = gsap.quickTo(glow, 'y', { duration: 0.8, ease: 'power3.out' });
    document.documentElement.classList.add('has-pointer');
    initCursor();
    initTilt();
    window.addEventListener('pointermove', (e) => {
      gx(e.clientX);
      gy(e.clientY);
      qx((e.clientX / window.innerWidth - 0.5) * -18);
      qy((e.clientY / window.innerHeight - 0.5) * -14);
    }, { passive: true });

    // Botões magnéticos
    $$('[data-magnetic]').forEach((btn) => {
      const mx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const my = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * 0.25);
        my((e.clientY - r.top - r.height / 2) * 0.35);
      });
      btn.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  }
}

// Palco do processo: desenhado em 520x420 e escalado para a largura disponível
function fitBuildStage() {
  const stage = $('#bs');
  if (!stage) return;
  const wrap = stage.parentElement;
  const fit = () => stage.style.setProperty('--s', wrap.clientWidth / 520);
  fit();
  new ResizeObserver(fit).observe(wrap);
}

// Processo: a rolagem monta um site do zero (conversa, proposta, construção, no ar)
function initBuild() {
  const stage = $('#bs');
  if (!stage) return;
  fitBuildStage();
  const q = (sel) => $$(sel, stage);
  const steps = $$('.build-step');
  const list = $('.build-steps');
  const segs = $$('.build-bar b');
  const urlEl = $('.bs-url-text', stage);
  const url = urlEl.textContent;
  const pct = $('.bs-pct', stage);
  const rings = q('.bs-ring');
  const typed = { n: 0 };
  const build = { v: 0 };
  const score = { v: 0 };
  urlEl.textContent = '';
  pct.textContent = '0%';
  rings.forEach((r) => ($('b', r).textContent = '0'));

  const tl = gsap.timeline({ paused: true, defaults: { duration: 0.4, ease: 'power2.out' } });

  // 1 · Conversa
  const msgs = q('.bs-chat-body > .bs-msg');
  tl.fromTo('.bs-chat', { autoAlpha: 0, y: 40, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, 0.1);
  [0.45, 0.9, 1.35].forEach((at, k) =>
    tl.from(msgs[k], { autoAlpha: 0, y: 16, scale: 0.92, transformOrigin: k % 2 ? '100% 100%' : '0% 100%', duration: 0.3 }, at));
  tl.fromTo('.bs-typing', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 1.7)
    .to('.bs-typing', { autoAlpha: 0, duration: 0.1 }, 2.0)
    .from('.bs-slot .bs-msg', { autoAlpha: 0, y: 10, scale: 0.92, transformOrigin: '100% 100%', duration: 0.25 }, 2.02);

  // 2 · Proposta e protótipo (wireframe)
  tl.to('.bs-chat', { autoAlpha: 0, x: -60, scale: 0.9, duration: 0.45, ease: 'power2.in' }, 2.55)
    .fromTo('.bs-proposal', { autoAlpha: 0, y: 50, rotation: -4 }, { autoAlpha: 1, y: 0, rotation: 0, duration: 0.5, ease: 'back.out(1.4)' }, 2.75)
    .from(q('.bs-proposal li'), { autoAlpha: 0, x: -14, stagger: 0.25, duration: 0.3 }, 3.0)
    .from(q('.bs-check'), { scale: 0, stagger: 0.25, duration: 0.3, ease: 'back.out(3)' }, 3.15)
    .from('.bs-stamp', { autoAlpha: 0, scale: 2.2, rotation: -25, duration: 0.3, ease: 'power3.in' }, 3.9)
    .to('.bs-proposal', { autoAlpha: 0, scale: 0.7, x: 170, y: -150, rotation: 8, duration: 0.5, ease: 'power2.in' }, 4.3)
    .fromTo('.bs-browser', { autoAlpha: 0, y: 40, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, 4.45)
    .fromTo(q('.bs-page .sk'), { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, stagger: 0.03, duration: 0.25 }, 4.65);

  // 3 · Construção
  tl.fromTo('.bs-term', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 5.0)
    .fromTo('.bs-prog i', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 2.1 }, 5.1)
    .fromTo(build, { v: 0 }, { v: 100, ease: 'none', duration: 2.1, onUpdate: () => (pct.textContent = `${Math.round(build.v)}%`) }, 5.1)
    .fromTo(q('.bs-page .fl'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.12, duration: 0.35, ease: 'power2.inOut' }, 5.2)
    .to(q('.bs-page .sk'), { autoAlpha: 0, stagger: 0.12, duration: 0.25 }, 5.3)
    .to('.bs-term', { autoAlpha: 0, y: 12, duration: 0.3 }, 7.3);

  // 4 · No ar
  const conf = q('.bs-confetti i');
  tl.fromTo(typed, { n: 0 }, { n: url.length, ease: 'none', duration: 0.7, onUpdate: () => (urlEl.textContent = url.slice(0, Math.round(typed.n))) }, 7.55)
    .from('.bs-lock', { scale: 0, autoAlpha: 0, duration: 0.25, ease: 'back.out(3)' }, 8.25)
    .from('.bs-badge', { scale: 0, autoAlpha: 0, duration: 0.35, ease: 'back.out(2.5)' }, 8.35)
    .fromTo(conf, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 8.4)
    .fromTo(conf, { x: 0, y: 0, rotation: 0 }, {
      x: (k) => Math.cos((k / conf.length) * Math.PI * 2) * (50 + (k % 4) * 18),
      y: (k) => Math.sin((k / conf.length) * Math.PI * 2) * (34 + (k % 3) * 14) + 30,
      rotation: (k) => (k % 2 ? 1 : -1) * (120 + k * 25),
      duration: 0.9, ease: 'power3.out',
    }, 8.4)
    .to(conf, { autoAlpha: 0, duration: 0.35 }, 8.95)
    .fromTo('.bs-scores', { autoAlpha: 0, y: 30, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.6)' }, 8.6)
    .fromTo(q('.bs-ring circle:last-child'), { strokeDashoffset: 100 }, { strokeDashoffset: (k) => 100 - +rings[k].dataset.score, stagger: 0.1, duration: 0.7 }, 8.75)
    .fromTo(score, { v: 0 }, { v: 1, duration: 0.7, onUpdate: () => rings.forEach((r) => ($('b', r).textContent = Math.round(+r.dataset.score * score.v))) }, 8.75)
    .fromTo('.bs-toast', { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: 'back.out(1.6)' }, 9.1)
    .to({}, { duration: 0.5 }, 9.5);

  const STEP = 2.5;
  // Trilho vai do centro da bolinha 01 ao da 04; cada trecho só cresce no fim do passo e acende a próxima ao chegar
  let centers = [];
  const measureRail = () => {
    centers = steps.map((li) => { const n = $('.build-num', li); return li.offsetTop + n.offsetTop + n.offsetHeight / 2; });
    list.style.setProperty('--rt', `${centers[0]}px`);
    list.style.setProperty('--rh', `${centers[3] - centers[0]}px`);
  };
  measureRail();
  ScrollTrigger.addEventListener('refresh', () => { measureRail(); sync(); });
  let current = -1;
  const sync = () => {
    const t = tl.time();
    const idx = Math.min(3, Math.floor(t / STEP));
    if (idx !== current) {
      current = idx;
      steps.forEach((el, k) => { el.classList.toggle('is-active', k === idx); el.classList.toggle('is-done', k < idx); });
    }
    const travel = idx < 3 ? gsap.utils.clamp(0, 1, ((t - idx * STEP) / STEP - 0.6) / 0.4) : 0;
    const px = idx < 3 ? centers[idx] + (centers[idx + 1] - centers[idx]) * travel : centers[3];
    list.style.setProperty('--p', ((px - centers[0]) / (centers[3] - centers[0] || 1)).toFixed(4));
    segs.forEach((b, k) => b.style.setProperty('--f', gsap.utils.clamp(0, 1, (t - k * STEP) / STEP).toFixed(3)));
  };
  tl.eventCallback('onUpdate', sync);
  sync();
  ScrollTrigger.create({ trigger: '#build', start: 'top top', end: 'bottom bottom', scrub: 0.6, animation: tl });
}

// Serviços: cada cartão monta a própria cena quando aparece e reage ao mouse (ou toque)
function initServices() {
  const CONVERSAS = [
    ['Vocês abrem no sábado?', 'Abrimos sim, das 8h às 12h. Quer agendar um horário?'],
    ['Tem horário amanhã à tarde?', 'Tenho às 14h e às 16h. Qual fica melhor pra você?'],
    ['Quanto fica um orçamento?', 'Te passo agora! Me conta rapidinho o que você precisa.'],
  ];
  $$('.svc-vis').forEach((v) => {
    const card = v.closest('article');
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out', duration: 0.7 } });
    let hoverOn = () => {};
    let hoverOff = () => {};
    let touchDemo = () => {};

    if (v.dataset.vis === 'site') {
      const frame = $('.ms-frame', v);
      const desk = $('.ms-d', v);
      const phone = $('.ms-m', v);
      const label = $('[data-ms-label]', v);
      tl.from(frame, { autoAlpha: 0, y: 18, scale: 0.94 })
        .from($$('.ms-bar i', v), { scale: 0, stagger: 0.06, duration: 0.4, ease: 'back.out(3)' }, 0.2)
        .from($$('.ms-nav > *', v), { scaleX: 0, transformOrigin: 'left', stagger: 0.05 }, 0.3)
        .from($('.ms-d .ms-img', v), { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.9 }, 0.35)
        .from($$('.ms-txt > *', v), { scaleX: 0, transformOrigin: 'left', stagger: 0.07 }, 0.45)
        .from($$('.ms-cards s', v), { y: 10, autoAlpha: 0, stagger: 0.07 }, 0.6);
      let isPhone = false;
      const setPhone = (on) => {
        if (on === isPhone) return;
        isPhone = on;
        label.textContent = on ? 'celular' : 'desktop';
        const show = on ? phone : desk;
        gsap.to(frame, { width: on ? '34%' : '88%', duration: 0.7, ease: 'power3.inOut', overwrite: 'auto' });
        gsap.to(on ? desk : phone, { autoAlpha: 0, duration: 0.2, overwrite: 'auto' });
        gsap.to(show, { autoAlpha: 1, duration: 0.25, delay: 0.25, overwrite: 'auto' });
        gsap.fromTo(show.children, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, delay: 0.3, ease: 'expo.out', overwrite: 'auto' });
      };
      hoverOn = () => setPhone(true);
      hoverOff = () => setPhone(false);
      touchDemo = () => { gsap.delayedCall(0.6, () => setPhone(true)); gsap.delayedCall(2.8, () => setPhone(false)); };
      v.addEventListener('click', () => setPhone(!isPhone));
    }

    if (v.dataset.vis === 'sys') {
      // Barras e linha saem dos mesmos valores: um único tween redesenha os dois, sem piscar
      const chart = $('.md-chart', v);
      const bars = $$('.md-bars i', v);
      const paths = $$('.md-chart path', v);
      const goal = bars.map((b) => parseFloat(b.style.height));
      const vals = goal.map(() => 0);
      const kpis = $$('.md-kpis b', v).map((el) => ({ el, v: +el.dataset.k, shown: 0, suf: el.dataset.suffix || '' }));
      const draw = () => {
        const w = chart.clientWidth;
        const bw = (w - 4 * (bars.length - 1)) / bars.length;
        let d = '';
        vals.forEach((h, i) => {
          bars[i].style.height = `${h}%`;
          const x = ((i * (bw + 4) + bw / 2) / w) * 100;
          d += `${i ? 'L' : 'M'}${x.toFixed(2)} ${(40 - h * 0.4 - 4).toFixed(2)} `;
        });
        paths.forEach((p) => p.setAttribute('d', d));
        kpis.forEach((k) => (k.el.textContent = Math.round(k.shown) + k.suf));
      };
      const grow = (duration) => {
        const tw = gsap.timeline({ onUpdate: draw });
        goal.forEach((g, i) => tw.to(vals, { [i]: g, duration, ease: 'expo.out' }, i * 0.05));
        kpis.forEach((k) => tw.to(k, { shown: k.v, duration: duration + 0.3, ease: 'power3.out' }, 0));
        return tw;
      };
      draw();
      tl.from($('.md-wrap', v), { autoAlpha: 0, y: 18, scale: 0.94 })
        .from($$('.md-side > *', v), { autoAlpha: 0, x: -6, stagger: 0.05 }, 0.2)
        .from($$('.md-kpis div', v), { autoAlpha: 0, y: 8, stagger: 0.08 }, 0.25)
        .add(grow(1.1), 0.3);
      let liveTl = null;
      const live = () => {
        if (tl.isActive() || (liveTl && liveTl.isActive())) return;
        goal.forEach((_, i) => (goal[i] = 28 + Math.random() * 66));
        kpis.forEach((k) => (k.v = k.suf ? Math.min(99, k.v + 1 + Math.floor(Math.random() * 4)) : k.v + 2 + Math.floor(Math.random() * 9)));
        liveTl = grow(0.9);
      };
      window.addEventListener('resize', draw);
      hoverOn = live;
      touchDemo = () => gsap.delayedCall(1.2, live);
      v.addEventListener('click', live);
    }

    if (v.dataset.vis === 'ia') {
      const qEl = $('[data-q]', v);
      const aEl = $('[data-a]', v);
      const typing = $('.mc-typing', v);
      let idx = 0;
      let busy = null;
      const chat = (t) => t
        .fromTo(qEl, { autoAlpha: 0, y: 12, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, transformOrigin: '0% 100%' })
        .fromTo(typing, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.3 }, 0.5)
        .to(typing, { autoAlpha: 0, duration: 0.15 }, 1.5)
        .fromTo(aEl, { autoAlpha: 0, y: 10, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, transformOrigin: '100% 100%' }, 1.55);
      chat(tl);
      const next = () => {
        if (tl.isActive() || (busy && busy.isActive())) return;
        idx = (idx + 1) % CONVERSAS.length;
        busy = gsap.to([qEl, aEl], { autoAlpha: 0, duration: 0.2, onComplete: () => {
          [qEl.textContent, aEl.textContent] = CONVERSAS[idx];
          busy = chat(gsap.timeline({ defaults: { ease: 'expo.out' } }));
        } });
      };
      hoverOn = next;
      v.addEventListener('click', next);
    }

    ScrollTrigger.create({
      trigger: v,
      start: 'top 82%',
      once: true,
      onEnter: () => tl.play().then(() => { if (!finePointer) touchDemo(); }),
    });
    card.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse' && tl.progress() === 1) hoverOn(); });
    card.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') hoverOff(); });
  });
}

// Partículas: uma forma por seção, com a posição presa ao conteúdo e transição pela rolagem
function initParticles() {
  const canvas = $('#fx-canvas');
  if (!canvas || !window.ParticleField) return;
  const small = window.matchMedia('(max-width: 767px)');
  let field = null;
  try {
    field = ParticleField.createField(canvas, {
      count: small.matches ? 9000 : 15000,
      maxDpr: small.matches ? 1.5 : 1.75,
      pointSize: small.matches ? 3.6 : 3.2,
    });
  } catch (err) {
    return;
  }
  if (!field) return;

  const TAU = Math.PI * 2;
  const KEYS = [
    { shape: 'sphere', range: ['#topo'],
      d: { anchor: '#hero-visual', ax: 0.56, ay: 0.5, r: 0.7, alpha: 1 },
      m: { anchor: '#topo', ax: 0.9, ay: 0.11, r: 0.5, alpha: 0.75 },
      rot: (t) => [0.28, t * 0.12, 0] },
    { shape: 'code', range: ['#servicos'],
      d: { anchor: '[data-fx="code"]', ax: 0.55, ay: 0.5, r: 0.36, alpha: 0.9 },
      m: { fixed: [0.8, 0.14], r: 0.18, alpha: 0.22 },
      rot: (t) => [Math.sin(t * 0.4) * 0.12, Math.sin(t * 0.6) * 0.45, 0] },
    { shape: 'galaxy', range: ['#processo'],
      d: { fixed: [0.5, 0.55], r: 0.3, alpha: 0.45 },
      m: { fixed: [0.5, 0.62], r: 0.5, alpha: 0.3 },
      rot: (t) => [1.15, t * 0.06, 0.3] },
    { shape: 'grid', range: ['#projetos', '#prototipos'], wave: 1,
      d: { fixed: [0.5, 0.8], r: 0.5, alpha: 0.55 },
      m: { fixed: [0.5, 0.82], r: 0.6, alpha: 0.38 },
      rot: () => [0.9, 0, 0] },
    { shape: 'cube', range: ['#stack'],
      d: { anchor: '[data-fx="cube"]', ax: 0.6, ay: 0.5, r: 0.42, alpha: 0.95 },
      m: { fixed: [0.92, 0.13], r: 0.2, alpha: 0.35 },
      rot: (t) => [0.5 + t * 0.21, t * 0.33, 0] },
    { shape: 'plane', range: ['footer'],
      d: { anchor: '#wordmark', ax: 0.52, ay: 0.3, r: 0.12, alpha: 1 },
      m: { anchor: '#wordmark', ax: 0.5, ay: 0.1, r: 0.28, alpha: 1 },
      rot: (t) => [0.25 + Math.sin(t * 0.9) * 0.05, 0.5 + Math.sin(t * 0.5) * 0.12, 0.35 + Math.sin(t * 0.9) * 0.08],
      bob: (t) => [Math.sin(t * 0.5) * 0.06, Math.sin(t * 1.1) * 0.05] },
  ];
  KEYS.forEach((k) => {
    k.els = k.range.map((sel) => $(sel));
    for (const c of [k.d, k.m]) if (c.anchor) c.el = $(c.anchor);
  });

  let ranges = [];
  // Posições dos elementos de referência em coordenadas da página: medidas no refresh, não a cada quadro
  const anchorBox = (c) => {
    if (!c.el) return;
    const r = c.el.getBoundingClientRect();
    c.box = r.width ? { left: r.left, top: r.top + window.scrollY, width: r.width, height: r.height } : null;
  };
  const measure = () => {
    const vh = window.innerHeight;
    const sy = window.scrollY;
    const max = document.documentElement.scrollHeight - vh;
    KEYS.forEach((k) => { anchorBox(k.d); anchorBox(k.m); });
    ranges = KEYS.map((k) => {
      const top = k.els[0].getBoundingClientRect().top + sy;
      const bottom = k.els[k.els.length - 1].getBoundingClientRect().bottom + sy;
      const a = Math.min(top - vh * 0.5, max - 2);
      return [a, Math.max(a, Math.min(bottom - vh * 0.8, max - 1))];
    });
    ranges[0][0] = -1e9;
    for (let i = 1; i < ranges.length; i++) {
      ranges[i][0] = Math.max(ranges[i][0], ranges[i - 1][1]);
      ranges[i][1] = Math.max(ranges[i][1], ranges[i][0]);
    }
  };
  const target = (y) => {
    for (let i = 0; i < ranges.length; i++) {
      const [a, b] = ranges[i];
      if (y < a) { const pb = ranges[i - 1][1]; return i - 1 + (y - pb) / Math.max(1, a - pb); }
      if (y <= b) return i;
    }
    return ranges.length - 1;
  };
  const place = (k, t) => {
    const c = small.matches ? k.m : k.d;
    const [vw, vh] = field.size();
    let px, py, base;
    if (c.box) {
      const r = c.box;
      px = r.left + r.width * c.ax; py = r.top - window.scrollY + r.height * c.ay; base = r.width;
    }
    if (base === undefined) {
      const f = c.fixed || [0.5, 0.5];
      px = vw * f[0]; py = vh * f[1]; base = Math.min(vw, vh * 1.5);
    }
    const [x, y] = field.toWorld(px, py);
    const bob = k.bob ? k.bob(t) : [0, 0];
    return { x: x + bob[0], y: y + bob[1], scale: field.pxToWorld(base * c.r), alpha: c.alpha, rot: k.rot(t), wave: k.wave || 0 };
  };

  measure();
  ScrollTrigger.addEventListener('refresh', measure);

  const mouse = { x: 0, y: 0, nx: 0, ny: 0, on: 0, want: 0 };
  if (finePointer) {
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      [mouse.x, mouse.y] = field.toWorld(e.clientX, e.clientY);
      mouse.nx = e.clientX / window.innerWidth - 0.5;
      mouse.ny = e.clientY / window.innerHeight - 0.5;
      mouse.want = 1;
    }, { passive: true });
    document.addEventListener('mouseleave', () => (mouse.want = 0));
  }

  let time = 0;
  let s = target(window.scrollY);
  // A forma da posição atual sai na hora; as outras são geradas uma por vez nos momentos ociosos
  field.ensure(KEYS[Math.round(s)].shape);
  const pending = field.shapes.slice();
  const prepNext = () => {
    const k = pending.shift();
    if (!k) return;
    field.ensure(k);
    if ('requestIdleCallback' in window) requestIdleCallback(prepNext, { timeout: 800 });
    else setTimeout(prepNext, 50);
  };
  setTimeout(prepNext, 400);
  const tilt = { x: 0, y: 0 };
  const intro = { v: 0 };
  gsap.to(intro, { v: 1, duration: 1.9, ease: 'power3.inOut' });
  window.addEventListener('pointerdown', (e) => field.ripple(e.clientX, e.clientY, time), { passive: true });
  canvas.classList.add('ready');

  const angle = (a, b, e) => a + ((((b - a + Math.PI) % TAU) + TAU) % TAU - Math.PI) * e;
  gsap.ticker.add((_, dt) => {
    const step = Math.min(dt, 64) / 1000;
    time += step;
    s += (target(window.scrollY) - s) * (1 - Math.exp(-step * 4.5));
    const i = Math.min(Math.floor(s), KEYS.length - 1);
    const j = Math.min(i + 1, KEYS.length - 1);
    let f = Math.min(1, Math.max(0, s - i));
    let from = KEYS[i].shape;
    let to = KEYS[j].shape;
    let A = place(KEYS[i], time);
    let B = j === i ? A : place(KEYS[j], time);
    if (intro.v < 1) {
      const k = KEYS[Math.round(s)];
      A = B = place(k, time);
      from = 'chaos'; to = k.shape; f = intro.v;
    }
    const e = intro.v < 1 ? 1 : f * f * (3 - 2 * f);
    const lerp = (a, b) => a + (b - a) * e;
    mouse.on += (mouse.want - mouse.on) * 0.06;
    tilt.x += (mouse.ny * 0.35 - tilt.x) * 0.04;
    tilt.y += (mouse.nx * 0.5 - tilt.y) * 0.04;
    field.draw({
      from, to, mix: f, time,
      x: lerp(A.x, B.x), y: lerp(A.y, B.y), scale: lerp(A.scale, B.scale), alpha: lerp(A.alpha, B.alpha),
      rx: angle(A.rot[0], B.rot[0], e) + tilt.x,
      ry: angle(A.rot[1], B.rot[1], e) + tilt.y,
      rz: angle(A.rot[2], B.rot[2], e),
      waveFrom: A.wave, waveTo: B.wave,
      mx: mouse.x, my: mouse.y, mouseOn: mouse.on,
    });
  });
}

// Detalhes: vídeo que sobe em 3D, rótulos decodificados, ferramentas caindo, carrossel e holofote do rodapé
function initExtras() {
  const small = window.innerWidth < 768;
  gsap.fromTo('#video-frame',
    { rotationX: small ? 10 : 18, scale: 0.88, y: 50, opacity: 0.35, transformPerspective: 1600, transformOrigin: '50% 100%' },
    { rotationX: 0, scale: 1, y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '#video', start: 'top bottom', end: 'top 25%', scrub: 0.6 } });

  const GLYPHS = '01<>/{}#$*+=_ABCDEFGHJKLMNPRSTUVWXYZ';
  $$('[data-scramble]').forEach((el) => {
    const final = el.textContent;
    el.setAttribute('aria-label', final);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const o = { p: 0 };
        gsap.to(o, {
          p: 1, duration: 0.9, ease: 'none',
          onUpdate: () => {
            const n = Math.floor(final.length * o.p);
            el.textContent = final.slice(0, n) + final.slice(n).replace(/[^\s·]/g, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]);
          },
          onComplete: () => (el.textContent = final),
        });
      },
    });
  });

  $$('#stack-grid > div').forEach((card) => {
    gsap.from($$('.chip', card), {
      y: -26, autoAlpha: 0, rotation: (k) => (k % 2 ? 9 : -9), stagger: 0.06, duration: 0.8, ease: 'back.out(2.4)',
      scrollTrigger: { trigger: card, start: 'top 85%' },
    });
  });

  // Abrir uma pergunta muda a altura da página: recalcula as posições depois que o acordeão termina de abrir
  let faqTimer = 0;
  $$('.faq-item').forEach((d) => d.addEventListener('toggle', () => { clearTimeout(faqTimer); faqTimer = setTimeout(() => ScrollTrigger.refresh(), 500); }));

  // Carrossel no celular: o cartão do centro fica em destaque
  const mq = window.matchMedia('(max-width: 767px)');
  $$('#projetos-grid, #prototipos-grid').forEach((rail) => {
    const cards = [...rail.children];
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!mq.matches) { cards.forEach((c) => { c.style.scale = ''; c.style.filter = ''; }); return; }
      const box = rail.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.min(1, Math.abs(r.left + r.width / 2 - mid) / r.width);
        c.style.scale = (1 - d * 0.07).toFixed(3);
        c.style.filter = `brightness(${(1 - d * 0.35).toFixed(3)})`;
      });
    };
    rail.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    mq.addEventListener('change', update);
    update();
  });

  // Holofote no nome do rodapé: segue a rolagem e, no desktop, o mouse
  const wm = $('#wordmark');
  if (wm) {
    const spot = { x: -400, y: 0 };
    const apply = () => { wm.style.setProperty('--wx', `${spot.x.toFixed(1)}px`); wm.style.setProperty('--wy', `${spot.y.toFixed(1)}px`); };
    const sx = gsap.quickTo(spot, 'x', { duration: 0.7, ease: 'power3.out', onUpdate: apply });
    const sy = gsap.quickTo(spot, 'y', { duration: 0.7, ease: 'power3.out', onUpdate: apply });
    let hovering = false;
    ScrollTrigger.create({
      trigger: 'footer', start: 'top bottom', end: 'bottom bottom',
      onUpdate: (self) => { if (!hovering) { sx((self.progress - 0.25) * wm.offsetWidth); sy(wm.offsetHeight * 0.45); } },
    });
    if (finePointer) {
      const foot = $('footer');
      foot.addEventListener('pointermove', (e) => { hovering = true; const r = wm.getBoundingClientRect(); sx(e.clientX - r.left); sy(e.clientY - r.top); });
      foot.addEventListener('pointerleave', () => (hovering = false));
    }
  }
}

// Cursor próprio: ponto preciso + anel que cresce em links e mostra rótulo em cartões
function initCursor() {
  const cur = $('.cursor');
  if (!cur) return;
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  const label = $('.cursor-label');
  document.documentElement.classList.add('has-cursor');
  cur.classList.add('is-hidden');
  const dx = gsap.quickSetter(dot, 'x', 'px');
  const dy = gsap.quickSetter(dot, 'y', 'px');
  const rx = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });
  let state = '';
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    cur.classList.remove('is-hidden');
    const el = e.target.closest('[data-cursor], a, button, summary');
    const text = el && el.dataset.cursor;
    const next = text ? 'label' : el ? 'link' : '';
    if (text && label.textContent !== text) label.textContent = text;
    if (next !== state) {
      state = next;
      cur.classList.toggle('is-label', next === 'label');
      cur.classList.toggle('is-link', next === 'link');
    }
  }, { passive: true });
  document.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
  window.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') gsap.fromTo(ring, { scale: 0.75 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
  });
}

// Inclinação 3D dos cartões acompanhando o mouse
function initTilt() {
  $$('[data-tilt]').forEach((el) => {
    gsap.set(el, { transformPerspective: 1000 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rx(-py * Math.min(8, 2400 / r.height));
      ry(px * Math.min(9, 3200 / r.width));
    });
    el.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
}

// Títulos das seções: SplitText precisa das fontes prontas para medir as linhas
function splitHeading(h) {
  const split = new SplitText(h, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
  gsap.from(split.lines, {
    yPercent: 105,
    duration: 1.1,
    ease: 'expo.out',
    stagger: 0.1,
    scrollTrigger: { trigger: h, start: 'top 85%' },
  });
}
