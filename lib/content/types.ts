/**
 * Tipos do conteúdo público. Espelham (de forma simplificada) as tabelas
 * planejadas no Supabase (plano §3). Na etapa atual o conteúdo é de EXEMPLO,
 * definido em lib/content/sample.ts — nenhum backend é consultado.
 *
 * Quando o CMS entrar (fases futuras), os getters passam a buscar do banco e
 * retornam estes mesmos tipos, sem alterar as páginas que os consomem.
 */

export type NewsCategory =
  | "Política"
  | "Economia"
  | "Cidades"
  | "Brasil"
  | "Esportes"
  | "Cultura";

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  author: string;
  /** Rótulo de data legível (ex.: "30 out 2025, 14:20"). */
  publishedLabel: string;
  /** Corpo em parágrafos. */
  body: string[];
  featured?: boolean;
};

export type Program = {
  slug: string;
  title: string;
  description: string;
  host: string;
  /** Faixa/horário resumido (ex.: "Seg a Sex, 12h"). */
  scheduleLabel: string;
};

export type Weekday =
  | "Segunda"
  | "Terça"
  | "Quarta"
  | "Quinta"
  | "Sexta"
  | "Sábado"
  | "Domingo";

export type ScheduleEntry = {
  weekday: Weekday;
  start: string; // "HH:MM"
  end: string; // "HH:MM"
  title: string;
  programSlug?: string;
  live?: boolean;
};

export type Video = {
  slug: string;
  title: string;
  description: string;
  durationLabel: string; // "12:34"
  programSlug?: string;
  publishedLabel: string;
};

export type SponsorTier = "Ouro" | "Prata" | "Bronze" | "Apoio";

export type Sponsor = {
  name: string;
  tier: SponsorTier;
  url: string;
};
