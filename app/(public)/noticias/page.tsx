import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/public/page-header";
import { NewsFilter } from "@/components/public/news-filter";
import { getFeaturedNews, getNews } from "@/lib/content/sample";

export const metadata = { title: "Notícias" };

export default function NoticiasPage() {
  const featured = getFeaturedNews();

  return (
    <>
      <PageHeader
        eyebrow="Jornalismo"
        title="Notícias"
        subtitle="As últimas notícias da TV Gazeta News — informação sem fronteiras."
      />
      <Container className="py-10">
        <NewsFilter items={getNews()} featured={featured} />
      </Container>
    </>
  );
}
