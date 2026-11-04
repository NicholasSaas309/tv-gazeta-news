/** Favicon/logo do veículo a partir da URL da fonte (serviço do Google). */
export function faviconFor(sourceUrl: string | null): string | null {
  if (!sourceUrl) return null;
  try {
    const host = new URL(sourceUrl).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
  } catch {
    return null;
  }
}
