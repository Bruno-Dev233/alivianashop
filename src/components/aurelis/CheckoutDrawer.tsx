import { useState } from "react";
import { Home, Loader2, Lock, Truck, X } from "lucide-react";

import { QuantityStepper } from "@/components/aurelis/QuantityStepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { formatKz, isValidPhone, type Product } from "@/lib/aurelis";
import { sendOrderWebhook } from "@/lib/webhook.functions";

export type PlacedOrder = {
  productName: string;
  quantity: number;
  total: number;
};

type Props = {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onPlaced: (order: PlacedOrder) => void;
  minQuantity?: number;
  theme?: "default" | "aqua-go";
};

type FieldKey = "fullName" | "phone" | "address" | "reference";
type Errors = Partial<Record<FieldKey | "province" | "confirm", string>>;

const PROVINCES = ["Luanda"] as const;

const FIELDS: {
  key: FieldKey;
  label: string;
  required: boolean;
  type?: string;
  placeholder: string;
}[] = [
  { key: "fullName", label: "Nome Completo", required: true, placeholder: "Ex: João Manuel" },
  {
    key: "phone",
    label: "WhatsApp/Telefone",
    required: true,
    type: "tel",
    placeholder: "Ex: 923 000 000",
  },
  { key: "address", label: "Bairro e Rua", required: true, placeholder: "Ex: Talatona, Rua 10" },
  {
    key: "reference",
    label: "Ponto de Referência",
    required: false,
    placeholder: "Ex: perto do Banco BFA",
  },
];

