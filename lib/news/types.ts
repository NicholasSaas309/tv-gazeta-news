/** Uma manchete agregada de uma fonte externa. */
export type NewsFeedItem = {
  title: string;
  /** Link para a matéria original (abre em nova aba). */
  link: string;
  /** Nome do veículo (ex.: "G1", "Diário do Nordeste"). */
  source: string;
  /** URL do veículo (home), usada para o favicon/logo. */
  sourceUrl: string | null;
  /** ISO da publicação, quando disponível. */
  publishedAt: string | null;
  /** Rótulo relativo (ex.: "há 12 min"). */
  publishedLabel: string;
  /** Imagem de capa (og:image), preenchida só para destaques. */
  image: string | null;
};

/** Conjunto de manchetes de um estado/cidade. */
export type StateFeed = {
  slug: string;
  label: string;
  items: NewsFeedItem[];
};
