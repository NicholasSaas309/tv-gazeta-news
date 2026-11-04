/**
 * Fontes de notícia por estado/cidade.
 *
 * - kind "g1": feed RSS regional do G1 (traz imagem real de capa no feed).
 * - kind "google": busca no Google Notícias (texto + logo da fonte), usada
 *   onde não há feed regional dedicado (ex.: cidade de Arapongas).
 *
 * Centralizar aqui facilita adicionar/remover locais depois.
 */
export type NewsSource =
  | { slug: string; label: string; kind: "g1"; feedUrl: string }
  | { slug: string; label: string; kind: "google"; query: string };

export const NEWS_SOURCES: NewsSource[] = [
  { slug: "ceara", label: "Ceará", kind: "g1", feedUrl: "https://g1.globo.com/rss/g1/ceara/" },
  { slug: "parana", label: "Paraná", kind: "g1", feedUrl: "https://g1.globo.com/rss/g1/pr/parana/" },
  { slug: "arapongas", label: "Arapongas", kind: "google", query: "Arapongas Paraná" },
  { slug: "sergipe", label: "Sergipe", kind: "g1", feedUrl: "https://g1.globo.com/rss/g1/se/sergipe/" },
  { slug: "minas-gerais", label: "Minas Gerais", kind: "g1", feedUrl: "https://g1.globo.com/rss/g1/minas-gerais/" },
  { slug: "rio-de-janeiro", label: "Rio de Janeiro", kind: "g1", feedUrl: "https://g1.globo.com/rss/g1/rio-de-janeiro/" },
  { slug: "piaui", label: "Piauí", kind: "g1", feedUrl: "https://g1.globo.com/rss/g1/pi/piaui/" },
];

export function getNewsSource(slug: string): NewsSource | undefined {
  return NEWS_SOURCES.find((s) => s.slug === slug);
}
