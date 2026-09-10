-- Moonlight Production — Supabase PostgreSQL Schema & Security Architecture
create extension if not exists pgcrypto;

-- 1. Profiles Table (Linked with Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique not null,
  phone text,
  role text default 'customer' check (role in ('customer', 'admin', 'superadmin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Templates Catalog (Database Driven)
create table if not exists public.templates (
  id text primary key,
  name text not null,
  slug text unique not null,
  category text not null default 'Wedding',
  price integer not null default 699,
  preview_image text not null,
  description text default '',
  theme_config jsonb default '{"primary":"#B88935","secondary":"#2C1A1D","background":"#FAF8F5","accent":"#D4AF37","text":"#2C1A1D"}'::jsonb,
  fonts jsonb default '{"heading":"Cinzel, serif","body":"Montserrat, sans-serif","script":"Great Vibes, cursive"}'::jsonb,
  hero_variant text default 'cinematic',
  gallery_variant text default 'carousel',
  event_variant text default 'timeline',
  rsvp_variant text default 'classic',
  scratch_variant text default 'gold',
  animation_variant text default 'smooth',
  status text default 'active' check (status in ('active', 'inactive', 'archived')),
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Coupons Table
create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  discount_type text default 'percentage' check (discount_type in ('percentage', 'fixed')),
  discount_value numeric not null check (discount_value > 0),
  min_order_amount numeric default 0,
  start_date timestamptz default now(),
  expiry_date timestamptz,
  usage_limit integer default 100,
  usage_count integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 4. Purchases Ledger
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  customer_email text not null,
  customer_name text default '',
  customer_phone text default '',
  template_id text references public.templates(id),
  purchase_type text default 'PAID' check (purchase_type in ('PAID', 'FREE', 'ADMIN_ASSIGNED', 'COUPON', 'DISCOUNT')),
  coupon_code text default '',
  razorpay_order_id text,
  razorpay_payment_id text,
  amount numeric not null default 0,
  currency text default 'INR',
  status text default 'created' check (status in ('created', 'paid', 'active', 'failed', 'refunded')),
  created_at timestamptz default now()
);

-- 5. Customer Invitations
create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  user_email text not null,
  template_id text references public.templates(id),
  purchase_id uuid references public.purchases(id) on delete set null,
  title text not null default 'A Royal Celebration',
  names text not null default 'Aarav & Kiara',
  bride_name text default '',
  groom_name text default '',
  host_names text default '',
  event_type text default 'Wedding',
  date date,
  time text default '18:00',
  venue text default 'Jehan Numa Palace',
  venue_address text default '152 Shamla Hills, Bhopal, Madhya Pradesh',
  message text default 'We joyfully invite you to join us in celebrating our wedding day.',
  quote text default 'Two souls, one sacred path. A lifetime of laughter, honor, and love begins under the stars.',
  story text default 'What began as a chance meeting under the golden sunset of the lakes turned into a lifetime promise of love.',
  hashtag text default '#AaravWedsKiara',
  scratch_message text default 'YOU’RE INVITED ♡',
  music_url text default '',
  cover_photo text default '',
  gallery_urls text[] default array[]::text[],
  events_data jsonb default '[]'::jsonb,
  dress_code jsonb default '{"enabled":true,"title":"Royal Indian Formal","description":"We would love to see our guests in royal festive colors.","palettes":[]}'::jsonb,
  accommodation jsonb default '{"enabled":true,"hotelName":"Jehan Numa Palace","address":"Shamla Hills, Bhopal","checkIn":"Nov 20, 2026 at 12:00 PM","checkOut":"Nov 22, 2026 at 11:00 AM","conciergeContact":"+91 755 266 1100"}'::jsonb,
  parking jsonb default '{"enabled":true,"valetAvailable":true,"instructions":"Complimentary valet parking available at Gate 1."}'::jsonb,
  weather_guide jsonb default '{"enabled":true,"forecast":"Pleasant evening (21°C - 24°C). Light pashmina recommended for lawns."}'::jsonb,
  gift_blessing jsonb default '{"enabled":true,"note":"Your warm presence and blessings are our greatest gift."}'::jsonb,
  theme_config jsonb default '{}'::jsonb,
  component_variants jsonb default '{}'::jsonb,
  slug text unique,
  status text default 'DRAFT' check (status in ('DRAFT', 'PUBLISHED', 'SUSPENDED', 'ARCHIVED')),
  published boolean default false,
  rsvp_enabled boolean default true,
  scratch_enabled boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Guest RSVPs
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  name text not null,
  phone text default '',
  email text default '',
  guests integer default 1 check (guests >= 1),
  response text default 'Yes' check (response in ('Yes', 'No', 'Maybe')),
  message text default '',
  created_at timestamptz default now()
);

-- 7. Admin Activity Logs
create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references public.profiles(id) on delete set null,
  admin_email text not null default 'admin@moonlight.com',
  action text not null,
  target_type text not null,
  target_id text default '',
  details jsonb default '{}'::jsonb,
  ip_address text default '',
  created_at timestamptz default now()
);

-- Template Seed Data (6 Video-Inspired Luxury Suites)
insert into public.templates (id, name, slug, category, price, preview_image, description) values
('royal-love', 'The Rajwada Palace Suite', 'royal-love', 'Wedding', 699, 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', 'Regal crimson & 24K antique gold heritage wedding suite with royal crest, shehnai audio, multi-ceremony timeline, and gold foil touch scratch reveal.'),
('blooming-dreams', 'Pastel Floral Symphony', 'blooming-dreams', 'Engagement', 499, 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', 'Soft rose quartz & blush champagne botanical layout with gentle floating petals, romantic couple story, and rose gold scratch card.'),
('mehendi-magic', 'Marigold Utsav & Henna Night', 'mehendi-magic', 'Mehendi', 449, 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80', 'Vibrant turmeric yellow & festive marigold aesthetics tailored for energetic Haldi, Phoolon Ki Holi, and Mehendi Sangeet galas.'),
('celestial-night', 'Celestial Starlight Gala', 'celestial-night', 'Save the Date', 499, 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80', 'Midnight sapphire & shimmering starlight modern layout with constellation monogram, countdown clock, and cocktail gala agenda.'),
('emerald-heritage', 'Emerald Mughal Heritage', 'emerald-heritage', 'Reception', 649, 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80', 'Imperial emerald green with Mughal jaali filigree borders, destination hotel accommodation guide, and royal palace flute music.'),
('little-sunshine', 'Golden Sunshine Milestones', 'little-sunshine', 'Birthday', 399, 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80', 'Sunlit ochre & warm amber celebration layout with confetti animations, milestone memories gallery, and instant guest RSVP.')
on conflict (id) do update set 
  price = excluded.price, 
  name = excluded.name, 
  category = excluded.category, 
  description = excluded.description;

-- Initial Coupons Seed
insert into public.coupons (code, discount_type, discount_value, min_order_amount, usage_limit, is_active) values
('MOONLIGHT100', 'fixed', 100, 499, 500, true),
('ROYAL50', 'percentage', 50, 0, 100, true),
('WELCOME20', 'percentage', 20, 0, 1000, true)
on conflict (code) do nothing;

-- Automatic Profile Creation Trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    case when new.email = current_setting('app.admin_email', true) then 'admin' else 'customer' end
  )
  on conflict (id) do update set full_name = excluded.full_name, email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Row Level Security (RLS) Configuration
alter table public.profiles enable row level security;
alter table public.templates enable row level security;
alter table public.coupons enable row level security;
alter table public.purchases enable row level security;
alter table public.invitations enable row level security;
alter table public.rsvps enable row level security;
alter table public.admin_activity_logs enable row level security;

-- Admin Helper Function
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and (role = 'admin' or role = 'superadmin')
  );
$$;

-- 1. Profiles Policies
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- 2. Templates Policies
create policy "templates_public_read_active" on public.templates
  for select using (status = 'active' or public.is_admin());

create policy "templates_admin_write" on public.templates
  for all using (public.is_admin());

-- 3. Coupons Policies
create policy "coupons_read_active" on public.coupons
  for select using (is_active = true or public.is_admin());

create policy "coupons_admin_write" on public.coupons
  for all using (public.is_admin());

-- 4. Purchases Policies
create policy "purchases_read_own_or_admin" on public.purchases
  for select using (auth.uid() = user_id or public.is_admin());

create policy "purchases_insert_auth" on public.purchases
  for insert with check (auth.uid() = user_id or public.is_admin());

create policy "purchases_admin_all" on public.purchases
  for all using (public.is_admin());

-- 5. Invitations Policies
create policy "invitations_read" on public.invitations
  for select using (
    auth.uid() = user_id 
    or (status = 'PUBLISHED' and published = true) 
    or public.is_admin()
  );

create policy "invitations_insert_own_or_admin" on public.invitations
  for insert with check (auth.uid() = user_id or public.is_admin());

create policy "invitations_update_own_or_admin" on public.invitations
  for update using (auth.uid() = user_id or public.is_admin());

create policy "invitations_delete_admin_or_own" on public.invitations
  for delete using (auth.uid() = user_id or public.is_admin());

-- 6. RSVPs Policies
create policy "rsvps_insert_public_published" on public.rsvps
  for insert with check (
    exists (
      select 1 from public.invitations i
      where i.id = invitation_id and i.status = 'PUBLISHED'
    )
  );

create policy "rsvps_read_invitation_owner_or_admin" on public.rsvps
  for select using (
    exists (
      select 1 from public.invitations i
      where i.id = invitation_id and (i.user_id = auth.uid() or public.is_admin())
    )
  );

-- 7. Admin Activity Logs Policies
create policy "activity_logs_admin_only" on public.admin_activity_logs
  for all using (public.is_admin());
