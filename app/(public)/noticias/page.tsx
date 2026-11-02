import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/public/page-header";
import { StateNewsTabs } from "@/components/news/state-news-tabs";
import { getAllStateFeeds } from "@/lib/news";

export const metadata = { title: "Notícias" };

export default async function NoticiasPage() {
  const feeds = await getAllStateFeeds(15);

  return (
    <>
      <PageHeader
        eyebrow="Jornalismo"
        title="Notícias"
        subtitle="Manchetes locais dos estados que cobrimos, atualizadas automaticamente. Toque para ler a matéria completa no veículo de origem."
      />
      <Container className="py-10">
        <StateNewsTabs feeds={feeds} />
      </Container>
    </>
  );
}
