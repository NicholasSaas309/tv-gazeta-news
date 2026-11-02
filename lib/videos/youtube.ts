import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
const REVALIDATE_SECONDS = 900;

export type ChannelVideo = {
  videoId: string;
  title: string;
  link: string;
  thumbnail: string;
  publishedAt: string | null;
  publishedLabel: string;
};

function toArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Lista os vídeos recentes de um canal do YouTube via feed público (sem API
 * key, sem custo). Nunca lança: retorna [] em falha ou canal vazio.
 */
export async function fetchChannelVideos(
  channelId: string,
  limit = 8,
): Promise<ChannelVideo[]> {
  if (!channelId) return [];
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TVGazetaNews/1.0)" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const data = parser.parse(xml);
    const entries = toArray(data?.feed?.entry).slice(0, limit);

    return entries.map((entry: Record<string, unknown>): ChannelVideo => {
      const videoId = String(entry["yt:videoId"] ?? "");
      const group = (entry["media:group"] ?? {}) as Record<string, unknown>;
      const thumb = (group["media:thumbnail"] ?? {}) as Record<string, unknown>;
      const published = entry.published ? new Date(String(entry.published)) : null;
      const link = (entry.link ?? {}) as Record<string, unknown>;
      return {
        videoId,
        title: String(entry.title ?? ""),
        link:
          (link["@_href"] as string) ||
          (videoId ? `https://www.youtube.com/watch?v=${videoId}` : "#"),
        thumbnail:
          (thumb["@_url"] as string) ||
          (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : ""),
        publishedAt: published ? published.toISOString() : null,
        publishedLabel: published
          ? published.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
          : "",
      };
    });
  } catch {
    return [];
  }
}
