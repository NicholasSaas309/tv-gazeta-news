"use client";

import { useEffect } from "react";

/**
 * Registra a visita do usuário (uma vez ao carregar + um "heartbeat" a cada
 * 60s enquanto a aba está aberta), para alimentar o painel de Audiência.
 * Usa um id anônimo e aleatório guardado no navegador — sem dados pessoais.
 */
function getVisitorId(): string {
  try {
    const key = "tvg_vid";
    let id = localStorage.getItem(key);
    if (!id) {
      id = (crypto.randomUUID?.() ?? String(Math.random()).slice(2)).replace(/-/g, "");
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

export function VisitTracker() {
  useEffect(() => {
    const visitorId = getVisitorId();
    let active = true;

    const ping = () => {
      if (!active) return;
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitor_id: visitorId, path: location.pathname }),
        keepalive: true,
      }).catch(() => {});
    };

    ping();
    const id = setInterval(ping, 60000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return null;
}
