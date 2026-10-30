import { Logo } from "@/components/brand/logo";
import { SetupNotice } from "@/components/admin/setup-notice";
import { getSiteSettings } from "@/lib/settings";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Entrar",
};

/**
 * Página de login — fora do layout protegido (não exige sessão).
 * O redirecionamento de autenticados é feito pelo middleware.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const { redirect } = await searchParams;
  const settings = await getSiteSettings();
  const redirectTo =
    redirect && redirect.startsWith("/admin") ? redirect : "/admin";

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface-muted p-4">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo settings={settings} priority />
        </div>
        <h1 className="mt-6 text-center text-xl font-bold text-content">
          Painel administrativo
        </h1>
        <p className="mt-1 text-center text-sm text-content-muted">
          Acesso restrito à equipe.
        </p>

        <div className="mt-6">
          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </main>
  );
}
