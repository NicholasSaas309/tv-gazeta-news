import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Thumb } from "@/components/public/thumb";
import { VideoCard } from "@/components/public/video-card";
import { getPrograms, getProgramBySlug, getVideos } from "@/lib/content/sample";

export function generateStaticParams() {
  return getPrograms().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  return { title: program ? program.title : "Programa" };
}

export default async function ProgramaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const related = getVideos().filter((v) => v.programSlug === slug);

  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Thumb seed={program.title} aspect="video" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {program.scheduleLabel}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-content">{program.title}</h1>
          <p className="mt-4 text-content-muted">{program.description}</p>
          <p className="mt-4 text-sm text-content-muted">
            Apresentação: <strong className="text-content">{program.host}</strong>
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-12 border-t border-line pt-8">
          <h2 className="border-l-4 border-brand pl-3 text-xl font-bold text-content">
            Vídeos do programa
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v) => (
              <VideoCard key={v.slug} video={v} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
