"use client";

import { useEffect, useState } from "react";
import { LiveBadge } from "@/components/public/live-badge";
import type { LiveSource } from "@/lib/settings/types";

type Status = {
  loading: boolean;
  configured: boolean;
  videoId: string | null;
  isLive: boolean;
  viewers: number | null;
};

const nf = new Intl.NumberFormat("pt-BR");

/**
 * Player de transmissão ao vivo (OBS → YouTube → embed).
 *
 * Faz poll de /api/live-status para refletir o ESTADO REAL do YouTube:
 * - AO VIVO só quando confirmado (nunca indicador falso).
 * - FORA DO AR quando não configurado ou não está no ar.
 * A troca de transmissão no /admin reflete aqui sem recarregar a página.
 */
export function LivePlayer({ source }: { source: LiveSource }) {
  const initialId =
    source.type === "youtube" && source.videoId ? source.videoId : null;

  const [status, setStatus] = useState<Status>({
    loading: true,
    configured: Boolean(initialId),
    videoId: initialId,
    isLive: false, // nunca assumimos "ao vivo" antes de confirmar
    viewers: null,
  });

  useEffect(() => {
    let active = true;

    async function check() {
      try {
        const res = await fetch("/api/live-status", { cache: "no-store" });
        if (!res.ok) throw new Error("status");
        const data = await res.json();
        if (!active) return;
        setStatus({
          loading: false,
          configured: Boolean(data.configured),
          videoId: data.videoId ?? null,
          isLive: Boolean(data.isLive),
          viewers: typeof data.viewers === "number" ? data.viewers : null,
        });
      } catch {
        if (active) setStatus((s) => ({ ...s, loading: false }));
      }
    }

    check();
    const interval = setInterval(check, 30000);
    const onFocus = () => check();
    window.addEventListener("focus", onFocus);
    return () => {
      active = false;
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const showPlayer = status.isLive && status.videoId;

  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-black shadow-sm">
      <div className="aspect-video w-full">
        {showPlayer ? (
          <>
            <iframe
              key={status.videoId}
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${status.videoId}?rel=0&autoplay=1&mute=1&playsinline=1`}
              title="Transmissão ao vivo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
              <LiveBadge />
              {status.viewers != null ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <strong className="tabular-nums">{nf.format(status.viewers)}</strong>
                  <span className="font-normal text-white/80">assistindo</span>
                </span>
              ) : null}
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-muted">
            <div className="px-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-content/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-content-muted">
                <span className="h-2 w-2 rounded-full bg-content-muted" aria-hidden="true" />
                {status.loading ? "Verificando transmissão…" : "Fora do ar"}
              </span>
              {!status.loading ? (
                <p className="mt-3 text-sm text-content-muted">
                  A transmissão ao vivo aparecerá aqui quando estiver no ar.
                </p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
