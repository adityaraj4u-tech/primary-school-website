-- YOUR SCHOOL — initial schema
-- Admin-only auth: no public sign-up. Admins are listed in public.admin_users.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create policy "Admins can read admin_users"
  on public.admin_users for select
  to authenticated
  using (public.is_admin());

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  parent_name text not null,
  student_name text not null,
  grade text not null check (grade in ('1','2','3','4','5')),
  mobile text not null,
  email text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  notes text
);

alter table public.enquiries enable row level security;

create policy "Anyone can insert enquiries"
  on public.enquiries for insert
  to anon, authenticated
  with check (true);

create policy "Admins can select enquiries"
  on public.enquiries for select
  to authenticated
  using (public.is_admin());

create policy "Admins can update enquiries"
  on public.enquiries for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  category text not null,
  event_date date,
  image_path text not null,
  alt_text text not null,
  consent_recorded boolean not null default false,
  published boolean not null default false
);

alter table public.gallery_items enable row level security;

create policy "Public can view published gallery with consent"
  on public.gallery_items for select
  to anon, authenticated
  using (published = true and consent_recorded = true);

create policy "Admins can manage gallery"
  on public.gallery_items for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  description text,
  event_date date,
  published boolean not null default false
);

alter table public.events enable row level security;

create policy "Public can view published events"
  on public.events for select
  to anon, authenticated
  using (published = true);

create policy "Admins can manage events"
  on public.events for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  category text not null,
  title text not null,
  file_path text not null,
  published boolean not null default false
);

alter table public.documents enable row level security;

create policy "Public can view published documents"
  on public.documents for select
  to anon, authenticated
  using (published = true);

create policy "Admins can manage documents"
  on public.documents for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
