import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/public/page-header";
import { VideoCard } from "@/components/public/video-card";
import { getVideos } from "@/lib/content/sample";

export const metadata = { title: "Vídeos" };

export default function VideosPage() {
  const videos = getVideos();

  return (
    <>
      <PageHeader
        eyebrow="Acervo"
        title="Vídeos"
        subtitle="Reveja programas, reportagens e os melhores momentos."
      />
      <Container className="py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <VideoCard key={v.slug} video={v} />
          ))}
        </div>
      </Container>
    </>
  );
}
