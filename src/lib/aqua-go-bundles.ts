import { supabase } from "@/integrations/supabase/client";

export type AquaBundleOffer = {
  id: string;
  quantity: number;
  title: string;
  price: number;
  referencePrice: number;
  badge: string;
  shippingBadge?: string;
};

export type AquaBundleConfig = {
  title: string;
  subtitle: string;
  defaultOfferId: string;
  offers: AquaBundleOffer[];
};

export const DEFAULT_AQUA_BUNDLES: AquaBundleConfig = {
  title: "PAGUE MENOS E LEVE MAIS",
  subtitle: "Escolha quantos AQUA GO quer levar e aproveite um preço melhor nos kits.",
  defaultOfferId: "triple",
  offers: [
    { id: "single", quantity: 1, title: "🔥 1 UNIDADE", price: 27498, referencePrice: 27498, badge: "Preço normal" },
    { id: "double", quantity: 2, title: "💎 2 UNIDADES", price: 49990, referencePrice: 54996, badge: "POUPE 5.006 Kz" },
    { id: "triple", quantity: 3, title: "👑 3 UNIDADES — MAIS VENDIDO", price: 69990, referencePrice: 82494, badge: "Mais vendido", shippingBadge: "Envio grátis" },
  ],
};

export function mergeAquaBundles(stored: unknown): AquaBundleConfig {
  if (!stored || typeof stored !== "object") return DEFAULT_AQUA_BUNDLES;
  const source = stored as Record<string, unknown>;
  const rawOffers = Array.isArray(source.offers) ? source.offers : [];
  const offers = rawOffers
    .filter((o): o is Record<string, unknown> => !!o && typeof o === "object")
    .map((o, i) => ({
      id: String(o.id ?? DEFAULT_AQUA_BUNDLES.offers[i]?.id ?? `offer-${i + 1}`),
      quantity: Math.max(1, Number(o.quantity) || 1),
      title: String(o.title ?? ""),
      price: Math.max(0, Number(o.price) || 0),
      referencePrice: Math.max(0, Number(o.referencePrice) || 0),
      badge: String(o.badge ?? ""),
      ...(o.shippingBadge ? { shippingBadge: String(o.shippingBadge) } : {}),
    }))
    .filter((o) => o.title && o.price > 0);

  return {
    title: typeof source.title === "string" && source.title.trim() ? source.title : DEFAULT_AQUA_BUNDLES.title,
    subtitle: typeof source.subtitle === "string" && source.subtitle.trim() ? source.subtitle : DEFAULT_AQUA_BUNDLES.subtitle,
    defaultOfferId:
      typeof source.defaultOfferId === "string" && offers.some((o) => o.id === source.defaultOfferId)
        ? source.defaultOfferId
        : DEFAULT_AQUA_BUNDLES.defaultOfferId,
    offers: offers.length ? offers : DEFAULT_AQUA_BUNDLES.offers,
  };
}

export async function fetchAquaBundleConfig(): Promise<AquaBundleConfig> {
  const { data, error } = await supabase
    .from("landing_pages")
    .select("content")
    .eq("slug", "aqua-go")
    .maybeSingle();
  if (error) throw error;
  const content = data?.content;
  if (content && typeof content === "object" && "aquaBundles" in content) {
    return mergeAquaBundles((content as Record<string, unknown>).aquaBundles);
  }
  return DEFAULT_AQUA_BUNDLES;
}

export async function saveAquaBundleConfig(config: AquaBundleConfig) {
  const { data: existing, error: findError } = await supabase
    .from("landing_pages")
    .select("id, content")
    .eq("slug", "aqua-go")
    .maybeSingle();
  if (findError) throw findError;

  const nextContent = {
    ...(existing?.content && typeof existing.content === "object" ? existing.content : {}),
    aquaBundles: config,
  };

  if (existing?.id) {
    const { error } = await supabase
      .from("landing_pages")
      .update({ content: nextContent, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    if (error) throw error;
    return;
  }

  const { error } = await supabase.from("landing_pages").insert({
    slug: "aqua-go",
    name: "AQUA GO — Chuveiro Portátil",
    content: nextContent,
  });
  if (error) throw error;
}
