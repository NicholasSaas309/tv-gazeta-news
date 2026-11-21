import type { ReactNode } from "react";
import { getSessionUser } from "@/lib/auth/session";
import { ROLE_LABELS, can } from "@/lib/auth/roles";
import { getAudienceStats } from "@/lib/analytics/stats";
import { getSiteSettings } from "@/lib/settings";
import { getLiveStatus } from "@/lib/live/youtube-status";
import { AutoRefresh } from "@/components/admin/auto-refresh";

export const dynamic = "force-dynamic";

const nf = new Intl.NumberFormat("pt-BR");

/**
 * Dashboard do painel: resumo de AUDIÊNCIA (estilo rede social) + permissões.
 * Todos os números são reais: visitantes do site vêm da nossa contagem; os de
 * YouTube vêm do estado real da transmissão. Nada é inventado.
 */
export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  const role = user?.role ?? null;

  const stats = await getAudienceStats();
  const settings = await getSiteSettings();
  const videoId =
    settings.liveSource.type === "youtube" ? settings.liveSource.videoId : "";
  const live = videoId ? await getLiveStatus(videoId) : null;

  const permissions = [
    { cap: "manage_users" as const, label: "Gerir usuários e papéis" },
    { cap: "manage_settings" as const, label: "Gerir identidade visual" },
    { cap: "manage_content" as const, label: "Publicar e editar conteúdo" },
    { cap: "author_content" as const, label: "Criar rascunhos próprios" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <AutoRefresh seconds={30} />

      <h1 className="text-2xl font-bold text-content">
        Bem-vindo(a), {user?.displayName || user?.email}
      </h1>
      <p className="mt-1 text-content-muted">
        Papel: <strong>{role ? ROLE_LABELS[role] : "Sem papel atribuído"}</strong>
      </p>

      {/* ── Audiência ─────────────────────────────────────────── */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-content">
            Audiência
          </h2>
          <span className="text-xs text-content-muted">atualiza automaticamente</span>
        </div>

        {stats ? (
          <>
            <p className="mt-2 text-sm text-content-muted">
              Agora <strong className="text-content">{nf.format(stats.onlineNow)}</strong>{" "}
              {stats.onlineNow === 1 ? "pessoa" : "pessoas"} no site
              {live?.isLive && live.viewers != null ? (
                <> · <strong className="text-content">{nf.format(live.viewers)}</strong> assistindo à transmissão ao vivo</>
              ) : null}
              . Hoje já foram{" "}
              <strong className="text-content">{nf.format(stats.visitorsToday)}</strong>{" "}
              {stats.visitorsToday === 1 ? "visitante" : "visitantes"}.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat
                label="Online agora"
                value={nf.format(stats.onlineNow)}
                hint="no site"
                live
              />
              <Stat
                label="Ao vivo agora"
                value={
                  live?.isLive
                    ? live.viewers != null
                      ? nf.format(live.viewers)
                      : "—"
                    : "Fora do ar"
                }
                hint={
                  live?.isLive
                    ? live.viewers != null
                      ? "espectadores (YouTube)"
                      : "requer chave da API p/ contar"
                    : "transmissão"
                }
                accent={Boolean(live?.isLive)}
              />
              <Stat
                label="Última transmissão"
                value={live?.totalViews != null ? nf.format(live.totalViews) : "—"}
                hint="visualizações (YouTube)"
              />
              <Stat
                label="Visitas hoje"
                value={nf.format(stats.viewsToday)}
                hint={`${nf.format(stats.visitorsToday)} pessoas`}
              />
              <Stat
                label="Visitas (7 dias)"
                value={nf.format(stats.viewsWeek)}
                hint={`${nf.format(stats.visitorsWeek)} pessoas`}
              />
            </div>
          </>
        ) : (
          <div className="mt-3 rounded-xl border border-dashed border-line bg-surface p-5 text-sm text-content-muted">
            A audiência ainda não está ativada. Rode a migração{" "}
            <code>supabase/migrations/0003_analytics.sql</code> no Supabase para
            começar a contar os visitantes. (O site já funciona normalmente.)
          </div>
        )}
      </section>

      {/* ── Permissões ────────────────────────────────────────── */}
      <section className="mt-8 rounded-xl border border-line bg-surface p-5">
        <h2 className="text-lg font-semibold text-content">Suas permissões</h2>
        <ul className="mt-4 space-y-2">
          {permissions.map((p) => {
            const allowed = can(role, p.cap);
            return (
              <li key={p.cap} className="flex items-center gap-3 text-sm">
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                    allowed ? "bg-brand/15 text-brand" : "bg-surface-muted text-content-muted"
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
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  live = false,
  accent = false,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  live?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-content-muted">
        {live ? <span className="h-1.5 w-1.5 rounded-full bg-brand animate-live-pulse" aria-hidden="true" /> : null}
        {label}
      </div>
      <div
        className={`mt-1 font-display text-2xl font-bold tabular-nums ${
          accent ? "text-brand-accent" : "text-content"
        }`}
      >
        {value}
      </div>
      {hint ? <div className="text-xs text-content-muted">{hint}</div> : null}
    </div>
  );
}
