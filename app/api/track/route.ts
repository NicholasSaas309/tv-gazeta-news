import { NextResponse } from "next/server";
import { getPublicSupabaseConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

/**
 * Registra uma visita (carregamento/heartbeat) para a audiência do site.
 * Insere via REST com a anon key (política de insert pública). Falha de forma
 * silenciosa (nunca quebra a navegação do visitante).
 */
export async function POST(request: Request) {
  const config = getPublicSupabaseConfig();
  if (!config) return NextResponse.json({ ok: true });

  try {
    const body = await request.json().catch(() => ({}));
    const visitorId = String(body.visitor_id ?? "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);
    const path = String(body.path ?? "").slice(0, 200);
    if (!visitorId) return NextResponse.json({ ok: false }, { status: 400 });

    await fetch(`${config.url}/rest/v1/page_views`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ visitor_id: visitorId, path }),
    });
  } catch {
    /* no-op: audiência nunca pode atrapalhar a navegação */
  }
  return NextResponse.json({ ok: true });
}
