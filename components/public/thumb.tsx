/**
 * Placeholder visual de mídia (capa de notícia, thumbnail de vídeo etc.).
 * Gera um gradiente determinístico a partir de uma "seed". Com zoom e brilho
 * ao passar o mouse quando usado dentro de um elemento `.group`.
 * Quando houver imagens reais (CMS), troca-se por <Image/>.
 */
function hashHue(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) % 360;
  }
  return h;
}

export function Thumb({
  seed,
  label,
  aspect = "video",
  play = false,
  className = "",
}: {
  seed: string;
  label?: string;
  aspect?: "video" | "square" | "wide";
  play?: boolean;
  className?: string;
}) {
  const hue = hashHue(seed);
  const hue2 = (hue + 35) % 360;
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "wide" ? "aspect-[21/9]" : "aspect-video";

  return (
    <div className={`relative overflow-hidden rounded-lg ${aspectClass} ${className}`}>
      {/* Camada de gradiente (faz zoom no hover do card) */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(${hue} 60% 32%), hsl(${hue2} 65% 22%))`,
        }}
        aria-hidden="true"
      />
      {/* Vinheta para profundidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
      {/* Brilho diagonal no hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />

      {play ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand shadow-lg transition-transform duration-300 group-hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      ) : null}

      {label ? (
        <span className="absolute bottom-0 left-0 m-3 rounded bg-brand px-2 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
          {label}
        </span>
      ) : null}
    </div>
  );
}
