"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "@/lib/auth/actions";

const initialState: SignInState = { error: null };

/**
 * Formulário de login. Usa Server Action (signIn) — a sessão é gravada em
 * cookies httpOnly no servidor. Sem cadastro: apenas autenticação.
 */
export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirect" value={redirectTo} />

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-content">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-content outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-content">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-content outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </div>

      {state.error ? (
        <p role="alert" className="text-sm font-medium text-brand-accent">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-brand px-4 py-2 font-semibold text-content-inverted hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
