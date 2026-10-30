import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { VideoCard } from "@/components/public/video-card";
import { getProgramBySlug, getVideoBySlug, getVideos } from "@/lib/content/sample";

export function generateStaticParams() {
  return getVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  return { title: video ? video.title : "Vídeo", description: video?.description };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) notFound();

  const program = video.programSlug ? getProgramBySlug(video.programSlug) : undefined;
  const more = getVideos().filter((v) => v.slug !== slug).slice(0, 4);

  return (
    <Container className="py-10">
      <Link href="/videos" className="text-sm font-semibold text-brand hover:underline">
        ← Vídeos
      </Link>

      {/* Player do VOD (placeholder nesta etapa visual) */}
      <div className="mt-4 overflow-hidden rounded-xl border border-line bg-black">
        <div className="flex aspect-video w-full items-center justify-center bg-surface-muted">
          <div className="text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-content-inverted">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <p className="mt-3 text-sm text-content-muted">
              Reprodução de vídeo (exemplo) · {video.durationLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-3xl">
        <h1 className="text-2xl font-bold text-content">{video.title}</h1>
        <p className="mt-2 text-sm text-content-muted">
          {video.publishedLabel}
          {program ? (
            <>
              {" · "}
              <Link href={`/programas/${program.slug}`} className="text-brand hover:underline">
                {program.title}
              </Link>
            </>
          ) : null}
        </p>
        <p className="mt-4 text-content">{video.description}</p>
      </div>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="border-l-4 border-brand pl-3 text-xl font-bold text-content">
          Mais vídeos
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {more.map((v) => (
            <VideoCard key={v.slug} video={v} />
          ))}
        </div>
      </section>
    </Container>
  );
}
