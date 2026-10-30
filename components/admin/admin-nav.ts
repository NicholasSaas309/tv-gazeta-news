import type { Capability } from "@/lib/auth/roles";

/**
 * Itens de navegação do painel. Cada item declara a capacidade necessária
 * (filtra por papel) e se já está disponível. Na Fase 2 só o "Painel" está
 * ativo; os demais aparecem como "em breve" e chegam nas fases seguintes.
 */
export type AdminNavItem = {
  label: string;
  href: string;
  capability: Capability;
  ready: boolean;
};

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Painel", href: "/admin", capability: "author_content", ready: true },
  { label: "Notícias", href: "/admin/noticias", capability: "manage_content", ready: false },
  { label: "Programação", href: "/admin/programacao", capability: "manage_content", ready: false },
  { label: "Programas", href: "/admin/programas", capability: "manage_content", ready: false },
  { label: "Vídeos", href: "/admin/videos", capability: "manage_content", ready: false },
  { label: "Patrocinadores", href: "/admin/patrocinadores", capability: "manage_content", ready: false },
  { label: "Identidade visual", href: "/admin/configuracoes", capability: "manage_settings", ready: false },
  { label: "Usuários", href: "/admin/usuarios", capability: "manage_users", ready: false },
];
