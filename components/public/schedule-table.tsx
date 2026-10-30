import Link from "next/link";
import type { ScheduleEntry } from "@/lib/content/types";

/** Lista de programação de um dia (usada na home e na grade semanal). */
export function ScheduleDay({ entries }: { entries: ScheduleEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-content-muted">Sem programação cadastrada.</p>;
  }

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
      {entries.map((e, i) => {
        const titleEl = e.programSlug ? (
          <Link href={`/programas/${e.programSlug}`} className="font-semibold text-content hover:text-brand">
            {e.title}
          </Link>
        ) : (
          <span className="font-semibold text-content">{e.title}</span>
        );

        return (
          <li key={`${e.start}-${i}`} className="flex items-center gap-4 p-3">
            <span className="w-14 shrink-0 text-sm font-semibold tabular-nums text-content-muted">
              {e.start}
            </span>
            <div className="min-w-0 flex-1">{titleEl}</div>
            {e.live ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-accent/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" aria-hidden="true" />
                Ao vivo
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
