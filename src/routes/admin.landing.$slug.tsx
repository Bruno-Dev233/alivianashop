import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AdminShell } from "@/components/aurelis/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { landingPageKey, useLandingPage } from "@/hooks/useLandingPage";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "@/components/aurelis/ImageUpload";
import { DepiladorEditor } from "@/components/aurelis/DepiladorEditor";
import type { LandingContent, LandingFaq, LandingOffer, LandingStep } from "@/lib/landing";

export const Route = createFileRoute("/admin/landing/$slug")({
  head: () => ({
    meta: [
      { title: "Editar Landing Page | AURELIS Gestão" },
      { name: "description", content: "Editar textos, preços e imagens da landing page." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Editar Landing Page | AURELIS Gestão" },
      {
        property: "og:description",
        content: "Editar textos, preços e imagens da landing page.",
      },
    ],
  }),
  component: () => (
    <AdminShell title="Editar Landing Page">
      <EditorSwitch />
    </AdminShell>
  ),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="font-display text-base font-bold">{title}</h3>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  type,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: "number";
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {multiline ? (
        <Textarea value={String(value)} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <Input
          type={type === "number" ? "number" : "text"}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="h-11"
        />
      )}
    </div>
  );
}

/** Lista simples de linhas de texto. */
function ListField({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(e) => onChange(items.map((v, j) => (j === i ? e.target.value : v)))}
            className="h-11"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-11 shrink-0"
            aria-label="Remover"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => onChange([...items, ""])}>
        <Plus className="size-4" /> Adicionar
      </Button>
    </div>
  );
}

function EditorSwitch() {
  const { slug } = Route.useParams();
  return slug === "depilador-eletrico" ? <DepiladorEditor /> : <LandingEditor />;
}

