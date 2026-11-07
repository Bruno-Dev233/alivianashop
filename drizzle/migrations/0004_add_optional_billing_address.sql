ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS billing_address text;

COMMENT ON COLUMN public.orders.billing_address IS 'Optional billing address when different from the delivery address; null means same as delivery.';