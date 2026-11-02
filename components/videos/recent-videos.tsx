import Image from "next/image";
import type { ChannelVideo } from "@/lib/videos/youtube";

/**
 * Grade de vídeos recentes do canal (lives gravadas e cortes). Quando o canal
 * ainda não está configurado ou não há vídeos, mostra um aviso amigável.
 */
export function RecentVideos({
  videos,
  channelConfigured,
}: {
  videos: ChannelVideo[];
  channelConfigured: boolean;
}) {
  if (videos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-surface p-8 text-center">
        <p className="text-sm text-content-muted">
          {channelConfigured
            ? "Assim que houver vídeos no canal, os cortes e lives gravadas aparecerão aqui automaticamente."
            : "Os cortes e lives gravadas aparecerão aqui automaticamente assim que o canal do YouTube for configurado."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {videos.map((video) => (
        <a
          key={video.videoId}
          href={video.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl"
        >
          <div className="relative aspect-video overflow-hidden bg-surface-muted">
            {video.thumbnail ? (
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : null}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white transition-transform duration-300 group-hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="line-clamp-2 font-display font-semibold text-content transition-colors group-hover:text-brand">
              {video.title}
            </h3>
            {video.publishedLabel ? (
              <p className="mt-2 text-xs text-content-muted">{video.publishedLabel}</p>
            ) : null}
          </div>
        </a>
      ))}
    </div>
  );
}
