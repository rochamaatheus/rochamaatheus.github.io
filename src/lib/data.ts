// ─────────────────────────────────────────────────────────────────────────
//  CONTEÚDO DO SITE — edite aqui para atualizar textos, contatos e o case.
//  Os campos marcados com  ← EDITE  são os que você troca com mais frequência.
// ─────────────────────────────────────────────────────────────────────────

export const CONTACT = {
  name: "Matheus Rocha",
  role: "Desenvolvimento Web",
  city: "Joinville, SC",
  phone: "(47) 9 9965-3593",
  whatsapp: "5547999653593", // só dígitos, com DDI 55 + DDD
  instagram: "matheusrocha.dev", // ← EDITE com o seu @ real (sem o @)
  email: "gestor.agenciakamino@gmail.com", // ← EDITE se quiser outro e-mail de contato
};

export function waLink(
  message = "Olá Matheus! Vi o seu portfólio e quero conversar sobre um site.",
) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const SERVICES = [
  {
    title: "Página para Captar Clientes",
    blurb:
      "Página única, focada em transformar quem chega do Instagram em contato ou agendamento direto pelo WhatsApp.",
    points: ["Estrutura que convence", "Botão de WhatsApp sempre à mão", "Pronta para o Google"],
  },
  {
    title: "Site Institucional",
    blurb:
      "Presença online completa para apresentar seus serviços, equipe e diferenciais — sem pagar mensalidade de plataforma.",
    points: ["Várias seções sob medida", "Identidade fiel à sua marca", "Rápido em qualquer celular"],
  },
  {
    title: "Link da Bio com a Sua Cara",
    blurb:
      "Substitua o link genérico da bio do Instagram por uma página no seu domínio, com a sua identidade visual. Incluso sem custo extra em qualquer projeto.",
    points: ["100% na sua identidade", "Sem branding de terceiro", "No seu próprio domínio"],
  },
];

export const DIFFERENTIATORS = [
  {
    icon: "gauge",
    title: "3 a 5× mais rápido",
    desc: "Site feito do zero carrega muito antes que plataformas genéricas. Melhor experiência no celular e melhor ranqueamento no Google.",
  },
  {
    icon: "shield",
    title: "Sem plugins que quebram",
    desc: "Nada de atualizações forçadas nem vulnerabilidades de plataforma. O site fica de pé sem manutenção constante.",
  },
  {
    icon: "sparkles",
    title: "Design sob medida",
    desc: "Sem as amarras de template. Cada detalhe — paleta, tipografia, ritmo — reflete a identidade do seu negócio.",
  },
  {
    icon: "key",
    title: "O ativo é seu",
    desc: "O código e o domínio pertencem a você. Sem dependência de plataforma — o site fica disponível enquanto você quiser.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Briefing e alinhamento",
    desc: "Coleta de fotos, depoimentos reais, contatos e definição do texto final. Tudo começa entendendo o seu negócio.",
  },
  {
    step: "02",
    title: "Aprovação do design",
    desc: "Apresento direções visuais para você escolher a cara do site antes de uma linha de código entrar em produção.",
  },
  {
    step: "03",
    title: "Desenvolvimento",
    desc: "Construção da versão aprovada em código próprio, com os seus conteúdos reais no lugar dos placeholders.",
  },
  {
    step: "04",
    title: "Revisão e ajustes",
    desc: "Você navega no site funcional e pedimos os ajustes finais. Até 2 rodadas inclusas, sem custo adicional.",
  },
  {
    step: "05",
    title: "Publicação e entrega",
    desc: "Deploy no seu domínio, atualização do bio-link do Instagram e entrega do código-fonte completo.",
  },
];

