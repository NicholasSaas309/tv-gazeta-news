import type { SiteSettings } from "./types";

/**
 * Identidade visual padrão da TV Gazeta News (provisória).
 *
 * Derivada do banner oficial: "TV GAZETA" em azul royal + "NEWS" em preto,
 * tagline "Informação sem fronteiras". Estes valores são o único lugar com
 * a marca "hard-coded" — toda a UI lê deles. Na Fase 2+ serão substituídos
 * pelo registro de `site_settings` no Supabase, mantendo o mesmo formato.
 */
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  name: "TV Gazeta News",
  tagline: "Informação sem fronteiras",
  description:
    "TV Gazeta News — jornalismo e programação ao vivo. Informação sem fronteiras.",
  logoUrl: "/brand/logo.png",
  logoAlt: "TV Gazeta News",
  faviconUrl: "/favicon.ico",
  colors: {
    primary: "#1554c7", // azul royal da marca
    secondary: "#0b0f1a", // preto/grafite de "NEWS"
    accent: "#e11d2a", // vermelho de apoio (triângulo da bandeira de MG)
  },
  socialLinks: [],
  liveSource: {
    type: "none",
    videoId: "",
    url: "",
    isLive: false,
  },
};
