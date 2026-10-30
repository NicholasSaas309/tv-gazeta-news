import type { Sponsor, SponsorTier } from "@/lib/content/types";

const TIER_ORDER: SponsorTier[] = ["Ouro", "Prata", "Bronze", "Apoio"];

/** Iniciais para o "logo" placeholder do patrocinador. */
function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4 transition-shadow hover:shadow-sm"
      title={sponsor.name}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-surface-muted text-sm font-bold text-content">
        {initials(sponsor.name)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-content">
          {sponsor.name}
        </span>
        <span className="text-xs text-content-muted">{sponsor.tier}</span>
      </span>
    </a>
  );
}

/** Faixa compacta de patrocinadores (para a home). */
export function SponsorStrip({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {sponsors.map((s) => (
        <SponsorLogo key={s.name} sponsor={s} />
      ))}
    </div>
  );
}

/** Grade completa agrupada por cota (para a página de patrocinadores). */
export function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="space-y-10">
      {TIER_ORDER.map((tier) => {
        const group = sponsors.filter((s) => s.tier === tier);
        if (group.length === 0) return null;
        return (
          <div key={tier}>
            <h2 className="border-l-4 border-brand pl-3 text-lg font-bold text-content">
              Cota {tier}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.map((s) => (
                <SponsorLogo key={s.name} sponsor={s} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
