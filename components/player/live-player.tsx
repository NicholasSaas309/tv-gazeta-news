import type { LiveSource } from "@/lib/settings/types";

/**
 * Player de transmissão ao vivo. Abstrai o distribuidor via `liveSource.type`:
 * - "youtube": embeda o player do YouTube (quando houver videoId).
 * - "none" (ou sem id): mostra um placeholder "fora do ar".
 *
 * A configuração virá do painel (site_settings) — por ora, o padrão é "none".
 * A troca de distribuidor no futuro é só adicionar um novo caso aqui.
 */
export function LivePlayer({ source }: { source: LiveSource }) {
  const youtubeId =
    source.type === "youtube" && source.videoId ? source.videoId : null;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-black shadow-sm">
      <div className="aspect-video w-full">
        {youtubeId ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
            title="Transmissão ao vivo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-muted">
            <div className="px-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-content/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-content-muted">
                <span className="h-2 w-2 rounded-full bg-content-muted" aria-hidden="true" />
                Fora do ar
              </span>
              <p className="mt-3 text-sm text-content-muted">
                A transmissão ao vivo aparecerá aqui quando estiver no ar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
