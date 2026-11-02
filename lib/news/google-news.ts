import { XMLParser } from "fast-xml-parser";
import { relativeTime } from "./time";
import type { NewsSource } from "./sources";
import type { NewsFeedItem } from "./types";

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

/** Revalidação do cache (segundos). O conteúdo atualiza a cada ~15 min. */
const REVALIDATE_SECONDS = 900;

function toArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function textOf(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "#text" in value) {
    return String((value as { "#text": unknown })["#text"] ?? "");
  }
  return "";
}

/** Remove o sufixo " - Veículo" que o Google Notícias costuma anexar ao título. */
function cleanTitle(title: string, source: string): string {
  if (source && title.endsWith(` - ${source}`)) {
    return title.slice(0, -(source.length + 3)).trim();
  }
  const idx = title.lastIndexOf(" - ");
  if (idx > 20) return title.slice(0, idx).trim();
  return title.trim();
}

function buildUrl(query: string): string {
  const q = encodeURIComponent(query);
  return `https://news.google.com/rss/search?q=${q}&hl=pt-BR&gl=BR&ceid=BR:pt`;
}

/**
 * Busca as manchetes de uma fonte (estado/cidade) no Google Notícias.
 * Nunca lança: em caso de falha de rede/parse, retorna lista vazia (mantém o
 * build e a página saudáveis mesmo offline).
 */
export async function fetchStateNews(
  source: NewsSource,
  limit = 12,
): Promise<NewsFeedItem[]> {
  try {
    const res = await fetch(buildUrl(source.query), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TVGazetaNews/1.0)" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const data = parser.parse(xml);
    const rawItems = toArray(data?.rss?.channel?.item).slice(0, limit);

    return rawItems.map((item: Record<string, unknown>): NewsFeedItem => {
      const sourceName = textOf(item.source) || "Google Notícias";
      const rawTitle = textOf(item.title);
      const publishedAt = item.pubDate
        ? new Date(String(item.pubDate)).toISOString()
        : null;
      return {
        title: cleanTitle(rawTitle, sourceName),
        link: textOf(item.link) || String(item.link ?? ""),
        source: sourceName,
        publishedAt,
        publishedLabel: relativeTime(publishedAt),
      };
    });
  } catch {
    return [];
  }
}
