"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth/session";
import { can } from "@/lib/auth/roles";
import { parseYouTubeId } from "@/lib/live/youtube-id";

export type TransmissaoState = { error: string | null; ok: boolean };

/**
 * Salva a configuração da transmissão ao vivo.
 * Segurança: exige sessão + capability manage_settings (e a RLS reforça no
 * banco). A entrada do YouTube é validada/normalizada para um ID limpo.
 */
export async function saveTransmissao(
  _prev: TransmissaoState,
  formData: FormData,
): Promise<TransmissaoState> {
  const user = await getSessionUser();
  if (!user) return { error: "Sessão expirada. Entre novamente.", ok: false };
  if (!can(user.role, "manage_settings")) {
    return { error: "Você não tem permissão para alterar a transmissão.", ok: false };
  }

  const enabled = formData.get("enabled") === "on";
  const rawRef = String(formData.get("youtubeRef") ?? "").trim();
  const rawChannel = String(formData.get("channelId") ?? "").trim();

  let liveType: "youtube" | "none" = "none";
  let videoId = "";
  let url = "";

  if (enabled) {
    const parsed = parseYouTubeId(rawRef);
    if (!parsed) {
      return {
        error: "Informe um ID ou link do YouTube válido (ex.: https://youtu.be/XXXXXXXXXXX).",
        ok: false,
      };
    }
    liveType = "youtube";
    videoId = parsed;
    url = `https://www.youtube.com/watch?v=${parsed}`;
  }

  // Sanitiza o canal (opcional): apenas o formato de ID de canal do YouTube.
  const channelId = /^UC[A-Za-z0-9_-]{22}$/.test(rawChannel) ? rawChannel : "";
  if (rawChannel && !channelId) {
    return { error: "ID de canal inválido (deve começar com UC e ter 24 caracteres).", ok: false };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("app_settings")
    .update({
      live_type: liveType,
      live_video_id: videoId,
      live_url: url,
      youtube_channel_id: channelId,
      updated_by: user.id,
    })
    .eq("id", 1);

  if (error) {
    return { error: "Não foi possível salvar. Verifique suas permissões.", ok: false };
  }

  // Reflete nas páginas (ISR) imediatamente, sem redeploy.
  revalidatePath("/");
  revalidatePath("/ao-vivo");
  revalidatePath("/admin/transmissao");

  return { error: null, ok: true };
}
