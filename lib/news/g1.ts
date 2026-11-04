import { XMLParser } from "fast-xml-parser";
import { relativeTime } from "./time";
import type { NewsFeedItem } from "./types";

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
const REVALIDATE_SECONDS = 900;

function toArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

/** Extrai a imagem de capa do item (media:content, media:thumbnail, enclosure ou <img> na descrição). */
function imageOf(item: Record<string, unknown>): string | null {
  const media = toArray(item["media:content"])[0] as Record<string, unknown> | undefined;
  if (media?.["@_url"]) return String(media["@_url"]);

  const thumb = toArray(item["media:thumbnail"])[0] as Record<string, unknown> | undefined;
  if (thumb?.["@_url"]) return String(thumb["@_url"]);

  const enclosure = item.enclosure as Record<string, unknown> | undefined;
  if (enclosure?.["@_url"]) return String(enclosure["@_url"]);

  const desc = typeof item.description === "string" ? item.description : "";
  const m = desc.match(/<img[^>]+src="([^"]+)"/i);
  return m ? m[1] : null;
}

/**
 * Busca as notícias de um feed regional do G1 (com imagem de capa real).
 * Nunca lança: em falha, retorna lista vazia.
 */
export async function fetchG1News(
  source: { feedUrl: string },
  limit = 12,
): Promise<NewsFeedItem[]> {
  try {
    const res = await fetch(source.feedUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TVGazetaNews/1.0)" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const data = parser.parse(xml);
    const items = toArray(data?.rss?.channel?.item).slice(0, limit);

    return items.map((item: Record<string, unknown>): NewsFeedItem => {
      const publishedAt = item.pubDate
        ? new Date(String(item.pubDate)).toISOString()
        : null;
      return {
        title: String(item.title ?? "").trim(),
        link: String(item.link ?? ""),
        source: "G1",
        sourceUrl: "https://g1.globo.com",
        publishedAt,
        publishedLabel: relativeTime(publishedAt),
        image: imageOf(item),
      };
    });
  } catch {
    return [];
  }
}
