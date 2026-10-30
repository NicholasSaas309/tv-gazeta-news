/**
 * Modelo de papéis e permissões da plataforma.
 *
 * Fonte única da verdade de autorização no app (espelha o enum `user_role` do
 * banco e complementa a RLS). A RLS é a defesa no banco; `can()` é a defesa na
 * UI/ações — as duas camadas devem concordar.
 */
export const ROLES = ["admin", "editor", "reporter"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Administrador",
  editor: "Editor",
  reporter: "Repórter",
};

/**
 * Capacidades (granularidade de permissão). Definidas aqui já para guiar as
 * próximas fases, mas NENHUMA funcionalidade correspondente é implementada
 * agora — servem para filtrar a navegação do painel e validar ações.
 */
export type Capability =
  | "manage_users" // gerir usuários e papéis
  | "manage_settings" // identidade visual / configurações
  | "manage_content" // publicar/editar conteúdo editorial
  | "author_content"; // criar/editar rascunhos próprios

const MATRIX: Record<Role, Capability[]> = {
  admin: ["manage_users", "manage_settings", "manage_content", "author_content"],
  editor: ["manage_content", "author_content"],
  reporter: ["author_content"],
};

/** Verdadeiro se o papel possui a capacidade. Papel nulo nunca tem acesso. */
export function can(role: Role | null | undefined, capability: Capability): boolean {
  if (!role) return false;
  return MATRIX[role].includes(capability);
}

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}
