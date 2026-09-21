import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Lock, ShieldCheck, Star, Truck, Wallet } from "lucide-react";

import { CheckoutDrawer, type PlacedOrder } from "@/components/aurelis/CheckoutDrawer";
import { Footer } from "@/components/aurelis/Footer";
import { Header } from "@/components/aurelis/Header";
import { OrderSuccessDialog } from "@/components/aurelis/OrderSuccessDialog";
import { ProductGallery } from "@/components/aurelis/ProductGallery";

import { VideoSection } from "@/components/aurelis/VideoSection";
import { Testimonials } from "@/components/aurelis/Testimonials";
import { FinalCta } from "@/components/aurelis/FinalCta";
import { QuantityStepper } from "@/components/aurelis/QuantityStepper";
import { TopBar } from "@/components/aurelis/TopBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/useProduct";
import { formatKz, productImages } from "@/lib/aurelis";

import galeria4 from "@/assets/galeria-4.jpg.asset.json";
import galeria5 from "@/assets/galeria-5.jpg.asset.json";

const title = "Massageador Shiatsu Elétrico | AURELIS";
const description =
  "Massageador Shiatsu Elétrico para pescoço, ombros e costas. Frete grátis em Luanda e pagamento apenas na entrega. Encomende em menos de 1 minuto na AURELIS.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const STOCK_LEFT = 8;
const STOCK_TOTAL = 30;

const benefits = [
  { icon: Truck, label: "Frete grátis", detail: "Entrega em 24–48h em Luanda" },
  { icon: Wallet, label: "Pagamento na entrega", detail: "Paga só quando receber" },
  { icon: Lock, label: "Compra segura", detail: "Dados protegidos" },
];

function LandingPage() {
  const { data: product, isLoading } = useProduct();
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (isLoading || !product) {
    return (
      <div className="min-h-screen">
        <div className="h-9 bg-cyan" />
        <div className="shell space-y-4 py-6">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  const gallery = [...productImages(product), galeria4.url, galeria5.url];
  const verticalImage = product.content_image_2;
  const total = product.price * quantity;

  return (
    <div className="min-h-screen bg-background">
      <TopBar line1={product.top_bar_text} line2={product.top_bar_text_2} />
      <Header
        storeName={product.store_name}
        logoUrl={product.logo_url}
        onOrder={() => setCheckoutOpen(true)}
      />

      <main className="shell pb-8 pt-5">
        <div className="relative overflow-hidden rounded-3xl bg-card p-2 shadow-card sm:p-3">
          <ProductGallery images={gallery} alt={product.name} />
          <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-cyan px-3 py-1.5 font-display text-sm font-bold tracking-tight text-cyan-foreground shadow-soft sm:text-base">
            {formatKz(product.price)}
          </span>
        </div>



        <h1 className="mt-5 font-display text-2xl font-bold leading-tight sm:text-3xl">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-2">
          <span className="flex text-warning" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </span>
          <span className="text-sm text-muted-foreground">{product.social_proof_text}</span>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <span className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
            {formatKz(product.price)}
          </span>
          {product.old_price && product.old_price > product.price && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                {formatKz(product.old_price)}
              </span>
              <span className="rounded-full bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary">
                -{Math.round((1 - product.price / product.old_price) * 100)}%
              </span>
            </>
          )}
        </div>

        {product.description && (
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        )}

        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-warning/35 bg-warning/10 px-3.5 py-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-snug">
              ⚠️ Restam apenas {STOCK_LEFT} unidades disponíveis para entrega imediata nesta semana
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-warning"
                style={{ width: `${(STOCK_LEFT / STOCK_TOTAL) * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {STOCK_LEFT} de {STOCK_TOTAL} unidades reservadas para Luanda
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold">Quantidade</span>
            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-2xl font-bold">{formatKz(total)}</span>
          </div>

          <Button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            variant="ghost"
            className="animate-cta-shake mt-4 bg-ink text-ink-foreground shadow-ink hover:bg-ink/90 hover:text-ink-foreground h-16 w-full rounded-2xl text-base font-bold"
          >
            Encomendar Agora →
          </Button>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-primary">
            <Lock className="size-3.5" /> Pagamento na entrega • Sem risco
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {benefits.map(({ icon: Icon, label, detail }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-soft"
            >
              <Icon className="size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold leading-tight">{label}</p>
                <p className="text-xs text-muted-foreground">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {verticalImage && (
          <div className="mt-8">
            <img
              src={verticalImage}
              alt={`${product.name} — detalhes`}
              className="mx-auto block h-auto w-full max-w-[26rem] rounded-2xl object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <VideoSection />

        <Testimonials onBuy={() => setCheckoutOpen(true)} />

        <FinalCta onBuy={() => setCheckoutOpen(true)} />





        <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-primary/25 bg-primary/8 px-4 py-4 text-center text-sm font-medium">
          <ShieldCheck className="size-5 shrink-0 text-primary" />
          Confirmamos cada pedido por telefone antes da entrega.
        </div>

        <div className="mt-6">
          <Button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            variant="ghost"
            className="bg-ink text-ink-foreground shadow-ink hover:bg-ink/90 hover:text-ink-foreground h-16 w-full rounded-2xl text-base font-bold"
          >
            Encomendar Agora → {formatKz(total)}
          </Button>
        </div>
      </main>

      <Footer storeName={product.store_name} />

      <CheckoutDrawer
        product={product}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onPlaced={setPlaced}
      />
      <OrderSuccessDialog order={placed} onClose={() => setPlaced(null)} />
    </div>
  );
}
