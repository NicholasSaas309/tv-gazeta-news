-- ============================================================================
-- TV Gazeta News — Fase 2: autenticação, papéis e RLS
-- Rode este script no SQL Editor do Supabase (ou via CLI) UMA vez.
-- ============================================================================

-- 1) Enum de papéis -----------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('admin', 'editor', 'reporter');
  end if;
end $$;

-- 2) Tabela de perfis (espelha auth.users) ------------------------------------
create table if not exists public.profiles (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  role         public.user_role not null default 'reporter', -- menor privilégio
  display_name text,
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- 3) Funções auxiliares (SECURITY DEFINER evita recursão de RLS) ---------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where user_id = auth.uid();
$$;

-- 4) Políticas RLS ------------------------------------------------------------
-- Ler o próprio perfil
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = user_id);

-- Admin lê todos os perfis
drop policy if exists profiles_select_admin on public.profiles;
create policy profiles_select_admin on public.profiles
  for select using (public.is_admin());

-- Usuário atualiza o PRÓPRIO perfil (mudança de 'role' é bloqueada por trigger)
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Admin atualiza qualquer perfil (inclusive o papel)
drop policy if exists profiles_update_admin on public.profiles;
create policy profiles_update_admin on public.profiles
  for update using (public.is_admin()) with check (public.is_admin());

-- Somente admin insere/remove perfis manualmente
drop policy if exists profiles_insert_admin on public.profiles;
create policy profiles_insert_admin on public.profiles
  for insert with check (public.is_admin());

drop policy if exists profiles_delete_admin on public.profiles;
create policy profiles_delete_admin on public.profiles
  for delete using (public.is_admin());

-- 5) Impede escalonamento de privilégio (não-admin não altera 'role') ---------
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Apenas administradores podem alterar papéis.';
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_guard_role on public.profiles;
create trigger profiles_guard_role
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();

-- 6) Cria o perfil automaticamente ao criar um usuário (default: repórter) ----
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Observações de segurança:
--  * Não há cadastro público: a criação de usuários é feita pela service_role
--    (script de bootstrap) ou, em fases futuras, pelo admin no servidor.
--  * O primeiro administrador é promovido pelo script scripts/bootstrap-admin.mjs.
-- ============================================================================
