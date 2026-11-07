import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/public/page-header";
import { ScheduleDay } from "@/components/public/schedule-table";
import { LivePlayer } from "@/components/player/live-player";
import { getSiteSettings } from "@/lib/settings";
import { todayWeekday } from "@/lib/content/calendar";
import { getScheduleByDay } from "@/lib/content/sample";

export const metadata = { title: "Ao Vivo" };

// Dinâmica: reflete a troca da transmissão (config no /admin) na hora.
export const dynamic = "force-dynamic";

export default async function AoVivoPage() {
  const settings = await getSiteSettings();
  const today = todayWeekday();
  const schedule = getScheduleByDay(today);

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
            <p className="mt-4 text-sm text-content-muted">
              O selo <strong className="text-content">AO VIVO</strong> aparece
              automaticamente quando a transmissão está no ar. Fora desses
              horários, exibimos a grade de programação.
            </p>
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
