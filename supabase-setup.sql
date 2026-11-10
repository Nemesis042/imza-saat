-- İMZA SAAT · Supabase kurulum SQL'i
-- Mevcut public.categories / products / site_settings tablolarına dokunmaz.
-- Uygulama kendi tablolarını imza_ önekiyle kullanır.

create table if not exists public.imza_products (
  id text primary key,
  slug text not null,
  name text not null,
  category text not null,
  category_label text not null default '',
  short_description text not null default '',
  description text not null default '',
  image_url text not null default '',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.imza_category_covers (
  slug text primary key,
  image_url text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.imza_site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.imza_products enable row level security;
alter table public.imza_category_covers enable row level security;
alter table public.imza_site_settings enable row level security;

drop policy if exists "Public can read imza products" on public.imza_products;
create policy "Public can read imza products" on public.imza_products
  for select to anon, authenticated using (true);
drop policy if exists "Authenticated can manage imza products" on public.imza_products;
create policy "Authenticated can manage imza products" on public.imza_products
  for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "Public can read imza category covers" on public.imza_category_covers;
create policy "Public can read imza category covers" on public.imza_category_covers
  for select to anon, authenticated using (true);
drop policy if exists "Authenticated can manage imza category covers" on public.imza_category_covers;
create policy "Authenticated can manage imza category covers" on public.imza_category_covers
  for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "Public can read imza site settings" on public.imza_site_settings;
create policy "Public can read imza site settings" on public.imza_site_settings
  for select to anon, authenticated using (true);
drop policy if exists "Authenticated can manage imza site settings" on public.imza_site_settings;
create policy "Authenticated can manage imza site settings" on public.imza_site_settings
  for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Authenticated users upload product images" on storage.objects;
create policy "Authenticated users upload product images" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');
drop policy if exists "Authenticated users update product images" on storage.objects;
create policy "Authenticated users update product images" on storage.objects
  for update to authenticated using (bucket_id = 'product-images') with check (bucket_id = 'product-images');
drop policy if exists "Authenticated users delete product images" on storage.objects;
create policy "Authenticated users delete product images" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');

-- Ürünleri ve görselleri herkes okuyabilir; yazma işlemleri giriş yapmış kullanıcılarla sınırlıdır.

-- Daha önce aynı bucket için eklenmiş geniş SELECT/LIST politikasını kaldır.
-- Public bucket doğrudan görsel URL'lerini okumak için ayrıca SELECT policy istemez.
do $$
declare pol record;
begin
  for pol in
    select policyname
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and cmd = 'SELECT'
      and coalesce(qual, '') ilike '%product-images%'
  loop
    execute format('drop policy if exists %I on storage.objects', pol.policyname);
  end loop;
end $$;
