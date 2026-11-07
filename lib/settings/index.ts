import { cache } from "react";
import { DEFAULT_SITE_SETTINGS } from "./defaults";
import { siteSettingsSchema, type SiteSettings } from "./types";
import { getPublicSupabaseConfig } from "@/lib/supabase/config";

export type { SiteSettings } from "./types";
export { DEFAULT_SITE_SETTINGS } from "./defaults";

type SettingsRow = {
  live_type: string;
  live_video_id: string | null;
  live_url: string | null;
  youtube_channel_id: string | null;
};

/**
 * Ponto único de acesso à configuração da plataforma.
 *
 * Lê a linha `app_settings` do Supabase (quando configurado) e MESCLA sobre os
 * defaults locais — assim a troca da transmissão no /admin reflete sem redeploy.
 *
 * Usa `fetch` REST com a anon key (leitura pública via RLS `using(true)`), SEM
 * cookies — mantendo as páginas públicas estáticas/ISR — e com revalidação
 * curta (o `revalidatePath` no salvar força a atualização imediata). Qualquer
 * falha cai nos defaults, mantendo o site 100% funcional. Cacheado por request.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const config = getPublicSupabaseConfig();
  if (!config) {
    return siteSettingsSchema.parse(DEFAULT_SITE_SETTINGS);
  }

  try {
    const res = await fetch(
      `${config.url}/rest/v1/app_settings?select=live_type,live_video_id,live_url,youtube_channel_id&id=eq.1`,
      {
        headers: {
          apikey: config.anonKey,
          Authorization: `Bearer ${config.anonKey}`,
          Accept: "application/json",
        },
        next: { revalidate: 30 },
      },
    );
    if (!res.ok) return siteSettingsSchema.parse(DEFAULT_SITE_SETTINGS);

    const rows = (await res.json()) as SettingsRow[];
    const data = Array.isArray(rows) ? rows[0] : null;
    if (!data) return siteSettingsSchema.parse(DEFAULT_SITE_SETTINGS);

    const merged: SiteSettings = {
      ...DEFAULT_SITE_SETTINGS,
      youtubeChannelId: data.youtube_channel_id || DEFAULT_SITE_SETTINGS.youtubeChannelId,
      liveSource: {
        type: data.live_type === "youtube" ? "youtube" : "none",
        videoId: data.live_video_id ?? "",
        url: data.live_url ?? "",
        // `isLive` deixa de ser manual: o estado real vem de /api/live-status.
        isLive: false,
      },
    };
    return siteSettingsSchema.parse(merged);
  } catch {
    return siteSettingsSchema.parse(DEFAULT_SITE_SETTINGS);
  }
});
