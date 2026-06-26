# Portfólio — Matheus Rocha · Desenvolvimento Web

Site de uma página (one-pager) para captar clientes de desenvolvimento web,
com o case da Wesen Clínica em destaque. Mesmo stack que você vende aos clientes.

**Stack:** React 19 + Vite 7 + Tailwind v4 + Motion (Framer Motion) + TypeScript
**Fontes:** Instrument Serif (display) · Plus Jakarta Sans (corpo) · JetBrains Mono (rótulos)

## Rodar localmente

```bash
pnpm install      # primeira vez
pnpm dev          # http://localhost:5173
pnpm build        # gera a pasta dist/ pronta pra publicar
pnpm preview      # testa o build de produção
```

## O que editar (sem mexer no design)

Quase tudo de texto/contato vive em **`src/lib/data.ts`**. Os campos mais importantes:

| Onde | O quê |
|---|---|
| `CONTACT.instagram` | Seu @ real do Instagram (hoje é um placeholder) |
| `CONTACT.email` | E-mail de contato exibido |
| `CONTACT.whatsapp` | Número com DDI+DDD, só dígitos (já preenchido) |
| `WESEN.liveUrl` | URL do site da Wesen — ao preencher, aparece o botão "Ver o site no ar" |
| `TESTIMONIAL` | **Placeholder.** Troque pelo depoimento real da cliente quando aprovado — não publique fictício. |

As seções (serviços, diferenciais, processo) também são arrays em `data.ts`.

## Publicar (Hostinger ou similar)

1. `pnpm build`
2. Suba o conteúdo da pasta `dist/` para a hospedagem (ou conecte o repositório
   na Vercel/Netlify, que rodam o build automático).
3. Aponte seu domínio e atualize o link da bio do Instagram para ele.

## Estrutura

```
src/
  components/   # Hero, Services, CaseWesen, Process, etc.
  lib/
    data.ts     # TODO o conteúdo editável
    utils.ts    # cn() (clsx + tailwind-merge)
  index.css     # design tokens (@theme) — paleta e fontes
```
