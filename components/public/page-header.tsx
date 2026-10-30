import { Container } from "@/components/ui/container";

/** Cabeçalho padrão das páginas internas públicas. */
export function PageHeader({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-brand-secondary text-white">
      {/* brilho de marca ao fundo */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--brand-primary)" }}
        aria-hidden="true"
      />
      <Container className="relative py-12 sm:py-16">
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
      </Container>
    </section>
  );
}
