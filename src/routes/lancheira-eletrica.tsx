import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  Crown,
  Flame,
  Plug,
  Soup,
  Sparkles,
  Truck,
  Utensils,
  Wallet,
} from "lucide-react";

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
import { formatKz, type Product } from "@/lib/aurelis";

import img1 from "@/assets/lancheira-1.jpg.asset.json";
import img2 from "@/assets/lancheira-2.jpg.asset.json";
import img3 from "@/assets/lancheira-3.jpg.asset.json";
import img4 from "@/assets/lancheira-4.avif.asset.json";

const title = "Lancheira Elétrica 2 em 1 | AURELIS";
const description =
  "Lancheira Elétrica 2 em 1 da AURELIS: aquecedor de alimentos portátil à prova de vazamento, 1,5L. 32.750 Kz com entrega grátis em Luanda e pagamento na entrega.";

export const Route = createFileRoute("/lancheira-eletrica")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { property: "og:image", content: img1.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: img1.url },
    ],
  }),
  component: LancheiraPage,
});

const PRODUCT_NAME =
  "Lancheira Elétrica 2 em 1 – Aquecedor de Alimentos Portátil à Prova de Vazamento";
const PRICE = 32750;
const OLD_PRICE = 54999;
const IMAGES = [img1.url, img2.url, img3.url, img4.url];

const OFFERS = [
  { quantity: 1, label: "1 LANCHEIRA", price: 32750, old: 54999, cta: "COMPRAR 1 UNIDADE" },
  {
    quantity: 2,
    label: "2 LANCHEIRAS",
    price: 59900,
    old: 109998,
    cta: "COMPRAR 2 UNIDADES",
    tag: "🔥 MAIS VENDIDO",
  },
  {
    quantity: 3,
    label: "3 LANCHEIRAS",
    price: 84900,
    old: 164997,
    cta: "COMPRAR 3 UNIDADES",
    tag: "👑 MELHOR VALOR",
  },
];

const SOLUTIONS = [
  { icon: Soup, title: "🍱 Capacidade de 1,5L" },
  { icon: Plug, title: "⚡ Aquecimento diretamente na lancheira" },
  { icon: Sparkles, title: "💧 Design à prova de vazamento" },
  { icon: Utensils, title: "🥄 Compartimento para colher" },
  { icon: Flame, title: "🏠 Ideal para trabalho, escola ou casa" },
  { icon: Check, title: "🧼 Fácil de usar e limpar" },
];

const STEPS = [
  { n: "01", text: "🍱 COLOQUE SUA REFEIÇÃO" },
  { n: "02", text: "🔌 CONECTE A LANCHEIRA" },
  { n: "03", text: "🔥 AQUEÇA SUA REFEIÇÃO" },
  { n: "04", text: "😋 COMA QUENTE" },
];

const BENEFITS = [
  "🍱 1,5L de capacidade",
  "⚡ Aquecimento prático",
  "💧 À prova de vazamento",
  "🥄 Compartimento para colher",
  "🏫 Ideal para escola",
  "💼 Ideal para trabalho",
];

const AUDIENCE = [
  "Quem trabalha fora",
  "Estudantes",
  "Quem leva comida de casa",
  "Quem busca praticidade",
  "Quem não tem micro-ondas disponível",
];

const FAQ = [
  {
    q: "Qual é a capacidade?",
    a: "A Lancheira Elétrica AURELIS possui capacidade de 1,5L.",
  },
  {
    q: "Posso usar no trabalho ou na escola?",
    a: "Sim. Ela foi pensada para facilitar o transporte e aquecimento das refeições no dia a dia.",
  },
  {
    q: "Preciso de micro-ondas?",
    a: "A proposta do produto é permitir o aquecimento diretamente na própria lancheira.",
  },
  { q: "Possui compartimento para colher?", a: "Sim." },
  { q: "Como funciona o pagamento?", a: "O pagamento é realizado na entrega." },
  { q: "Onde entregam?", a: "Atualmente, a entrega está disponível em Luanda." },
  { q: "A entrega é grátis?", a: "Sim, a entrega é grátis em Luanda." },
];

function buildProduct(unitPrice: number): Product {
  return {
    id: "",
    name: PRODUCT_NAME,
    price: unitPrice,
    old_price: OLD_PRICE,
    cost_price: 0,
    description: null,
    social_proof_text: "",
    top_bar_text: "",
    top_bar_text_2: "",
    store_name: "AURELIS",
    logo_url: null,
    main_image_1: IMAGES[0] ?? null,
    main_image_2: IMAGES[1] ?? null,
    main_image_3: IMAGES[2] ?? null,
    content_image_1: null,
    content_image_2: null,
    content_image_3: null,
    content_image_4: null,
  };
}

function LancheiraPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(PRICE);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);

  const buy = (qty = 1, total = PRICE * qty) => {
    setQuantity(qty);
    setUnitPrice(total / qty);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-lunch px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-lunch-foreground sm:text-sm">
        🚚 Entrega grátis em Luanda • 💵 Pague apenas quando receber
      </div>

      <header className="border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <span className="font-display text-xl font-extrabold tracking-tight">AURELIS</span>
          <Button
            type="button"
            variant="ghost"
            onClick={() => buy(1)}
            className="h-10 rounded-full bg-lunch px-4 text-sm font-bold text-lunch-foreground hover:bg-lunch-dark hover:text-lunch-foreground"
          >
            🔥 Comprar
          </Button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="rounded-3xl bg-lunch-soft p-3">
              <ProductGallery images={IMAGES} alt={PRODUCT_NAME} />
            </div>

            <div>
              <span className="inline-block rounded-full bg-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-background">
                🔥 OFERTA ESPECIAL
              </span>
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                🔥 CANSADO DE COMER <span className="text-lunch">COMIDA FRIA?</span>
              </h1>
              <p className="mt-3 text-lg font-semibold leading-snug">
                Tenha sua refeição com você e aqueça de forma prática no trabalho, na escola ou em
                casa. 🍱⚡
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Com a Lancheira Elétrica 2 em 1 da AURELIS, você pode transportar sua refeição e
                aquecê-la diretamente na lancheira.
              </p>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                <span className="font-display text-4xl font-extrabold text-lunch sm:text-5xl">
                  {formatKz(PRICE)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatKz(OLD_PRICE)}
                </span>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={() => buy(1)}
                className="animate-cta-shake mt-5 h-16 w-full rounded-2xl bg-lunch text-base font-bold text-lunch-foreground shadow-ink hover:bg-lunch-dark hover:text-lunch-foreground"
              >
                🔥 COMPRAR AGORA
              </Button>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
                <span className="flex items-center gap-1.5">
                  <Truck className="size-4 text-lunch" /> 🚚 Entrega grátis em Luanda
                </span>
                <span className="flex items-center gap-1.5">
                  <Wallet className="size-4 text-lunch" /> 💵 Pagamento na entrega
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="bg-muted/60 py-12">
          <div className="mx-auto w-full max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">😩 COMIDA FRIA DE NOVO?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Você leva sua comida para o trabalho ou para a escola e, quando chega a hora de comer,
              ela já está fria.
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Nem sempre existe um micro-ondas disponível.
            </p>
            <p className="mt-2 text-[15px] font-semibold leading-relaxed">
              A Lancheira Elétrica AURELIS foi pensada para tornar esse momento mais prático.
            </p>
          </div>
        </section>

        {/* SOLUÇÃO */}
        <section className="mx-auto w-full max-w-6xl px-4 py-12">
          <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
            🔥 LEVE. AQUEÇA. COMA.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map(({ icon: Icon, title: t }) => (
              <div
                key={t}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 shadow-soft"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-lunch-soft text-lunch">
                  <Icon className="size-5" />
                </span>
                <p className="text-sm font-semibold leading-snug">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="bg-foreground py-12 text-background">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
              🔥 COMO FUNCIONA?
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map(({ n, text }) => (
                <div key={n} className="rounded-2xl bg-background/10 p-5">
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
            🍱 PRATICIDADE PARA O SEU DIA
          </h2>
          <div className="hide-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Lancheira Elétrica AURELIS — imagem ${i + 1}`}
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
              🔥 ESCOLHA SUA OFERTA
            </h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {OFFERS.map((offer) => (
                <div
                  key={offer.quantity}
                  className="flex flex-col rounded-3xl border-2 border-border bg-card p-5 shadow-card"
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
            ✨ FEITA PARA FACILITAR SUA ROTINA
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
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
              👥 PARA QUEM É A LANCHEIRA AURELIS?
            </h2>
            <ul className="mx-auto mt-6 max-w-md space-y-2.5">
              {AUDIENCE.map((item) => (
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
              🔥 CANSADO DE COMER <span className="text-lunch">COMIDA FRIA?</span>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed opacity-90">
              Leve sua refeição com você e tenha uma forma prática de aquecê-la durante o dia.
            </p>
            <div className="mt-5 flex flex-wrap items-end justify-center gap-3">
              <span className="font-display text-4xl font-extrabold text-lunch sm:text-5xl">
                {formatKz(PRICE)}
              </span>
              <span className="text-lg line-through opacity-70">{formatKz(OLD_PRICE)}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => buy(1)}
              className="mt-5 h-16 w-full max-w-md rounded-2xl bg-lunch text-base font-bold text-lunch-foreground hover:bg-lunch-dark hover:text-lunch-foreground"
            >
              🔥 COMPRAR AGORA
            </Button>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
              <span>🚚 Entrega grátis em Luanda</span>
              <span>💵 Pagamento na entrega</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl px-4 py-12">
          <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
            Perguntas frequentes
          </h2>
          <Accordion type="single" collapsible className="mt-6">
            {FAQ.map(({ q, a }) => (
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
          <Crown className="size-3.5 text-lunch" /> AURELIS — Entrega grátis em Luanda • Pagamento
          na entrega
        </span>
      </footer>

      <CheckoutDrawer
        product={buildProduct(unitPrice)}
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
