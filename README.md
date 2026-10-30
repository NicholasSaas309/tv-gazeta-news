# TV Gazeta News

Plataforma de TV online — **Fase 1: fundação + sistema de tema**.

Site público responsivo em Next.js (App Router) + Tailwind, com **identidade visual
totalmente configurável** a partir de `site_settings`. Preparado para deploy na Vercel.

> Escopo desta fase: fundação, estrutura modular, responsividade e identidade visual
> configurável. Player ao vivo, admin, notícias, programação etc. são fases futuras
> e **não** estão implementados. Nenhum serviço externo é conectado e nenhum deploy é feito.

## Stack

- **Next.js 15** (App Router, TypeScript) — pronto para Vercel
- **Tailwind CSS 3** — tema via CSS variables
- **Zod** — validação do schema de settings

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

Outros scripts:

```bash
npm run build      # build de produção
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # TypeScript sem emitir
```

## Identidade visual configurável

Toda a marca (nome, logo, favicon, cores, tagline, redes, fonte do live) vive em
um único lugar:

- Contrato/validação: [`lib/settings/types.ts`](lib/settings/types.ts)
- Valores padrão (TV Gazeta News): [`lib/settings/defaults.ts`](lib/settings/defaults.ts)
- Acesso único (async, pronto p/ Supabase): [`lib/settings/index.ts`](lib/settings/index.ts)
- Tema (CSS variables): [`lib/theme/index.ts`](lib/theme/index.ts)

**Trocar nome/logo/cores** = alterar `DEFAULT_SITE_SETTINGS` (ou, na Fase 2+, o
registro no Supabase). Nenhum componente referencia a marca diretamente; todos leem
de `getSiteSettings()`. As cores são injetadas como CSS variables em runtime
(`app/layout.tsx`), então a troca reflete sem recompilar o Tailwind.

## Estrutura

```
app/
  layout.tsx            # tema + metadados a partir dos settings
  (public)/
    layout.tsx          # header + footer dinâmicos
    page.tsx            # home (fundação; placeholder do player)
  not-found.tsx
components/
  brand/logo.tsx        # logo dinâmico
  layout/               # header, footer, nav-items (fonte única de seções)
  ui/container.tsx
lib/
  settings/             # schema + defaults + acesso (troca p/ Supabase depois)
  theme/                # settings -> CSS variables
public/brand/logo.png   # logo padrão
```

## Próximas fases (não nesta entrega)

Auth + painel admin, gestão da identidade pelo admin, player ao vivo
(YouTube/VDO.Ninja via OBS), notícias, programação, vídeos, patrocinadores.
Ver plano de arquitetura completo.
