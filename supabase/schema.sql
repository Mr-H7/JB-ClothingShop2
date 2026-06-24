create extension if not exists pgcrypto;

create table if not exists public.newsletter_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  language text not null default 'FR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  phone text not null default '',
  message text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create table if not exists public.collaboration_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null default '',
  type text not null,
  message text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists newsletter_leads_created_at_idx
  on public.newsletter_leads (created_at desc);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists collaboration_submissions_created_at_idx
  on public.collaboration_submissions (created_at desc);

alter table public.newsletter_leads enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.collaboration_submissions enable row level security;
