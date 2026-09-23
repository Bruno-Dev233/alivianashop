import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Crown, Truck, Wallet } from "lucide-react";

import { CheckoutDrawer, type PlacedOrder } from "@/components/aurelis/CheckoutDrawer";
import { OrderSuccessDialog } from "@/components/aurelis/OrderSuccessDialog";
import { ProductGallery } from "@/components/aurelis/ProductGallery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { fetchLandingPage, landingPageKey, useLandingPage } from "@/hooks/useLandingPage";
import { formatKz, type Product } from "@/lib/aurelis";
import { DEFAULT_LANDING, type LandingContent } from "@/lib/landing";

const SLUG = "lancheira-eletrica";

export const Route = createFileRoute("/lancheira-eletrica")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: landingPageKey(SLUG),
      queryFn: () => fetchLandingPage(SLUG),
    }),
  head: ({ loaderData }) => {
    const c = loaderData?.content ?? DEFAULT_LANDING;
    const image = c.images[0];
    return {
      meta: [
        { title: c.seoTitle },
        { name: "description", content: c.seoDescription },
        { property: "og:title", content: c.seoTitle },
        { property: "og:description", content: c.seoDescription },
        { property: "og:type", content: "product" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LancheiraPage,
});

function buildProduct(c: LandingContent, unitPrice: number): Product {
  return {
    id: "",
    name: c.productName,
    price: unitPrice,
    old_price: c.oldPrice,
    cost_price: 0,
    description: null,
    social_proof_text: "",
    top_bar_text: "",
    top_bar_text_2: "",
    store_name: c.brand,
    logo_url: null,
    main_image_1: c.images[0] ?? null,
    main_image_2: c.images[1] ?? null,
    main_image_3: c.images[2] ?? null,
    content_image_1: null,
    content_image_2: null,
    content_image_3: null,
    content_image_4: null,
  };
}

function LancheiraPage() {
  const { data } = useLandingPage(SLUG);
  const c = data?.content ?? DEFAULT_LANDING;

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(c.price);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [minQty, setMinQty] = useState(1);

  const buy = (qty = 1, total = c.price * qty) => {
    setQuantity(qty);
    setMinQty(qty);
    setUnitPrice(total / qty);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-lunch px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-lunch-foreground sm:text-sm">
        {c.topBar}
      </div>

      <header className="border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <span className="font-display text-xl font-extrabold tracking-tight">{c.brand}</span>
          <Button
            type="button"
            variant="ghost"
            onClick={() => buy(1)}
            className="h-10 rounded-full bg-lunch px-4 text-sm font-bold text-lunch-foreground hover:bg-lunch-dark hover:text-lunch-foreground"
          >
            {c.headerCta}
          </Button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="rounded-3xl bg-lunch-soft p-3">
              <ProductGallery images={c.images} alt={c.productName} />
            </div>

            <div>
              {c.badge && (
                <span className="inline-block rounded-full bg-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-background">
                  {c.badge}
                </span>
              )}
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                {c.heroTitle} <span className="text-lunch">{c.heroTitleHighlight}</span>
              </h1>
              <p className="mt-3 text-lg font-semibold leading-snug">{c.heroSubtitle}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {c.heroDescription}
              </p>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                <span className="font-display text-4xl font-extrabold text-lunch sm:text-5xl">
                  {formatKz(c.price)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatKz(c.oldPrice)}
                </span>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={() => buy(1)}
                className="animate-cta-shake mt-5 h-16 w-full rounded-2xl bg-lunch text-base font-bold text-lunch-foreground shadow-ink hover:bg-lunch-dark hover:text-lunch-foreground"
              >
                {c.heroCta}
              </Button>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
                <span className="flex items-center gap-1.5">
                  <Truck className="size-4 text-lunch" /> {c.note1}
                </span>
                <span className="flex items-center gap-1.5">
                  <Wallet className="size-4 text-lunch" /> {c.note2}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="bg-muted/60 py-12">
          <div className="mx-auto w-full max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{c.problemTitle}</h2>
            {c.problemParagraphs.map((p, i) => (
              <p
                key={p}
                className={
                  i === c.problemParagraphs.length - 1
                    ? "mt-3 text-[15px] font-semibold leading-relaxed"
                    : "mt-3 text-[15px] leading-relaxed text-muted-foreground"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* SOLUÇÃO */}
        <section className="mx-auto w-full max-w-6xl px-4 py-12">
          <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
            {c.solutionTitle}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.solutionItems.map((t) => (
              <div
                key={t}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 shadow-soft"
              >
                <p className="text-sm font-semibold leading-snug">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="bg-foreground py-12 text-background">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">{c.howTitle}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {c.steps.map(({ n, text }) => (
                <div key={`${n}-${text}`} className="rounded-2xl bg-background/10 p-5">
                  <span className="font-display text-3xl font-extrabold text-lunch">{n}</span>
                  <p className="mt-2 text-sm font-bold leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-12">
          <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
            {c.galleryTitle}
          </h2>
          <div className="hide-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {c.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${c.productName} — imagem ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="aspect-square w-[78%] shrink-0 snap-center rounded-2xl border border-border bg-lunch-soft object-cover sm:w-full"
              />
            ))}
          </div>
        </section>

        {/* OFERTAS */}
        <section className="bg-lunch-soft py-12">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
              {c.offersTitle}
            </h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {c.offers.map((offer) => (
                <div
                  key={`${offer.quantity}-${offer.label}`}
                  className={`flex flex-col rounded-3xl border-2 bg-card p-5 transition ${offer.tag?.includes("MAIS VENDIDO") ? "border-lunch shadow-[0_18px_50px_-12px_var(--lunch)] ring-4 ring-lunch/20 lg:-translate-y-2" : "border-border shadow-card"}`}
                >
                  {offer.tag && (
                    <span className="mb-3 self-start rounded-full bg-lunch px-3 py-1 text-xs font-bold text-lunch-foreground">
                      {offer.tag}
                    </span>
                  )}
                  <p className="font-display text-lg font-extrabold">{offer.label}</p>
                  <p className="mt-2 font-display text-3xl font-extrabold text-lunch">
                    {formatKz(offer.price)}
                  </p>
                  <p className="text-sm text-muted-foreground line-through">
                    {formatKz(offer.old)}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => buy(offer.quantity, offer.price)}
                    className="mt-4 h-14 w-full rounded-2xl bg-foreground text-sm font-bold text-background hover:bg-lunch hover:text-lunch-foreground"
                  >
                    {offer.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="mx-auto w-full max-w-6xl px-4 py-12">
          <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
            {c.benefitsTitle}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.benefits.map((b) => (
              <p
                key={b}
                className="rounded-2xl border border-lunch/30 bg-card px-4 py-4 text-sm font-semibold shadow-soft"
              >
                {b}
              </p>
            ))}
          </div>
        </section>

        {/* PARA QUEM É */}
        <section className="bg-muted/60 py-12">
          <div className="mx-auto w-full max-w-3xl px-4">
            <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
              {c.audienceTitle}
            </h2>
            <ul className="mx-auto mt-6 max-w-md space-y-2.5">
              {c.audience.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 text-sm font-semibold shadow-soft"
                >
                  <Check className="size-4 shrink-0 text-lunch" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* OFERTA FINAL */}
        <section className="bg-foreground py-14 text-background">
          <div className="mx-auto w-full max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
              {c.finalTitle} <span className="text-lunch">{c.finalTitleHighlight}</span>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed opacity-90">{c.finalText}</p>
            <div className="mt-5 flex flex-wrap items-end justify-center gap-3">
              <span className="font-display text-4xl font-extrabold text-lunch sm:text-5xl">
                {formatKz(c.price)}
              </span>
              <span className="text-lg line-through opacity-70">{formatKz(c.oldPrice)}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => buy(1)}
              className="mt-5 h-16 w-full max-w-md rounded-2xl bg-lunch text-base font-bold text-lunch-foreground hover:bg-lunch-dark hover:text-lunch-foreground"
            >
              {c.finalCta}
            </Button>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
              <span>{c.note1}</span>
              <span>{c.note2}</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl px-4 py-12">
          <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">{c.faqTitle}</h2>
          <Accordion type="single" collapsible className="mt-6">
            {c.faq.map(({ q, a }) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left text-sm font-semibold">{q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-6 text-center text-xs text-muted-foreground">
        <span className="flex items-center justify-center gap-1.5">
          <Crown className="size-3.5 text-lunch" /> {c.footerText}
        </span>
      </footer>

      <CheckoutDrawer
        product={buildProduct(c, unitPrice)}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onPlaced={setPlaced}
        minQuantity={minQty}
      />
      <OrderSuccessDialog order={placed} onClose={() => setPlaced(null)} />
    </div>
  );
}
