import { Container } from "@/components/ui/container";
import type { SiteSettings } from "@/lib/settings";

/** Rodapé lendo a identidade dinâmica (nome, tagline, redes sociais). */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface-muted">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold text-content">{settings.name}</p>
          {settings.tagline ? (
            <p className="mt-1 text-sm text-content-muted">{settings.tagline}</p>
          ) : null}
        </div>

        {settings.socialLinks.length > 0 ? (
          <nav aria-label="Redes sociais">
            <ul className="flex flex-wrap gap-4">
              {settings.socialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-content-muted hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>

      <div className="border-t border-line">
        <Container className="py-4">
          <p className="text-xs text-content-muted">
            © {year} {settings.name}. Todos os direitos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
