"use client";

import { useState } from "react";
import { ScheduleDay } from "./schedule-table";
import type { ScheduleEntry, Weekday } from "@/lib/content/types";

/**
 * Grade de programação com abas por dia (client-side). Começa no dia atual.
 */
export function ScheduleTabs({
  days,
  entriesByDay,
  today,
}: {
  days: Weekday[];
  entriesByDay: Record<Weekday, ScheduleEntry[]>;
  today: Weekday;
}) {
  const [active, setActive] = useState<Weekday>(today);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {days.map((day) => {
          const isActive = day === active;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setActive(day)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-brand text-white shadow-sm"
                  : "border border-line text-content-muted hover:border-brand/40 hover:text-brand"
              }`}
            >
              {day}
              {day === today ? (
                <span className={`ml-1.5 text-[10px] uppercase ${isActive ? "text-white/80" : "text-brand"}`}>
                  hoje
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div key={active} className="mt-6 animate-fade-in">
        <ScheduleDay entries={entriesByDay[active]} />
      </div>
    </div>
  );
}
