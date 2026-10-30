import Link from "next/link";
import type { Video } from "@/lib/content/types";
import { Thumb } from "./thumb";

export function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={`/videos/${video.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl"
    >
      <Thumb seed={video.slug} label={video.durationLabel} aspect="video" play />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-display font-semibold text-content transition-colors group-hover:text-brand">
          {video.title}
        </h3>
        <p className="mt-2 text-xs text-content-muted">{video.publishedLabel}</p>
      </div>
    </Link>
  );
}
