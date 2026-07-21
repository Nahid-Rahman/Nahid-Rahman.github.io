-- Nahid Portfolio Admin: database, RLS, media storage, and admin allowlist.
-- Run this whole file once in Supabase Dashboard > SQL Editor.

begin;

create extension if not exists pgcrypto;

create or replace function public.has_aal2()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'aal', '') = 'aal2';
$$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and active = true
  );
$$;

create table if not exists public.portfolio_drafts (
  id text primary key default 'main',
  content jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  constraint portfolio_drafts_singleton check (id = 'main')
);

create table if not exists public.portfolio_public (
  id text primary key default 'main',
  content jsonb not null,
  published_at timestamptz not null default now(),
  published_by uuid references auth.users(id) on delete set null,
  constraint portfolio_public_singleton check (id = 'main')
);

create table if not exists public.portfolio_revisions (
  id bigint generated always as identity primary key,
  document_type text not null check (document_type in ('draft', 'published')),
  content jsonb not null,
  changed_at timestamptz not null default now(),
  changed_by uuid references auth.users(id) on delete set null
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket_id text not null default 'portfolio-media',
  object_path text not null unique,
  public_url text not null,
  category text not null check (category in ('photo', 'company-logo', 'education-logo', 'poster', 'project', 'document', 'other')),
  title text not null default '',
  alt_text text not null default '',
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

create or replace function public.set_portfolio_audit_fields()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if tg_table_name = 'portfolio_drafts' then
    new.updated_at = now();
    new.updated_by = auth.uid();
  elsif tg_table_name = 'portfolio_public' then
    new.published_at = now();
    new.published_by = auth.uid();
  end if;
  return new;
end;
$$;

create or replace function public.capture_portfolio_revision()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.portfolio_revisions (document_type, content, changed_by)
  values (
    case when tg_table_name = 'portfolio_public' then 'published' else 'draft' end,
    new.content,
    auth.uid()
  );
  return new;
end;
$$;

drop trigger if exists portfolio_drafts_audit_fields on public.portfolio_drafts;
create trigger portfolio_drafts_audit_fields
before insert or update on public.portfolio_drafts
for each row execute function public.set_portfolio_audit_fields();

drop trigger if exists portfolio_public_audit_fields on public.portfolio_public;
create trigger portfolio_public_audit_fields
before insert or update on public.portfolio_public
for each row execute function public.set_portfolio_audit_fields();

drop trigger if exists portfolio_drafts_revision on public.portfolio_drafts;
create trigger portfolio_drafts_revision
after insert or update on public.portfolio_drafts
for each row execute function public.capture_portfolio_revision();

drop trigger if exists portfolio_public_revision on public.portfolio_public;
create trigger portfolio_public_revision
after insert or update on public.portfolio_public
for each row execute function public.capture_portfolio_revision();

alter table public.admin_users enable row level security;
alter table public.portfolio_drafts enable row level security;
alter table public.portfolio_public enable row level security;
alter table public.portfolio_revisions enable row level security;
alter table public.media_assets enable row level security;

-- Force RLS even for table owners in normal API access paths.
alter table public.admin_users force row level security;
alter table public.portfolio_drafts force row level security;
alter table public.portfolio_public force row level security;
alter table public.portfolio_revisions force row level security;
alter table public.media_assets force row level security;

drop policy if exists "admin can read own allowlist row" on public.admin_users;
create policy "admin can read own allowlist row"
on public.admin_users for select
to authenticated
using (user_id = auth.uid() and public.has_aal2());

drop policy if exists "admin can read drafts" on public.portfolio_drafts;
create policy "admin can read drafts"
on public.portfolio_drafts for select
to authenticated
using (public.is_portfolio_admin() and public.has_aal2());

drop policy if exists "admin can insert drafts" on public.portfolio_drafts;
create policy "admin can insert drafts"
on public.portfolio_drafts for insert
to authenticated
with check (public.is_portfolio_admin() and public.has_aal2());

drop policy if exists "admin can update drafts" on public.portfolio_drafts;
create policy "admin can update drafts"
on public.portfolio_drafts for update
to authenticated
using (public.is_portfolio_admin() and public.has_aal2())
with check (public.is_portfolio_admin() and public.has_aal2());

drop policy if exists "admin can delete drafts" on public.portfolio_drafts;
create policy "admin can delete drafts"
on public.portfolio_drafts for delete
to authenticated
using (public.is_portfolio_admin() and public.has_aal2());

drop policy if exists "anyone can read published portfolio" on public.portfolio_public;
create policy "anyone can read published portfolio"
on public.portfolio_public for select
to anon, authenticated
using (true);

drop policy if exists "admin can insert published portfolio" on public.portfolio_public;
create policy "admin can insert published portfolio"
on public.portfolio_public for insert
to authenticated
with check (public.is_portfolio_admin() and public.has_aal2());

drop policy if exists "admin can update published portfolio" on public.portfolio_public;
create policy "admin can update published portfolio"
on public.portfolio_public for update
to authenticated
using (public.is_portfolio_admin() and public.has_aal2())
with check (public.is_portfolio_admin() and public.has_aal2());

drop policy if exists "admin can delete published portfolio" on public.portfolio_public;
create policy "admin can delete published portfolio"
on public.portfolio_public for delete
to authenticated
using (public.is_portfolio_admin() and public.has_aal2());

drop policy if exists "admin can read revisions" on public.portfolio_revisions;
create policy "admin can read revisions"
on public.portfolio_revisions for select
to authenticated
using (public.is_portfolio_admin() and public.has_aal2());

drop policy if exists "admin can manage media metadata" on public.media_assets;
create policy "admin can manage media metadata"
on public.media_assets for all
to authenticated
using (public.is_portfolio_admin() and public.has_aal2())
with check (public.is_portfolio_admin() and public.has_aal2());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public can read portfolio media" on storage.objects;
create policy "public can read portfolio media"
on storage.objects for select
to public
using (bucket_id = 'portfolio-media');

drop policy if exists "admin can upload portfolio media" on storage.objects;
create policy "admin can upload portfolio media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'portfolio-media'
  and public.is_portfolio_admin()
  and public.has_aal2()
);

drop policy if exists "admin can update portfolio media" on storage.objects;
create policy "admin can update portfolio media"
on storage.objects for update
to authenticated
using (
  bucket_id = 'portfolio-media'
  and public.is_portfolio_admin()
  and public.has_aal2()
)
with check (
  bucket_id = 'portfolio-media'
  and public.is_portfolio_admin()
  and public.has_aal2()
);

drop policy if exists "admin can delete portfolio media" on storage.objects;
create policy "admin can delete portfolio media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'portfolio-media'
  and public.is_portfolio_admin()
  and public.has_aal2()
);

grant usage on schema public to anon, authenticated;
grant select on public.portfolio_public to anon, authenticated;
grant select on public.admin_users to authenticated;
grant select, insert, update, delete on public.portfolio_drafts to authenticated;
grant insert, update, delete on public.portfolio_public to authenticated;
grant select on public.portfolio_revisions to authenticated;
grant select, insert, update, delete on public.media_assets to authenticated;
grant usage, select on sequence public.portfolio_revisions_id_seq to authenticated;
grant execute on function public.is_portfolio_admin() to authenticated;
grant execute on function public.has_aal2() to authenticated;

insert into public.admin_users (user_id, email, active)
values ('20c6b6c7-49ac-48af-bb95-73e65011a458', 'nahid.glab@gmail.com', true)
on conflict (user_id) do update set
  email = excluded.email,
  active = true;

commit;
