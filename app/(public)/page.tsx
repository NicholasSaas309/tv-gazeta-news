import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/public/section";
import { NewsCard } from "@/components/public/news-card";
import { ProgramCard } from "@/components/public/program-card";
import { VideoCard } from "@/components/public/video-card";
import { ScheduleDay } from "@/components/public/schedule-table";
import { SponsorStrip } from "@/components/public/sponsors";
import { LivePlayer } from "@/components/player/live-player";
import { LiveBadge } from "@/components/public/live-badge";
import { NewsTicker } from "@/components/public/ticker";
import { Reveal } from "@/components/public/reveal";
import { Thumb } from "@/components/public/thumb";
import { getSiteSettings } from "@/lib/settings";
import { todayWeekday } from "@/lib/content/calendar";
import {
  getFeaturedNews,
  getNews,
  getPrograms,
  getScheduleByDay,
  getSponsors,
  getVideos,
} from "@/lib/content/sample";

export default async function HomePage() {
  const settings = await getSiteSettings();
  const featured = getFeaturedNews();
  const latest = getNews()
    .filter((n) => n.slug !== featured.slug)
    .slice(0, 4);
  const today = todayWeekday();
  const todaySchedule = getScheduleByDay(today);
  const programs = getPrograms().slice(0, 3);
  const videos = getVideos().slice(0, 4);
  const sponsors = getSponsors();

  return (
    <>
      {/* Ticker de plantão */}
      <NewsTicker items={getNews()} />

      {/* Hero "cinema" */}
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

            {/* Destaque */}
            <div className="flex flex-col animate-fade-up">
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white/60">
                Manchete
              </h2>
              <Link
                href={`/noticias/${featured.slug}`}
                className="group relative mt-3 flex-1 overflow-hidden rounded-xl ring-1 ring-white/10"
              >
                <Thumb seed={featured.slug} aspect="square" className="h-full min-h-[14rem]" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5">
                  <span className="w-fit rounded bg-brand-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">
                    {featured.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight group-hover:underline">
                    {featured.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/70">{featured.excerpt}</p>
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        {/* Últimas notícias */}
        <Section>
          <Reveal>
            <SectionHeading title="Últimas notícias" href="/noticias" />
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {latest.map((item) => (
                <NewsCard key={item.slug} item={item} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Programação de hoje */}
        <Section className="border-t border-line">
          <Reveal>
            <SectionHeading
              title={`Na programação de hoje (${today})`}
              href="/programacao"
              linkLabel="Ver grade"
            />
            <div className="mt-6">
              <ScheduleDay entries={todaySchedule} />
            </div>
          </Reveal>
        </Section>

        {/* Programas */}
        <Section className="border-t border-line">
          <Reveal>
            <SectionHeading title="Nossos programas" href="/programas" />
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((p) => (
                <ProgramCard key={p.slug} program={p} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Vídeos */}
        <Section className="border-t border-line">
          <Reveal>
            <SectionHeading title="Vídeos recentes" href="/videos" />
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {videos.map((v) => (
                <VideoCard key={v.slug} video={v} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Patrocinadores */}
        <Section className="border-t border-line">
          <Reveal>
            <SectionHeading title="Patrocinadores" href="/patrocinadores" />
            <div className="mt-6">
              <SponsorStrip sponsors={sponsors.slice(0, 8)} />
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
