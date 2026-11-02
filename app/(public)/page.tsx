import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/public/section";
import { LivePlayer } from "@/components/player/live-player";
import { LiveBadge } from "@/components/public/live-badge";
import { NewsTicker } from "@/components/public/ticker";
import { Reveal } from "@/components/public/reveal";
import { StateNewsTabs } from "@/components/news/state-news-tabs";
import { RecentVideos } from "@/components/videos/recent-videos";
import { getSiteSettings } from "@/lib/settings";
import { getAllStateFeeds, mergeRecent } from "@/lib/news";
import { fetchChannelVideos } from "@/lib/videos/youtube";

export default async function HomePage() {
  const settings = await getSiteSettings();
  const feeds = await getAllStateFeeds(12);
  const recent = mergeRecent(feeds, 10);
  const highlights = recent.slice(0, 5);
  const videos = await fetchChannelVideos(settings.youtubeChannelId, 4);

  return (
    <>
      {/* Ticker de plantão */}
      <NewsTicker items={recent} />

      {/* Hero "cinema": live + destaques */}
      <section className="relative overflow-hidden bg-brand-secondary text-white">
        <div
          className="pointer-events-none absolute -left-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full opacity-25 blur-3xl animate-float"
          style={{ background: "var(--brand-primary)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--brand-accent)" }}
          aria-hidden="true"
        />

        <Container className="relative py-10 sm:py-14">
          <p className="animate-fade-up text-sm font-bold uppercase tracking-[0.25em] text-brand-accent">
            {settings.tagline}
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.9fr_1fr]">
            {/* Player */}
            <div className="animate-fade-up">
              <div className="mb-3 flex items-center gap-3">
                <LiveBadge href="/ao-vivo" />
                <span className="text-sm text-white/70">Transmissão ao vivo</span>
              </div>
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                <LivePlayer source={settings.liveSource} />
              </div>
            </div>

            {/* Destaques (manchetes reais) */}
            <div className="flex flex-col animate-fade-up">
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white/60">
                Últimas manchetes
              </h2>
              <ul className="mt-3 flex-1 divide-y divide-white/10 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
                {highlights.length > 0 ? (
                  highlights.map((item, i) => (
                    <li key={`${item.link}-${i}`}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-4 transition-colors hover:bg-white/5"
                      >
                        <span className="line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:underline">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-xs text-white/50">
                          {item.source}
                          {item.publishedLabel ? ` · ${item.publishedLabel}` : ""}
                        </span>
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-sm text-white/60">
                    Carregando manchetes…
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        {/* Vídeos recentes do canal (lives gravadas / cortes) */}
        <Section>
          <Reveal>
            <SectionHeading title="Vídeos recentes" href="/videos" />
            <div className="mt-6">
              <RecentVideos
                videos={videos}
                channelConfigured={Boolean(settings.youtubeChannelId)}
              />
            </div>
          </Reveal>
        </Section>

        {/* Notícias por estado */}
        <Section className="border-t border-line">
          <Reveal>
            <SectionHeading title="Notícias por estado" href="/noticias" linkLabel="Ver todas" />
            <p className="mt-2 text-sm text-content-muted">
              Manchetes locais atualizadas automaticamente. Toque para ler no veículo de origem.
            </p>
            <div className="mt-6">
              <StateNewsTabs feeds={feeds} limit={8} />
            </div>
          </Reveal>
        </Section>
      </Container>

      {/* Chamada final */}
      <section className="relative overflow-hidden border-t border-line bg-brand-secondary text-white">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--brand-primary)" }}
          aria-hidden="true"
        />
        <Container className="relative flex flex-col items-center gap-4 py-14 text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
            {settings.name}
          </h2>
          <p className="max-w-xl text-white/70">{settings.description}</p>
          <Link
            href="/ao-vivo"
            className="mt-2 inline-flex items-center gap-2 rounded-md bg-brand-accent px-6 py-3 font-bold uppercase tracking-wide text-white transition-transform hover:scale-105"
          >
            <span className="h-2 w-2 rounded-full bg-white animate-live-pulse" aria-hidden="true" />
            Assistir ao vivo
          </Link>
        </Container>
      </section>
    </>
  );
}
