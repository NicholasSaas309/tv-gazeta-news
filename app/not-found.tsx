import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-dvh flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">Erro 404</p>
      <h1 className="mt-3 text-3xl font-bold text-content">Página não encontrada</h1>
      <p className="mt-2 max-w-md text-content-muted">
        A página que você procura não existe ou ainda não está disponível.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-content-inverted hover:opacity-90"
      >
        Voltar ao início
      </Link>
    </Container>
  );
}
