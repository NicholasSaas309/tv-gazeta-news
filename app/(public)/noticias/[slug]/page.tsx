import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Thumb } from "@/components/public/thumb";
import { NewsCard } from "@/components/public/news-card";
import { getNews, getNewsBySlug } from "@/lib/content/sample";

export function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  return {
    title: item ? item.title : "Notícia",
    description: item?.excerpt,
  };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const more = getNews().filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <Container className="py-10">
      <article className="mx-auto max-w-3xl">
        <Link href="/noticias" className="text-sm font-semibold text-brand hover:underline">
          ← Notícias
        </Link>
        <span className="mt-4 block text-sm font-semibold uppercase tracking-wide text-brand">
          {item.category}
        </span>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-content sm:text-4xl">
          {item.title}
        </h1>
        <p className="mt-3 text-content-muted">{item.excerpt}</p>
        <p className="mt-4 text-sm text-content-muted">
          Por <strong className="text-content">{item.author}</strong> · {item.publishedLabel}
        </p>

        <Thumb seed={item.slug} label={item.category} aspect="wide" className="mt-6" />

        <div className="mt-6 space-y-4 text-lg leading-relaxed text-content">
          {item.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <section className="mx-auto mt-12 max-w-5xl border-t border-line pt-8">
        <h2 className="border-l-4 border-brand pl-3 text-xl font-bold text-content">
          Mais notícias
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {more.map((n) => (
            <NewsCard key={n.slug} item={n} />
          ))}
        </div>
      </section>
    </Container>
  );
}
