-- Manny Med Tech orders & invoices. Run once in the Supabase SQL editor.
-- Access is server-side only (service role); RLS is enabled with no policies,
-- so the anon/public key can never read customer or payment data.
create table if not exists public.mmt_orders (
  id uuid primary key default gen_random_uuid(),
  sequence bigint generated always as identity unique,
  access_token text not null,
  status text not null check (status in ('quote_requested', 'awaiting_payment', 'paid', 'cancelled')),
  customer jsonb not null,
  items jsonb not null,
  tax_label text not null,
  tax_rate_percent numeric(6, 3) not null default 0,
  subtotal_pesewas bigint not null default 0,
  tax_pesewas bigint not null default 0,
  total_pesewas bigint not null default 0,
  paystack_reference text,
  amount_paid_pesewas bigint,
  paid_at timestamptz,
  payment_note text,
  invoiced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mmt_orders_created_at_idx on public.mmt_orders (created_at desc);

alter table public.mmt_orders enable row level security;
