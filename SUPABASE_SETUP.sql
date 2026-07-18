-- STRATA v1.5.2 — Supabase cloud-backup foundation
-- Run this once in Supabase SQL Editor for your project.

create table if not exists public.strata_cloud_backups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  backup_data jsonb not null default '{}'::jsonb,
  backup_summary jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (user_id)
);

alter table public.strata_cloud_backups enable row level security;

drop policy if exists "STRATA users can read own backup" on public.strata_cloud_backups;
create policy "STRATA users can read own backup"
  on public.strata_cloud_backups
  for select
  using (auth.uid() = user_id);

drop policy if exists "STRATA users can insert own backup" on public.strata_cloud_backups;
create policy "STRATA users can insert own backup"
  on public.strata_cloud_backups
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "STRATA users can update own backup" on public.strata_cloud_backups;
create policy "STRATA users can update own backup"
  on public.strata_cloud_backups
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "STRATA users can delete own backup" on public.strata_cloud_backups;
create policy "STRATA users can delete own backup"
  on public.strata_cloud_backups
  for delete
  using (auth.uid() = user_id);
