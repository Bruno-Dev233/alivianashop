create table if not exists public.visitor_sessions (
  session_id text primary key,
  path text not null,
  page_type text not null default 'landing' check (page_type in ('landing', 'checkout')),
  product_name text,
  last_seen timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.visitor_sessions enable row level security;

drop policy if exists "Public can create visitor sessions" on public.visitor_sessions;
create policy "Public can create visitor sessions"
  on public.visitor_sessions for insert to anon, authenticated
  with check (true);

drop policy if exists "Public can update visitor sessions" on public.visitor_sessions;
create policy "Public can update visitor sessions"
  on public.visitor_sessions for update to anon, authenticated
  using (true) with check (true);

drop policy if exists "Authenticated admins can read visitor sessions" on public.visitor_sessions;
create policy "Authenticated admins can read visitor sessions"
  on public.visitor_sessions for select to authenticated
  using (true);

grant insert, update on public.visitor_sessions to anon, authenticated;
grant select on public.visitor_sessions to authenticated;

create index if not exists visitor_sessions_last_seen_idx on public.visitor_sessions (last_seen desc);

alter publication supabase_realtime add table public.visitor_sessions;
