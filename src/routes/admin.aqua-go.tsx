import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AdminShell } from "@/components/aurelis/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DEFAULT_AQUA_BUNDLES,
  fetchAquaBundleConfig,
  saveAquaBundleConfig,
  type AquaBundleConfig,
  type AquaBundleOffer,
} from "@/lib/aqua-go-bundles";

export const Route = createFileRoute("/admin/aqua-go")({
  head: () => ({
    meta: [
      { title: "AQUA GO — Ofertas | AURELIS Gestão" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminShell title="AQUA GO — Ofertas">
      <AquaBundleEditor />
    </AdminShell>
  ),
});

function Field({ label, value, onChange, type = "text" }: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number";
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      <Input type={type} value={String(value)} onChange={(e) => onChange(e.target.value)} className="h-11" min={type === "number" ? 0 : undefined} />
    </div>
  );
}

function AquaBundleEditor() {
  const [form, setForm] = useState<AquaBundleConfig>(DEFAULT_AQUA_BUNDLES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void fetchAquaBundleConfig()
      .then(setForm)
      .catch(() => toast.error("Não foi possível carregar as ofertas."))
      .finally(() => setLoading(false));
  }, []);

  const updateOffer = (index: number, patch: Partial<AquaBundleOffer>) => {
    setForm((current) => ({
      ...current,
      offers: current.offers.map((offer, i) => (i === index ? { ...offer, ...patch } : offer)),
    }));
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (saving) return;

    const cleaned: AquaBundleConfig = {
      ...form,
      title: form.title.trim() || DEFAULT_AQUA_BUNDLES.title,
      subtitle: form.subtitle.trim() || DEFAULT_AQUA_BUNDLES.subtitle,
      offers: form.offers
        .map((offer) => ({
          ...offer,
          title: offer.title.trim(),
          badge: offer.badge.trim(),
          shippingBadge: offer.shippingBadge?.trim() || undefined,
          quantity: Math.max(1, Number(offer.quantity) || 1),
          price: Math.max(0, Number(offer.price) || 0),
          referencePrice: Math.max(0, Number(offer.referencePrice) || 0),
        }))
        .filter((offer) => offer.title && offer.price > 0),
    };

    if (!cleaned.offers.length) {
      toast.error("Adicione pelo menos uma oferta válida.");
      return;
    }
    if (!cleaned.offers.some((offer) => offer.id === cleaned.defaultOfferId)) {
      cleaned.defaultOfferId = cleaned.offers[0].id;
    }

    setSaving(true);
    try {
      await saveAquaBundleConfig(cleaned);
      setForm(cleaned);
      toast.success("Ofertas do AQUA GO actualizadas.");
    } catch {
      toast.error("Não foi possível guardar as ofertas.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="size-6 animate-spin text-primary" /></div>;
  }

  return (
    <form onSubmit={save} className="max-w-3xl space-y-5 pb-20">
      <div className="flex items-center gap-3">
        <Link to="/admin" className="grid size-9 place-items-center rounded-full border border-border hover:bg-secondary" aria-label="Voltar">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <p className="font-display text-lg font-bold">Ofertas do AQUA GO</p>
          <p className="text-xs text-muted-foreground">Quantity Break / Bundle Offer Selector</p>
        </div>
      </div>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h3 className="font-display font-bold">Cabeçalho da oferta</h3>
        <Field label="Título" value={form.title} onChange={(value) => setForm((v) => ({ ...v, title: value }))} />
        <Field label="Subtítulo" value={form.subtitle} onChange={(value) => setForm((v) => ({ ...v, subtitle: value }))} />
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-muted-foreground">Oferta seleccionada por padrão</Label>
          <select
            value={form.defaultOfferId}
            onChange={(e) => setForm((v) => ({ ...v, defaultOfferId: e.target.value }))}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {form.offers.map((offer) => <option key={offer.id} value={offer.id}>{offer.quantity} unidade{offer.quantity > 1 ? "s" : ""} — {offer.title}</option>)}
          </select>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold">Ofertas</h3>
            <p className="text-xs text-muted-foreground">O preço por unidade e a economia são calculados automaticamente na landing page.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setForm((v) => ({
              ...v,
              offers: [...v.offers, {
                id: `offer-${Date.now()}`,
                quantity: v.offers.length + 1,
                title: `${v.offers.length + 1} UNIDADES`,
                price: 0,
                referencePrice: 0,
                badge: "",
              }],
            }))}
          >
            <Plus className="size-4" /> Oferta
          </Button>
        </div>

        {form.offers.map((offer, index) => {
          const savings = Math.max(0, offer.referencePrice - offer.price);
          const percent = offer.referencePrice > 0 ? Math.round((savings / offer.referencePrice) * 100) : 0;
          const perUnit = offer.quantity > 0 ? Math.round(offer.price / offer.quantity) : 0;

          return (
            <div key={offer.id} className="space-y-4 rounded-2xl border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Oferta {index + 1}</p>
                {form.offers.length > 1 && (
                  <Button type="button" variant="outline" size="icon" aria-label="Remover oferta" onClick={() => setForm((v) => ({ ...v, offers: v.offers.filter((_, i) => i !== index) }))}>
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Quantidade" type="number" value={offer.quantity} onChange={(value) => updateOffer(index, { quantity: Number(value) || 1 })} />
                <Field label="Preço do pacote (Kz)" type="number" value={offer.price} onChange={(value) => updateOffer(index, { price: Number(value) || 0 })} />
                <Field label="Preço de referência / riscado (Kz)" type="number" value={offer.referencePrice} onChange={(value) => updateOffer(index, { referencePrice: Number(value) || 0 })} />
                <Field label="Título da oferta" value={offer.title} onChange={(value) => updateOffer(index, { title: value })} />
                <Field label="Badge" value={offer.badge} onChange={(value) => updateOffer(index, { badge: value })} />
                <Field label="Badge de envio" value={offer.shippingBadge ?? ""} onChange={(value) => updateOffer(index, { shippingBadge: value })} />
              </div>

              <div className="rounded-xl bg-secondary p-3 text-xs">
                <div className="flex justify-between"><span>Preço por unidade</span><strong>{perUnit.toLocaleString("pt-AO")} Kz</strong></div>
                <div className="mt-1 flex justify-between"><span>Economia</span><strong>{savings.toLocaleString("pt-AO")} Kz ({percent}%)</strong></div>
              </div>
            </div>
          );
        })}
      </section>

      <div className="sticky bottom-3 z-10 flex gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur">
        <Button type="submit" className="h-12 flex-1" disabled={saving}>
          {saving && <Loader2 className="size-4 animate-spin" />}
          Guardar ofertas
        </Button>
        <a href="/aqua-go" target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center rounded-md border border-border px-4 text-sm font-semibold">
          Ver AQUA GO
        </a>
      </div>
    </form>
  );
}
