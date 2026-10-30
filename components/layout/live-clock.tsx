"use client";

import { useEffect, useState } from "react";

/** Relógio ao vivo (data + hora) — dá sensação de "no ar". */
export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Evita mismatch de hidratação: só renderiza após montar no cliente.
  if (!now) return <span className="tabular-nums opacity-0">00:00:00</span>;

  const date = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
  const time = now.toLocaleTimeString("pt-BR");

  return (
    <span className="tabular-nums">
      <span className="hidden capitalize sm:inline">{date} · </span>
      {time}
    </span>
  );
}
