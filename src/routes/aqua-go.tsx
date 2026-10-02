// Lovable/AURELIS: keep AQUA GO as an explicit file-based route for deployment synchronization.
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Backpack, Check, ChevronDown, Droplets, Lock, MapPin,
  ShoppingBag, Sparkles, Tent, Truck, Wallet, Waves, Zap
} from "lucide-react";
import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { formatKz, type Product } from "@/lib/aurelis";
import alivianaLogo from "@/assets/aliviana-logo.png";

const PRODUCT = {
  id: "aqua-go",
  name: "AQUA GO — Chuveiro Portátil",
  price: 27498,
  oldPrice: 44950,
  discount: 39,
  image: "https://files.catbox.moe/ynstfk.png",
  secondImage: "https://files.catbox.moe/svjyg2.png",
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  cost_price: 0,
  description: "Chuveiro portátil pensado para trazer mais praticidade em viagens, campismo, praia, quintal e outros momentos ao ar livre.",
  social_proof_text: "",
  top_bar_text: "",
  top_bar_text_2: "",
  store_name: "AURELIS",
  logo_url: null,
  main_image_1: PRODUCT.image,
  main_image_2: PRODUCT.secondImage,
  main_image_3: null,
  content_image_1: PRODUCT.secondImage,
  content_image_2: null,
  content_image_3: null,
  content_image_4: null,
};

const CTA = "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition hover:-translate-y-0.5 active:translate-y-0";

