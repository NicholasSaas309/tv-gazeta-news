import { getSessionUser } from "@/lib/auth/session";
import { ROLE_LABELS, can } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

/**
 * Dashboard do painel (Fase 2). Apresenta o usuário/papel e as permissões
 * ativas. As seções de gestão em si chegam nas próximas fases.
 */
export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  const role = user?.role ?? null;

  const permissions = [
    { cap: "manage_users" as const, label: "Gerir usuários e papéis" },
    { cap: "manage_settings" as const, label: "Gerir identidade visual" },
    { cap: "manage_content" as const, label: "Publicar e editar conteúdo" },
    { cap: "author_content" as const, label: "Criar rascunhos próprios" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold text-content">
        Bem-vindo(a), {user?.displayName || user?.email}
      </h1>
      <p className="mt-1 text-content-muted">
        Papel: <strong>{role ? ROLE_LABELS[role] : "Sem papel atribuído"}</strong>
      </p>

      <section className="mt-8 rounded-xl border border-line bg-surface p-5">
        <h2 className="text-lg font-semibold text-content">Suas permissões</h2>
        <ul className="mt-4 space-y-2">
          {permissions.map((p) => {
            const allowed = can(role, p.cap);
            return (
              <li key={p.cap} className="flex items-center gap-3 text-sm">
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                    allowed
                      ? "bg-brand/15 text-brand"
                      : "bg-surface-muted text-content-muted"
                  }`}
                  aria-hidden="true"
                >
                  {allowed ? "✓" : "—"}
                </span>
                <span className={allowed ? "text-content" : "text-content-muted"}>
                  {p.label}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-6 text-sm text-content-muted">
        As ferramentas de gestão serão habilitadas nas próximas fases, conforme
        o seu papel.
      </p>
    </div>
  );
}
