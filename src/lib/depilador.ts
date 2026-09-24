export type DepiladorContent = {
  topBar: string;
  image: string;
  name: string;
  price: number;
  oldPrice: number;
  discount: string;
  seoTitle: string;
  seoDescription: string;
};

export const DEFAULT_DEPILADOR: DepiladorContent = {
  topBar: "🚚 Frete Gratuito • 💵 Pagamento na Entrega • ⚡ Entrega em 12h a 24h",
  image: "https://files.catbox.moe/1kfxs5.jfif",
  name: "Depilador Elétrico 2 em 1 – Remoção de Pelos Sem Dor, Aparador Corporal Recarregável",
  price: 18890,
  oldPrice: 29990,
  discount: "-37%",
  seoTitle: "Depilador Elétrico 2 em 1 — AURELIS",
  seoDescription:
    "Remoção de pelos sem dor e aparador corporal recarregável. 18.890 Kz com pagamento na entrega em Luanda.",
};

export function mergeDepilador(stored: unknown): DepiladorContent {
  const out = { ...DEFAULT_DEPILADOR } as Record<string, unknown>;
  if (stored && typeof stored === "object") {
    for (const [k, v] of Object.entries(stored as Record<string, unknown>)) {
      if (v === null || v === undefined || v === "") continue;
      if (k in out) out[k] = v;
    }
  }
  return out as DepiladorContent;
}
