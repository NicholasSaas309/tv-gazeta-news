import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente administrativo com SERVICE_ROLE — ignora RLS.
 *
 * ⚠️ NUNCA deve ser importado por código de cliente. O import "server-only"
 * acima faz o build FALHAR se isso acontecer, garantindo que a service_role
 * jamais chegue ao bundle do navegador.
 *
 * Uso previsto: operações privilegiadas feitas 100% no servidor (ex.: criação
 * de usuários pelo admin em fases futuras). Não é usado no fluxo de login.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Service role não configurada. Defina SUPABASE_SERVICE_ROLE_KEY (apenas no servidor).",
    );
  }
  return createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
