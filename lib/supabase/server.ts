import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getPublicSupabaseConfig } from "./config";

/**
 * Cliente Supabase para o servidor (Server Components, Server Actions, Route
 * Handlers). Lê/escreve a sessão nos cookies da requisição. Usa a anon key —
 * toda a autorização passa pelas políticas RLS.
 */
export async function createClient() {
  const cookieStore = await cookies();
  const config = getPublicSupabaseConfig();
  if (!config) {
    throw new Error(
      "Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // Pode falhar quando chamado de um Server Component (sem resposta
        // mutável). O refresh de sessão acontece no middleware, então ignoramos.
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          /* no-op */
        }
      },
    },
  });
}
