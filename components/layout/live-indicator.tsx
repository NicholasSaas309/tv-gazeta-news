"use client";

import { useEffect, useState } from "react";
import { LiveBadge } from "@/components/public/live-badge";

/**
 * Indicador "AO VIVO" do cabeçalho — aparece SOMENTE quando a transmissão está
 * realmente no ar (consulta /api/live-status). Nunca um selo falso. Para
 * navegar até a transmissão fora do ar, há o item "Ao Vivo" no menu.
 */
export function LiveIndicator() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;
    async function check() {
      try {
        const res = await fetch("/api/live-status", { cache: "no-store" });
        const data = await res.json();
        if (active) setIsLive(Boolean(data.isLive));
      } catch {
        if (active) setIsLive(false);
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

  if (!isLive) return null;
  return <LiveBadge href="/ao-vivo" />;
}
