-- Add an explicit scheduled-delivery state and persist the planned date.
alter table public.orders
  add column if not exists scheduled_delivery_date date;

-- Existing order status values are stored as text, so no enum migration is required.
