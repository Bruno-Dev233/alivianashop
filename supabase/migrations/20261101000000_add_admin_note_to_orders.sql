-- Notas internas para acompanhamento dos pedidos pela equipa AURELIS.
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS admin_note TEXT;
