import Link from "next/link";
import type { NewsItem } from "@/lib/content/types";
import { Thumb } from "./thumb";

/** Card de notícia. `variant="featured"` destaca a manchete principal. */
export function NewsCard({
  item,
  variant = "default",
}: {
  item: NewsItem;
  variant?: "default" | "featured" | "compact";
}) {
  const href = `/noticias/${item.slug}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group flex gap-3 rounded-lg p-2 hover:bg-surface-muted"
      >
        <Thumb seed={item.slug} aspect="square" className="w-20 shrink-0" />
        <div className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand">
            {item.category}
          </span>
          <h3 className="mt-1 line-clamp-3 text-sm font-semibold text-content group-hover:text-brand">
            {item.title}
          </h3>
        </div>
      </Link>
    );
  }

  const featured = variant === "featured";

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl"
    >
      <Thumb
        seed={item.slug}
        label={item.category}
        aspect={featured ? "wide" : "video"}
      />
      <div className="flex flex-1 flex-col p-4">
        <h3
          className={`font-display font-bold leading-tight text-content transition-colors group-hover:text-brand ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-content-muted">{item.excerpt}</p>
        <p className="mt-3 text-xs text-content-muted">{item.publishedLabel}</p>
      </div>
    </Link>
  );
}
