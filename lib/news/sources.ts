/**
 * Fontes de notícia por estado/cidade. Cada fonte vira uma aba no site e uma
 * busca no Google Notícias (RSS). A `query` é o termo pesquisado.
 *
 * Centralizar aqui facilita adicionar/remover locais depois (ou migrar para o
 * painel admin numa fase futura).
 */
export type NewsSource = {
  slug: string;
  /** Rótulo exibido na aba. */
  label: string;
  /** Termo de busca no Google Notícias. */
  query: string;
};

export const NEWS_SOURCES: NewsSource[] = [
  { slug: "ceara", label: "Ceará", query: "Ceará" },
  { slug: "parana", label: "Paraná", query: "Paraná" },
  { slug: "arapongas", label: "Arapongas", query: "Arapongas Paraná" },
  { slug: "sergipe", label: "Sergipe", query: "Sergipe" },
  { slug: "minas-gerais", label: "Minas Gerais", query: "Minas Gerais" },
  { slug: "rio-de-janeiro", label: "Rio de Janeiro", query: "Rio de Janeiro" },
  { slug: "piaui", label: "Piauí", query: "Piauí" },
];

export function getNewsSource(slug: string): NewsSource | undefined {
  return NEWS_SOURCES.find((s) => s.slug === slug);
}
