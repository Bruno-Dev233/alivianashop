import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, BatteryCharging, Check, Flower2, Headphones, Lock, RotateCcw, Shield,
  ShoppingBag, Sparkles, Star, Truck, Wallet, Zap, Briefcase,
} from "lucide-react";

import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { QuantityStepper } from "@/components/aurelis/QuantityStepper";
import { formatKz, type Product } from "@/lib/aurelis";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_DEPILADOR, mergeDepilador } from "@/lib/depilador";
import logo from "@/assets/logo-aurelis-v2.png.asset.json";

// ===== Conteúdo editável =====
// Valores vêm do painel (Landing Pages); estes são actualizados em cada render.
let IMAGE = DEFAULT_DEPILADOR.image;
let NAME = DEFAULT_DEPILADOR.name;
let PRICE = DEFAULT_DEPILADOR.price;
let OLD_PRICE = DEFAULT_DEPILADOR.oldPrice;
let DISCOUNT = DEFAULT_DEPILADOR.discount;
// Avaliação: deixe RATING = null enquanto não houver avaliações reais.
const RATING: { score: number; count: number } | null = null; // ex.: { score: 4.9, count: 247 }
// Depoimentos reais: { name, location, stars, text, verified }
const TESTIMONIALS: { name: string; location: string; stars: number; text: string; verified: boolean }[] = [];
// =============================

async function fetchDepilador() {
  const { data } = await supabase.from("landing_pages").select("content").eq("slug", "depilador-eletrico").maybeSingle();
  return mergeDepilador(data?.content);
}
const depQuery = { queryKey: ["landing_page_raw", "depilador-eletrico"], queryFn: fetchDepilador, staleTime: 30_000 };

