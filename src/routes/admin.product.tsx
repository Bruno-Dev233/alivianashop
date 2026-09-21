import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { AdminShell } from "@/components/aurelis/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProduct } from "@/hooks/useProduct";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/aurelis";

export const Route = createFileRoute("/admin/product")({
  head: () => ({
    meta: [
      { title: "Produto | AURELIS Gestão" },
      { name: "description", content: "Editar preço, textos e imagens do produto AURELIS." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Produto | AURELIS Gestão" },
      { property: "og:description", content: "Editar preço, textos e imagens do produto AURELIS." },
    ],
  }),
  component: () => (
    <AdminShell title="Produto">
      <ProductEditor />
    </AdminShell>
  ),
});

type Form = {
  name: string;
  description: string;
  price: string;
  old_price: string;
  cost_price: string;
  social_proof_text: string;
  top_bar_text: string;
  top_bar_text_2: string;
  store_name: string;
  logo_url: string;
  main_image_1: string;
  main_image_2: string;
  main_image_3: string;
  content_image_1: string;
  content_image_2: string;
  content_image_3: string;
  content_image_4: string;
};

const fields: { key: keyof Form; label: string; type?: "number" | "textarea" }[] = [
  { key: "store_name", label: "Nome da loja" },
  { key: "name", label: "Nome do produto" },
  { key: "description", label: "Descrição", type: "textarea" },
  { key: "price", label: "Preço (Kz)", type: "number" },
  { key: "old_price", label: "Preço antigo (Kz, opcional)", type: "number" },
  { key: "cost_price", label: "Custo do fornecedor (Kz)", type: "number" },
  { key: "social_proof_text", label: "Texto de prova social" },
  { key: "top_bar_text", label: "Barra superior — linha 1" },
  { key: "top_bar_text_2", label: "Barra superior — linha 2" },
  { key: "logo_url", label: "URL do logótipo" },
  { key: "main_image_1", label: "Imagem principal 1" },
  { key: "main_image_2", label: "Imagem principal 2" },
  { key: "main_image_3", label: "Imagem principal 3" },
  { key: "content_image_1", label: "Imagem vertical 1" },
  { key: "content_image_2", label: "Imagem vertical 2" },
  { key: "content_image_3", label: "Imagem vertical 3" },
  { key: "content_image_4", label: "Imagem vertical 4" },
];

function toForm(product: Product): Form {
  return {
    name: product.name ?? "",
    description: product.description ?? "",
    price: String(product.price ?? ""),
    old_price: product.old_price ? String(product.old_price) : "",
    cost_price: String(product.cost_price ?? ""),
    social_proof_text: product.social_proof_text ?? "",
    top_bar_text: product.top_bar_text ?? "",
    top_bar_text_2: product.top_bar_text_2 ?? "",
    store_name: product.store_name ?? "",
    logo_url: product.logo_url ?? "",
    main_image_1: product.main_image_1 ?? "",
    main_image_2: product.main_image_2 ?? "",
    main_image_3: product.main_image_3 ?? "",
    content_image_1: product.content_image_1 ?? "",
    content_image_2: product.content_image_2 ?? "",
    content_image_3: product.content_image_3 ?? "",
    content_image_4: product.content_image_4 ?? "",
  };
}

function ProductEditor() {
  const { data: product, isLoading } = useProduct();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Form | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product && !form) setForm(toForm(product));
  }, [product, form]);

  if (isLoading || !product || !form) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  const set = (key: keyof Form, value: string) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (saving) return;
    const price = Number(form.price);
    if (!form.name.trim() || !Number.isFinite(price) || price <= 0) {
      toast.error("Indique um nome e um preço válido.");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("products")
      .update({
        name: form.name.trim(),
        description: form.description.trim() || null,
        price,
        old_price: form.old_price ? Number(form.old_price) : null,
        cost_price: Number(form.cost_price) || 0,
        social_proof_text: form.social_proof_text.trim(),
        top_bar_text: form.top_bar_text.trim(),
        top_bar_text_2: form.top_bar_text_2.trim(),
        store_name: form.store_name.trim(),
        logo_url: form.logo_url.trim() || null,
        main_image_1: form.main_image_1.trim() || null,
        main_image_2: form.main_image_2.trim() || null,
        main_image_3: form.main_image_3.trim() || null,
        content_image_1: form.content_image_1.trim() || null,
        content_image_2: form.content_image_2.trim() || null,
        content_image_3: form.content_image_3.trim() || null,
        content_image_4: form.content_image_4.trim() || null,
      })
      .eq("id", product.id);
    setSaving(false);

    if (error) {
      toast.error("Não foi possível guardar as alterações.");
      return;
    }
    await queryClient.invalidateQueries({ queryKey: ["product"] });
    toast.success("Produto actualizado com sucesso.");
  };

  return (
    <form onSubmit={save} className="max-w-2xl space-y-5">
      <div className="grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2">
        {fields.map(({ key, label, type }) => (
          <div key={key} className={type === "textarea" ? "space-y-1.5 sm:col-span-2" : "space-y-1.5"}>
            <Label htmlFor={key}>{label}</Label>
            {type === "textarea" ? (
              <Textarea
                id={key}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                rows={4}
              />
            ) : (
              <Input
                id={key}
                type={type === "number" ? "number" : "text"}
                min={type === "number" ? 0 : undefined}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                className="h-11"
              />
            )}
          </div>
        ))}
      </div>

      <Button type="submit" className="h-12 w-full sm:w-auto" disabled={saving}>
        {saving && <Loader2 className="size-4 animate-spin" />}
        Guardar alterações
      </Button>
    </form>
  );
}
