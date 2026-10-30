"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SignInState = { error: string | null };

/** Impede open-redirect: só aceita caminhos internos de /admin. */
function safeRedirect(target: string): string {
  if (target.startsWith("/admin") && !target.startsWith("/admin/login")) {
    return target;
  }
  return "/admin";
}

/**
 * Login por e-mail + senha (sem cadastro público). Executado no servidor para
 * que a sessão seja gravada em cookies httpOnly. Credenciais nunca passam pelo
 * cliente além do envio do formulário.
 */
export async function signIn(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = safeRedirect(String(formData.get("redirect") ?? "/admin"));

  if (!email || !password) {
    return { error: "Informe e-mail e senha." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Mensagem genérica (não revela se o e-mail existe).
    return { error: "Credenciais inválidas." };
  }

  redirect(redirectTo);
}

/** Encerra a sessão e volta ao login. */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
