"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "./news-card";
import type { NewsCategory, NewsItem } from "@/lib/content/types";

const CATEGORIES: NewsCategory[] = [
  "Política",
  "Economia",
  "Cidades",
  "Brasil",
  "Esportes",
  "Cultura",
];

type Filter = "Todas" | NewsCategory;

/**
 * Lista de notícias com filtro por categoria (client-side). A troca de filtro
 * reanima a grade (fade-in) para dar dinamismo.
 */
export function NewsFilter({
  items,
  featured,
}: {
  items: NewsItem[];
  featured: NewsItem;
}) {
  const [filter, setFilter] = useState<Filter>("Todas");

  const chips: Filter[] = ["Todas", ...CATEGORIES];

  const visible = useMemo(() => {
    if (filter === "Todas") return items;
    return items.filter((n) => n.category === filter);
  }, [filter, items]);

  const showFeatured = filter === "Todas";
  const grid = showFeatured
    ? visible.filter((n) => n.slug !== featured.slug)
    : visible;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const active = c === filter;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
                active
                  ? "bg-brand text-white shadow-sm"
                  : "border border-line text-content-muted hover:border-brand/40 hover:text-brand"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {showFeatured ? (
        <div key="featured" className="mt-8 animate-fade-in">
          <NewsCard item={featured} variant="featured" />
        </div>
      ) : null}

      {grid.length > 0 ? (
        <div
          key={filter}
          className="mt-8 grid animate-fade-in grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {grid.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-content-muted">
          Nenhuma notícia nesta categoria por enquanto.
        </p>
      )}
    </div>
  );
}
