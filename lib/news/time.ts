/** Converte uma data em rótulo relativo em português (ex.: "há 12 min"). */
export function relativeTime(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const ms = date.getTime();
  if (Number.isNaN(ms)) return "";

  const diff = Date.now() - ms;
  const min = Math.round(diff / 60000);

  if (min < 1) return "agora";
  if (min < 60) return `há ${min} min`;
  const hours = Math.round(min / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.round(hours / 24);
  if (days < 7) return `há ${days} d`;

  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}
