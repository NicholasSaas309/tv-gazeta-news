import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/public/page-header";
import { ProgramCard } from "@/components/public/program-card";
import { getPrograms } from "@/lib/content/sample";

export const metadata = { title: "Programas" };

export default function ProgramasPage() {
  const programs = getPrograms();

  return (
    <>
      <PageHeader
        eyebrow="Atrações"
        title="Programas"
        subtitle="Conheça as atrações da TV Gazeta News."
      />
      <Container className="py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
      </Container>
    </>
  );
}
