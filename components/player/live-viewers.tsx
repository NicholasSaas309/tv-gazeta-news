"use client";

import { useEffect, useState } from "react";

const nf = new Intl.NumberFormat("pt-BR");

/**
 * Contador de espectadores em destaque (para a página /ao-vivo). Consulta
 * /api/live-status e só aparece quando a transmissão está realmente no ar,
 * com o número que o YouTube fornece de pessoas assistindo agora.
 */
export function LiveViewers() {
  const [viewers, setViewers] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    async function check() {
      try {
        const res = await fetch("/api/live-status", { cache: "no-store" });
        const data = await res.json();
        if (active) {
          setViewers(
            data.isLive && typeof data.viewers === "number" ? data.viewers : null,
          );
        }
      } catch {
        if (active) setViewers(null);
      }
    }
    check();
    const id = setInterval(check, 30000);
    const onFocus = () => check();
    window.addEventListener("focus", onFocus);
    return () => {
      active = false;
      clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  if (viewers == null) return null;

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-2xl font-bold tabular-nums text-white sm:text-3xl">
          {nf.format(viewers)}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-live-pulse" aria-hidden="true" />
          assistindo agora
        </span>
      </span>
    </div>
  );
}
