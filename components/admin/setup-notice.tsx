import { Container } from "@/components/ui/container";

/**
 * Exibido quando o Supabase ainda não está configurado (sem variáveis de
 * ambiente). Mantém o build/CI verdes sem segredos e orienta a ativação.
 */
export function SetupNotice() {
  return (
    <Container className="flex min-h-dvh flex-col items-center justify-center py-20 text-center">
      <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
        Configuração pendente
      </span>
      <h1 className="mt-4 text-2xl font-bold text-content">
        Painel administrativo não configurado
      </h1>
      <p className="mt-2 max-w-md text-content-muted">
        Defina as variáveis do Supabase em <code>.env.local</code> e siga o
        procedimento em <code>docs/FASE-2-SUPABASE.md</code> para ativar o
        acesso administrativo.
      </p>
    </Container>
  );
}