export function CheckoutDrawer({
  product,
  open,
  onOpenChange,
  quantity,
  onQuantityChange,
  onPlaced,
  minQuantity = 1,
  theme = "default",
}: Props) {
  const isAqua = theme === "aqua-go";
  const [values, setValues] = useState<Record<FieldKey, string>>({
    fullName: "",
    phone: "",
    address: "",
    reference: "",
  });
  const [province, setProvince] = useState<string>("Luanda");
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const subtotal = product.price * quantity;
  const set = (key: FieldKey, value: string) => setValues((v) => ({ ...v, [key]: value }));

  const validate = () => {
    const next: Errors = {};
    if (values.fullName.trim().length < 3 || !values.fullName.trim().includes(" "))
      next.fullName = "Indique o nome e apelido.";
    if (!isValidPhone(values.phone)) next.phone = "Indique um número válido.";
    if (values.address.trim().length < 5) next.address = "Indique o bairro e a rua.";
    if (!province) next.province = "Selecione a província.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setServerError(null);
    if (!validate()) return;

    const fullName = values.fullName.trim().replace(/\s+/g, " ");
    const reference = values.reference.trim();
    const addressLines = [
      values.address.trim(),
      reference ? `Ponto de referência: ${reference}` : null,
      `Província: ${province}`,
    ].filter(Boolean) as string[];

    setSubmitting(true);
    const { error } = await supabase
      .from("orders")
      .insert({
        // Static landing-page products may not exist in the products table yet.
        // Keep the order independent from that FK so COD orders can always be registered.
        product_id: null,
        product_name: product.name,
        customer_name: fullName,
        customer_phone: values.phone.trim(),
        customer_address: addressLines.join(" | "),
        quantity,
        unit_price: product.price,
        total_price: subtotal,
      });
    setSubmitting(false);

    if (error) {
      setServerError("Não foi possível registar o pedido. Tente novamente.");
      return;
    }

    const unitCost = Number(product.cost_price ?? 0);
    void sendOrderWebhook({
      data: {
        event: "order.created",
        product_name: product.name,
        customer_name: fullName,
        customer_phone: values.phone.trim(),
        customer_address: values.address.trim(),
        province,
        email: null,
        reference: reference || null,
        quantity,
        unit_price: product.price,
        supplier_cost: unitCost,
        total_price: subtotal,
        estimated_profit: (product.price - unitCost) * quantity,
        status: "NOVO",
      },
    }).catch(() => undefined);

    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Purchase", {
        value: subtotal,
        currency: "AOA",
        contents: [{ id: product.id, quantity, item_price: product.price }],
        content_type: "product",
      });
    }

    onOpenChange(false);
    onPlaced({ productName: product.name, quantity, total: subtotal });
    setValues({
      fullName: "",
      phone: "",
      address: "",
      reference: "",
    });
    setProvince("Luanda");
  };

  const thumb = product.main_image_1 ?? product.main_image_2 ?? undefined;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={`flex h-[100dvh] max-h-[100dvh] flex-col gap-0 rounded-t-3xl border-0 p-0 sm:h-[96dvh] sm:max-h-[96dvh] sm:mx-auto sm:max-w-lg ${isAqua ? "bg-[#F7F0E7] text-[#4A2C1C]" : "bg-background"}`}
      >
        <div className={`flex items-center justify-between border-b px-4 py-3 ${isAqua ? "border-[#D8C2AE] bg-[#5A351F] text-white" : "border-border bg-sky"}`}>
          <div className="flex items-center gap-2">
            <span className={`grid size-9 place-items-center rounded-full ${isAqua ? "bg-white/15 text-white" : "bg-ink text-ink-foreground"}`}>
              <Home className="size-4" />
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-wide">
              Cash on Delivery
            </span>
          </div>
          <button
            type="button"
            aria-label="Fechar checkout"
            onClick={() => onOpenChange(false)}
            className={`grid size-9 place-items-center rounded-full border transition ${isAqua ? "border-white/30 bg-white/10 text-white hover:bg-white/20" : "border-border bg-background text-foreground hover:bg-muted"}`}
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 pb-6 sm:space-y-5 sm:pb-4">
            <div className={`rounded-2xl border p-3 shadow-soft ${isAqua ? "border-[#D8C2AE] bg-white" : "border-border bg-card"}`}>
              <div className="flex gap-3">
                {thumb && (
                  <img
                    src={thumb}
                    alt=""
                    className={`size-16 shrink-0 rounded-xl border object-contain ${isAqua ? "border-[#D8C2AE] bg-[#F7F0E7]" : "border-border"}`}
                  />
                )}
                <p className="text-sm font-semibold leading-snug">{product.name}</p>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-sm font-bold">Quantidade</span>
                <QuantityStepper value={quantity} onChange={onQuantityChange} min={minQuantity} large />
              </div>
              <dl className={`mt-3 space-y-1.5 border-t pt-3 text-sm ${isAqua ? "border-[#E5D6C8]" : "border-border"}`}>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold">{formatKz(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Frete</dt>
                  <dd className="font-bold text-primary">GRÁTIS</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-1.5 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-display font-bold">{formatKz(subtotal)}</dd>
                </div>
              </dl>
            </div>

            <div className={`rounded-2xl border p-3 ${isAqua ? "border-[#D8C2AE] bg-[#EFE2D3]" : "border-primary/25 bg-primary/8"}`}>
              <p className={`flex items-center gap-2 text-sm font-bold ${isAqua ? "text-[#5A351F]" : "text-primary"}`}>
                <Truck className="size-4" /> 🚚 FRETE GRÁTIS
              </p>
              <p className="mt-1 text-xs text-foreground">
                Entrega prevista nas próximas <strong>24 ou 48 horas</strong>
              </p>
              <p className="text-xs text-muted-foreground">Entrega disponível em Angola</p>
            </div>

            <div className="space-y-3">
              {FIELDS.map(({ key, label, required, type, placeholder }) => (
                <div key={key} className="space-y-1.5">
                  <Label htmlFor={key} className="text-sm font-semibold">
                    {label} {required && "*"}
                  </Label>
                  <Input
                    id={key}
                    type={type ?? "text"}
                    inputMode={type === "tel" ? "tel" : undefined}
                    placeholder={placeholder}
                    autoComplete={key === "fullName" ? "name" : undefined}
                    value={values[key]}
                    onChange={(e) => set(key, e.target.value)}
                    className={`h-12 min-h-12 w-full rounded-xl text-base ${isAqua ? "border-[#CDB5A0] bg-white text-[#4A2C1C] placeholder:text-[#9B806B] focus-visible:ring-[#8B5E3C]" : ""}`}
                  />
                  {errors[key] && (
                    <p className="text-xs font-medium text-destructive">{errors[key]}</p>
                  )}
                </div>
              ))}

              <div className="space-y-1.5">
                <Label htmlFor="province" className="text-sm font-semibold">
                  Província *
                </Label>
                <select
                  id="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className={`h-12 min-h-12 w-full rounded-xl border px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5E3C] ${isAqua ? "border-[#CDB5A0] bg-white text-[#4A2C1C]" : "border-input bg-background focus-visible:ring-ring"}`}
                  required
                >
                  <option value="" disabled>
                    Selecione a província
                  </option>
                  {PROVINCES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="text-xs font-medium text-destructive">{errors.province}</p>
                )}
              </div>

            </div>


            <div className={`rounded-2xl border p-3 text-center ${isAqua ? "border-[#D8C2AE] bg-white" : "border-border bg-card"}`}>
              <p className="font-display text-sm font-bold">Pagamento na Entrega</p>
              <p className="text-xs text-muted-foreground">
                Você só paga quando receber o produto.
              </p>
            </div>
          </div>

          <div className={`space-y-2 border-t px-4 pb-4 pt-3 ${isAqua ? "border-[#D8C2AE] bg-[#F7F0E7]" : "border-border bg-background"}`}>
            {serverError && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                {serverError}
              </p>
            )}
            <Button
              type="submit"
              variant="ghost"
              disabled={submitting}
              className={`h-14 min-h-14 w-full rounded-2xl text-base font-bold shadow-xl sm:h-14 ${isAqua ? "bg-[#5A351F] text-white hover:bg-[#4A2C1C] hover:text-white" : "bg-ink text-ink-foreground shadow-ink hover:bg-ink/90 hover:text-ink-foreground"}`}
            >
              {submitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> A registar o pedido...
                </>
              ) : (
                `🚚 COMPRE AGORA & PAGUE DEPOIS — ${formatKz(subtotal)}`
              )}
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <Lock className="size-3.5 text-primary" /> 🔒 Seus dados estão protegidos e seguros
              conosco.
            </p>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
