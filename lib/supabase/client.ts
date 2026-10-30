import { createBrowserClient } from "@supabase/ssr";
import { getPublicSupabaseConfig } from "./config";

/**
 * Cliente Supabase para o navegador (Client Components).
 * Usa apenas a anon key pública. A sessão é mantida por cookies, compartilhada
 * com o servidor via @supabase/ssr.
 */
export function createClient() {
  const config = getPublicSupabaseConfig();
  if (!config) {
    throw new Error(
      "Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return createBrowserClient(config.url, config.anonKey);
}
