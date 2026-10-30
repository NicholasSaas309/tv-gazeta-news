import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { NewsItem } from "@/lib/content/types";

/**
 * Ticker de "últimas notícias" — faixa animada que corre horizontalmente,
 * pausando ao passar o mouse (ver .marquee em globals.css). Puro CSS.
 * O conteúdo é duplicado para o loop ser contínuo.
 */
export function NewsTicker({ items }: { items: NewsItem[] }) {
  const headlines = items.slice(0, 8);
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
              <Link
                key={`${item.slug}-${i}`}
                href={`/noticias/${item.slug}`}
                className="group inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
              >
                <span className="h-1 w-1 rounded-full bg-brand-accent" aria-hidden="true" />
                <span className="font-medium group-hover:underline">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
