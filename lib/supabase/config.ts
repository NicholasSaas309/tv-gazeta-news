/**
 * Leitura centralizada da configuração pública do Supabase.
 *
 * Apenas as chaves PÚBLICAS (URL + anon key) são lidas aqui — seguras para o
 * cliente. A service_role NUNCA passa por este módulo (ver lib/supabase/admin.ts,
 * que é server-only).
 *
 * Retorna `null` quando não configurado, para que a UI exiba um aviso de setup
 * em vez de quebrar (importante para build/CI sem segredos).
 */
export type PublicSupabaseConfig = {
  url: string;
  anonKey: string;
};

export function getPublicSupabaseConfig(): PublicSupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getPublicSupabaseConfig() !== null;
}
