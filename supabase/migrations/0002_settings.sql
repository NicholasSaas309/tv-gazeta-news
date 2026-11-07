-- ============================================================================
-- TV Gazeta News — Configurações do site (transmissão ao vivo etc.)
-- Rode no SQL Editor do Supabase UMA vez (após a 0001).
-- ============================================================================

-- Tabela singleton de configurações (apenas 1 linha, id = 1).
create table if not exists public.app_settings (
  id               smallint primary key default 1 check (id = 1),
  live_type        text not null default 'none' check (live_type in ('none', 'youtube')),
  live_video_id    text not null default '',
  live_url         text not null default '',
  youtube_channel_id text not null default '',
  updated_at       timestamptz not null default now(),
  updated_by       uuid references auth.users (id)
);

-- Garante a linha única.
insert into public.app_settings (id) values (1) on conflict (id) do nothing;

alter table public.app_settings enable row level security;

-- Leitura pública (o site lê a config da transmissão com a anon key).
drop policy if exists app_settings_select_public on public.app_settings;
create policy app_settings_select_public on public.app_settings
  for select using (true);

-- Escrita apenas para admin ou editor (capability manage_settings).
drop policy if exists app_settings_update_staff on public.app_settings;
create policy app_settings_update_staff on public.app_settings
  for update
  using (public.current_user_role() in ('admin', 'editor'))
  with check (public.current_user_role() in ('admin', 'editor'));

drop policy if exists app_settings_insert_staff on public.app_settings;
create policy app_settings_insert_staff on public.app_settings
  for insert
  with check (public.current_user_role() in ('admin', 'editor'));

-- Atualiza updated_at automaticamente.
create or replace function public.app_settings_touch()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists app_settings_touch on public.app_settings;
create trigger app_settings_touch
  before update on public.app_settings
  for each row execute function public.app_settings_touch();
