CREATE TABLE public.landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.landing_pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.landing_pages TO authenticated;
GRANT ALL ON public.landing_pages TO service_role;

ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Landing pages are public" ON public.landing_pages
  FOR SELECT USING (true);

CREATE POLICY "Admins manage landing pages" ON public.landing_pages
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.landing_pages (slug, name, content)
VALUES ('lancheira-eletrica', 'Lancheira Elétrica 2 em 1', '{}'::jsonb);