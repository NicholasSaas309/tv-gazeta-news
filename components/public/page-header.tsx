import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

/** Cabeçalho padrão das páginas internas públicas. */
export function PageHeader({
  title,
  subtitle,
  eyebrow,
  right,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  /** Conteúdo em destaque ao lado do título (ex.: contador de audiência). */
  right?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-brand-secondary text-white">
      {/* brilho de marca ao fundo */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--brand-primary)" }}
        aria-hidden="true"
      />
      <Container className="relative flex flex-col gap-6 py-12 sm:py-16 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="animate-fade-up text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-2 animate-fade-up font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 max-w-2xl animate-fade-up text-white/70">{subtitle}</p>
          ) : null}
        </div>
        {right ? <div className="shrink-0 animate-fade-up">{right}</div> : null}
      </Container>
    </section>
  );
}
