ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS municipality text,
  ADD COLUMN IF NOT EXISTS neighborhood text,
  ADD COLUMN IF NOT EXISTS order_source text,
  ADD COLUMN IF NOT EXISTS landing_page text;

COMMENT ON COLUMN public.orders.municipality IS 'Optional delivery municipality captured by the shared COD checkout.';
COMMENT ON COLUMN public.orders.neighborhood IS 'Optional delivery neighborhood captured by the shared COD checkout.';
COMMENT ON COLUMN public.orders.order_source IS 'Referring website or source captured when the COD order is placed.';
COMMENT ON COLUMN public.orders.landing_page IS 'Landing page path where the COD order was placed.';