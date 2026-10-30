import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/public/page-header";
import { SponsorGrid } from "@/components/public/sponsors";
import { getSponsors } from "@/lib/content/sample";

export const metadata = { title: "Patrocinadores" };

export default function PatrocinadoresPage() {
  const sponsors = getSponsors();

  return (
    <>
      <PageHeader
        eyebrow="Parcerias"
        title="Patrocinadores"
        subtitle="Marcas que apoiam a TV Gazeta News e ajudam a levar informação sem fronteiras."
      />
      <Container className="py-10">
        <SponsorGrid sponsors={sponsors} />

        <div className="mt-12 rounded-xl border border-line bg-surface-muted p-6 text-center">
          <h2 className="text-lg font-bold text-content">Quer anunciar na TV Gazeta News?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-content-muted">
            Fale com nossa equipe comercial e conheça as cotas de patrocínio e os
            formatos de anúncio disponíveis.
          </p>
        </div>
      </Container>
    </>
  );
}
