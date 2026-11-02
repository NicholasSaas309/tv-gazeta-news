import { z } from "zod";

/**
 * Schema de `site_settings` — espelha a tabela singleton planejada no Supabase
 * (ver plano, §3). Define TODA a identidade visual e configuração de marca
 * da plataforma. Trocar nome/logo/cores = alterar estes valores.
 *
 * Na Fase 1 os valores vêm de defaults locais (lib/settings/defaults.ts).
 * Na Fase 2+ virão do Supabase, validados por este mesmo schema.
 */

const hexColor = z
  .string()
  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Cor deve ser hex, ex.: #1554c7");

export const socialLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

export const liveSourceSchema = z.object({
  /** Abstração do distribuidor: hoje "youtube"; aberto a outros no futuro. */
  type: z.enum(["youtube", "none"]).default("none"),
  /** ID do vídeo/live (ex.: YouTube videoId). Vazio = sem live configurado. */
  videoId: z.string().default(""),
  /** URL completa alternativa, quando aplicável. */
  url: z.string().default(""),
  /** Flag operacional de "no ar". */
  isLive: z.boolean().default(false),
});

export const brandColorsSchema = z.object({
  primary: hexColor,
  secondary: hexColor,
  accent: hexColor,
});

export const siteSettingsSchema = z.object({
  /** Nome exibido da TV (provisório: "TV Gazeta News"). */
  name: z.string().min(1),
  /** Slogan/tagline. */
  tagline: z.string().default(""),
  /** Descrição curta para SEO/metadados. */
  description: z.string().default(""),
  /** Caminho/URL do logo principal. */
  logoUrl: z.string().min(1),
  /** Texto alternativo do logo (acessibilidade). */
  logoAlt: z.string().default(""),
  /** Favicon. */
  faviconUrl: z.string().default("/favicon.ico"),
  /** Paleta de marca (injetada como CSS variables). */
  colors: brandColorsSchema,
  /** Links de redes sociais. */
  socialLinks: z.array(socialLinkSchema).default([]),
  /** Configuração da fonte de transmissão ao vivo (player — Fase 4). */
  liveSource: liveSourceSchema,
  /**
   * ID do canal do YouTube da TV (ex.: "UCxxxx"). Usado para listar
   * automaticamente os vídeos recentes/lives gravadas abaixo da transmissão.
   * Vazio = seção de vídeos fica em modo "aguardando".
   */
  youtubeChannelId: z.string().default(""),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;
export type LiveSource = z.infer<typeof liveSourceSchema>;
export type BrandColors = z.infer<typeof brandColorsSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
