import { getSessionUser } from "@/lib/auth/session";
import { can } from "@/lib/auth/roles";
import { getSiteSettings } from "@/lib/settings";
import { getLiveStatus } from "@/lib/live/youtube-status";
import { TransmissaoForm } from "./transmissao-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Transmissão" };

export default async function TransmissaoPage() {
  const user = await getSessionUser();
  const allowed = can(user?.role, "manage_settings");

  const settings = await getSiteSettings();
  const videoId =
    settings.liveSource.type === "youtube" ? settings.liveSource.videoId : "";
  const status = videoId ? await getLiveStatus(videoId) : null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-content">Transmissão ao vivo</h1>
      <p className="mt-1 text-content-muted">
        Configure o vídeo/live do YouTube exibido no site. A mudança reflete sem
        republicar o site.
      </p>

      {/* Estado real atual */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-surface p-4">
        <span className="text-sm font-semibold text-content">Estado atual:</span>
        {!videoId ? (
          <span className="text-sm text-content-muted">Nenhuma transmissão configurada</span>
        ) : status?.isLive ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
            Ao vivo
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-content/5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-content-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-content-muted" aria-hidden="true" />
            Fora do ar
          </span>
        )}
      </div>

      {!allowed ? (
        <p className="mt-6 rounded-lg border border-line bg-surface-muted p-4 text-sm text-content-muted">
          Seu papel não permite alterar a transmissão. Fale com um administrador.
        </p>
      ) : (
        <div className="mt-6">
          <TransmissaoForm
            initialEnabled={settings.liveSource.type === "youtube" && Boolean(videoId)}
            initialRef={videoId}
            initialChannel={settings.youtubeChannelId}
          />
        </div>
      )}
    </div>
  );
}
