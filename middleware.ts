import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

/**
 * Escopo estrito: o middleware roda SOMENTE em /admin/*.
 * O site público (Fase 1) permanece intocado.
 */
export const config = {
  matcher: ["/admin/:path*"],
};
