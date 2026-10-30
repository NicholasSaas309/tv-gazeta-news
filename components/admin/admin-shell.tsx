import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import { signOut } from "@/lib/auth/actions";
import { can, ROLE_LABELS, type Role } from "@/lib/auth/roles";
import type { SiteSettings } from "@/lib/settings";
import { ADMIN_NAV } from "./admin-nav";

/**
 * Layout responsivo do painel administrativo.
 * - Desktop (md+): sidebar fixa à esquerda.
 * - Mobile: menu em disclosure nativo (<details>) no topo, sem depender de JS.
 * A navegação é filtrada pelo papel do usuário (can()).
 */
export function AdminShell({
  settings,
  user,
  children,
}: {
  settings: SiteSettings;
  user: { email: string | null; role: Role | null; displayName: string | null };
  children: ReactNode;
}) {
  const items = ADMIN_NAV.filter((item) => can(user.role, item.capability));

  return (
    <div className="flex min-h-dvh bg-surface-muted">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-surface md:flex">
        <div className="border-b border-line p-4">
          <Logo settings={settings} />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-content-muted">
            Painel administrativo
          </p>
        </div>
        <nav aria-label="Painel" className="flex-1 overflow-y-auto p-3">
          <NavList items={items} />
        </nav>
      </aside>

      {/* Coluna principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-surface">
          <div className="flex h-16 items-center justify-between gap-3 px-4">
            {/* Menu mobile */}
            <details className="relative md:hidden">
              <summary
                className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-line text-content"
                aria-label="Abrir menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </summary>
              <div className="absolute left-0 mt-2 w-64 rounded-lg border border-line bg-surface p-3 shadow-lg">
                <NavList items={items} />
              </div>
            </details>

            <p className="truncate font-semibold text-content">{settings.name}</p>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="max-w-[200px] truncate text-sm text-content">
                  {user.displayName || user.email}
                </p>
                <p className="text-xs text-content-muted">
                  {user.role ? ROLE_LABELS[user.role] : "Sem papel"}
                </p>
              </div>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-md border border-line px-3 py-2 text-sm font-medium text-content hover:bg-surface-muted"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function NavList({
  items,
}: {
  items: { label: string; href: string; ready: boolean }[];
}) {
  return (
    <ul className="space-y-1">
      {items.map((item) =>
        item.ready ? (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-content hover:bg-surface-muted hover:text-brand"
            >
              {item.label}
            </Link>
          </li>
        ) : (
          <li key={item.href}>
            <span
              className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-content-muted"
              aria-disabled="true"
              title="Em breve"
            >
              {item.label}
              <span className="text-[10px] uppercase tracking-wide">em breve</span>
            </span>
          </li>
        ),
      )}
    </ul>
  );
}
