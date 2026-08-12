-- Wellness Marketplace — schema
-- Run this in the Supabase SQL editor (or `supabase db push` if using the CLI).
-- Mirrors the minimal data model in docs/wellness-marketplace-capstone-brief.md.

create table creators (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  niche text not null,
  tagline text,
  bio text not null,
  photo_url text,
  scope_of_practice_note text not null,
  created_at timestamptz not null default now()
);

create table credentials (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references creators(id) on delete cascade,
  label text not null,          -- e.g. "RD", "CSCS"
  full_name text not null,      -- e.g. "Registered Dietitian"
  variant text not null default 'verified', -- chip color: verified | plum | mauve
  verified boolean not null default true    -- mocked, per CLAUDE.md (no real cert verification)
);

create table tiers (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references creators(id) on delete cascade,
  variant text not null,        -- 'free' | 'paid'
  name text not null,
  description text,
  price_cents integer,          -- null for free tier
  sort_order integer not null default 0
);

create table subscribers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  referred_by uuid references subscribers(id),
  referral_code text unique not null,
  last_active_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  subscriber_id uuid not null references subscribers(id) on delete cascade,
  creator_id uuid not null references creators(id) on delete cascade,
  tier_id uuid not null references tiers(id) on delete cascade,
  status text not null default 'active', -- active | canceled
  start_date timestamptz not null default now()
);

create table check_ins (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references creators(id) on delete cascade,
  subscriber_id uuid references subscribers(id) on delete cascade, -- null = broadcast to all
  message text not null,
  type text not null default 'update', -- 'update' | 'reengagement'
  created_at timestamptz not null default now()
);

create table referral_events (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references subscribers(id) on delete cascade,
  referred_id uuid not null references subscribers(id) on delete cascade,
  creator_id uuid not null references creators(id) on delete cascade,
  reward_applied boolean not null default false,
  reward_type text, -- 'free_month' | 'discount'
  created_at timestamptz not null default now()
);

-- Read access only — this MVP has no real auth (per CLAUDE.md, identity is
-- mocked via name/email). Public read on creator-facing tables; writes go
-- through the app's service-role key server-side once that exists.
alter table creators enable row level security;
alter table credentials enable row level security;
alter table tiers enable row level security;
alter table check_ins enable row level security;

create policy "Public read creators" on creators for select using (true);
create policy "Public read credentials" on credentials for select using (true);
create policy "Public read tiers" on tiers for select using (true);
create policy "Public read check-ins" on check_ins for select using (true);

-- RLS policies alone aren't enough — Postgres also requires table-level
-- grants for the anon/authenticated roles, or PostgREST returns
-- "permission denied" even with a passing policy.
grant usage on schema public to anon, authenticated;
grant select on creators, credentials, tiers, check_ins to anon, authenticated;

-- Subscribers/subscriptions/referral events hold personal data (name,
-- email) and there's no real auth to scope reads to in this MVP, so no
-- SELECT/UPDATE/DELETE access for anon at all. INSERT is allowed (write-only)
-- so the subscribe flow can create real subscriber/subscription rows per the
-- brief ("build for real: ...referral attribution logic" — only payment
-- itself is mocked). referral_events stays fully closed until the referral
-- flow (screen 4/6) is built.
alter table subscribers enable row level security;
alter table subscriptions enable row level security;
alter table referral_events enable row level security;

create policy "Public insert subscribers" on subscribers for insert with check (true);
create policy "Public insert subscriptions" on subscriptions for insert with check (true);

grant insert on subscribers, subscriptions to anon, authenticated;
