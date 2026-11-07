"use client";

import { useActionState, useState } from "react";
import { saveTransmissao, type TransmissaoState } from "@/lib/admin/transmissao-actions";

const initialState: TransmissaoState = { error: null, ok: false };

export function TransmissaoForm({
  initialEnabled,
  initialRef,
  initialChannel,
}: {
  initialEnabled: boolean;
  initialRef: string;
  initialChannel: string;
}) {
  const [state, formAction, pending] = useActionState(saveTransmissao, initialState);
  const [enabled, setEnabled] = useState(initialEnabled);

  return (
    <form action={formAction} className="space-y-5">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="enabled"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="h-4 w-4 accent-[color:var(--brand-primary)]"
        />
        <span className="text-sm font-medium text-content">Transmissão ativa</span>
      </label>

      <div>
        <label htmlFor="youtubeRef" className="block text-sm font-medium text-content">
          Link ou ID do vídeo/live do YouTube
        </label>
        <input
          id="youtubeRef"
          name="youtubeRef"
          type="text"
          defaultValue={initialRef}
          disabled={!enabled}
          placeholder="https://youtu.be/XXXXXXXXXXX ou XXXXXXXXXXX"
          className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-content outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 disabled:opacity-50"
        />
        <p className="mt-1 text-xs text-content-muted">
          Aceita o link completo (watch, youtu.be, /live, /embed) ou só o ID de 11 caracteres.
        </p>
      </div>

      <div>
        <label htmlFor="channelId" className="block text-sm font-medium text-content">
          ID do canal do YouTube <span className="text-content-muted">(opcional — para vídeos recentes)</span>
        </label>
        <input
          id="channelId"
          name="channelId"
          type="text"
          defaultValue={initialChannel}
          placeholder="UCxxxxxxxxxxxxxxxxxxxxxx"
          className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-content outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </div>

      {state.error ? (
        <p role="alert" className="text-sm font-medium text-brand-accent">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p role="status" className="text-sm font-medium text-brand">
          Configuração salva. O site já reflete a mudança.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand px-5 py-2.5 font-semibold text-content-inverted hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Salvando…" : "Salvar"}
      </button>
    </form>
  );
}
