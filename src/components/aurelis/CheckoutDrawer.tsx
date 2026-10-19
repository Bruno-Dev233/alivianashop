import { useEffect, useState } from "react";
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
  customerPhone: string;
};

type Props = {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onPlaced: (order: PlacedOrder) => void;
  minQuantity?: number;
  maxQuantity?: number;
  totalPriceOverride?: number;
  theme?: "default" | "aqua-go";
  allowAllProvinces?: boolean;
};

type FieldKey = "fullName" | "phone" | "municipality" | "address" | "reference";
type Errors = Partial<Record<FieldKey | "province" | "confirm", string>>;

const PROVINCES = ["Luanda"] as const;
const ANGOLA_PROVINCES = [
  "Bengo", "Benguela", "Bié", "Cabinda", "Cuando Cubango", "Cuanza Norte",
  "Cuanza Sul", "Cunene", "Huambo", "Huíla", "Luanda", "Lunda Norte",
  "Lunda Sul", "Malanje", "Moxico", "Namibe", "Uíge", "Zaire",
] as const;

const FIELDS: {
  key: FieldKey;
  label: string;
  required: boolean;
  type?: string;
  placeholder: string;
}[] = [
  { key: "fullName", label: "Nome Completo", required: true, placeholder: "Ex: João" },
  {
    key: "phone",
    label: "WhatsApp/Telefone",
    required: true,
    type: "tel",
    placeholder: "Ex: 923 000 000",
  },
  { key: "municipality", label: "Município", required: true, placeholder: "Ex.: Talatona" },
  { key: "address", label: "Bairro e Rua", required: true, placeholder: "Ex.: Bairro, rua e número da casa" },
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
  maxQuantity = 10,
  totalPriceOverride,
  theme = "default",
  allowAllProvinces = false,
}: Props) {
  const isAqua = theme === "aqua-go";
  const [values, setValues] = useState<Record<FieldKey, string>>({
    fullName: "",
    phone: "",
    municipality: "",
    address: "",
    reference: "",
  });
  const [province, setProvince] = useState<string>("Luanda");
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const subtotal = totalPriceOverride ?? product.price * quantity;
  const availableProvinces = allowAllProvinces ? ANGOLA_PROVINCES : PROVINCES;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("aurelis:checkout", { detail: { open, productName: product.name } }),
    );
    if (open && typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        value: Number(subtotal.toFixed(2)),
        currency: "AOA",
        content_name: product.name,
        content_ids: [product.id],
        content_type: "product",
        num_items: quantity,
      });
    }
  }, [open, product.name, product.id, quantity, subtotal]);
  const set = (key: FieldKey, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const next: Errors = {};
    if (values.fullName.trim().length < 2)
      next.fullName = "Indique o seu nome.";
    if (!isValidPhone(values.phone)) next.phone = "Indique um número válido.";
    if (values.municipality.trim().length < 2) next.municipality = "Indique o município.";
    if (values.address.trim().length < 5) next.address = "Indique o bairro e a rua.";
    if (!province) next.province = "Selecione a província.";
    if (!confirmed)
      next.confirm = "Confirme que os dados estão corretos e que pode receber o contacto para combinar a entrega.";
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
      `Município: ${values.municipality.trim()}`,
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
        unit_price: totalPriceOverride !== undefined ? subtotal / quantity : product.price,
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
        customer_address: addressLines.join(" | "),
        province,
        email: null,
        reference: reference || null,
        quantity,
        unit_price: totalPriceOverride !== undefined ? subtotal / quantity : product.price,
        supplier_cost: unitCost,
        total_price: subtotal,
        estimated_profit: (product.price - unitCost) * quantity,
        status: "NOVO",
      },
    }).catch(() => undefined);

    // Track Purchase only after the order was successfully saved to Supabase.
    // Ensure the pixel is available on every landing page, not only pages that
    // initialize it locally. If the pixel already exists, reuse it.
    if (typeof window !== "undefined") {
      const pixelId = "4582169178770467";
      const w = window as Window & {
        fbq?: ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string };
        _fbq?: unknown;
      };

      if (typeof w.fbq !== "function") {
        type FbqStub = ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string };
        const fbq: FbqStub = function (...args: unknown[]) {
          fbq.queue = fbq.queue || [];
          fbq.queue.push(args);
        };
        fbq.queue = [];
        fbq.loaded = true;
        fbq.version = "2.0";
        w.fbq = fbq;
        w._fbq = fbq;

        if (!document.querySelector('script[data-aurelis-meta-pixel="true"]')) {
          const script = document.createElement("script");
          script.async = true;
          script.src = "https://connect.facebook.net/en_US/fbevents.js";
          script.dataset["aurelisMetaPixel"] = "true";
          document.head.appendChild(script);
        }
        fbq("init", pixelId);
      }

      const eventId = typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `aurelis-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      w.fbq("track", "Purchase", {
        value: Number(subtotal.toFixed(2)),
        currency: "AOA",
        content_name: product.name,
        content_ids: [product.id],
        contents: [{ id: product.id, quantity, item_price: Number((subtotal / quantity).toFixed(2)) }],
        content_type: "product",
        num_items: quantity,
      }, { eventID: eventId });
    }

    // Keep the successfully registered order details for the thank-you page's WhatsApp confirmation.
    // This uses sessionStorage only after Supabase confirms the order was saved.
    try {
      window.sessionStorage.setItem("aurelis_whatsapp_order", JSON.stringify({
        productName: product.name,
        quantity,
        total: subtotal,
        customerName: fullName,
        customerPhone: values.phone.trim(),
        address: values.address.trim(),
        municipality: values.municipality.trim(),
        province,
        reference,
      }));
    } catch {
      // Checkout remains successful even if browser storage is unavailable.
    }

    onOpenChange(false);
    onPlaced({
      productName: product.name,
      quantity,
      total: subtotal,
      customerPhone: values.phone.trim(),
    });
    setValues({
      fullName: "",
      phone: "",
      municipality: "",
      address: "",
      reference: "",
    });
    setProvince("Luanda");
    setConfirmed(false);
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
                <QuantityStepper
                  value={quantity}
                  onChange={onQuantityChange}
                  min={minQuantity}
                  max={maxQuantity}
                  large
                />
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
                A equipa confirma o prazo conforme a sua localização
              </p>
              <p className="text-xs text-muted-foreground">As condições de entrega são confirmadas no contacto de confirmação.</p>
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
                    autoComplete={key === "fullName" ? "name" : key === "phone" ? "tel" : key === "municipality" ? "address-level2" : key === "address" ? "street-address" : undefined}
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
                  {availableProvinces.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="text-xs font-medium text-destructive">{errors.province}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="delivery-confirm"
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${isAqua ? "border-[#CDB5A0] bg-white" : "border-primary/40 bg-primary/5"} ${confirmed ? "ring-2 ring-[#8B5E3C] ring-offset-1" : ""}`}
                >
                  <input
                    id="delivery-confirm"
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => {
                      setConfirmed(e.target.checked);
                      if (e.target.checked) setErrors((current) => ({ ...current, confirm: undefined }));
                    }}
                    className="mt-0.5 size-6 shrink-0 cursor-pointer rounded accent-[#8B5E3C]"
                  />
                  <span className="text-base font-semibold leading-snug">
                    Confirmo que os meus dados estão corretos e que posso receber o contacto da equipa para combinar a entrega.
                  </span>
                </label>
                {errors.confirm && (
                  <p className="text-xs font-medium text-destructive">{errors.confirm}</p>
                )}
              </div>

            </div>


            <div className={`rounded-2xl border p-3 text-center ${isAqua ? "border-[#D8C2AE] bg-white" : "border-border bg-card"}`}>
              <p className="font-display text-sm font-bold">Pagamento na Entrega</p>
              <p className="text-xs text-muted-foreground">
                Pague apenas quando receber o produto. A equipa confirmará os detalhes da entrega.
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
                `🛍️ CONFIRMAR ENCOMENDA — ${formatKz(subtotal)}`
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