// ── Case em destaque ──────────────────────────────────────────────────────
export const WESEN = {
  client: "Wesen Clínica",
  tagline: "Medicina de Família e Comunidade",
  segment: "Saúde · Joinville · 2026",
  liveUrl: "", // ← EDITE com a URL do site quando estiver no ar (deixe "" para esconder o botão)
  challenge:
    "Uma clínica com identidade visual forte e conteúdo de qualidade, mas presa a um Linktree genérico como único elo entre o Instagram e o agendamento — invisível no Google e sem uma página que apresentasse os serviços com profundidade.",
  solution:
    "Um site completo de 8 seções, desenhado para converter visitantes em pacientes agendados, mais um bio-link 100% na identidade da clínica substituindo o Linktree.",
  deliverables: [
    "Site completo de 8 seções estratégicas",
    "Linktree customizado no mesmo domínio",
    "Design fiel à paleta e tipografia da marca",
    "Mobile-first (80%+ dos acessos no celular)",
    "Botão de WhatsApp flutuante para agendamento",
    "Configurado para aparecer no Google (SEO)",
  ],
  // A tabela de diagnóstico — a peça-assinatura, vinda direto da proposta.
  beforeAfter: [
    { area: "Site próprio", before: "Inexistente", after: "Site completo com 8 seções" },
    { area: "Linktree", before: "Plataforma genérica", after: "Página própria com a marca" },
    { area: "Conversão", before: "Instagram → WhatsApp sem contexto", after: "Instagram → site → WhatsApp" },
    { area: "Google", before: "Invisível nas buscas", after: "Página indexável e otimizada" },
    { area: "Propriedade", before: "Refém de plataformas", after: "Código e domínio da clínica" },
  ],
};

// ── Depoimento ────────────────────────────────────────────────────────────
// IMPORTANTE: este é um PLACEHOLDER. Substitua pelo depoimento real assim que
// a cliente aprovar — não publique um depoimento fictício.
export const TESTIMONIAL = {
  isPlaceholder: true,
  quote:
    "[ Depoimento da cliente entra aqui assim que aprovado. Peça uma frase curta sobre o resultado: agendamentos, profissionalismo da entrega ou a diferença de ter um site próprio. ]",
  author: "Dra. Letícia",
  role: "Wesen Clínica",
};

// { client, segment, type: "site"|"lp"|"bio-link", desc, tags: string[], liveUrl: string }
export const PROJECTS = [
  {
    client: "Wesen Clínica",
    segment: "Medicina de Família · Joinville",
    type: "site" as const,
    desc: "Site completo de 8 seções para uma clínica de medicina de família — do Instagram direto ao agendamento, com identidade visual própria.",
    tags: ["Site", "Saúde"],
    liveUrl: "", // ← cole a URL quando o site estiver publicado
  },
  {
    client: "Dra. Fabiana",
    segment: "Cirurgia Reparadora · Joinville",
    type: "lp" as const,
    desc: "Página focada em esclarecer e converter pacientes que buscam cirurgia reparadora pós-bariátrica negada pelo plano de saúde.",
    tags: ["Página", "Saúde"],
    liveUrl: "",
  },
  {
    client: "Giba Klein",
    segment: "Educação · Marcenaria",
    type: "lp" as const,
    desc: "Página de inscrição para imersão presencial voltada a marceneiros e lojistas — com estrutura de autoridade e prova social.",
    tags: ["Página", "Evento"],
    liveUrl: "",
  },
  {
    client: "Bem Estar Bucal",
    segment: "Odontologia · Joinville",
    type: "lp" as const,
    desc: "Páginas focadas em tratamentos específicos — lentes, facetas e implantes — para converter visitantes do Instagram em consultas.",
    tags: ["Página", "Saúde"],
    liveUrl: "",
  },
  {
    client: "De Mattia Advogados",
    segment: "Advocacia · Joinville",
    type: "site" as const,
    desc: "Conceito de redesign para escritório de advocacia — identidade visual premium que transmite confiança e experiência.",
    tags: ["Site", "Jurídico"],
    liveUrl: "",
  },
];
