import { supabase } from "@/integrations/supabase/client";

export type AquaBundleOffer = {
  id: string;
  quantity: number;
  title: string;
  price: number;
  referencePrice: number;
  badge: string;
  shippingBadge?: string;
  badgeClass?: string;
};

export type AquaBundleConfig = {
  title: string;
  subtitle: string;
  defaultOfferId: string;
  offers: AquaBundleOffer[];
};

// O pack apresentado por defeito é sempre o de 1 peça; o cliente escolhe os outros se quiser.
const SINGLE_OFFER: AquaBundleOffer = {
  id: "single",
  quantity: 1,
  title: "🔥 1 UNIDADE",
  price: 27498,
  referencePrice: 27498,
  badge: "Preço normal",
  badgeClass: "bg-[#5A351F] text-white",
};

const DOUBLE_OFFER: AquaBundleOffer = {
  id: "double",
  quantity: 2,
  title: "💎 2 UNIDADES",
  price: 49990,
  referencePrice: 54996,
  badge: "POUPE 5.006 Kz",
  badgeClass: "bg-[#008FE5] text-white",
};

const TRIPLE_OFFER: AquaBundleOffer = {
  id: "triple",
  quantity: 3,
  title: "👑 3 UNIDADES — MAIS VENDIDO",
  price: 69990,
  referencePrice: 82494,
  badge: "Mais vendido",
  shippingBadge: "Envio grátis",
  badgeClass: "bg-[#063B5C] text-white",
};

export const DEFAULT_AQUA_BUNDLES: AquaBundleConfig = {
  title: "PAGUE MENOS E LEVE MAIS",
  subtitle: "Escolha quantos AQUA GO quer levar e aproveite um preço melhor nos kits.",
  defaultOfferId: SINGLE_OFFER.id,
  offers: [SINGLE_OFFER, DOUBLE_OFFER, TRIPLE_OFFER],
};

export function pickAquaBundleOffer(
  config: AquaBundleConfig,
  offerId: string,
): AquaBundleOffer {
  return config.offers.find((offer) => offer.id === offerId) ?? config.offers[0] ?? SINGLE_OFFER;
}

export function mergeAquaBundles(stored: unknown): AquaBundleConfig {
  if (!stored || typeof stored !== "object") return DEFAULT_AQUA_BUNDLES;
  const source = stored as Record<string, unknown>;
  const rawOffers = Array.isArray(source["offers"]) ? source["offers"] : [];

  const offers: AquaBundleOffer[] = rawOffers
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item, index) => {
      const shippingBadge =
        typeof item["shippingBadge"] === "string" ? item["shippingBadge"].trim() : "";
      return {
        id: String(item["id"] ?? DEFAULT_AQUA_BUNDLES.offers[index]?.id ?? `offer-${index + 1}`),
        quantity: Math.max(1, Number(item["quantity"]) || 1),
        title: String(item["title"] ?? ""),
        price: Math.max(0, Number(item["price"]) || 0),
        referencePrice: Math.max(0, Number(item["referencePrice"]) || 0),
        badge: String(item["badge"] ?? ""),
        ...(shippingBadge ? { shippingBadge } : {}),
      };
    })
    .filter((offer) => offer.title && offer.price > 0);

  const storedDefault =
    typeof source["defaultOfferId"] === "string" ? source["defaultOfferId"] : "";

  return {
    title:
      typeof source["title"] === "string" && source["title"].trim()
        ? source["title"]
        : DEFAULT_AQUA_BUNDLES.title,
    subtitle:
      typeof source["subtitle"] === "string" && source["subtitle"].trim()
        ? source["subtitle"]
        : DEFAULT_AQUA_BUNDLES.subtitle,
    defaultOfferId:
      storedDefault && offers.some((offer) => offer.id === storedDefault)
        ? storedDefault
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
    return mergeAquaBundles((content as Record<string, unknown>)["aquaBundles"]);
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
