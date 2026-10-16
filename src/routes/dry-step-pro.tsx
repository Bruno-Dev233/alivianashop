import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, ShieldCheck, Truck, Wind, Zap, Footprints, PackageCheck, CircleHelp } from "lucide-react";
import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { formatKz, type Product } from "@/lib/aurelis";
import alivianaLogo from "@/assets/aliviana-logo.png";
import dryStepMainAsset from "@/assets/drystep-pro-main.webp.asset.json";

const PRODUCT = {
  id: "dry-step-pro",
  name: "DryStep Pro — Secador Elétrico de Sapatos",
  price: 45999,
  oldPrice: 79999,
  discount: 42,
  image: dryStepMainAsset.url,
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  cost_price: 0,
  description: "DryStep Pro — secador elétrico de sapatos, pensado para ajudar a secar calçado húmido com mais praticidade.",
  social_proof_text: "",
  top_bar_text: "",
  top_bar_text_2: "",
  store_name: "AURELIS",
  logo_url: null,
  main_image_1: PRODUCT.image,
  main_image_2: null,
  main_image_3: null,
  content_image_1: null,
  content_image_2: null,
  content_image_3: null,
  content_image_4: null,
};

const CTA = "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition active:scale-[.98]";

export const Route = createFileRoute("/dry-step-pro")({
  head: () => ({
    meta: [
      { title: "DryStep Pro | Secador Elétrico de Sapatos — AURELIS" },
      { name: "description", content: "DryStep Pro: uma forma prática de ajudar a secar sapatos húmidos. Encomende e pague apenas na entrega." },
      { property: "og:title", content: "DryStep Pro — Secador Elétrico de Sapatos" },
      { property: "og:description", content: "Cuide do seu calçado com mais praticidade no dia a dia." },
      { property: "og:image", content: `https://lojaurelis.lovable.app${dryStepMainAsset.url}` },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [offerQuantity, setOfferQuantity] = useState(1);

  const offers = [
    { quantity: 1, label: "1 UNIDADE", price: 45999, old: 79999, saving: 34000 },
    { quantity: 2, label: "PACK 2", price: 79999, old: 159998, saving: 79999, badge: "MAIS POPULAR" },
    { quantity: 3, label: "PACK 3", price: 109999, old: 239997, saving: 129998, badge: "MELHOR VALOR" },
  ];
  const selectedOffer = offers.find((offer) => offer.quantity === offerQuantity) ?? offers[0]!;

  const checkoutProduct: Product = {
    ...product,
    price: selectedOffer.price,
    old_price: selectedOffer.old,
  };
  const buy = () => setCheckoutOpen(true);

  const faqs = [
    ["Para que serve o DryStep Pro?", "É um secador elétrico concebido para ajudar a secar calçado húmido e tornar os cuidados com os sapatos mais práticos."],
    ["Que tipos de calçado posso usar?", "Pode ser adequado a diferentes tipos de calçado. Recomendamos seguir as instruções incluídas com o produto e verificar se o material é compatível com secagem por calor."],
    ["Como faço a encomenda?", "Escolha a oferta, clique em encomendar e preencha os seus dados no formulário."],
    ["Quando pago?", "O pagamento é feito no momento da entrega, de acordo com o serviço de entrega da loja."],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f7f4] text-[#202923]">
      <section className="border-b border-[#e2e5df] bg-[#f7f7f4] text-[#25352e]">
        <div className="px-4 py-3 text-center">
          <h1 className="text-[clamp(1.05rem,4.5vw,1.9rem)] font-black leading-tight tracking-[-.035em]">Enviamos para todo o território nacional 🇦🇴</h1>
        </div>
        <div className="overflow-hidden bg-[#263b34] py-3 text-white">
          <div className="dry-marquee flex w-max whitespace-nowrap">
            <span className="px-5 text-sm font-black sm:text-base">🚚 ENVIO PARA TODO O PAÍS ✦ 🛡️ 30 DIAS DE GARANTIA ✦ PRODUTOS SELECIONADOS COM QUALIDADE E CONFIANÇA ✦</span>
            <span className="px-5 text-sm font-black sm:text-base" aria-hidden="true">🚚 ENVIO PARA TODO O PAÍS ✦ 🛡️ 30 DIAS DE GARANTIA ✦ PRODUTOS SELECIONADOS COM QUALIDADE E CONFIANÇA ✦</span>
          </div>
        </div>
        <style>{`
          @keyframes dry-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
          .dry-marquee { animation: dry-marquee 20s linear infinite; will-change: transform; }
          @media (prefers-reduced-motion: reduce) { .dry-marquee { animation: none; } }
        `}</style>
      </section>

      <header className="sticky top-0 z-40 border-b border-[#e2e5df] bg-[#f7f7f4]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <img src={alivianaLogo} alt="AURELIS" className="h-8 w-auto object-contain sm:h-9" />
          <button onClick={buy} className={CTA + " h-11 bg-[#263b34] px-5 text-sm text-white shadow-lg hover:bg-[#344e44]"}>ENCOMENDAR <ArrowRight className="size-4" /></button>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-[#eeefeb] via-[#f7f7f4] to-[#f7f7f4] px-4 pb-12 pt-7 sm:pb-16 sm:pt-10">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d9dfd8] bg-white px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-[#53675c]">DRYSTEP PRO</span>
              <h2 className="mt-4 text-3xl font-black leading-[1.08] tracking-[-.04em] sm:text-5xl">SAPATOS HÚMIDOS?</h2>
              <p className="mt-2 text-2xl font-black leading-tight tracking-[-.03em] text-[#53675c] sm:text-4xl">DESCUBRA UMA FORMA MAIS PRÁTICA DE OS SECAR! 👟</p>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#4d5b53] sm:text-lg">Cuide do seu calçado com mais praticidade e tenha uma solução conveniente para a sua rotina.</p>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-[#e2e5df] bg-white p-3 shadow-[0_25px_70px_rgba(38,59,52,.12)] sm:p-6">
              <span className="absolute right-5 top-5 z-10 rounded-full bg-[#263b34] px-4 py-2 text-sm font-black text-white shadow-lg">-{PRODUCT.discount}%</span>
              <img src={PRODUCT.image} alt="DryStep Pro — Secador Elétrico de Sapatos" className="aspect-square w-full rounded-[1.5rem] object-contain" />
            </div>

            <div className="mt-5 text-center">
              <h3 className="text-2xl font-black leading-tight sm:text-3xl">DryStep Pro — Secador Elétrico de Sapatos</h3>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <span className="text-4xl font-black tracking-tight text-[#263b34] sm:text-5xl">{formatKz(PRODUCT.price)}</span>
                <span className="text-xl font-bold text-[#737b75] line-through">{formatKz(PRODUCT.oldPrice)}</span>
              </div>
              <p className="mt-2 text-sm font-bold text-[#53675c]">Uma solução prática para a rotina de cuidados com o seu calçado.</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-[#e2e5df] bg-white p-4"><Wind className="size-6 shrink-0 text-[#53675c]" /><span className="text-sm font-bold">Ajuda a secar calçado húmido</span></div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#e2e5df] bg-white p-4"><Footprints className="size-6 shrink-0 text-[#53675c]" /><span className="text-sm font-bold">Mais cuidado no dia a dia</span></div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#e2e5df] bg-white p-4"><Zap className="size-6 shrink-0 text-[#53675c]" /><span className="text-sm font-bold">Uso prático em casa</span></div>
            </div>

            <div className="mt-10 flex items-center gap-3"><div className="h-px flex-1 bg-[#aeb9b0]" /><span className="shrink-0 text-center text-lg font-black uppercase sm:text-xl">PAGUE MENOS E LEVE MAIS</span><div className="h-px flex-1 bg-[#aeb9b0]" /></div>
            <p className="mt-2 text-center text-sm text-[#657168]">Escolha a opção que faz mais sentido para si.</p>

            <div className="mt-6 space-y-4">
              {offers.map((offer) => {
                const selected = offerQuantity === offer.quantity;
                return (
                  <button key={offer.quantity} type="button" onClick={() => setOfferQuantity(offer.quantity)} className={"relative w-full rounded-[20px] border-2 p-5 text-left transition active:scale-[.99] " + (selected ? "border-[#263b34] bg-[#e7ebe5]" : "border-[#d9dfd8] bg-white hover:border-[#819187]")}>
                    {offer.badge && <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#263b34] px-4 py-1.5 text-xs font-black text-white">{offer.badge}</span>}
                    <div className="flex items-center gap-3">
                      <span className={"grid size-9 shrink-0 place-items-center rounded-full border-2 " + (selected ? "border-[#263b34] bg-[#263b34] text-white" : "border-[#aeb9b0] bg-white")}>{selected && <Check className="size-5" />}</span>
                      <div className="min-w-0 flex-1"><span className="block text-base font-black sm:text-lg">{offer.label}</span><span className="mt-1 block text-sm font-bold text-[#53675c]">Poupe {formatKz(offer.saving)}</span></div>
                      <div className="text-right"><span className="block text-lg font-black sm:text-xl">{formatKz(offer.price)}</span><span className="block text-sm font-bold text-[#737b75] line-through">{formatKz(offer.old)}</span></div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button onClick={buy} className={CTA + " mt-7 h-14 w-full bg-[#263b34] px-7 text-base text-white shadow-xl hover:bg-[#344e44] sm:text-lg"}>QUERO O MEU DRYSTEP PRO <ArrowRight className="size-5" /></button>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold text-[#53675c]"><span>💵 Pague apenas ao receber</span><span>🚚 Entrega ao domicílio</span><span>🔒 Encomenda simples</span></div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-full bg-[#edf0eb] px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#53675c]">VEJA EM AÇÃO</span>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">MAIS PRATICIDADE PARA O SEU CALÇADO</h2>
              <p className="mt-4 leading-7 text-[#657168]">Veja como o DryStep Pro pode fazer parte da sua rotina.</p>
            </div>

            <div className="mt-9 grid gap-6 md:grid-cols-2">
              <article className="overflow-hidden rounded-[2rem] border border-[#e2e5df] bg-[#f7f7f4] shadow-sm">
                <div className="bg-[#202923]">
                  <video src="https://files.catbox.moe/exkrik.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Demonstração do DryStep Pro" className="mx-auto block max-h-[680px] w-full object-contain" onClick={(event) => { const video = event.currentTarget; if (video.paused) void video.play(); else video.pause(); }} />
                </div>
                <div className="p-6 sm:p-7"><span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#e1e7e0] text-[#263b34]"><Wind className="size-6" /></span><h3 className="mt-4 text-xl font-black sm:text-2xl">AJUDE A SECAR OS SAPATOS HÚMIDOS</h3><p className="mt-3 leading-7 text-[#536158]">Depois de um dia de chuva ou de uso prolongado, o calçado pode ficar húmido. O DryStep Pro oferece uma forma prática de ajudar a secá-lo para a próxima utilização.</p></div>
              </article>
              <article className="overflow-hidden rounded-[2rem] border border-[#e2e5df] bg-[#f7f7f4] shadow-sm">
                <div className="bg-[#202923]">
                  <video src="https://files.catbox.moe/ucpsft.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Demonstração adicional do DryStep Pro" className="mx-auto block max-h-[680px] w-full object-contain" onClick={(event) => { const video = event.currentTarget; if (video.paused) void video.play(); else video.pause(); }} />
                </div>
                <div className="p-6 sm:p-7"><span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#e1e7e0] text-[#263b34]"><Footprints className="size-6" /></span><h3 className="mt-4 text-xl font-black sm:text-2xl">MAIS CONFORTO NA SUA ROTINA</h3><p className="mt-3 leading-7 text-[#536158]">Tenha uma opção dedicada aos cuidados com o calçado em casa. Um complemento útil para quem procura mais organização e praticidade nos dias húmidos.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#eef0eb] px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center"><h2 className="text-3xl font-black tracking-tight sm:text-4xl">PENSADO PARA FACILITAR O DIA A DIA</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-[#536158]">Uma solução prática para integrar nos cuidados habituais com o seu calçado.</p></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[["01", "Ajuda na secagem", "Uma opção para quando o calçado fica húmido."], ["02", "Rotina mais simples", "Tenha o equipamento à mão em casa, quando precisar."], ["03", "Para diferentes ocasiões", "Útil nos dias chuvosos e após o uso diário, respeitando as instruções do produto."]].map(([number, title, text]) => <article key={number} className="rounded-3xl border border-[#dce2da] bg-white p-6"><span className="text-sm font-black tracking-widest text-[#718176]">{number}</span><h3 className="mt-3 text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#657168]">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center"><PackageCheck className="mx-auto size-9 text-[#53675c]" /><h2 className="mt-3 text-3xl font-black sm:text-4xl">ENCOMENDE O SEU DRYSTEP PRO</h2><p className="mt-3 text-[#657168]">Escolha a sua oferta e pague apenas quando receber.</p></div>
            <div className="mt-7 rounded-3xl border border-[#e2e5df] bg-[#f7f7f4] p-6 sm:p-8">
              <div className="flex flex-col items-center gap-5 sm:flex-row"><img src={PRODUCT.image} alt="DryStep Pro" className="w-full max-w-[220px] object-contain" /><div className="flex-1 text-center sm:text-left"><h3 className="text-2xl font-black">DryStep Pro</h3><p className="mt-2 text-[#536158]">Secador elétrico de sapatos</p><p className="mt-3 text-3xl font-black text-[#263b34]">{formatKz(selectedOffer.price)}</p><p className="mt-1 text-sm text-[#737b75]">Oferta selecionada: {selectedOffer.label}</p></div></div>
              <button onClick={buy} className={CTA + " mt-6 h-14 w-full bg-[#263b34] px-6 text-white hover:bg-[#344e44]"}>ENCOMENDAR AGORA <ArrowRight className="size-5" /></button>
              <div className="mt-5 grid gap-3 text-sm font-bold text-[#536158] sm:grid-cols-3"><span className="flex items-center justify-center gap-2"><Truck className="size-5" /> Entrega ao domicílio</span><span className="flex items-center justify-center gap-2"><ShieldCheck className="size-5" /> Pagamento na entrega</span><span className="flex items-center justify-center gap-2"><Check className="size-5" /> Pedido simples</span></div>
            </div>
          </div>
        </section>

        <section className="bg-[#eef0eb] px-5 py-14 sm:py-16">
          <div className="mx-auto max-w-5xl"><div className="flex items-center justify-center gap-3"><CircleHelp className="size-7 text-[#53675c]" /><h2 className="text-2xl font-black sm:text-3xl">PERGUNTAS FREQUENTES</h2></div><div className="mt-7 grid gap-4 sm:grid-cols-2">{faqs.map(([question, answer]) => <article key={question} className="rounded-2xl border border-[#dce2da] bg-white p-5"><h3 className="font-black">{question}</h3><p className="mt-2 text-sm leading-6 text-[#657168]">{answer}</p></article>)}</div></div>
        </section>
      </main>

      <div className="h-20 md:hidden" />
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-[#e2e5df] bg-[#f7f7f4]/95 p-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(32,41,35,.12)] backdrop-blur md:hidden">
        <div className="min-w-0"><span className="block text-[9px] font-black uppercase text-[#657168]">DRYSTEP PRO</span><strong className="block text-base leading-none">{formatKz(selectedOffer.price)}</strong></div>
        <button onClick={buy} className="ml-auto h-11 rounded-xl bg-[#263b34] px-5 text-xs font-black text-white">ENCOMENDAR AGORA</button>
      </div>
      <footer className="border-t border-[#e2e5df] px-5 py-8 text-center text-xs text-[#657168]">AURELIS • DRYSTEP PRO</footer>

      <CheckoutDrawer
        product={checkoutProduct}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={offerQuantity}
        minQuantity={offerQuantity}
        maxQuantity={offerQuantity}
        totalPriceOverride={selectedOffer.price}
        onQuantityChange={setOfferQuantity}
        onPlaced={(order) => {
          navigate({
            to: "/obrigado",
            search: { produto: PRODUCT.name, qtd: order.quantity, total: order.total },
          });
        }}
      />
    </div>
  );
}
