-- ============================================================================
-- TV Gazeta News — Audiência do site (contagem própria de visitas)
-- Rode no SQL Editor do Supabase UMA vez (após a 0001 e 0002).
-- ============================================================================

-- Eventos de visita (1 linha por carregamento/heartbeat).
create table if not exists public.page_views (
  id          bigint generated always as identity primary key,
  visitor_id  text not null,
  path        text not null default '',
  created_at  timestamptz not null default now()
);
create index if not exists page_views_created_idx on public.page_views (created_at);
create index if not exists page_views_visitor_idx on public.page_views (visitor_id, created_at);

alter table public.page_views enable row level security;

-- Qualquer visitante pode registrar sua própria visita (contagem pública).
drop policy if exists page_views_insert_anon on public.page_views;
create policy page_views_insert_anon on public.page_views
  for insert with check (true);

-- Só a equipe lê os eventos brutos.
drop policy if exists page_views_select_staff on public.page_views;
create policy page_views_select_staff on public.page_views
  for select using (public.current_user_role() in ('admin', 'editor'));

-- Resumo agregado (estilo "rede social"), só para admin/editor.
create or replace function public.audience_stats()
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.user_role;
  result json;
begin
  select public.current_user_role() into r;
  if r is null or r not in ('admin', 'editor') then
    raise exception 'forbidden';
  end if;

  select json_build_object(
    'online_now',     (select count(distinct visitor_id) from page_views where created_at > now() - interval '3 minutes'),
    'views_today',    (select count(*)                   from page_views where created_at >= date_trunc('day', now())),
    'visitors_today', (select count(distinct visitor_id) from page_views where created_at >= date_trunc('day', now())),
    'views_week',     (select count(*)                   from page_views where created_at >= now() - interval '7 days'),
    'visitors_week',  (select count(distinct visitor_id) from page_views where created_at >= now() - interval '7 days')
  ) into result;

  return result;
end;
$$;
