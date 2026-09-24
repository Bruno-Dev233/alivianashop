import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Headphones,
  Lock,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Wallet,
  Zap,
} from "lucide-react";

import { CheckoutDrawer, type PlacedOrder } from "@/components/aurelis/CheckoutDrawer";
import { OrderSuccessDialog } from "@/components/aurelis/OrderSuccessDialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatKz, type Product } from "@/lib/aurelis";
import { APARADOR_BUNDLE, APARADOR_SOBRANCELHAS } from "@/lib/aparador-sobrancelhas";

const IMAGE = "https://files.catbox.moe/cv8lk4.jpg";
const PRODUCT = APARADOR_SOBRANCELHAS;
const BUNDLE_PRODUCT: Product = { ...PRODUCT, price: APARADOR_BUNDLE.effectiveUnitPrice };

export const Route = createFileRoute("/aparador-sobrancelhas")({
  head: () => ({
    meta: [
      { title: "Aparador Elétrico de Sobrancelhas 2 em 1 | AURELIS" },
      {
        name: "description",
        content:
          "Aparador Elétrico de Sobrancelhas 2 em 1. 18.890 Kz, pagamento na entrega e entrega grátis em Luanda.",
      },
      { property: "og:title", content: "Aparador Elétrico de Sobrancelhas 2 em 1 | AURELIS" },
      { property: "og:image", content: IMAGE },
    ],
  }),
  component: AparadorPage,
});

