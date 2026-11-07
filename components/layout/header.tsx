import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { LiveClock } from "./live-clock";
import { LiveIndicator } from "./live-indicator";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import type { SiteSettings } from "@/lib/settings";

/**
 * Cabeçalho em duas faixas:
 *  - Topo escuro: relógio ao vivo + selo "AO VIVO".
 *  - Barra principal (sticky): logo + navegação interativa (+ menu mobile).
 */
export function Header({ settings }: { settings: SiteSettings }) {
  return (
    <header>
      {/* Faixa superior */}
      <div className="bg-brand-secondary text-white">
        <Container className="flex h-9 items-center justify-between text-xs">
          <span className="font-medium text-white/80">
            <LiveClock />
          </span>
          <div className="flex items-center gap-4">
            {settings.socialLinks.slice(0, 3).map((l) => (
              <a key={l.url} href={l.url} className="hidden text-white/80 hover:text-white sm:inline">
                {l.label}
              </a>
            ))}
            <ThemeToggle />
            <LiveIndicator />
          </div>
        </Container>
      </div>

      {/* Barra principal */}
      <div className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <Logo settings={settings} priority />

          <nav aria-label="Principal" className="hidden md:block">
            <NavLinks variant="desktop" />
          </nav>

          <details className="relative md:hidden">
            <summary
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-line text-content"
              aria-label="Abrir menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-60 rounded-lg border border-line bg-surface p-2 shadow-lg">
              <NavLinks variant="mobile" />
            </div>
          </details>
        </Container>
      </div>
    </header>
  );
}
