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
    titulo: 'CRM Kamino',
    tipo: 'Sistema em produção',
    descricao: 'CRM com automações, bots de conversa 24h e agentes de IA, com rastreabilidade do lead até a venda.',
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
    titulo: 'EasyJur',
    tipo: 'Landing page',
    descricao: 'Landing page de conversão do EasyJur Work, operação de Legal Ops para escritórios de advocacia.',
    stack: 'React · TypeScript · Tailwind',
    img: 'assets/projetos/easyjur.webp',
    demo: 'https://rochamaatheus.github.io/easyjur-landing/',
    repo: 'https://github.com/rochamaatheus/easyjur-landing',
    span: 'md:col-span-2',
  },
  {
    titulo: 'LIDERARH Check',
    tipo: 'Protótipo de app',
    descricao: 'App de check-in emocional e riscos psicossociais (NR-01), com visões de colaborador, líder e RH.',
    stack: 'HTML · Tailwind · jQuery',
    img: 'assets/projetos/liderarh.webp',
    demo: 'https://rochamaatheus.github.io/liderarh-check-prototipo/',
    repo: 'https://github.com/rochamaatheus/liderarh-check-prototipo',
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
    titulo: 'EVDL Escola de Vôlei',
    tipo: 'Wireframe de sistema',
    descricao: 'Sistema de planejamento, horas realizadas e custos dos professores de uma escola de vôlei.',
    stack: 'HTML · CSS · JS',
    img: 'assets/projetos/evdl.webp',
    demo: 'https://rochamaatheus.github.io/evdl-escola-de-volei/',
    repo: 'https://github.com/rochamaatheus/evdl-escola-de-volei',
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
    span: 'lg:col-span-2',
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
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const hasGsap = typeof window.gsap !== 'undefined';
if (!hasGsap) document.documentElement.classList.remove('js');

function projectCard(p) {
  return `
    <article data-reveal class="spot lift group w-[84%] shrink-0 snap-center overflow-hidden rounded-3xl border border-line bg-card md:w-auto ${p.span}">
      <a href="${p.url}" target="_blank" rel="noopener" class="block" aria-label="Abrir ${p.titulo} em nova aba">
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
          <p class="mt-3 text-[15px] leading-relaxed text-dim">${p.descricao}</p>
          <div class="mt-5 flex flex-wrap gap-2">${p.tags.map((t) => `<span class="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-dim">${t}</span>`).join('')}</div>
        </div>
      </a>
    </article>`;
}

function prototypeCard(p) {
  return `
    <article data-reveal class="spot lift group flex w-[78%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-line bg-card md:w-auto ${p.span || ''}">
      <button type="button" data-demo="${p.demo}" data-title="${p.titulo}" class="block w-full text-left" aria-label="Abrir demonstração de ${p.titulo}">
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
      <div class="mt-5 flex flex-wrap gap-2">${s.itens.map((i) => `<span class="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[13px] text-dim transition-colors hover:border-violet-400/60 hover:text-ink">${i}</span>`).join('')}</div>
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
  codeEl.innerHTML = html;
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
  document.body.style.overflow = 'hidden';
  if (window.lenisInstance) lenisInstance.stop();
  setTimeout(() => $('[data-close]', modal).focus(), 60);
}
function closeDemo() {
  modal.classList.remove('active');
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
  fab.classList.toggle('hide', y < 400 || contato.top < window.innerHeight * 0.6);
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
  renderCode(totalChars);
  $$('[data-count]').forEach((el) => (el.textContent = el.dataset.count));
  $('.process-line').style.transform = 'none';
} else {
  initMotion();
}

function initMotion() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Rolagem suave só em desktop com mouse; no touch fica o scroll nativo
  if (finePointer && window.Lenis) {
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    window.lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });

  document.fonts.ready.then(() => {
    // Hero: título palavra a palavra, depois o resto
    const title = new SplitText('#hero-title', { type: 'lines,words', linesClass: 'split-line' });
    // Palavra animada perde o background-clip do pai, então o gradiente vai para cada palavra
    $$('#hero-title .gradient-text').forEach((g) => {
      g.classList.remove('gradient-text');
      $$('div', g).forEach((w) => w.classList.add('gradient-text'));
    });
    const typing = { n: 0 };
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from(title.words, { yPercent: 110, opacity: 0, rotate: 4, duration: 1.1, stagger: 0.05 })
      .from('[data-hero]', { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, '-=0.8')
      .from('[data-hero-card]', { y: 40, opacity: 0, scale: 0.94, duration: 1.2, stagger: 0.12 }, '-=0.9')
      .to(typing, { n: totalChars, duration: 2.6, ease: 'none', onUpdate: () => renderCode(Math.round(typing.n)) }, '-=0.9');

    // Títulos das seções: linhas sobem por trás de uma máscara
    $$('[data-split]').forEach((h) => {
      const split = new SplitText(h, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
      gsap.from(split.lines, {
        yPercent: 105,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: h, start: 'top 85%' },
      });
    });
    ScrollTrigger.refresh();
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

  // Processo: a linha se desenha conforme a rolagem
  const vertical = window.innerWidth < 768;
  gsap.fromTo('.process-line',
    { scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 },
    { scaleX: 1, scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#process', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 } });
  gsap.from('[data-step]', {
    opacity: 0, y: 30, duration: 0.9, ease: 'expo.out', stagger: 0.15,
    scrollTrigger: { trigger: '#process', start: 'top 80%' },
  });

  // Marquee contínuo que acelera com a velocidade da rolagem
  const half = track.scrollWidth / 2;
  let x = 0;
  let boost = 0;
  ScrollTrigger.create({ onUpdate: (self) => (boost = Math.min(Math.abs(self.getVelocity()) / 120, 14)) });
  gsap.ticker.add((_, dt) => {
    boost *= 0.92;
    x -= (0.6 + boost) * (dt / 16.7);
    if (x <= -half) x += half;
    track.style.transform = `translate3d(${x}px,0,0)`;
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