function AparadorPage() {
  const [offer, setOffer] = useState<"single" | "bundle">("single");
  const [quantity, setQuantity] = useState(1);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const checkoutProduct = offer === "bundle" ? BUNDLE_PRODUCT : PRODUCT;
  const checkoutQuantity = offer === "bundle" ? 2 : quantity;
  const total = offer === "bundle" ? APARADOR_BUNDLE.total : PRODUCT.price * quantity;

  const openCheckout = () => {
    setOfferModalOpen(true);
  };

  const proceedToCheckout = (nextOffer: "single" | "bundle") => {
    setOffer(nextOffer);
    setQuantity(nextOffer === "bundle" ? 2 : 1);
    setOfferModalOpen(false);
    setCheckoutOpen(true);
  };

  const heroTotal = useMemo(
    () => (offer === "bundle" ? APARADOR_BUNDLE.total : PRODUCT.price * quantity),
    [offer, quantity],
  );

  return (
    <div className="min-h-screen bg-white text-foreground">
      <div className="bg-[#7C3AED] px-3 py-2.5 text-center text-[11px] font-bold text-white sm:text-sm">
        🚚 Frete Grátis <span className="mx-2 opacity-70">•</span> 💵 Pagamento na Entrega
        <span className="mx-2 opacity-70">•</span> ⚡ Entrega em 12h a 24h
      </div>

      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6">
          <div className="text-lg font-black tracking-[0.18em] sm:text-xl">AURELIS</div>
          <div className="hidden text-sm font-semibold text-muted-foreground md:block">
            Aparador de Sobrancelhas 2 em 1
          </div>
          <Button
            onClick={() => openCheckout()}
            className="h-10 rounded-xl bg-[#7C3AED] px-4 text-[11px] font-black hover:bg-[#6D28D9] sm:text-xs"
          >
            <ShoppingBag className="mr-1.5 size-4" /> ENCOMENDAR AGORA
          </Button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:py-20">
          <div className="order-2 lg:order-1">
            <span className="inline-flex rounded-full bg-[#F3E8FF] px-3 py-1.5 text-xs font-black tracking-wider text-[#7C3AED]">
              • ELETRÓNICA
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              ✨ SOBRANCELHAS PERFEITAS,
              <span className="block text-[#7C3AED]">COM MAIS PRATICIDADE</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed sm:text-xl">
              Aparador Elétrico de Sobrancelhas 2 em 1 para facilitar o cuidado diário com o seu olhar.
            </p>
            <div className="mt-5 min-h-[150px] max-w-2xl">
              <p className="leading-7 text-muted-foreground">
                ✨ Cuide das suas sobrancelhas com mais praticidade.
                <br /><br />
                O Aparador Elétrico de Sobrancelhas 2 em 1 foi desenvolvido para ajudar a aparar, modelar e remover pequenos pelos com mais facilidade, proporcionando uma rotina de beleza simples e prática.
              </p>
              <p className="mt-4 font-medium text-[#6D28D9]">🌸 Compacto, fácil de transportar e ideal para incluir no seu cuidado diário.</p>
            </div>

            {PRODUCT.social_proof_text ? (
              <div className="mt-6 flex items-center gap-2 text-sm">
                <span className="tracking-[0.15em] text-[#7C3AED]">★★★★★</span>
                <strong>{PRODUCT.social_proof_text}</strong>
                <span className="text-muted-foreground">Avaliações verificadas</span>
              </div>
            ) : (
              <div className="mt-6 flex items-center gap-2 text-sm">
                <span className="tracking-[0.15em] text-[#7C3AED]">★★★★★</span>
                <span className="text-muted-foreground">Avaliações verificadas</span>
              </div>
            )}

            <div className="mt-5 rounded-3xl border border-[#f1c3d5] bg-gradient-to-br from-white to-[#fff8fb] p-5 shadow-[0_18px_55px_rgba(17,17,17,.08)] sm:p-6">
              <p className="text-xs font-black tracking-wider text-[#7C3AED]">🔥 OFERTA ESPECIAL</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <strong className="text-4xl tracking-tight sm:text-5xl">{formatKz(heroTotal)}</strong>
                <del className="text-base text-muted-foreground">{formatKz(29990)}</del>
                <span className="rounded-full bg-[#7C3AED] px-2.5 py-1 text-xs font-black text-white">-37%</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">💵 Pagamento na entrega. Sem custos adicionais.</p>

              <div className="mt-5 flex items-center justify-between border-t pt-4">
                <span className="text-xs font-black tracking-wide">QUANTIDADE</span>
                <div className="flex overflow-hidden rounded-xl border">
                  <button className="grid size-10 place-items-center bg-white text-xl" onClick={() => offer === "single" && setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span className="grid w-10 place-items-center font-bold">{checkoutQuantity}</span>
                  <button className="grid size-10 place-items-center bg-white text-xl" onClick={() => offer === "single" && setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <Button
                onClick={() => openCheckout()}
                className="mt-5 h-14 w-full rounded-2xl bg-[#7C3AED] text-base font-black shadow-[0_12px_25px_rgba(124,58,237,.22)] hover:bg-[#6D28D9]"
              >
                🛍️ ENCOMENDAR AGORA <ArrowRight className="ml-1 size-5" />
              </Button>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
                <span>🔒 Pagamento na Entrega</span><span>🚚 Entrega Garantida</span><span>↩️ 30 Dias de Garantia</span>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute right-2 top-2 z-10 rounded-full bg-[#7C3AED] px-3 py-2 text-xs font-black text-white shadow-lg">-37%</div>
            <div className="rounded-[28px] border bg-white p-3 shadow-[0_25px_65px_rgba(17,17,17,.13)] sm:p-6">
              <img src={IMAGE} alt={PRODUCT.name} className="block max-h-[600px] w-full rounded-2xl object-contain" />
            </div>
            <p className="mt-3 text-center text-xs font-semibold text-muted-foreground">Aparador 2 em 1 • Compacto • Prático</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-2 rounded-2xl bg-[#F8F8F8] px-3 py-4 sm:grid-cols-4 sm:px-5">
          {[
            [Truck, "ENTREGA RÁPIDA", "12h a 24h em Luanda"],
            [Wallet, "PAGUE NA ENTREGA", "Sem pagamento antecipado"],
            [RotateCcw, "GARANTIA 30 DIAS", "Mais tranquilidade"],
            [Headphones, "SUPORTE", "Sempre disponíveis"],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Truck;
            return <div key={title as string} className="flex gap-2 border-black/10 p-3 last:border-0 sm:border-r"><I className="mt-0.5 size-5 shrink-0 text-[#7C3AED]" /><div><b className="block text-[10px] sm:text-xs">{title as string}</b><span className="text-[10px] text-muted-foreground sm:text-xs">{text as string}</span></div></div>;
          })}
        </section>

        <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-24">
          <span className="rounded-full bg-[#F3E8FF] px-3 py-1.5 text-xs font-black text-[#7C3AED]">CUIDADO DIÁRIO</span>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">😩 SOBRANCELHAS SEM FORMA?</h2>
          <p className="mt-5 leading-7 text-muted-foreground">Pequenos pelos fora do lugar podem deixar o visual menos definido.</p>
          <p className="mt-2 leading-7 text-muted-foreground">Nem sempre é prático utilizar métodos tradicionais para pequenos retoques.</p>
          <p className="mt-2 leading-7 text-muted-foreground">O Aparador Elétrico de Sobrancelhas 2 em 1 foi pensado para tornar esses cuidados mais simples no dia a dia.</p>
          <div className="mx-auto mt-8 max-w-md overflow-hidden rounded-3xl border border-[#eadcff] bg-white p-2 shadow-xl">
            <img src="https://files.catbox.moe/12f68c.jpg" alt="Aparador elétrico de sobrancelhas em uso" className="w-full rounded-2xl object-cover" />
          </div>
          <Button onClick={() => openCheckout()} className="mt-7 rounded-xl bg-[#7C3AED] px-6 font-black hover:bg-[#6D28D9]">✨ QUERO CUIDAR DAS MINHAS SOBRANCELHAS</Button>
        </section>

        <section className="bg-[#F3E8FF] px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#7C3AED]">UMA ROTINA MAIS SIMPLES</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">🔥 LEVE. APARE. MODELE.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">Uma solução compacta para ajudar nos pequenos cuidados com as sobrancelhas e outros pelos.</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["✨","2 EM 1","Apare e remova."],["🌸","PRÁTICO","Ideal para pequenos retoques."],["🎯","PRECISÃO","Mais controle nos detalhes."],
                ["💗","COMPACTO","Fácil de transportar."],["⚡","PRÁTICO NO DIA A DIA","Tenha sempre por perto."],["👜","PORTÁTIL","Ideal para levar consigo."],
              ].map(([icon,title,text]) => <article key={title} className="rounded-2xl border border-[#f0dce5] bg-white p-5 shadow-sm"><div className="text-3xl">{icon}</div><h3 className="mt-3 font-black">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div><span className="rounded-full bg-[#F3E8FF] px-3 py-1.5 text-xs font-black text-[#7C3AED]">DETALHES QUE FAZEM A DIFERENÇA</span><h2 className="mt-5 text-3xl font-black sm:text-5xl">📸 PRATICIDADE EM CADA DETALHE</h2><p className="mt-4 leading-7 text-muted-foreground">Uma solução pensada para os pequenos retoques da sua rotina de beleza.</p></div>
            <div className="rounded-3xl border border-[#eadcff] bg-white p-3 shadow-xl"><img src="https://files.catbox.moe/6usw18.png" alt={PRODUCT.name} className="w-full rounded-2xl object-contain" /></div>
          </div>
        </section>

        <section className="bg-[#fafafa] px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl"><span className="rounded-full bg-[#F3E8FF] px-3 py-1.5 text-xs font-black text-[#7C3AED]">SIMPLES DE USAR</span><h2 className="mt-5 text-3xl font-black sm:text-5xl">🔥 COMO FUNCIONA?</h2>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01","ESCOLHA A FUNÇÃO","Utilize a função adequada para o cuidado desejado."],["02","LIGUE O APARELHO","Acione o aparelho conforme as instruções do produto."],["03","APARE E MODELE","Faça pequenos retoques com cuidado e precisão."],["04","FINALIZE O SEU VISUAL","Tenha sobrancelhas mais cuidadas no seu dia a dia."],
              ].map(([n,title,text]) => <article key={n} className="rounded-2xl border bg-white p-5"><b className="text-3xl text-[#7C3AED]">{n}</b><h3 className="mt-3 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:py-24" id="oferta">
          <div className="mx-auto max-w-5xl"><span className="rounded-full bg-[#F3E8FF] px-3 py-1.5 text-xs font-black text-[#7C3AED]">ESCOLHA COMO COMPRAR</span><h2 className="mt-5 text-3xl font-black sm:text-5xl">🔥 ESCOLHA SUA OFERTA</h2>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <OfferCard title="1 UNIDADE" price={18890} old={29990} badge="-37%" onClick={() => openCheckout("single")} />
              <OfferCard featured title="🔥 PAGUE 1, LEVE 2" price={24990} old={37780} badge="🔥 MAIS VENDIDO" saving="ECONOMIZE 12.790 Kz" onClick={() => openCheckout("bundle")} />
            </div>
          </div>
        </section>

        <section className="bg-white px-5 pb-20 sm:pb-24"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black sm:text-5xl">✨ FEITO PARA FACILITAR SUA ROTINA</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
          ["🌸","Mais praticidade","Para pequenos cuidados diários."],["🎯","Mais precisão","Para detalhes da aparência."],["👜","Compacto","Fácil de levar."],["✨","2 em 1","Duas funções em um único aparelho."]
        ].map(([icon,title,text])=><article key={title} className="rounded-2xl border p-5 shadow-sm"><div className="text-3xl">{icon}</div><h3 className="mt-3 font-black">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{text}</p></article>)}</div></div></section>

        <section className="px-5 py-20 sm:py-24"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2"><div><span className="rounded-full bg-[#F3E8FF] px-3 py-1.5 text-xs font-black text-[#7C3AED]">PARA VOCÊ</span><h2 className="mt-5 text-3xl font-black sm:text-5xl">💗 PARA QUEM É?</h2></div><ul className="space-y-1">{[
          "Para quem gosta de manter as sobrancelhas cuidadas","Para quem gosta de praticidade","Para pequenos retoques no dia a dia","Para quem prefere ter seu próprio aparelho","Para quem procura uma solução compacta"
        ].map(x=><li key={x} className="border-b py-4 font-semibold">✓ {x}</li>)}</ul></div></section>

        <section className="bg-[#111] px-5 py-20 text-white sm:py-24"><div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_390px]"><div><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black text-[#f9a6c4]">AURELIS BEAUTY</span><h2 className="mt-5 text-3xl font-black sm:text-5xl">✨ TUDO O QUE VOCÊ PRECISA PARA O SEU CUIDADO DIÁRIO</h2><ul className="mt-7 space-y-3 text-white/80">{["Design compacto","Aparador 2 em 1","Prático para pequenos retoques","Fácil de transportar","Ideal para rotina de beleza"].map(x=><li key={x}>✓ {x}</li>)}</ul></div><div className="rounded-3xl bg-white p-7 text-[#111] shadow-2xl"><p className="text-xs font-black text-[#7C3AED]">🔥 OFERTA ESPECIAL</p><strong className="mt-2 block text-4xl">{formatKz(18890)}</strong><del className="text-muted-foreground">{formatKz(29990)}</del><span className="ml-2 rounded-full bg-[#7C3AED] px-2 py-1 text-xs font-black text-white">-37%</span><Button onClick={() => openCheckout()} className="mt-5 h-14 w-full rounded-2xl bg-[#7C3AED] font-black hover:bg-[#6D28D9]">ENCOMENDAR AGORA →</Button></div></div></section>

        <section className="bg-[#7C3AED] px-5 py-20 text-center text-white sm:py-24"><h2 className="text-3xl font-black sm:text-5xl">🔥 NÃO DEIXE PARA DEPOIS!</h2><p className="mx-auto mt-4 max-w-2xl">Cuide dos pequenos detalhes e torne sua rotina de beleza ainda mais prática.</p><div className="mt-6 text-3xl font-black">{formatKz(18890)} <del className="ml-2 text-base opacity-70">{formatKz(29990)}</del><span className="ml-2 rounded-full bg-[#111] px-2 py-1 text-xs">-37%</span></div><Button onClick={() => openCheckout()} className="mt-6 h-14 rounded-2xl bg-white px-8 font-black text-[#7C3AED] hover:bg-white/90">🛍️ ENCOMENDAR AGORA →</Button><small className="mt-4 block">🚚 Entrega grátis em Luanda • 💵 Pagamento na entrega</small></section>

        <section className="bg-[#fafafa] px-5 py-20 sm:py-24"><div className="mx-auto max-w-3xl"><h2 className="text-3xl font-black sm:text-5xl">PERGUNTAS FREQUENTES</h2><Accordion type="single" collapsible className="mt-7">{[
          ["O produto é 2 em 1?","Sim. O produto foi desenvolvido para oferecer duas funções de cuidado em um único aparelho."],
          ["Posso levar comigo?","Sim. O design compacto facilita o transporte."],
          ["Posso pagar antes de receber?","Não. O pagamento é feito na entrega."],
          ["Onde vocês entregam?","Atualmente, a entrega está disponível em Luanda."],
          ["A entrega é grátis?","Sim, a entrega é grátis em Luanda."],
          ["Como faço para encomendar?","Clique em “Encomendar Agora”, preencha os seus dados e confirme o pedido."],
        ].map(([q,a],i)=><AccordionItem value={String(i)} key={q}><AccordionTrigger className="text-left font-bold">❓ {q}</AccordionTrigger><AccordionContent className="leading-6 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t bg-white/95 p-2.5 shadow-[0_-10px_30px_rgba(0,0,0,.08)] backdrop-blur md:hidden">
        <strong className="text-base">{formatKz(total)}</strong>
        <Button onClick={() => openCheckout()} className="ml-auto rounded-xl bg-[#7C3AED] px-5 font-black hover:bg-[#6D28D9]">ENCOMENDAR</Button>
      </div>

      <footer className="px-5 py-8 text-center text-xs text-muted-foreground">AURELIS • Beleza com mais praticidade</footer>

      {offerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
            <div className="bg-[#7C3AED] px-5 py-5 text-center text-white">
              <p className="text-xl font-black">🔥 PAGUE 1, LEVE 2 E ECONOMIZE!</p>
              <p className="mt-1 text-sm font-semibold text-white/90">Escolha a sua oferta antes de finalizar o pedido.</p>
            </div>

            <div className="space-y-3 p-4">
              <button
                type="button"
                onClick={() => proceedToCheckout("bundle")}
                className="relative w-full rounded-2xl border-2 border-[#7C3AED] bg-[#F3E8FF] p-4 text-left shadow-[0_10px_30px_rgba(124,58,237,.16)]"
              >
                <span className="absolute -top-3 left-4 rounded-full bg-[#7C3AED] px-3 py-1 text-[10px] font-black uppercase text-white">🔥 MELHOR OFERTA</span>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-black">🔥 PAGUE 1, LEVE 2</p>
                    <p className="mt-1 text-xs font-semibold text-[#6D28D9]">🔥 MAIS VENDIDO • Leve 2 unidades</p>
                  </div>
                  <div className="text-right">
                    <del className="block text-xs text-muted-foreground">37.780 Kz</del>
                    <strong className="text-2xl font-black text-[#7C3AED]">24.990 Kz</strong>
                  </div>
                </div>
                <div className="mt-3 rounded-xl bg-white px-3 py-2 text-center text-xs font-black text-[#7C3AED]">ECONOMIZE 12.790 Kz</div>
              </button>

              <button
                type="button"
                onClick={() => proceedToCheckout("single")}
                className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-left transition hover:border-[#7C3AED]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-black">1 UNIDADE</p>
                    <p className="mt-1 text-xs text-muted-foreground">Comprar apenas uma unidade</p>
                  </div>
                  <div className="text-right">
                    <del className="block text-xs text-muted-foreground">29.990 Kz</del>
                    <strong className="text-xl font-black">18.890 Kz</strong>
                  </div>
                </div>
              </button>

              <button type="button" onClick={() => setOfferModalOpen(false)} className="w-full py-2 text-sm font-semibold text-muted-foreground">
                Continuar a navegar
              </button>
            </div>
          </div>
        </div>
      )}

      <CheckoutDrawer
        product={checkoutProduct}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={checkoutQuantity}
        onQuantityChange={(next) => {
          if (offer === "single") setQuantity(next);
        }}
        onPlaced={setPlacedOrder}
      />
      <OrderSuccessDialog order={placedOrder} onClose={() => setPlacedOrder(null)} />
    </div>
  );
}

function OfferCard({
  title,
  price,
  old,
  badge,
  saving,
  featured,
  onClick,
}: {
  title: string;
  price: number;
  old: number;
  badge: string;
  saving?: string;
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <article className={`relative rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${featured ? "border-2 border-[#7C3AED] shadow-[0_20px_50px_rgba(124,58,237,.13)]" : ""}`}>
      <div className="font-black">{title}</div>
      <strong className="mt-4 block text-4xl">{formatKz(price)}</strong>
      <del className="mt-1 block text-muted-foreground">{formatKz(old)}</del>
      {saving && <p className="mt-3 font-black text-[#7C3AED]">{saving}</p>}
      <span className="mt-3 inline-flex rounded-full bg-[#7C3AED] px-2.5 py-1 text-xs font-black text-white">{badge}</span>
      <Button onClick={onClick} className="mt-5 h-14 w-full rounded-2xl bg-[#7C3AED] font-black hover:bg-[#6D28D9]">{featured ? "QUERO 2 UNIDADES" : "COMPRAR 1 UNIDADE"}</Button>
    </article>
  );
}

export default AparadorPage;