export const Route = createFileRoute("/depilador-eletrico")({
  loader: ({ context }) => context.queryClient.ensureQueryData(depQuery).catch(() => DEFAULT_DEPILADOR),
  head: ({ loaderData }) => {
    const c = loaderData ?? DEFAULT_DEPILADOR;
    const TITLE = c.seoTitle, DESC = c.seoDescription, IMAGE = c.image;
    return {
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "product" },
      { property: "og:image", content: IMAGE },
      { name: "twitter:image", content: IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
  },
  component: Page,
});

const buildProduct = (): Product => ({
  id: "", name: NAME, price: PRICE, old_price: OLD_PRICE, cost_price: 0, description: null,
  social_proof_text: "", top_bar_text: "", top_bar_text_2: "", store_name: "AURELIS",
  logo_url: null, main_image_1: IMAGE, main_image_2: null, main_image_3: null,
  content_image_1: null, content_image_2: null, content_image_3: null, content_image_4: null,
});

function Price({ dark = false, center = false }: { dark?: boolean; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className={`font-display text-4xl font-extrabold sm:text-5xl ${dark ? "" : "text-rose"}`}>{formatKz(PRICE)}</p>
      <div className={`mt-1 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
        <span className="text-lg line-through opacity-60">{formatKz(OLD_PRICE)}</span>
        <span className="rounded-full bg-rose px-2.5 py-0.5 text-xs font-bold text-rose-foreground">{DISCOUNT}</span>
      </div>
    </div>
  );
}

const cta = "inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition duration-300 hover:-translate-y-0.5 active:translate-y-0";
const card = "rounded-3xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg";

function Page() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const buy = () => setOpen(true);
  const { data: c = DEFAULT_DEPILADOR } = useQuery(depQuery);
  IMAGE = c.image; NAME = c.name; PRICE = c.price; OLD_PRICE = c.oldPrice; DISCOUNT = c.discount;
  const product = buildProduct();

  return (
    <div className="min-h-screen bg-background text-foreground animate-in fade-in duration-500">
      <div className="bg-rose px-3 py-2 text-center text-xs font-semibold text-rose-foreground sm:text-sm">
        {c.topBar}
      </div>

      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <img src={logo.url} alt="AURELIS" className="h-9 w-auto object-contain" />
          <span className="hidden font-display font-bold md:block">Depilador Elétrico 2 em 1</span>
          <button onClick={buy} className={`${cta} h-11 bg-rose px-4 text-sm text-rose-foreground shadow-md`}>
            <ShoppingBag className="size-4" /> <span className="hidden sm:inline">Encomendar Agora</span><span className="sm:hidden">Encomendar</span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2 md:py-14">
        <div className="overflow-hidden rounded-3xl bg-rose-soft shadow-lg">
          <img src={IMAGE} alt={NAME} className="aspect-square w-full object-cover" />
        </div>
        <div>
          <span className="inline-flex rounded-full bg-rose-soft px-3 py-1 text-xs font-bold tracking-wide text-rose">• ELETRÓNICA</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Depilador Elétrico 2 em 1{" "}
            <span className="block text-xl font-bold text-muted-foreground sm:text-2xl">
              Remoção de Pelos Sem Dor, Aparador Corporal Recarregável
            </span>
          </h1>
          {RATING && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="flex text-rose">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</span>
              <b>{RATING.score}</b><span className="text-muted-foreground">{RATING.count} avaliações</span>
            </div>
          )}
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p className="font-semibold text-foreground">✨ Cuide da sua pele com mais praticidade!</p>
            <p>O Depilador Elétrico 2 em 1 foi desenvolvido para facilitar a remoção e o aparo dos pelos, proporcionando uma rotina de cuidados mais rápida, prática e confortável.</p>
            <p>🌸 Com duas funções em um único aparelho, você pode aparar e remover os pelos de diferentes áreas do corpo sem precisar depender constantemente de lâminas descartáveis.</p>
            <p>Tenha mais praticidade para cuidar da sua aparência e torne sua rotina de autocuidado muito mais simples!</p>
          </div>
          <div className="mt-6 rounded-3xl border border-border p-5 shadow-sm">
            <Price />
            <p className="mt-2 text-sm text-muted-foreground">Pagamento na entrega. Sem custos adicionais.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantityStepper value={qty} onChange={setQty} />
              <button onClick={buy} className={`${cta} h-14 flex-1 bg-rose px-6 text-base text-rose-foreground shadow-lg`}>
                🛍️ ENCOMENDAR AGORA <ArrowRight className="size-5" />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span>🔒 Pagamento na Entrega</span><span>🚚 Entrega Garantida</span><span>↩️ 30 Dias de Garantia</span>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-rose-soft">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4">
          {[
            [Truck, "Entrega Rápida", "12h a 24h em Luanda"],
            [Wallet, "Pague na Entrega", "Sem riscos para si"],
            [RotateCcw, "Garantia 30 Dias", "Devolução fácil"],
            [Headphones, "Suporte 24/7", "Sempre disponíveis"],
          ].map(([Icon, t, s]) => {
            const I = Icon as typeof Truck;
            return (
              <div key={t as string} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-background text-rose"><I className="size-5" /></span>
                <div><p className="text-sm font-bold">{t as string}</p><p className="text-xs text-muted-foreground">{s as string}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PORQUÊ */}
      <section className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Por que escolher este produto?</h2>
        <p className="mt-2 text-muted-foreground">Desenvolvido para quem procura mais praticidade no cuidado diário.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Zap, "ALTA PERFORMANCE", "Tecnologia compacta para facilitar sua rotina."],
            [Shield, "GARANTIA", "Mais tranquilidade na sua compra."],
            [Truck, "ENTREGA RÁPIDA", "Receba seu pedido com rapidez."],
            [Sparkles, "PRÁTICO E COMPACTO", "Uma solução simples para o seu cuidado diário."],
          ].map(([Icon, t, s]) => {
            const I = Icon as typeof Zap;
            return (
              <div key={t as string} className={card}>
                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-rose-soft text-rose"><I className="size-6" /></span>
                <p className="mt-4 font-display font-bold">{t as string}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEÇÃO PRETA */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-widest text-rose">O QUE ESTÁ INCLUÍDO</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold">Tudo o que precisa,<br />num único produto</h2>
            <ul className="mt-6 space-y-3">
              {["Design moderno e compacto", "Remoção e aparo de pelos", "Prático para diferentes áreas do corpo", "Recarregável", "Fácil de utilizar", "Ideal para sua rotina de autocuidado"].map((i) => (
                <li key={i} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full bg-rose"><Check className="size-3.5" /></span>{i}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-ink-foreground/10 p-6 text-center sm:p-8">
            <p className="text-xs font-bold tracking-widest text-rose">PREÇO ESPECIAL</p>
            <div className="mt-3"><Price dark center /></div>
            <button onClick={buy} className={`${cta} mt-6 h-14 w-full bg-rose text-rose-foreground`}>Encomendar Agora <ArrowRight className="size-5" /></button>
            <p className="mt-3 text-xs opacity-70">🔒 Pagamento na entrega · Sem risco</p>
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Mais praticidade na sua rotina</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {[[Sparkles, "Remoção prática"], [Zap, "Uso rápido"], [Flower2, "Cuidado pessoal"], [BatteryCharging, "Recarregável"], [Briefcase, "Fácil de transportar"]].map(([Icon, t]) => {
            const I = Icon as typeof Zap;
            return (
              <div key={t as string} className={card}>
                <I className="mx-auto size-7 text-rose" /><p className="mt-3 text-sm font-bold">{t as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-rose-soft/60">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">O que dizem os clientes</h2>
          {TESTIMONIALS.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Em breve, opiniões de clientes reais.</p>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className={`${card} text-left`}>
                  <span className="flex text-rose">{Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</span>
                  <p className="mt-3 text-sm">{t.text}</p>
                  <p className="mt-4 text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}{t.verified && " · ✓ Compra verificada"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* OFERTA FINAL */}
      <section className="bg-rose-dark text-rose-foreground">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="font-display text-3xl font-extrabold">Oferta por tempo limitado</h2>
          <p className="mt-2 opacity-90">Aproveite o preço promocional enquanto estiver disponível.</p>
          <div className="mt-5"><Price dark center /></div>
          <button onClick={buy} className={`${cta} mt-6 h-14 bg-background px-10 text-rose`}>Encomendar Agora</button>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <img src={IMAGE} alt="" className="mx-auto size-20 rounded-2xl object-cover" />
          <h2 className="mt-5 font-display text-3xl font-extrabold">Pronto para começar?</h2>
          <p className="mt-2 opacity-80">Simplifique sua rotina de cuidados e tenha mais praticidade no seu dia a dia.</p>
          <button onClick={buy} className={`${cta} mt-6 h-14 w-full bg-rose px-8 text-rose-foreground sm:w-auto`}>🌸 ENCOMENDAR AGORA <ArrowRight className="size-5" /></button>
          <p className="mt-3 flex items-center justify-center gap-1 text-xs opacity-70"><Lock className="size-3" /> Pagamento na entrega · Sem risco</p>
        </div>
      </section>

      <CheckoutDrawer
        product={product}
        open={open}
        onOpenChange={setOpen}
        quantity={qty}
        onQuantityChange={setQty}
        onPlaced={(o) =>
          navigate({ to: "/obrigado", search: { produto: "Depilador Elétrico 2 em 1", qtd: o.quantity, total: o.total } })
        }
      />
    </div>
  );
}
