import type {
  NewsItem,
  Program,
  ScheduleEntry,
  Sponsor,
  Video,
  Weekday,
} from "./types";

/**
 * CONTEÚDO DE EXEMPLO (placeholder) — não é conteúdo real da TV.
 * Serve apenas para dar vida ao layout público. Substituído pelo CMS (Supabase)
 * em fases futuras. Os getters abaixo são o ponto único de acesso: ao conectar
 * o banco, só o corpo deles muda.
 */

export const WEEKDAYS: Weekday[] = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const PROGRAMS: Program[] = [
  {
    slug: "jornal-gazeta-manha",
    title: "Jornal Gazeta Manhã",
    description:
      "O resumo das principais notícias para começar o dia bem informado, com tempo, trânsito e serviço.",
    host: "Equipe de jornalismo",
    scheduleLabel: "Seg a Sex, 7h",
  },
  {
    slug: "gazeta-no-ar",
    title: "Gazeta no Ar",
    description:
      "Jornalismo ao vivo com entradas de repórteres externos, entrevistas e cobertura em tempo real.",
    host: "Redação Gazeta",
    scheduleLabel: "Seg a Sex, 12h",
  },
  {
    slug: "conexao-estados",
    title: "Conexão Estados",
    description:
      "Notícias que atravessam fronteiras: integração entre os estados, economia regional e cidadania.",
    host: "Correspondentes",
    scheduleLabel: "Seg, Qua e Sex, 20h",
  },
  {
    slug: "gazeta-esporte",
    title: "Gazeta Esporte",
    description:
      "Tudo sobre o esporte local e nacional, com análises, resultados e bastidores.",
    host: "Mesa de esportes",
    scheduleLabel: "Sáb, 10h",
  },
  {
    slug: "cultura-sem-fronteiras",
    title: "Cultura sem Fronteiras",
    description:
      "Agenda cultural, música, cinema e os artistas que movimentam a cena dos estados.",
    host: "Núcleo de cultura",
    scheduleLabel: "Dom, 19h",
  },
];

