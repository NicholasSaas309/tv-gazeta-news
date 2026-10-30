import { DEFAULT_SITE_SETTINGS } from "./defaults";
import { siteSettingsSchema, type SiteSettings } from "./types";

export type { SiteSettings } from "./types";
export { DEFAULT_SITE_SETTINGS } from "./defaults";

/**
 * Ponto único de acesso à configuração da plataforma.
 *
 * É `async` de propósito: na Fase 1 resolve com os defaults locais, mas a
 * assinatura já é a de uma busca em banco. Na Fase 2+, o corpo passa a
 * consultar o Supabase (tabela `site_settings`) e validar com o mesmo schema,
 * sem que nenhum componente consumidor precise mudar.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  // Fase futura (Supabase):
  //   const { data } = await supabase.from("site_settings").select("*").single();
  //   return siteSettingsSchema.parse(mapRow(data));
  return siteSettingsSchema.parse(DEFAULT_SITE_SETTINGS);
}
