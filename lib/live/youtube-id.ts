/**
 * Validação/normalização segura de referência de vídeo do YouTube.
 *
 * Aceita um ID puro (11 caracteres) ou várias formas de URL do YouTube e
 * devolve SEMPRE um ID limpo no formato `^[A-Za-z0-9_-]{11}$`, ou `null` se a
 * entrada não for reconhecível. Rejeitar o resto evita injeção na URL do embed.
 */
const ID_RE = /^[A-Za-z0-9_-]{11}$/;

export function parseYouTubeId(input: string | null | undefined): string | null {
  if (!input) return null;
  const raw = input.trim();
  if (!raw) return null;

  // ID puro
  if (ID_RE.test(raw)) return raw;

  // Tenta interpretar como URL
  let url: URL;
  try {
    url = new URL(raw.includes("://") ? raw : `https://${raw}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  const allowed = new Set([
    "youtube.com",
    "m.youtube.com",
    "youtube-nocookie.com",
    "youtu.be",
    "music.youtube.com",
  ]);
  if (!allowed.has(host)) return null;

  // youtu.be/<id>
  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id && ID_RE.test(id) ? id : null;
  }

  // youtube.com/watch?v=<id>
  const v = url.searchParams.get("v");
  if (v && ID_RE.test(v)) return v;

  // youtube.com/{live,embed,shorts,v}/<id>
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length >= 2 && ["live", "embed", "shorts", "v"].includes(parts[0])) {
    const id = parts[1];
    if (ID_RE.test(id)) return id;
  }

  return null;
}

/** Verdadeiro se a entrada resulta num ID válido. */
export function isValidYouTubeRef(input: string | null | undefined): boolean {
  return parseYouTubeId(input) !== null;
}
