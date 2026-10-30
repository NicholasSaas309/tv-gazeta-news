import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/public/page-header";
import { ScheduleTabs } from "@/components/public/schedule-tabs";
import { todayWeekday } from "@/lib/content/calendar";
import { WEEKDAYS, getScheduleByDay } from "@/lib/content/sample";
import type { ScheduleEntry, Weekday } from "@/lib/content/types";

export const metadata = { title: "Programação" };

export default function ProgramacaoPage() {
  const today = todayWeekday();
  const entriesByDay = Object.fromEntries(
    WEEKDAYS.map((d) => [d, getScheduleByDay(d)]),
  ) as Record<Weekday, ScheduleEntry[]>;

  return (
    <>
      <PageHeader
        eyebrow="Grade"
        title="Programação"
        subtitle="Confira a grade completa da semana. Os horários podem sofrer alterações."
      />
      <Container className="py-10">
        <ScheduleTabs days={WEEKDAYS} entriesByDay={entriesByDay} today={today} />
      </Container>
    </>
  );
}