const NEWS: NewsItem[] = [
  {
    slug: "integracao-regional-avanca-entre-estados",
    title: "Integração regional avança com novos acordos entre estados",
    excerpt:
      "Governos anunciam medidas conjuntas para transporte, saúde e economia nas divisas.",
    category: "Política",
    author: "Redação Gazeta",
    publishedLabel: "30 out 2025, 14:20",
    featured: true,
    body: [
      "Representantes de diferentes estados se reuniram nesta semana para firmar novos acordos de cooperação em áreas estratégicas, com foco em transporte, saúde e desenvolvimento econômico nas regiões de divisa.",
      "Entre as medidas anunciadas estão a ampliação de linhas intermunicipais, a integração de sistemas de atendimento em saúde e incentivos para pequenos negócios que atuam entre fronteiras estaduais.",
      "Segundo os organizadores, o objetivo é reduzir a burocracia e aproximar serviços públicos da população que vive e circula entre os estados.",
    ],
  },
  {
    slug: "economia-regional-cresce-no-trimestre",
    title: "Economia regional cresce acima da média no trimestre",
    excerpt:
      "Setores de serviços e comércio puxam resultado positivo; indústria se mantém estável.",
    category: "Economia",
    author: "Caderno de Economia",
    publishedLabel: "30 out 2025, 11:05",
    body: [
      "Os indicadores do último trimestre apontam crescimento acima da média nacional, impulsionado principalmente pelos setores de serviços e comércio.",
      "Especialistas destacam a geração de empregos e o aumento do consumo das famílias como fatores centrais para o desempenho.",
    ],
  },
  {
    slug: "mutirao-de-saude-atende-milhares",
    title: "Mutirão de saúde atende milhares em fim de semana",
    excerpt:
      "Ação ofereceu consultas, exames e vacinação em diversos municípios.",
    category: "Cidades",
    author: "Editoria de Cidades",
    publishedLabel: "29 out 2025, 18:40",
    body: [
      "Um grande mutirão de saúde percorreu municípios da região no fim de semana, oferecendo consultas, exames e vacinação gratuitos à população.",
      "A organização estima que milhares de pessoas foram atendidas, com prioridade para idosos e famílias em situação de vulnerabilidade.",
    ],
  },
  {
    slug: "festival-cultural-movimenta-cidades",
    title: "Festival cultural movimenta cidades com shows e feiras",
    excerpt:
      "Programação gratuita reúne música, gastronomia e artesanato regional.",
    category: "Cultura",
    author: "Cultura sem Fronteiras",
    publishedLabel: "29 out 2025, 09:15",
    body: [
      "O festival cultural deste mês levou música, gastronomia e artesanato a praças e centros culturais, com entrada gratuita.",
      "A iniciativa valoriza artistas locais e aquece o turismo e o comércio nas cidades participantes.",
    ],
  },
  {
    slug: "time-regional-garante-vaga-na-final",
    title: "Time regional garante vaga na final após vitória",
    excerpt:
      "Classificação veio nos minutos finais, diante da torcida lotada.",
    category: "Esportes",
    author: "Gazeta Esporte",
    publishedLabel: "28 out 2025, 22:30",
    body: [
      "Em uma partida decidida nos minutos finais, o time regional garantiu vaga na final diante de uma torcida lotada.",
      "A comissão técnica celebrou o resultado e projetou a decisão como uma das mais aguardadas da temporada.",
    ],
  },
  {
    slug: "obras-de-mobilidade-entram-em-nova-fase",
    title: "Obras de mobilidade urbana entram em nova fase",
    excerpt:
      "Intervenções prometem reduzir o tempo de deslocamento nos próximos meses.",
    category: "Cidades",
    author: "Editoria de Cidades",
    publishedLabel: "28 out 2025, 16:10",
    body: [
      "As obras de mobilidade urbana avançaram para uma nova etapa, com foco em corredores viários e requalificação de vias.",
      "A expectativa dos órgãos responsáveis é reduzir o tempo médio de deslocamento ao longo dos próximos meses.",
    ],
  },
  {
    slug: "brasil-debate-novas-politicas-publicas",
    title: "Brasil debate novas políticas públicas para o interior",
    excerpt:
      "Pauta inclui conectividade, educação e apoio à agricultura familiar.",
    category: "Brasil",
    author: "Conexão Estados",
    publishedLabel: "27 out 2025, 13:00",
    body: [
      "Um conjunto de propostas voltadas ao interior do país entrou em debate, abordando conectividade, educação e apoio à agricultura familiar.",
      "O tema ganha relevância diante da necessidade de reduzir desigualdades entre grandes centros e regiões afastadas.",
    ],
  },
];

const SCHEDULE: ScheduleEntry[] = [
  // Segunda a sexta (grade base)
  ...(["Segunda", "Terça", "Quarta", "Quinta", "Sexta"] as Weekday[]).flatMap(
    (weekday): ScheduleEntry[] => [
      { weekday, start: "07:00", end: "09:00", title: "Jornal Gazeta Manhã", programSlug: "jornal-gazeta-manha", live: true },
      { weekday, start: "09:00", end: "12:00", title: "Gazeta Documentários" },
      { weekday, start: "12:00", end: "14:00", title: "Gazeta no Ar", programSlug: "gazeta-no-ar", live: true },
      { weekday, start: "14:00", end: "20:00", title: "Reprises e Especiais" },
      { weekday, start: "20:00", end: "21:30", title: "Conexão Estados", programSlug: "conexao-estados", live: true },
      { weekday, start: "21:30", end: "07:00", title: "Programação da Madrugada" },
    ],
  ),
  // Sábado
  { weekday: "Sábado", start: "10:00", end: "12:00", title: "Gazeta Esporte", programSlug: "gazeta-esporte", live: true },
  { weekday: "Sábado", start: "12:00", end: "19:00", title: "Especiais de Fim de Semana" },
  { weekday: "Sábado", start: "19:00", end: "07:00", title: "Cinema Gazeta" },
  // Domingo
  { weekday: "Domingo", start: "10:00", end: "19:00", title: "Especiais de Fim de Semana" },
  { weekday: "Domingo", start: "19:00", end: "20:30", title: "Cultura sem Fronteiras", programSlug: "cultura-sem-fronteiras", live: true },
  { weekday: "Domingo", start: "20:30", end: "07:00", title: "Cinema Gazeta" },
];