export const Route = createFileRoute("/aqua-go")({
  head: () => ({
    meta: [
      { title: "AQUA GO — Chuveiro Portátil | AURELIS" },
      { name: "description", content: "AQUA GO — Chuveiro Portátil. Mais praticidade para viagens, campismo, praia e momentos ao ar livre." },
      { property: "og:title", content: "AQUA GO — Chuveiro Portátil" },
      { property: "og:description", content: "Mais liberdade e praticidade para utilizar água em diferentes ambientes." },
      { property: "og:image", content: PRODUCT.image },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const buy = () => setCheckoutOpen(true);

  const benefits = [
    [Droplets, "PRÁTICO", "Pensado para facilitar a utilização de água em diferentes situações."],
    [Backpack, "PORTÁTIL", "Formato pensado para transporte e armazenamento."],
    [Waves, "VERSÁTIL", "Uma solução para diferentes ambientes e momentos."],
    [Zap, "FÁCIL DE USAR", "Interface simples para uma utilização prática."],
  ] as const;

  const uses = [
    [Tent, "CAMPISMO", "Para aventuras e momentos ao ar livre."],
    [Waves, "PRAIA", "Praticidade depois de um dia na praia."],
    [MapPin, "VIAGENS", "Uma solução prática para levar consigo."],
    [Droplets, "QUINTAL", "Útil para diferentes situações em casa."],
  ] as const;

  const faqs = [
    ["O que é o Aqua Go?", "É um chuveiro portátil pensado para trazer mais praticidade para utilizar água em diferentes ambientes."],
    ["Onde posso utilizar o Aqua Go?", "Pode ser útil em viagens, campismo, praia, quintal e outras situações em que uma solução portátil seja conveniente."],
    ["O Aqua Go é portátil?", "Sim. O produto foi pensado para ser transportado e armazenado com praticidade."],
    ["Como faço para encomendar?", "Clique em qualquer botão de encomenda, preencha os seus dados no checkout e confirme o pedido."],
    ["Como funciona o pagamento?", "O pedido utiliza o checkout existente da loja e o pagamento é feito na entrega, conforme o fluxo atual."],
    ["Onde vocês entregam?", "A disponibilidade de entrega é apresentada no checkout durante o preenchimento do pedido."],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#063B5C]">
      <div className="bg-[#063B5C] px-4 py-2 text-center text-[11px] font-black uppercase tracking-wide text-white sm:text-sm">
        💧 Mais praticidade • 🚚 Entrega ao domicílio • 💵 Pague na entrega
      </div>

      <header className="sticky top-0 z-40 border-b border-[#d8f5fc] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <img src={alivianaLogo} alt="AURELIS" className="h-8 w-auto object-contain sm:h-9" />
          <button onClick={buy} className={`${CTA} h-11 bg-[#008FE5] px-5 text-sm text-white shadow-lg shadow-[#008FE5]/20`}>
            <ShoppingBag className="size-4" /> ENCOMENDAR
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#E9FAFF] via-white to-[#c9f4ff]">
          <div className="absolute -right-32 -top-32 size-96 rounded-full bg-[#19BFEA]/15 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 size-96 rounded-full bg-[#008FE5]/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:py-12 md:grid-cols-2 md:py-16">
            <div className="order-2 md:order-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-black tracking-wider text-[#008FE5] shadow-sm ring-1 ring-[#19BFEA]/20">
                💧 AQUA GO • CHUVEIRO PORTÁTIL
              </span>
              <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[.98] tracking-tight sm:text-5xl lg:text-6xl">
                🚿 LEVE O SEU BANHO PARA ONDE QUISER!
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#35657b] sm:text-lg">
                Conheça o Aqua Go, o chuveiro portátil pensado para trazer mais praticidade para viagens, campismo, praia, quintal e diferentes momentos do seu dia.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-4xl font-black text-[#063B5C] sm:text-5xl">{formatKz(PRODUCT.price)}</span>
                <span className="text-xl font-bold text-[#6b8795] line-through sm:text-2xl">{formatKz(PRODUCT.oldPrice)}</span>
                <span className="rounded-full bg-[#063B5C] px-3 py-1.5 text-sm font-black text-white">-39% OFF</span>
              </div>
              <button onClick={buy} className={`${CTA} mt-6 h-16 w-full bg-[#008FE5] px-7 text-base text-white shadow-xl shadow-[#008FE5]/25 sm:max-w-xl sm:text-lg`}>
                🚿 QUERO O MEU AQUA GO <ArrowRight className="size-5" />
              </button>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#35657b]">
                <span>💵 Pague somente quando receber</span><span>🚚 Entrega ao domicílio</span><span>🔒 Pedido seguro</span>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_25px_70px_rgba(0,143,229,.18)] sm:p-6">
                <div className="absolute left-5 top-5 z-10 rounded-full bg-[#19BFEA] px-3 py-2 text-xs font-black text-white shadow-lg">
                  AQUA GO
                </div>
                <img src={PRODUCT.image} alt={PRODUCT.name} className="aspect-square w-full rounded-[1.5rem] object-contain" />
                <div className="absolute bottom-5 right-5 rounded-full bg-[#063B5C] px-3 py-2 text-xs font-black text-white">
                  {formatKz(PRODUCT.price)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#bceefa] bg-[#19BFEA] text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-5 md:grid-cols-4">
            {[
              [Droplets, "CHUVEIRO PORTÁTIL", "Leve para diferentes lugares"],
              [Tent, "IDEAL PARA VIAGENS", "Campismo, praia e muito mais"],
              [Sparkles, "PRÁTICO", "Tenha uma solução portátil"],
              [Wallet, "PAGAMENTO NA ENTREGA", "Pague quando receber"],
            ].map(([Icon, title, text]) => { const I = Icon as typeof Droplets; return (
              <div key={title as string} className="flex gap-2 p-3 sm:items-center sm:justify-center">
                <I className="mt-0.5 size-5 shrink-0" />
                <div><b className="block text-[10px] sm:text-xs">{title as string}</b><span className="text-[10px] text-white/85 sm:text-xs">{text as string}</span></div>
              </div>
            );})}
          </div>
        </section>

        <section className="bg-[#E9FAFF] px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black tracking-wider text-[#008FE5]">QUANDO O CHUVEIRO FIXO NÃO ESTÁ POR PERTO</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">CANSADO DE DEPENDER DE UM CHUVEIRO FIXO?</h2>
            <p className="mx-auto mt-4 max-w-3xl leading-7 text-[#35657b]">
              Nem sempre estamos em casa ou perto de uma instalação convencional. Durante uma viagem, no campismo, na praia ou até no quintal, ter uma solução prática para utilizar água pode fazer toda a diferença.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {[["🏕️","CAMPISMO"],["🚗","VIAGENS"],["🏖️","PRAIA / EXTERIOR"]].map(([icon,title]) => (
                <div key={title} className="rounded-3xl border border-[#bceefa] bg-white p-7 shadow-sm">
                  <div className="text-4xl">{icon}</div><h3 className="mt-3 font-black">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-full bg-[#E9FAFF] px-3 py-1.5 text-[11px] font-black text-[#008FE5]">A SOLUÇÃO</span>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">CONHEÇA O AQUA GO</h2>
              <p className="mt-4 leading-7 text-[#547286]">Uma solução compacta e prática para quem quer mais liberdade na hora de utilizar água em diferentes ambientes.</p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(([Icon,title,text]) => { const I=Icon as typeof Droplets; return (
                <article key={title} className="rounded-3xl border border-[#d8edf3] bg-white p-6 shadow-[0_12px_35px_rgba(6,59,92,.06)]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#E9FAFF] text-[#008FE5]"><I className="size-6"/></span>
                  <h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#547286]">{text}</p>
                </article>
              );})}
            </div>
          </div>
        </section>

        <section className="bg-[#063B5C] px-5 py-12 text-white sm:py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl">
              <img src={PRODUCT.secondImage} alt="Aqua Go — segunda imagem" className="w-full rounded-[1.5rem] object-contain" />
            </div>
            <div>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wider text-[#6fe6ff]">MAIS LIBERDADE</span>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">MAIS LIBERDADE PARA A SUA ROTINA</h2>
              <p className="mt-5 leading-7 text-white/75">Leve o Aqua Go com você e tenha uma solução prática para diferentes momentos em que um chuveiro convencional não está disponível.</p>
              <button onClick={buy} className={`${CTA} mt-7 h-14 bg-[#19BFEA] px-7 text-white shadow-xl shadow-black/20`}>🚿 QUERO EXPERIMENTAR O AQUA GO <ArrowRight className="size-5"/></button>
            </div>
          </div>
        </section>

        <section className="bg-[#E9FAFF] px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center"><span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#008FE5]">ONDE USAR</span><h2 className="mt-5 text-3xl font-black sm:text-5xl">UM CHUVEIRO PARA ACOMPANHAR O SEU RITMO</h2></div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {uses.map(([Icon,title,text])=>{const I=Icon as typeof Tent;return <article key={title} className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-[#c5edf7]"><I className="mx-auto size-9 text-[#008FE5]"/><h3 className="mt-4 font-black">{title as string}</h3><p className="mt-2 text-sm leading-6 text-[#547286]">{text as string}</p></article>})}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-3xl font-black sm:text-5xl">POR QUE TER UM AQUA GO?</h2>
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {["PORTÁTIL","PRÁTICO","FÁCIL DE TRANSPORTAR","VERSÁTIL","IDEAL PARA VIAGENS","ATIVIDADES AO AR LIVRE"].map(x=><div key={x} className="rounded-2xl border border-[#d8edf3] bg-white p-5 shadow-sm"><Check className="mx-auto size-7 text-[#008FE5]"/><p className="mt-3 text-xs font-black">{x}</p></div>)}
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8edf3] bg-[#f7fdff] px-4 py-14 sm:px-5 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-[#E9FAFF] px-3 py-1.5 text-[11px] font-black text-[#008FE5]">DEMONSTRAÇÃO</span>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl">🎥 VEJA O AQUA GO EM AÇÃO 🚿</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#547286] sm:text-base sm:leading-7">
              Mais praticidade para os seus momentos ao ar livre, tudo num único equipamento. 💧
            </p>
            <div className="mx-auto mt-8 max-w-3xl">
              <div className="overflow-hidden rounded-[18px] bg-[#063B5C] p-2 shadow-[0_20px_60px_rgba(6,59,92,.22)] ring-1 ring-[#bceefa] sm:rounded-[24px] sm:p-3">
                <video
                  src="https://files.catbox.moe/e7jo84.mp4"
                  controls
                  preload="metadata"
                  playsInline
                  controlsList="nodownload"
                  className="aspect-video w-full rounded-[12px] bg-black object-contain sm:rounded-[18px]"
                />
              </div>
              <button onClick={buy} className={`${CTA} mt-6 h-14 w-full bg-[#008FE5] px-6 text-base text-white shadow-xl shadow-[#008FE5]/25 sm:mx-auto sm:h-16 sm:w-auto sm:max-w-xl sm:px-10 sm:text-lg`}>
                🚿 QUERO O MEU AGORA <ArrowRight className="size-5" />
              </button>
              <p className="mt-3 text-[11px] font-bold text-[#547286] sm:text-xs">💵 Pague somente quando receber • 🚚 Entrega ao domicílio</p>
            </div>
          </div>
        </section>

        <section className="bg-[#19BFEA] px-5 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-black tracking-wider">AQUA GO</span>
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">TENHA MAIS LIBERDADE PARA UTILIZAR ÁGUA ONDE PRECISAR</h2>
            <p className="mt-4 text-white/90">AQUA GO — Chuveiro Portátil</p>
            <div className="mt-4 text-4xl font-black">{formatKz(PRODUCT.price)}</div>
            <button onClick={buy} className={`${CTA} mt-7 h-16 w-full bg-white px-8 text-base text-[#008FE5] shadow-2xl sm:w-auto sm:text-lg`}>🚿 ENCOMENDAR AGORA <ArrowRight className="size-5"/></button>
            <p className="mt-4 text-xs font-bold">💵 Pague somente quando receber • 🚚 Entrega ao domicílio • 🔒 Compra segura</p>
          </div>
        </section>

        <section className="px-5 py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-[2rem] bg-[#E9FAFF] p-5 sm:p-8 md:grid-cols-2">
            <div><span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#008FE5]">AQUA GO</span><h2 className="mt-4 text-3xl font-black sm:text-4xl">UMA SOLUÇÃO PORTÁTIL PARA DIFERENTES MOMENTOS</h2><p className="mt-4 leading-7 text-[#547286]">Leve o produto consigo e tenha mais praticidade quando estiver longe de um chuveiro convencional.</p><button onClick={buy} className={`${CTA} mt-6 bg-[#008FE5] px-6 py-4 text-white`}>🚿 QUERO O MEU AQUA GO <ArrowRight className="size-5"/></button></div>
            <div className="rounded-3xl bg-white p-4 shadow-lg"><img src={PRODUCT.image} alt={PRODUCT.name} className="mx-auto max-h-[420px] w-full object-contain"/></div>
          </div>
        </section>

        <section className="bg-[#f7fdff] px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-black sm:text-5xl">PERGUNTAS FREQUENTES</h2>
            <div className="mt-8 divide-y divide-[#d8edf3] rounded-3xl border border-[#d8edf3] bg-white px-5">
              {faqs.map(([q,a])=><details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black"><span>❓ {q}</span><ChevronDown className="size-5 shrink-0 text-[#008FE5] transition group-open:rotate-180"/></summary><p className="mt-3 pr-8 text-sm leading-6 text-[#547286]">{a}</p></details>)}
            </div>
          </div>
        </section>

        <section className="bg-[#063B5C] px-5 py-16 text-center text-white sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Droplets className="mx-auto size-10 text-[#19BFEA]"/>
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">🚿 LEVE O SEU BANHO PARA ONDE QUISER!</h2>
            <p className="mt-4 text-white/75">Aqua Go — Chuveiro Portátil</p>
            <div className="mt-4 text-4xl font-black">{formatKz(PRODUCT.price)}</div>
            <button onClick={buy} className={`${CTA} mt-7 h-16 w-full bg-[#19BFEA] px-8 text-base text-white shadow-xl sm:w-auto sm:text-lg`}>🚿 QUERO O MEU AQUA GO <ArrowRight className="size-5"/></button>
            <p className="mt-4 text-xs text-white/60">💵 Pague somente quando receber • 🚚 Entrega ao domicílio</p>
          </div>
        </section>
      </main>

      <div className="h-20 md:hidden" />
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-[#bceefa] bg-white/95 p-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(6,59,92,.12)] backdrop-blur md:hidden">
        <div className="min-w-0"><span className="block text-[9px] font-black uppercase text-[#547286]">AQUA GO</span><strong className="block text-base leading-none text-[#063B5C]">{formatKz(PRODUCT.price)}</strong></div>
        <button onClick={buy} className="ml-auto h-11 rounded-xl bg-[#008FE5] px-5 text-xs font-black text-white shadow-lg">ENCOMENDAR AGORA</button>
      </div>

      <footer className="border-t border-[#d8edf3] px-5 py-8 text-center text-xs text-[#547286]">AURELIS • AQUA GO</footer>

      <CheckoutDrawer
        product={product}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={1}
        onQuantityChange={() => {}}
        onPlaced={(order) => navigate({ to: "/obrigado", search: { produto: PRODUCT.name, qtd: order.quantity, total: order.total } })}
      />
    </div>
  );
}
