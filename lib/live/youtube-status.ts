import "server-only";
import { parseYouTubeId } from "./youtube-id";

export type LiveStatus = {
  /** O vídeo existe/está acessível. */
  available: boolean;
  /** Está realmente AO VIVO agora (confirmado). Nunca `true` sem confirmação. */
  isLive: boolean;
  title?: string;
  /** Espectadores simultâneos agora (só confiável via API key; senão null). */
  viewers: number | null;
  /** Visualizações totais do vídeo (quando disponível). */
  totalViews: number | null;
};

const REVALIDATE_SECONDS = 30;
const TIMEOUT_MS = 6000;
const OFFLINE: LiveStatus = { available: false, isLive: false, viewers: null, totalViews: null };

function toNum(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function withTimeout(): { signal: AbortSignal; done: () => void } {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), TIMEOUT_MS);
  return { signal: c.signal, done: () => clearTimeout(t) };
}

/** Via YouTube Data API (quando há YOUTUBE_API_KEY). Mais robusto. */
async function viaApi(videoId: string, key: string): Promise<LiveStatus> {
  const { signal, done } = withTimeout();
  try {
    const url =
      "https://www.googleapis.com/youtube/v3/videos" +
      `?part=snippet,liveStreamingDetails,statistics&id=${encodeURIComponent(videoId)}&key=${encodeURIComponent(key)}`;
    const res = await fetch(url, { signal, next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return OFFLINE;
    const data = await res.json();
    const item = data?.items?.[0];
    if (!item) return OFFLINE;
    const isLive = item.snippet?.liveBroadcastContent === "live";
    return {
      available: true,
      isLive,
      title: item.snippet?.title,
      viewers: isLive ? toNum(item.liveStreamingDetails?.concurrentViewers) : null,
      totalViews: toNum(item.statistics?.viewCount),
    };
  } catch {
    return OFFLINE;
  } finally {
    done();
  }
}

/** Sem chave: lê o estado real da página do YouTube. */
async function viaPage(videoId: string): Promise<LiveStatus> {
  const { signal, done } = withTimeout();
  try {
    const url = `https://www.youtube.com/watch?v=${videoId}&hl=en&gl=US`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return OFFLINE;
    const html = await res.text();

    // Estado ao vivo: confirmado só quando isLiveNow === true (nunca falso positivo).
    const isLive = /"isLiveNow":true/.test(html);
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
    // `originalViewCount` = espectadores assistindo AGORA (quando ao vivo).
    // `viewCount` = visualizações totais do vídeo.
    const concurrent = html.match(/"originalViewCount":"(\d+)"/);
    const viewMatch = html.match(/"viewCount":"(\d+)"/);

    return {
      available: true,
      isLive,
      title: titleMatch ? titleMatch[1] : undefined,
      viewers: isLive && concurrent ? Number(concurrent[1]) : null,
      totalViews: viewMatch ? Number(viewMatch[1]) : null,
    };
  } catch {
    return OFFLINE;
  } finally {
    done();
  }
}

/**
 * Estado real da transmissão de um vídeo do YouTube.
 * Segurança: o id é saneado; qualquer falha/dúvida → FORA DO AR (nunca falso AO VIVO).
 */
export async function getLiveStatus(
  videoRef: string | null | undefined,
): Promise<LiveStatus> {
  const videoId = parseYouTubeId(videoRef);
  if (!videoId) return OFFLINE;

  const key = process.env.YOUTUBE_API_KEY;
  return key ? viaApi(videoId, key) : viaPage(videoId);
}
