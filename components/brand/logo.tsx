import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/settings";

/**
 * Logo dinâmico: usa a imagem definida em site_settings. Se o logo não
 * carregar, o texto da marca (alt) permanece acessível. Trocar o logo é
 * alterar `logoUrl` nos settings — nenhum caminho fica fixo na UI.
 */
export function Logo({
  settings,
  className = "",
  priority = false,
}: {
  settings: SiteSettings;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${settings.name} — página inicial`}
      className={`inline-flex items-center dark:rounded-md dark:bg-white dark:px-2 dark:py-1 ${className}`}
    >
      <Image
        src={settings.logoUrl}
        alt={settings.logoAlt || settings.name}
        width={360}
        height={120}
        priority={priority}
        className="h-10 w-auto sm:h-12"
      />
    </Link>
  );
}