const VIDEOS: Video[] = [
  {
    slug: "gazeta-no-ar-melhores-momentos",
    title: "Gazeta no Ar — melhores momentos do programa",
    description:
      "Um compilado das principais entrevistas e coberturas ao vivo da semana.",
    durationLabel: "18:42",
    programSlug: "gazeta-no-ar",
    publishedLabel: "29 out 2025",
  },
  {
    slug: "conexao-estados-integracao-regional",
    title: "Conexão Estados — o avanço da integração regional",
    description:
      "Reportagem especial sobre os acordos entre estados e seus impactos.",
    durationLabel: "22:10",
    programSlug: "conexao-estados",
    publishedLabel: "28 out 2025",
  },
  {
    slug: "gazeta-esporte-rodada-completa",
    title: "Gazeta Esporte — análise da rodada completa",
    description: "Resultados, lances e os bastidores do esporte regional.",
    durationLabel: "15:05",
    programSlug: "gazeta-esporte",
    publishedLabel: "27 out 2025",
  },
  {
    slug: "cultura-sem-fronteiras-festival",
    title: "Cultura sem Fronteiras — cobertura do festival",
    description: "Música, gastronomia e arte na cobertura completa do festival.",
    durationLabel: "27:33",
    programSlug: "cultura-sem-fronteiras",
    publishedLabel: "26 out 2025",
  },
  {
    slug: "jornal-gazeta-manha-edicao-destaque",
    title: "Jornal Gazeta Manhã — edição de destaque",
    description: "A edição completa com as principais manchetes do dia.",
    durationLabel: "41:58",
    programSlug: "jornal-gazeta-manha",
    publishedLabel: "25 out 2025",
  },
  {
    slug: "especial-mobilidade-urbana",
    title: "Especial: mobilidade urbana em pauta",
    description: "Documentário sobre as obras e o futuro do transporte na região.",
    durationLabel: "33:20",
    publishedLabel: "24 out 2025",
  },
];

const SPONSORS: Sponsor[] = [
  { name: "Banco Regional", tier: "Ouro", url: "#" },
  { name: "Supermercados União", tier: "Ouro", url: "#" },
  { name: "Construtora Horizonte", tier: "Prata", url: "#" },
  { name: "Faculdade Integração", tier: "Prata", url: "#" },
  { name: "Auto Peças Estrada", tier: "Bronze", url: "#" },
  { name: "Farmácia Saúde+", tier: "Bronze", url: "#" },
  { name: "Padaria Pão Nosso", tier: "Apoio", url: "#" },
  { name: "Ótica Visão", tier: "Apoio", url: "#" },
];

// ── Getters (ponto único de acesso) ─────────────────────────────────────────
export function getPrograms(): Program[] {
  return PROGRAMS;
}
export function getProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}
export function getNews(): NewsItem[] {
  return NEWS;
}
export function getFeaturedNews(): NewsItem {
  return NEWS.find((n) => n.featured) ?? NEWS[0];
}
export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS.find((n) => n.slug === slug);
}
export function getSchedule(): ScheduleEntry[] {
  return SCHEDULE;
}
export function getScheduleByDay(weekday: Weekday): ScheduleEntry[] {
  return SCHEDULE.filter((e) => e.weekday === weekday);
}
export function getVideos(): Video[] {
  return VIDEOS;
}
export function getVideoBySlug(slug: string): Video | undefined {
  return VIDEOS.find((v) => v.slug === slug);
}
export function getSponsors(): Sponsor[] {
  return SPONSORS;
}
