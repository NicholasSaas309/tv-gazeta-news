import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { SetupNotice } from "@/components/admin/setup-notice";
import { getSessionUser } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSiteSettings } from "@/lib/settings";

// Sempre dinâmico: depende de sessão (cookies). Nunca prerenderizado.
export const dynamic = "force-dynamic";

/**
 * Layout protegido do painel. Dupla checagem (além do middleware):
 * exige usuário autenticado; sem papel válido não entra. A navegação por
 * papel é resolvida dentro do shell.
 */
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  const settings = await getSiteSettings();

  return (
    <AdminShell
      settings={settings}
      user={{ email: user.email, role: user.role, displayName: user.displayName }}
    >
      {children}
    </AdminShell>
  );
}
