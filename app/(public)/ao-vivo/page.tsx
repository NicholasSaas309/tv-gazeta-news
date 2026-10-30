import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/public/page-header";
import { ScheduleDay } from "@/components/public/schedule-table";
import { LivePlayer } from "@/components/player/live-player";
import { getSiteSettings } from "@/lib/settings";
import { todayWeekday } from "@/lib/content/calendar";
import { getScheduleByDay } from "@/lib/content/sample";

export const metadata = { title: "Ao Vivo" };

export default async function AoVivoPage() {
  const settings = await getSiteSettings();
  const today = todayWeekday();
  const schedule = getScheduleByDay(today);
  const onAir = schedule.find((e) => e.live);

  return (
    <>
      <PageHeader
        eyebrow="Transmissão"
        title="Ao Vivo"
        subtitle="Acompanhe a transmissão ao vivo da TV Gazeta News."
      />
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <LivePlayer source={settings.liveSource} />
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-accent">
                <span className="h-2 w-2 rounded-full bg-brand-accent" aria-hidden="true" />
                No ar agora
              </span>
              <span className="text-sm text-content-muted">
                {onAir ? onAir.title : "Programação gravada"}
              </span>
            </div>
          </div>

          <aside>
            <h2 className="border-l-4 border-brand pl-3 text-lg font-bold text-content">
              Hoje na TV ({today})
            </h2>
            <div className="mt-4">
              <ScheduleDay entries={schedule} />
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
