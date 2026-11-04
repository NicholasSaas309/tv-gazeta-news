import { Thumb } from "@/components/public/thumb";
import { faviconFor } from "@/lib/news";
import type { NewsFeedItem } from "@/lib/news";

/**
 * Card de manchete com imagem de capa (og:image). Sem imagem, cai num
 * gradiente determinístico (Thumb). Leva à matéria original (nova aba).
 */
export function NewsImageCard({ item }: { item: NewsFeedItem }) {
  const favicon = faviconFor(item.sourceUrl);

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden bg-surface-muted">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <Thumb seed={item.title} />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
        <span className="absolute bottom-0 left-0 m-3 flex items-center gap-1.5 rounded bg-black/55 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {favicon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={favicon} alt="" width={14} height={14} className="h-3.5 w-3.5 rounded-sm" />
          ) : null}
          {item.source}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-3 font-display font-bold leading-tight text-content transition-colors group-hover:text-brand">
          {item.title}
        </h3>
        {item.publishedLabel ? (
          <p className="mt-2 text-xs text-content-muted">{item.publishedLabel}</p>
        ) : null}
      </div>
    </a>
  );
}
