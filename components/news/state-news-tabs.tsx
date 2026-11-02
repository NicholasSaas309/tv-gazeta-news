"use client";

import { useMemo, useState } from "react";
import { NewsList } from "./news-list";
import type { NewsFeedItem, StateFeed } from "@/lib/news";

type Tab = "todos" | string;

/**
 * Abas de notícias por estado/cidade (client-side). "Todos" mescla as fontes
 * ordenadas por data. Troca de aba reanima a lista (fade-in).
 */
export function StateNewsTabs({
  feeds,
  limit,
}: {
  feeds: StateFeed[];
  /** Máximo de itens por aba (ex.: na home). Sem limite se omitido. */
  limit?: number;
}) {
  const [active, setActive] = useState<Tab>("todos");

  const merged = useMemo<NewsFeedItem[]>(() => {
    return feeds
      .flatMap((f) => f.items)
      .slice()
      .sort((a, b) => {
        const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
        const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
        return tb - ta;
      });
  }, [feeds]);

  const items = useMemo<NewsFeedItem[]>(() => {
    const base = active === "todos" ? merged : feeds.find((f) => f.slug === active)?.items ?? [];
    return typeof limit === "number" ? base.slice(0, limit) : base;
  }, [active, feeds, merged, limit]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <TabButton active={active === "todos"} onClick={() => setActive("todos")}>
          Todos
        </TabButton>
        {feeds.map((f) => (
          <TabButton key={f.slug} active={active === f.slug} onClick={() => setActive(f.slug)}>
            {f.label}
          </TabButton>
        ))}
      </div>

      <div key={active} className="mt-6 animate-fade-in">
        <NewsList items={items} />
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
        active
          ? "bg-brand text-white shadow-sm"
          : "border border-line text-content-muted hover:border-brand/40 hover:text-brand"
      }`}
    >
      {children}
    </button>
  );
}
