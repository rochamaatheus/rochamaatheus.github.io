# rochamaatheus.github.io

Portfólio de **Matheus Rocha**, desenvolvedor full-stack em Joinville, SC.
Sites, sistemas e atendimento com IA feitos sob medida.

**No ar:** https://rochamaatheus.github.io

## Stack

- HTML estático, sem framework, publicado no GitHub Pages a cada push na `main` (`.github/workflows/deploy.yml`)
- Tailwind CSS 3 pré-compilado em `assets/css/site.css` (fonte em `src/site.css`)
- GSAP + ScrollTrigger + SplitText para as animações, Lenis para a rolagem suave no desktop
- Ícones: subconjunto do Lucide gerado em `assets/js/icons.js`
- Tipografia: Geist, Geist Mono e Instrument Serif

## Estrutura

```
index.html            página única
assets/css/site.css   CSS compilado (não editar à mão)
assets/js/site.js     dados dos projetos e todas as interações
assets/js/icons.js    ícones usados no site
assets/projetos/      prints dos projetos (WebP)
assets/video/         vídeo de apresentação
src/site.css          fonte do CSS (Tailwind + componentes)
video/                ferramentas: prints, revisão visual e render do vídeo
```

## Editando

Projetos, protótipos e stack ficam em arrays no topo de `assets/js/site.js`.

Depois de mudar classes no HTML ou no JS, recompile o CSS:

```bash
npx tailwindcss@3.4.17 -i src/site.css -o assets/css/site.css --minify
```

Se usar um ícone novo (`<i data-lucide="nome">`), regenere o subconjunto:

```bash
cd video && node build-icons.cjs
```

Servidor local: `python -m http.server 5510` e abra http://localhost:5510

## Vídeo de apresentação

Feito em código, frame a frame, dentro de `video/`:

- `scene.html` + `scene.js`: animação em GSAP com timeline determinística (`?f=desktop` ou `?f=mobile`)
- `render.mjs`: captura cada frame com Playwright (60 fps, em paralelo)
- `analyze.py` e `occupancy.py`: checam saltos entre frames, trechos parados, ocupação da tela e zonas seguras do Reels
- `audio.py`: trilha e efeitos sonoros sintetizados do zero, sincronizados pelos eventos da timeline
- `encode.py`: gera os MP4 (volume normalizado em -14 LUFS)

```bash
cd video && npm i && npx playwright install chromium && node build-icons.cjs
node render.mjs desktop full 60 8 && node render.mjs desktop cues
python audio.py desktop && python encode.py desktop
```

Legendas e textos do anúncio: `video/anuncio-instagram.md`.
