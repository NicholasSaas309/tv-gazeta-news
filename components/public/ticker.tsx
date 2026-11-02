import { Container } from "@/components/ui/container";
import type { NewsFeedItem } from "@/lib/news";

/**
 * Ticker de "plantão" — faixa animada com as últimas manchetes, pausando ao
 * passar o mouse (ver .marquee em globals.css). Puro CSS. Cada manchete leva à
 * matéria original (nova aba). O conteúdo é duplicado para o loop ser contínuo.
 */
export function NewsTicker({ items }: { items: NewsFeedItem[] }) {
  const headlines = items.slice(0, 10);
  if (headlines.length === 0) return null;
  const loop = [...headlines, ...headlines];

  return (
    <div className="border-y border-line bg-brand-secondary text-white">
      <Container className="flex items-stretch gap-0 overflow-hidden">
        <span className="z-10 flex shrink-0 items-center gap-2 bg-brand-accent px-3 text-xs font-bold uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-live-pulse" aria-hidden="true" />
          Plantão
        </span>
        <div className="marquee relative min-w-0 flex-1 overflow-hidden py-2">
          <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap pl-6">
            {loop.map((item, i) => (
              <a
                key={`${item.link}-${i}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
              >
                <span className="h-1 w-1 rounded-full bg-brand-accent" aria-hidden="true" />
                <span className="font-medium group-hover:underline">{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
