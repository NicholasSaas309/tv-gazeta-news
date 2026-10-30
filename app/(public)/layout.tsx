import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getSiteSettings } from "@/lib/settings";

/**
 * Layout do site público: header + conteúdo + footer, todos alimentados pela
 * identidade dinâmica. O grupo de rotas (admin) terá seu próprio layout
 * protegido em fases futuras.
 */
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-dvh flex-col">
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
