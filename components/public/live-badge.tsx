import Link from "next/link";

/** Selo "AO VIVO" com ponto pulsante. */
export function LiveBadge({
  href,
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  const inner = (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm animate-ring-pulse ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white animate-live-pulse" aria-hidden="true" />
      Ao vivo
    </span>
  );

  return href ? (
    <Link href={href} aria-label="Assistir ao vivo">
      {inner}
    </Link>
  ) : (
    inner
  );
}
