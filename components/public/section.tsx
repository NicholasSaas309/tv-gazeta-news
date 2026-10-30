import Link from "next/link";
import type { ReactNode } from "react";

/** Cabeçalho de seção com título e link opcional "ver todos". */
export function SectionHeading({
  title,
  href,
  linkLabel = "Ver todos",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-l-4 border-brand pl-3">
      <h2 className="font-display text-xl font-bold uppercase tracking-wide text-content sm:text-2xl">
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-brand hover:underline"
        >
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`py-10 sm:py-12 ${className}`}>{children}</section>;
}
