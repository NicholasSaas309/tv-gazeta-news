import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/settings";
import { getLiveStatus } from "@/lib/live/youtube-status";

export const dynamic = "force-dynamic";

/**
 * Estado atual da transmissão. Lê a config vigente (Supabase) e checa o estado
 * real no YouTube. Não expõe nenhuma chave — devolve só dados públicos.
 * O player faz poll deste endpoint, então a troca de config e o início/fim da
 * live refletem no site sem recarregar nem redeployar.
 */
export async function GET() {
  const settings = await getSiteSettings();
  const videoId =
    settings.liveSource.type === "youtube" && settings.liveSource.videoId
      ? settings.liveSource.videoId
      : null;

  if (!videoId) {
    return NextResponse.json(
      { configured: false, isLive: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const status = await getLiveStatus(videoId);

  return NextResponse.json(
    { configured: true, videoId, isLive: status.isLive, title: status.title ?? null },
    { headers: { "Cache-Control": "public, max-age=0, s-maxage=20" } },
  );
}
