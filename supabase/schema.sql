-- Moonlight Production — Supabase PostgreSQL Schema
create extension if not exists pgcrypto;

-- 1. Profiles Table (Linked with Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  phone text,
  is_admin boolean default false,
  created_at timestamptz default now()
);

-- 2. Templates Catalog
create table if not exists public.templates (
  id text primary key,
  name text not null,
  category text not null,
  price integer not null default 499,
  preview_image text,
  description text,
  active boolean default true,
  created_at timestamptz default now()
);

-- 3. Purchases Ledger
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  template_id text references public.templates(id),
  razorpay_order_id text unique,
  razorpay_payment_id text,
  amount integer not null,
  currency text default 'INR',
  status text default 'created',
  created_at timestamptz default now()
);

-- 4. Customer Invitations
create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  template_id text references public.templates(id),
  purchase_id uuid references public.purchases(id),
  title text not null default 'A Royal Celebration',
  names text not null default 'Couple / Host Names',
  event_type text default 'Wedding',
  date date,
  time text,
  venue text,
  venue_address text,
  message text,
  scratch_message text default 'YOU’RE INVITED ♡',
  music_url text,
  cover_photo text,
  gallery_urls text[],
  slug text unique,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. Guest RSVPs
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references public.invitations(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  guests integer default 1,
  response text default 'Yes',
  message text,
  created_at timestamptz default now()
);

-- Initial Template Seed Data
insert into public.templates (id, name, category, price, preview_image, description) values
('royal-love', 'Royal Love', 'Wedding', 699, 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', 'Regal gold & velvet heritage wedding suite with countdown and royal crest.'),
('blooming-dreams', 'Blooming Dreams', 'Engagement', 499, 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', 'Pastel floral luxury invitation with interactive scratch card and gentle animations.'),
('little-sunshine', 'A Little Sunshine', 'Birthday', 399, 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80', 'Joyful celebration layout with balloons, timeline, and instant guest RSVP.'),
('together-forever', 'Together Forever', 'Anniversary', 599, 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80', 'Timeless anniversary design with couple memories gallery and music player.')
on conflict (id) do update set price=excluded.price, name=excluded.name, category=excluded.category, description=excluded.description;

-- Auto-Profile creation trigger on auth signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), new.email)
  on conflict (id) do update set full_name=excluded.full_name, email=excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.templates enable row level security;
alter table public.purchases enable row level security;
alter table public.invitations enable row level security;
alter table public.rsvps enable row level security;

-- Policies
create policy "templates public" on public.templates for select using (active = true);
create policy "profiles own" on public.profiles for select using (auth.uid() = id);
create policy "purchases own" on public.purchases for select using (auth.uid() = user_id);
create policy "purchases insert own" on public.purchases for insert with check (auth.uid() = user_id);
create policy "invitations read" on public.invitations for select using (auth.uid() = user_id or published = true);
create policy "invitations insert" on public.invitations for insert with check (auth.uid() = user_id);
create policy "invitations update" on public.invitations for update using (auth.uid() = user_id);
create policy "rsvp public insert" on public.rsvps for insert with check (exists(select 1 from public.invitations i where i.id = invitation_id and i.published = true));
create policy "rsvp owner read" on public.rsvps for select using (auth.uid() = user_id);
