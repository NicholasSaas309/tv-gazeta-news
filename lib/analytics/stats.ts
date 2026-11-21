import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type AudienceStats = {
  onlineNow: number;
  viewsToday: number;
  visitorsToday: number;
  viewsWeek: number;
  visitorsWeek: number;
};

/**
 * Resumo de audiência do site (visitantes agora/hoje/semana). Lê a função
 * `audience_stats` no Supabase com a sessão do admin (RLS/guarda por papel).
 * Retorna null se o Supabase/tabela ainda não estiverem prontos.
 */
export async function getAudienceStats(): Promise<AudienceStats | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("audience_stats");
    if (error || !data) return null;
    return {
      onlineNow: Number(data.online_now ?? 0),
      viewsToday: Number(data.views_today ?? 0),
      visitorsToday: Number(data.visitors_today ?? 0),
      viewsWeek: Number(data.views_week ?? 0),
      visitorsWeek: Number(data.visitors_week ?? 0),
    };
  } catch {
    return null;
  }
}
