import type { SiteSettings } from "@/lib/settings";

/**
 * Converte a identidade visual (site_settings) em CSS custom properties.
 * Estas variáveis são consumidas pelo Tailwind (ver tailwind.config.ts) e
 * injetadas em runtime no <head>, de modo que trocar as cores da marca
 * reflete imediatamente, sem recompilar nem redeployar.
 */
export function buildThemeVars(settings: SiteSettings): Record<string, string> {
  const { colors } = settings;
  return {
    "--brand-primary": colors.primary,
    "--brand-secondary": colors.secondary,
    "--brand-accent": colors.accent,
    "--surface": "#ffffff",
    "--surface-muted": "#f4f6fb",
    "--content": "#0b0f1a",
    "--content-muted": "#5b6577",
    "--content-inverted": "#ffffff",
    "--line": "#e3e8f0",
  };
}

/** Serializa as variáveis como um bloco CSS para injeção em <style>. */
export function themeCss(settings: SiteSettings): string {
  const vars = buildThemeVars(settings);
  const body = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
  return `:root {\n${body}\n}`;
}
