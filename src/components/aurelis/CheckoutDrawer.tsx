import { useEffect, useRef, useState } from "react";
import { Home, Loader2, Lock, MapPin, Package, Truck, X, CreditCard } from "lucide-react";

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
  legalNotice?: string;
  pulsingCta?: boolean;
};

type FieldKey = "firstName" | "lastName" | "phone" | "address" | "complement" | "municipality" | "neighborhood";
type Errors = Partial<Record<FieldKey | "province" | "confirm", string>>;

const PROVINCES = ["Luanda"] as const;
const ANGOLA_PROVINCES = [
  "Bengo", "Benguela", "Bié", "Cabinda", "Cuando Cubango", "Cuanza Norte",
  "Cuanza Sul", "Cunene", "Huambo", "Huíla", "Luanda", "Lunda Norte",
  "Lunda Sul", "Malanje", "Moxico", "Namibe", "Uíge", "Zaire",
] as const;

export function CheckoutDrawer({
  product, open, onOpenChange, quantity, onQuantityChange, onPlaced,
  minQuantity = 1, maxQuantity = 10, totalPriceOverride, theme = "default",
  allowAllProvinces = false, legalNotice, pulsingCta = false,
}: Props) {
  const isAqua = theme === "aqua-go";
  const [values, setValues] = useState<Record<FieldKey, string>>({
    firstName: "", lastName: "", phone: "", address: "", complement: "",
    municipality: "", neighborhood: "",
  });
  const [province, setProvince] = useState<string>("Luanda");
  const [billingSame, setBillingSame] = useState(true);
  const [billingAddress, setBillingAddress] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const confirmRef = useRef<HTMLLabelElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const subtotal = totalPriceOverride ?? product.price * quantity;
  const availableProvinces = allowAllProvinces ? ANGOLA_PROVINCES : PROVINCES;
  const fullName = [values.firstName.trim(), values.lastName.trim()].filter(Boolean).join(" ");

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("aurelis:checkout", { detail: { open, productName: product.name } }));
    if (open && typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        value: Number(subtotal.toFixed(2)), currency: "AOA", content_name: product.name,
        content_ids: [product.id], content_type: "product", num_items: quantity,
      });
    }
  }, [open, product.name, product.id, quantity, subtotal]);

  const set = (key: FieldKey, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current }; delete next[key]; return next;
    });
  };

  const validate = () => {
    const next: Errors = {};
    if (values.firstName.trim().length < 2) next.firstName = "Indique o seu nome próprio.";
    if (values.lastName.trim().length < 2) next.lastName = "Indique o seu apelido.";
    if (!isValidPhone(values.phone)) next.phone = "Indique um número angolano válido.";
    if (values.address.trim().length < 3) next.address = "Indique a rua ou endereço.";
    if (values.municipality.trim().length < 2) next.municipality = "Indique o município.";
    if (values.neighborhood.trim().length < 2) next.neighborhood = "Indique o bairro.";
    if (!province) next.province = "Selecione a província.";
    if (!confirmed) next.confirm = "Confirme que os dados estão corretos e que pode receber a encomenda.";
    if (!billingSame && billingAddress.trim().length < 5) next.confirm = "Indique o endereço de faturação.";
    setErrors(next);
    if (!confirmed) window.setTimeout(() => confirmRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setServerError(null);
    if (!validate()) return;

    const customerName = fullName.replace(/\s+/g, " ");
    const reference = values.complement.trim();
    const addressLines = [
      values.address.trim(),
      `Município: ${values.municipality.trim()}`,
      `Bairro: ${values.neighborhood.trim()}`,
      reference ? `Complemento/referência: ${reference}` : null,
      `Província: ${province}`,
      !billingSame ? `Endereço de faturação: ${billingAddress.trim()}` : null,
    ].filter(Boolean) as string[];

    setSubmitting(true);
    const { error } = await supabase.from("orders").insert({
      product_id: null,
      product_name: product.name,
      customer_name: customerName,
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
        event: "order.created", product_name: product.name, customer_name: customerName,
        customer_phone: values.phone.trim(), customer_address: addressLines.join(" | "),
        province, email: null, reference: reference || null, quantity,
        unit_price: totalPriceOverride !== undefined ? subtotal / quantity : product.price,
        supplier_cost: unitCost, total_price: subtotal,
        estimated_profit: (product.price - unitCost) * quantity, status: "NOVO",
      },
    }).catch(() => undefined);

    const eventId = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `aurelis-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    if (typeof window !== "undefined") {
      const pixelId = "1759106692011159";
      const w = window as Window & {
        fbq?: ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string };
        _fbq?: unknown;
      };
      if (typeof w.fbq !== "function") {
        type FbqStub = ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string };
        const fbq: FbqStub = function (...args: unknown[]) {
          fbq.queue = fbq.queue || []; fbq.queue.push(args);
        };
        fbq.queue = []; fbq.loaded = true; fbq.version = "2.0"; w.fbq = fbq; w._fbq = fbq;
        if (!document.querySelector('script[data-aurelis-meta-pixel="true"]')) {
          const script = document.createElement("script");
          script.async = true; script.src = "https://connect.facebook.net/en_US/fbevents.js";
          script.dataset["aurelisMetaPixel"] = "true"; document.head.appendChild(script);
        }
        fbq("init", pixelId, {}, { agent: "lovable" });
      }
      w.fbq("track", "Purchase", {
        value: Number(subtotal.toFixed(2)), currency: "AOA", content_name: product.name,
        content_ids: [product.id], contents: [{ id: product.id, quantity, item_price: Number((subtotal / quantity).toFixed(2)) }],
        content_type: "product", num_items: quantity,
      }, { eventID: eventId });
    }

    try {
      window.sessionStorage.setItem("aurelis_whatsapp_order", JSON.stringify({
        productName: product.name, quantity, total: subtotal, customerName,
        customerPhone: values.phone.trim(), address: values.address.trim(), province,
        municipality: values.municipality.trim(), neighborhood: values.neighborhood.trim(),
        reference, eventId,
      }));
    } catch { /* Checkout remains successful if browser storage is unavailable. */ }

    onOpenChange(false);
    onPlaced({ productName: product.name, quantity, total: subtotal, customerPhone: values.phone.trim() });
    setValues({ firstName: "", lastName: "", phone: "", address: "", complement: "", municipality: "", neighborhood: "" });
    setProvince("Luanda"); setBillingSame(true); setBillingAddress(""); setConfirmed(false);
  };

  const thumb = product.main_image_1 ?? product.main_image_2 ?? undefined;
  const fieldClass = `h-12 w-full rounded-lg text-base ${isAqua ? "border-[#CDB5A0] bg-white text-[#4A2C1C]" : "border-input bg-white"}`;
  const renderField = (key: FieldKey, label: string, placeholder: string, required = true, type = "text") => (
    <div className="min-w-0 space-y-1.5" key={key}>
      <Label htmlFor={key} className="text-sm font-medium text-[#30343B]">{label}{required ? " *" : ""}</Label>
      <Input id={key} type={type} inputMode={type === "tel" ? "tel" : undefined}
        autoComplete={key === "firstName" ? "given-name" : key === "lastName" ? "family-name" : key === "phone" ? "tel" : key === "address" ? "street-address" : undefined}
        placeholder={placeholder} value={values[key]} onChange={(e) => set(key, e.target.value)}
        className={`${fieldClass} ${errors[key] ? "border-red-500 focus-visible:ring-red-500" : ""}`} />
      {errors[key] && <p className="text-xs text-red-600">{errors[key]}</p>}
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className={`flex h-[100dvh] max-h-[100dvh] flex-col gap-0 overflow-hidden rounded-t-2xl border-0 p-0 sm:h-[96dvh] sm:max-h-[96dvh] sm:mx-auto sm:max-w-5xl ${isAqua ? "bg-[#F7F0E7] text-[#4A2C1C]" : "bg-white text-[#20242A]"}`}>
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
            <Home className="size-4" /> AURELIS <span className="text-gray-400">/</span> Checkout
          </div>
          <button type="button" aria-label="Fechar checkout" onClick={() => onOpenChange(false)}
            className="grid size-9 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto grid min-h-full max-w-5xl grid-cols-1 sm:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
            <div className="order-2 space-y-7 px-5 py-6 sm:order-1 sm:px-8 sm:py-8">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span>Informações</span><span>›</span><span className="text-gray-900">Entrega</span><span>›</span><span>Pagamento</span>
                </div>
                <h2 className="mb-4 text-xl font-semibold tracking-tight">ENTREGA</h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="province" className="text-sm font-medium">Província *</Label>
                    <select id="province" value={province} onChange={(e) => setProvince(e.target.value)}
                      className={`h-12 w-full rounded-lg border px-3 text-base outline-none focus:ring-2 focus:ring-gray-400 ${errors.province ? "border-red-500" : "border-gray-300"}`} required>
                      <option value="" disabled>Seleciona a província</option>
                      {availableProvinces.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                    {errors.province && <p className="text-xs text-red-600">{errors.province}</p>}
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {renderField("firstName", "Nome próprio", "Nome")}
                    {renderField("lastName", "Apelido", "Apelido")}
                  </div>
                  {renderField("address", "Endereço", "Rua, avenida e número da casa")}
                  {renderField("complement", "Andar, referência ou complemento", "Apartamento, referência, ponto próximo (opcional)", false)}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {renderField("municipality", "Município", "Município")}
                    {renderField("neighborhood", "Bairro", "Bairro")}
                  </div>
                  {renderField("phone", "Número de telefone", "+244 9XX XXX XXX", true, "tel")}
                </div>
              </div>

              <section className="space-y-3">
                <h3 className="text-lg font-semibold">Envio</h3>
                <div className="flex items-start gap-3 rounded-lg border border-gray-300 bg-white p-4">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-[6px] border-[#174A40]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">Entrega disponível para a localização selecionada</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">A equipa confirma a disponibilidade e o prazo de entrega após receber a encomenda.</p>
                  </div>
                  <span className="text-sm font-semibold text-[#174A40]">GRÁTIS</span>
                </div>
                <p className="text-xs text-gray-500">As condições de entrega seguem as regras já aplicadas a este produto.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-semibold">Pagamento</h3>
                <div className="flex items-start gap-3 rounded-lg border-2 border-[#174A40] bg-[#174A40]/[0.035] p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#174A40]/10 text-[#174A40]"><CreditCard className="size-4" /></span>
                  <div>
                    <p className="text-sm font-semibold">Pagamento na entrega (COD)</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">Pague apenas quando receber a sua encomenda. A nossa equipa entrará em contacto para confirmar os dados e organizar a entrega.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-semibold">Endereço de faturação</h3>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 text-sm">
                  <input type="radio" checked={billingSame} onChange={() => setBillingSame(true)} className="size-4 accent-[#174A40]" />
                  O mesmo que o endereço de entrega
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 text-sm">
                  <input type="radio" checked={!billingSame} onChange={() => setBillingSame(false)} className="size-4 accent-[#174A40]" />
                  Utilizar um endereço de faturação diferente
                </label>
                {!billingSame && <div className="space-y-1.5">
                  <Label htmlFor="billingAddress">Endereço de faturação *</Label>
                  <Input id="billingAddress" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)}
                    placeholder="Indique o endereço de faturação" className={fieldClass} />
                  {errors.confirm && <p className="text-xs text-red-600">{errors.confirm}</p>}
                </div>}
              </section>

              {legalNotice && <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
                <p className="mb-1 text-sm font-semibold text-amber-800">Aviso legal</p>
                <p className="text-sm leading-6 text-gray-700">{legalNotice}</p>
              </div>}

              <label ref={confirmRef} htmlFor="delivery-confirm" className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-300 p-4">
                <input id="delivery-confirm" type="checkbox" checked={confirmed}
                  onChange={(e) => { setConfirmed(e.target.checked); if (e.target.checked) setErrors((current) => { const next = { ...current }; delete next.confirm; return next; }); }}
                  className="mt-0.5 size-5 shrink-0 accent-[#174A40]" />
                <span className="text-sm leading-relaxed text-gray-700">Confirmo que os meus dados estão corretos e que posso receber o contacto da equipa para combinar a entrega.</span>
              </label>
              {errors.confirm && billingSame && <p className="-mt-5 text-xs text-red-600">{errors.confirm}</p>}

              {serverError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{serverError}</p>}
              <Button type="submit" disabled={submitting}
                className={`h-14 w-full rounded-lg text-base font-bold text-white shadow-sm ${pulsingCta ? "bg-green-600 hover:bg-green-700" : "bg-[#174A40] hover:bg-[#123B33]"}`}>
                {submitting ? <><Loader2 className="mr-2 size-5 animate-spin" /> A registar o pedido...</> : "FAZER A MINHA ENCOMENDA"}
              </Button>
              <p className="flex items-center justify-center gap-2 text-xs text-gray-500"><Lock className="size-3.5" /> Os teus dados são tratados de forma segura.</p>
            </div>

            <aside className="order-1 border-b border-gray-200 bg-[#F6F7F8] px-5 py-6 sm:order-2 sm:border-b-0 sm:border-l sm:px-7 sm:py-8">
              <h3 className="mb-5 text-base font-semibold">Resumo da encomenda</h3>
              <div className="flex gap-4">
                {thumb && <div className="relative size-20 shrink-0 rounded-lg border border-gray-200 bg-white p-1">
                  <img src={thumb} alt={product.name} className="size-full rounded-md object-contain" />
                  <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-gray-600 text-[11px] font-semibold text-white">{quantity}</span>
                </div>}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-snug">{product.name}</p>
                  <p className="mt-1 text-xs text-gray-500">Pagamento na entrega</p>
                </div>
                <p className="text-sm font-semibold">{formatKz(subtotal)}</p>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-sm text-gray-600">Quantidade</span>
                <QuantityStepper value={quantity} onChange={onQuantityChange} min={minQuantity} max={maxQuantity} />
              </div>
              <div className="mt-5 space-y-3 border-t border-gray-200 pt-4 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>{formatKz(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Envio</span><span className="font-medium text-[#174A40]">Grátis</span></div>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-gray-300 pt-4">
                <span className="text-base font-semibold">Total</span>
                <span className="text-xl font-bold tracking-tight">{formatKz(subtotal)}</span>
              </div>
              <div className="mt-6 rounded-lg border border-gray-200 bg-white p-3 text-xs leading-relaxed text-gray-600">
                <div className="mb-1 flex items-center gap-2 font-semibold text-gray-800"><Package className="size-4" /> Encomenda protegida</div>
                Pagamento apenas no momento em que receberes o produto.
              </div>
            </aside>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
