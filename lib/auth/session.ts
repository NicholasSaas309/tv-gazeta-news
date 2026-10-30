import { createClient } from "@/lib/supabase/server";
import { isRole, type Role } from "./roles";

export type SessionUser = {
  id: string;
  email: string | null;
  role: Role | null;
  displayName: string | null;
  avatarUrl: string | null;
};

/**
 * Retorna o usuário autenticado + seu papel (lido de `profiles` via RLS), ou
 * null se não autenticado. `getUser()` valida o token no servidor Supabase —
 * nunca confiamos apenas no cookie.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, display_name, avatar_url")
    .eq("user_id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email ?? null,
    role: isRole(profile?.role) ? profile.role : null,
    displayName: profile?.display_name ?? null,
    avatarUrl: profile?.avatar_url ?? null,
  };
}
