/**
 * Seções planejadas da plataforma. Na Fase 1 são apenas rótulos da estrutura
 * de navegação (as páginas correspondentes chegam nas próximas fases).
 * Centralizar aqui mantém header e footer em sincronia (modularidade).
 */
export type NavItem = {
  label: string;
  href: string;
  /** false enquanto a página não existir (fases futuras). */
  ready: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "/", ready: true },
  { label: "Ao Vivo", href: "/ao-vivo", ready: true },
  { label: "Programação", href: "/programacao", ready: true },
  { label: "Programas", href: "/programas", ready: true },
  { label: "Notícias", href: "/noticias", ready: true },
  { label: "Vídeos", href: "/videos", ready: true },
  { label: "Patrocinadores", href: "/patrocinadores", ready: true },
];
