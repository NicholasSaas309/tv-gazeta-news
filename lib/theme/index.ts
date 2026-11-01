import type { SiteSettings } from "@/lib/settings";

/**
 * Tema dirigido por CSS variables, com suporte a claro/escuro.
 *
 * - Cores de marca vêm de site_settings (configuráveis). No escuro são
 *   clareadas com color-mix para manter contraste.
 * - Tokens semânticos (surface/content/line) têm variação clara e escura.
 *
 * Seletores:
 *   :root                        → claro (padrão)
 *   :root[data-theme="dark"]     → escuro forçado (toggle)
 *   @media dark + :not(light)    → escuro por preferência do sistema (sem JS)
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

function darkTokens(settings: SiteSettings): string {
  const { primary, accent } = settings.colors;
  return [
    `--brand-primary: color-mix(in srgb, ${primary} 68%, white)`,
    `--brand-accent: color-mix(in srgb, ${accent} 80%, white)`,
    `--surface: #0b0f17`,
    `--surface-muted: #141b29`,
    `--content: #e9edf5`,
    `--content-muted: #9aa6bc`,
    `--content-inverted: #ffffff`,
    `--line: #243049`,
    `color-scheme: dark`,
  ].join(";\n  ");
}

/** CSS completo do tema (claro + escuro) para injeção em <style>. */
export function themeCss(settings: SiteSettings): string {
  const light = Object.entries(buildThemeVars(settings))
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
  const dark = darkTokens(settings);

  return `:root {
${light}
  color-scheme: light;
}
:root[data-theme="dark"] {
  ${dark};
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    ${dark};
  }
}`;
}