function LandingEditor() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useLandingPage(slug);
  const queryClient = useQueryClient();
  const [form, setForm] = useState<LandingContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data && !form) setForm(data.content);
  }, [data, form]);

  if (isLoading || !data || !form) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  const set = <K extends keyof LandingContent>(key: K, value: LandingContent[K]) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  const num = (value: string) => Number(value.replace(/[^\d.-]/g, "")) || 0;

  const setOffer = (index: number, patch: Partial<LandingOffer>) =>
    set(
      "offers",
      form.offers.map((o, i) => (i === index ? { ...o, ...patch } : o)),
    );

  const setStep = (index: number, patch: Partial<LandingStep>) =>
    set(
      "steps",
      form.steps.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    );

  const setFaq = (index: number, patch: Partial<LandingFaq>) =>
    set(
      "faq",
      form.faq.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    );

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    const clean: LandingContent = {
      ...form,
      images: form.images.map((i) => i.trim()).filter(Boolean),
      solutionItems: form.solutionItems.filter((i) => i.trim()),
      benefits: form.benefits.filter((i) => i.trim()),
      audience: form.audience.filter((i) => i.trim()),
      problemParagraphs: form.problemParagraphs.filter((i) => i.trim()),
    };
    const { error } = await supabase
      .from("landing_pages")
      .update({ content: clean, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    setSaving(false);

    if (error) {
      toast.error("Não foi possível guardar as alterações.");
      return;
    }
    await queryClient.invalidateQueries({ queryKey: landingPageKey(slug) });
    await queryClient.invalidateQueries({ queryKey: ["landing_pages"] });
    toast.success("Landing page actualizada.");
  };

  return (
    <form onSubmit={save} className="max-w-3xl space-y-5 pb-20">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/landing"
          className="grid size-9 place-items-center rounded-full border border-border hover:bg-secondary"
          aria-label="Voltar"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold">{data.name}</p>
          <p className="truncate text-xs text-muted-foreground">/{data.slug}</p>
        </div>
      </div>

      <Section title="Topo e marca">
        <Field label="Barra superior" value={form.topBar} onChange={(v) => set("topBar", v)} />
        <Field label="Marca" value={form.brand} onChange={(v) => set("brand", v)} />
        <Field
          label="Botão do cabeçalho"
          value={form.headerCta}
          onChange={(v) => set("headerCta", v)}
        />
      </Section>

      <Section title="Hero">
        <Field label="Badge" value={form.badge} onChange={(v) => set("badge", v)} />
        <Field label="Título" value={form.heroTitle} onChange={(v) => set("heroTitle", v)} />
        <Field
          label="Título — parte destacada"
          value={form.heroTitleHighlight}
          onChange={(v) => set("heroTitleHighlight", v)}
        />
        <Field
          label="Subtítulo"
          value={form.heroSubtitle}
          multiline
          onChange={(v) => set("heroSubtitle", v)}
        />
        <Field
          label="Descrição"
          value={form.heroDescription}
          multiline
          onChange={(v) => set("heroDescription", v)}
        />
        <Field
          label="Nome do produto (usado no checkout)"
          value={form.productName}
          multiline
          onChange={(v) => set("productName", v)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Preço (Kz)"
            type="number"
            value={form.price}
            onChange={(v) => set("price", num(v))}
          />
          <Field
            label="Preço anterior (Kz)"
            type="number"
            value={form.oldPrice}
            onChange={(v) => set("oldPrice", num(v))}
          />
        </div>
        <Field label="Botão principal" value={form.heroCta} onChange={(v) => set("heroCta", v)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Aviso 1" value={form.note1} onChange={(v) => set("note1", v)} />
          <Field label="Aviso 2" value={form.note2} onChange={(v) => set("note2", v)} />
        </div>
      </Section>

      <Section title="Imagens">
        <ListField
          label="URLs das imagens"
          items={form.images}
          placeholder="https://..."
          onChange={(v) => set("images", v)}
        />
        <ImageUpload onUploaded={(url) => set("images", [...form.images.filter(Boolean), url])} />
        <div className="flex flex-wrap gap-2">
          {form.images.filter(Boolean).map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="size-16 rounded-xl border border-border object-cover"
            />
          ))}
        </div>
      </Section>

      <Section title="Problema">
        <Field label="Título" value={form.problemTitle} onChange={(v) => set("problemTitle", v)} />
        <ListField
          label="Parágrafos"
          items={form.problemParagraphs}
          onChange={(v) => set("problemParagraphs", v)}
        />
      </Section>

      <Section title="Solução">
        <Field label="Título" value={form.solutionTitle} onChange={(v) => set("solutionTitle", v)} />
        <ListField
          label="Cartões"
          items={form.solutionItems}
          onChange={(v) => set("solutionItems", v)}
        />
      </Section>

      <Section title="Como funciona">
        <Field label="Título" value={form.howTitle} onChange={(v) => set("howTitle", v)} />
        {form.steps.map((step, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={step.n}
              onChange={(e) => setStep(i, { n: e.target.value })}
              className="h-11 w-20"
            />
            <Input
              value={step.text}
              onChange={(e) => setStep(i, { text: e.target.value })}
              className="h-11"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-11 shrink-0"
              aria-label="Remover etapa"
              onClick={() => set("steps", form.steps.filter((_, j) => j !== i))}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => set("steps", [...form.steps, { n: "", text: "" }])}
        >
          <Plus className="size-4" /> Adicionar etapa
        </Button>
      </Section>

      <Section title="Galeria">
        <Field label="Título" value={form.galleryTitle} onChange={(v) => set("galleryTitle", v)} />
      </Section>

      <Section title="Ofertas">
        <Field label="Título" value={form.offersTitle} onChange={(v) => set("offersTitle", v)} />
        {form.offers.map((offer, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-muted-foreground">Oferta {i + 1}</p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Remover oferta"
                onClick={() => set("offers", form.offers.filter((_, j) => j !== i))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Título" value={offer.label} onChange={(v) => setOffer(i, { label: v })} />
              <Field
                label="Quantidade"
                type="number"
                value={offer.quantity}
                onChange={(v) => setOffer(i, { quantity: Math.max(1, num(v)) })}
              />
              <Field
                label="Preço total (Kz)"
                type="number"
                value={offer.price}
                onChange={(v) => setOffer(i, { price: num(v) })}
              />
              <Field
                label="Preço anterior (Kz)"
                type="number"
                value={offer.old}
                onChange={(v) => setOffer(i, { old: num(v) })}
              />
              <Field label="Botão" value={offer.cta} onChange={(v) => setOffer(i, { cta: v })} />
              <Field
                label="Etiqueta (opcional)"
                value={offer.tag}
                onChange={(v) => setOffer(i, { tag: v })}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            set("offers", [
              ...form.offers,
              { quantity: 1, label: "", price: 0, old: 0, cta: "COMPRAR", tag: "" },
            ])
          }
        >
          <Plus className="size-4" /> Adicionar oferta
        </Button>
      </Section>

      <Section title="Benefícios">
        <Field label="Título" value={form.benefitsTitle} onChange={(v) => set("benefitsTitle", v)} />
        <ListField label="Itens" items={form.benefits} onChange={(v) => set("benefits", v)} />
      </Section>

      <Section title="Para quem é">
        <Field label="Título" value={form.audienceTitle} onChange={(v) => set("audienceTitle", v)} />
        <ListField label="Itens" items={form.audience} onChange={(v) => set("audience", v)} />
      </Section>

      <Section title="Oferta final">
        <Field label="Título" value={form.finalTitle} onChange={(v) => set("finalTitle", v)} />
        <Field
          label="Título — parte destacada"
          value={form.finalTitleHighlight}
          onChange={(v) => set("finalTitleHighlight", v)}
        />
        <Field
          label="Texto"
          value={form.finalText}
          multiline
          onChange={(v) => set("finalText", v)}
        />
        <Field label="Botão" value={form.finalCta} onChange={(v) => set("finalCta", v)} />
      </Section>

      <Section title="Perguntas frequentes">
        <Field label="Título" value={form.faqTitle} onChange={(v) => set("faqTitle", v)} />
        {form.faq.map((item, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-muted-foreground">Pergunta {i + 1}</p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Remover pergunta"
                onClick={() => set("faq", form.faq.filter((_, j) => j !== i))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <Field label="Pergunta" value={item.q} onChange={(v) => setFaq(i, { q: v })} />
            <Field label="Resposta" value={item.a} multiline onChange={(v) => setFaq(i, { a: v })} />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => set("faq", [...form.faq, { q: "", a: "" }])}
        >
          <Plus className="size-4" /> Adicionar pergunta
        </Button>
      </Section>

      <Section title="Rodapé e SEO">
        <Field label="Rodapé" value={form.footerText} onChange={(v) => set("footerText", v)} />
        <Field label="Título SEO" value={form.seoTitle} onChange={(v) => set("seoTitle", v)} />
        <Field
          label="Descrição SEO"
          value={form.seoDescription}
          multiline
          onChange={(v) => set("seoDescription", v)}
        />
      </Section>

      <div className="fixed inset-x-0 bottom-16 z-20 border-t border-border bg-card/95 px-4 py-3 backdrop-blur lg:bottom-0 lg:left-64">
        <div className="mx-auto flex max-w-3xl">
          <Button type="submit" className="h-12 w-full" disabled={saving}>
            {saving && <Loader2 className="size-4 animate-spin" />}
            Guardar alterações
          </Button>
        </div>
      </div>
    </form>
  );
}
