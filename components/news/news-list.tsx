import { faviconFor } from "@/lib/news";
import type { NewsFeedItem } from "@/lib/news";

/**
 * Lista compacta de manchetes agregadas. Cada item leva à matéria original
 * (nova aba), com crédito ao veículo e tempo relativo. Sem imagem (o Google
 * Notícias não fornece), priorizando leitura rápida.
 */
export function NewsList({ items }: { items: NewsFeedItem[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-line bg-surface p-6 text-sm text-content-muted">
        Sem notícias disponíveis no momento. As manchetes atualizam
        automaticamente — tente novamente em alguns minutos.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
      {items.map((item, i) => {
        const favicon = faviconFor(item.sourceUrl);
        return (
        <li key={`${item.link}-${i}`}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 p-4 transition-colors hover:bg-surface-muted"
          >
            {favicon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={favicon}
                alt=""
                width={20}
                height={20}
                className="mt-0.5 h-5 w-5 shrink-0 rounded"
              />
            ) : (
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-accent"
                aria-hidden="true"
              />
            )}
            <span className="min-w-0 flex-1">
              <span className="block font-semibold leading-snug text-content group-hover:text-brand">
                {item.title}
              </span>
              <span className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-content-muted">
                <span className="font-medium">{item.source}</span>
                {item.publishedLabel ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{item.publishedLabel}</span>
                  </>
                ) : null}
              </span>
            </span>
            <svg
              className="mt-1 h-4 w-4 shrink-0 text-content-muted opacity-0 transition-opacity group-hover:opacity-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </li>
        );
      })}
    </ul>
  );
}
