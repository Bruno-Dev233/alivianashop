import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { ImageUpload } from "@/components/aurelis/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { mergeDepilador, type DepiladorContent } from "@/lib/depilador";

const SLUG = "depilador-eletrico";

export function DepiladorEditor() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["landing_page_admin", SLUG],
    queryFn: async () => {
      const { data, error } = await supabase.from("landing_pages").select("id, name, content").eq("slug", SLUG).maybeSingle();
      if (error) throw error;
      return data ? { id: data.id, name: data.name, content: mergeDepilador(data.content) } : null;
    },
  });
  const [form, setForm] = useState<DepiladorContent | null>(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (data && !form) setForm(data.content);
  }, [data, form]);

  if (!data || !form) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  const set = <K extends keyof DepiladorContent>(k: K, v: DepiladorContent[K]) => setForm({ ...form, [k]: v });
  const num = (v: string) => Number(v.replace(/[^\d.-]/g, "")) || 0;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("landing_pages")
      .update({ content: form, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    setSaving(false);
    if (error) { toast.error("Não foi possível guardar as alterações."); return; }
    await qc.invalidateQueries({ queryKey: ["landing_page_raw", SLUG] });
    await qc.invalidateQueries({ queryKey: ["landing_page_admin", SLUG] });
    toast.success("Landing page actualizada.");
  };

  const field = (label: string, k: keyof DepiladorContent, opts: { multiline?: boolean; number?: boolean } = {}) => (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {opts.multiline ? (
        <Textarea rows={3} value={String(form[k])} onChange={(e) => set(k, e.target.value as never)} />
      ) : (
        <Input
          className="h-11"
          type={opts.number ? "number" : "text"}
          value={String(form[k])}
          onChange={(e) => set(k, (opts.number ? num(e.target.value) : e.target.value) as never)}
        />
      )}
    </div>
  );

  return (
    <form onSubmit={save} className="max-w-3xl space-y-5 pb-20">
      <div className="flex items-center gap-3">
        <Link to="/admin/landing" className="grid size-9 place-items-center rounded-full border border-border hover:bg-secondary" aria-label="Voltar">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <p className="font-display text-lg font-bold">{data.name}</p>
          <p className="text-xs text-muted-foreground">/{SLUG}</p>
        </div>
      </div>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h3 className="font-display text-base font-bold">Imagem do produto</h3>
        {form.image && <img src={form.image} alt="" className="size-32 rounded-xl border border-border object-cover" />}
        {field("Link da imagem", "image")}
        <ImageUpload label="Enviar nova imagem" onUploaded={(url) => set("image", url)} />
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h3 className="font-display text-base font-bold">Produto e preço</h3>
        {field("Barra superior", "topBar")}
        {field("Nome do produto", "name", { multiline: true })}
        <div className="grid gap-4 sm:grid-cols-3">
          {field("Preço (Kz)", "price", { number: true })}
          {field("Preço anterior (Kz)", "oldPrice", { number: true })}
          {field("Desconto", "discount")}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h3 className="font-display text-base font-bold">SEO</h3>
        {field("Título SEO", "seoTitle")}
        {field("Descrição SEO", "seoDescription", { multiline: true })}
      </section>

      <div className="fixed inset-x-0 bottom-16 z-20 border-t border-border bg-card/95 px-4 py-3 backdrop-blur lg:bottom-0 lg:left-64">
        <div className="mx-auto flex max-w-3xl">
          <Button type="submit" className="h-12 w-full" disabled={saving}>
            {saving && <Loader2 className="size-4 animate-spin" />} Guardar alterações
          </Button>
        </div>
      </div>
    </form>
  );
}
