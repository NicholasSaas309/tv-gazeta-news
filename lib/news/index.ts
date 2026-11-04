import { fetchGoogleNews } from "./google-news";
import { fetchG1News } from "./g1";
import { NEWS_SOURCES, getNewsSource, type NewsSource } from "./sources";
import type { NewsFeedItem, StateFeed } from "./types";

export type { NewsFeedItem, StateFeed } from "./types";
export { NEWS_SOURCES } from "./sources";
export { faviconFor } from "./og-image";

/** Busca as notícias de uma fonte, escolhendo o leitor conforme o tipo. */
function fetchSource(source: NewsSource, limit: number): Promise<NewsFeedItem[]> {
  return source.kind === "g1"
    ? fetchG1News(source, limit)
    : fetchGoogleNews(source, limit);
}

/** Busca as manchetes de todos os estados/cidades em paralelo. */
export async function getAllStateFeeds(limit = 12): Promise<StateFeed[]> {
  const feeds = await Promise.all(
    NEWS_SOURCES.map(async (source): Promise<StateFeed> => ({
      slug: source.slug,
      label: source.label,
      items: await fetchSource(source, limit),
    })),
  );
  return feeds;
}

/** Manchetes de um estado/cidade específico. */
export async function getStateFeed(
  slug: string,
  limit = 12,
): Promise<StateFeed | null> {
  const source = getNewsSource(slug);
  if (!source) return null;
  return { slug: source.slug, label: source.label, items: await fetchSource(source, limit) };
}

/** Lista única com as mais recentes de todas as fontes (ordenada por data). */
export function mergeRecent(feeds: StateFeed[], limit = 10): NewsFeedItem[] {
  const all = feeds.flatMap((f) => f.items);
  return all
    .slice()
    .sort((a, b) => {
      const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return tb - ta;
    })
    .slice(0, limit);
}
