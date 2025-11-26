-- ChemPort MVP schema
create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  verification_status text not null,
  contact_email text,
  coa_url text,
  msds_url text,
  reliability_score int default 0,
  inserted_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null,
  purity text,
  volume text,
  summary text,
  description text,
  price numeric not null,
  stock int default 0,
  availability text default 'in_stock',
  supplier_id uuid references public.suppliers(id) on delete set null,
  documents jsonb default '{}'::jsonb,
  tags text[] default '{}',
  inserted_at timestamptz default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  hero_image text,
  summary text,
  body text,
  read_time text,
  category text,
  updated_at timestamptz default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  question text not null,
  answer text not null,
  compliance_tags text[] default '{}'
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  status text not null,
  placed_at timestamptz default now(),
  total numeric not null
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity int not null,
  price numeric not null
);

create table if not exists public.batches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  product_id uuid references public.products(id),
  lot_number text not null,
  expiry_date date not null,
  storage_conditions text not null,
  notes text,
  inserted_at timestamptz default now()
);

alter table public.products enable row level security;
alter table public.batches enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "public products" on public.products
  for select using (true);

create policy "user batches" on public.batches
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "user order items" on public.order_items
  for select using (
    auth.uid() = (
      select user_id from public.orders where id = order_id
    )
  );
