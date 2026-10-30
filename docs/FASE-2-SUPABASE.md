# Fase 2 — Ativação do Supabase (auth + papéis + RLS)

Esta fase foi **implementada em código** e verificada (typecheck, lint, build). Para
**ativar** o painel administrativo você precisa de um projeto Supabase e executar os
passos abaixo. Nenhum segredo fica no repositório; a `service_role` é usada só localmente.

## Pré-requisitos

- Conta Supabase (plano **Free** basta) → https://supabase.com
- Node 20.6+ (aqui: Node 24)

## Passo a passo

### 1. Criar o projeto Supabase
No painel do Supabase, crie um projeto. Anote a senha do banco (guardada por você).

### 2. Copiar as chaves
Em **Project Settings → API**, copie:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ **secreta** (nunca no cliente/commit)

### 3. Criar o `.env.local`
Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> `.env.local` já está no `.gitignore`.

### 4. Rodar a migração (RLS + papéis)
Abra **SQL Editor** no Supabase, cole o conteúdo de
[`supabase/migrations/0001_auth_roles.sql`](../supabase/migrations/0001_auth_roles.sql)
e execute. Isso cria: enum de papéis, tabela `profiles`, RLS, triggers de
segurança (anti-escalonamento de papel) e criação automática de perfil.

### 5. Criar o primeiro administrador (procedimento seguro)
Não há cadastro público. Crie o admin localmente:

```bash
node --env-file=.env.local scripts/bootstrap-admin.mjs seu-email@exemplo.com
```

- O e-mail pode ser passado como argumento ou digitado quando solicitado.
- A **senha é digitada de forma oculta** (sem eco na tela e sem ficar no
  histórico do terminal), com confirmação.
- Cria o usuário (e-mail já confirmado) e o promove a `admin`.
- Se o usuário já existir, apenas promove a admin (não pede senha).

### 6. Entrar
```bash
npm run dev
```
Acesse http://localhost:3000/admin → será redirecionado para `/admin/login`.
Entre com o e-mail/senha do admin.

## Papéis e permissões

| Papel | manage_users | manage_settings | manage_content | author_content |
|---|:--:|:--:|:--:|:--:|
| **admin** | ✓ | ✓ | ✓ | ✓ |
| **editor** | — | — | ✓ | ✓ |
| **repórter** | — | — | — | ✓ |

Novos usuários nascem como **repórter** (menor privilégio). Só um admin pode
elevar papéis — reforçado por RLS **e** por trigger no banco.

## Garantias de segurança

- **Sem cadastro público**: login apenas; criação via service_role (local) ou admin (futuro).
- **service_role nunca no frontend**: `lib/supabase/admin.ts` importa `server-only`
  (o build falha se for parar no cliente). O login usa só a anon key.
- **Proteção de rotas**: `middleware.ts` cobre apenas `/admin/*`; o site público
  (Fase 1) não é afetado.
- **Defense in depth**: middleware (autenticação) + layout do painel (sessão/papel)
  + RLS no banco. Sessão validada no servidor com `auth.getUser()`.
- **Anti-escalonamento**: trigger `prevent_role_escalation` bloqueia um não-admin
  de alterar o próprio papel, mesmo que uma política de update o permitisse.
