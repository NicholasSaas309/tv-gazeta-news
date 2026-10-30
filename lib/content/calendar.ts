import type { Weekday } from "./types";

const BY_INDEX: Weekday[] = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

/** Dia da semana atual (rótulo em português). */
export function todayWeekday(): Weekday {
  return BY_INDEX[new Date().getDay()];
}
