import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Check, ChevronDown, CupSoda, Droplets, Leaf,
  PackageCheck, ShoppingBag, Sparkles, Zap
} from "lucide-react";
import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { formatKz, type Product } from "@/lib/aurelis";

const ASSETS = {
  main: "https://files.catbox.moe/k7zxc7.png",
  video1: "https://files.catbox.moe/3jdp0b.mp4",
  video2: "https://files.catbox.moe/23tx6m.mp4",
  details: "https://files.catbox.moe/zj26g8.png",
};

const PRODUCT = {
  id: "freshmix-pro",
  name: "FreshMix Pro 4 em 1",
  price: 65500,
  oldPrice: 89900,
  image: ASSETS.main,
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  cost_price: 0,
  description: "FreshMix Pro 4 em 1 — máquina prática para preparar sumos naturais em poucos passos.",
  social_proof_text: "",
  top_bar_text: "",
  top_bar_text_2: "",
  store_name: "AURELIS",
  logo_url: null,
  main_image_1: PRODUCT.image,
  main_image_2: ASSETS.details,
  main_image_3: ASSETS.details,
  content_image_1: ASSETS.details,
  content_image_2: ASSETS.main,
  content_image_3: ASSETS.details,
  content_image_4: ASSETS.video1,
};

const CTA = "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition hover:-translate-y-0.5 active:translate-y-0";

// FreshMix Pro landing page — /freshmix-pro
export const Route = createFileRoute("/freshmix-pro")({
  head: () => ({
    meta: [
      { title: "FreshMix Pro 4 em 1 | Faça Sumos Naturais em Segundos" },
      {
        name: "description",
        content: "FreshMix Pro 4 em 1 — uma forma prática de preparar sumos naturais em casa.",
      },
      { property: "og:title", content: "FreshMix Pro 4 em 1 — Faça Sumos Naturais em Segundos" },
      { property: "og:description", content: "Prepare os seus sumos de forma prática com a FreshMix Pro 4 em 1." },
      { property: "og:image", content: ASSETS.main },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function ProductVideo({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] bg-black shadow-[0_25px_70px_rgba(0,0,0,.18)] ${className}`}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="block h-full w-full object-cover"
      />
    </div>
  );
}

function Page() {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const buy = () => setCheckoutOpen(true);
  const discount = Math.round(((PRODUCT.oldPrice - PRODUCT.price) / PRODUCT.oldPrice) * 100);

  const benefits = [
    [Zap, "RÁPIDA E PRÁTICA", "Prepare o seu sumo sem complicar a rotina."],
    [CupSoda, "SUMOS NATURAIS", "Ideal para preparar bebidas com frutas em casa."],
    [Droplets, "4 EM 1", "Um único equipamento para diferentes etapas e preparos."],
    [PackageCheck, "COMPACTA", "Depois de usar, pode ser guardada com facilidade."],
  ] as const;

  const faqs = [
    ["O que é a FreshMix Pro 4 em 1?", "É uma máquina compacta pensada para facilitar o preparo de sumos e bebidas naturais em casa."],
    ["É difícil de utilizar?", "A proposta é simplificar o preparo. As peças e o modo de utilização estão apresentados nas imagens do produto."],
    ["Posso preparar diferentes sumos?", "Sim. Pode utilizar diferentes frutas e combinações de acordo com a sua preferência e o preparo indicado para cada fruta."],
    ["A máquina ocupa muito espaço?", "Não. O formato foi pensado para uso doméstico e para ser guardado quando não estiver em utilização."],
    ["Como faço o pedido?", "Clique em ENCOMENDAR, preencha os seus dados no checkout e confirme a encomenda."],
    ["Como funciona o pagamento?", "O pedido é feito online e o pagamento é realizado na entrega, conforme a modalidade disponível para a sua região."],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#172018]">
      <section className="border-b border-green-100 bg-white text-[#173b24]">
        <div className="px-4 py-3 text-center">
          <h1 className="whitespace-nowrap text-[clamp(1.05rem,4.5vw,1.9rem)] font-black leading-none tracking-[-.035em]">
            Enviamos para todo o território nacional 🇦🇴
          </h1>
        </div>

        <div className="overflow-hidden bg-[#173b24] py-3 text-white">
          <div className="freshmix-marquee flex w-max whitespace-nowrap">
            <span className="px-5 text-sm font-black tracking-[.01em] sm:text-base">
              ✨ PRODUTOS ORIGINAIS, SELECIONADOS COM QUALIDADE E CONFIANÇA ✨ 🛡️ 30 DIAS DE GARANTIA EM TODOS OS PRODUTOS ✨ 🚚 ENVIO RÁPIDO EM ATÉ 12 HORAS ✨
            </span>
            <span className="px-5 text-sm font-black tracking-[.01em] sm:text-base" aria-hidden="true">
              ✨ PRODUTOS ORIGINAIS, SELECIONADOS COM QUALIDADE E CONFIANÇA ✨ 🛡️ 30 DIAS DE GARANTIA EM TODOS OS PRODUTOS ✨ 🚚 ENVIO RÁPIDO EM ATÉ 12 HORAS ✨
            </span>
          </div>
        </div>

        <style>{`
          @keyframes freshmix-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .freshmix-marquee {
            animation: freshmix-marquee 18s linear infinite;
          }
        `}</style>
      </section>

      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="text-2xl font-black tracking-[-.06em] text-[#16a34a]">AURELIS</div>
          <button onClick={buy} className={`${CTA} h-11 bg-[#173b24] px-5 text-xs text-white shadow-lg sm:text-sm`}>
            <ShoppingBag className="size-4" /> ENCOMENDAR
          </button>
        </div>
      </header>

      <main>
        <section className="bg-[#fff7ed]">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-7 sm:py-10 md:grid-cols-2 md:py-14">
            <div className="order-2 md:order-1">
              <span className="inline-flex rounded-full bg-[#173b24] px-3 py-1.5 text-[10px] font-black tracking-[.12em] text-white">
                FRESHMIX PRO 4 EM 1
              </span>
              <h1 className="mt-5 text-[2rem] font-black leading-[1.02] tracking-[-.045em] sm:text-5xl lg:text-[3.8rem]">
                🍊 FAÇA SUMOS NATURAIS EM SEGUNDOS.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#4b5563] sm:text-lg">
                Tenha uma forma mais prática de preparar os seus sumos em casa com a FreshMix Pro 4 em 1.
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <span className="text-4xl font-black sm:text-5xl">{formatKz(PRODUCT.price)}</span>
                <span className="pb-1 text-xl font-bold text-[#94a3b8] line-through">{formatKz(PRODUCT.oldPrice)}</span>
                <span className="mb-1 rounded-full bg-[#f97316] px-3 py-1.5 text-sm font-black text-white">-{discount}%</span>
              </div>

              <button onClick={buy} className={`${CTA} mt-6 h-16 w-full bg-[#16a34a] px-6 text-base text-white shadow-xl shadow-green-600/25 sm:max-w-xl sm:text-lg`}>
                🍊 QUERO A MINHA FRESHMIX PRO <ArrowRight className="size-5" />
              </button>

              <div className="mt-4 grid grid-cols-1 gap-2 text-xs font-bold text-[#4b5563] sm:grid-cols-3">
                <span>🚚 Entrega grátis</span>
                <span>💵 Pague na entrega</span>
                <span>📍 Luanda</span>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative mx-auto max-w-[570px] overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(0,0,0,.16)] ring-1 ring-black/5">
                <img src={ASSETS.main} alt="FreshMix Pro 4 em 1" className="block aspect-square w-full object-contain" />
                <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-black shadow-xl">
                  {formatKz(PRODUCT.price)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#173b24] px-4 py-5 text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 md:grid-cols-4">
            {[
              ["🍊", "SUMOS NATURAIS", "Prepare em casa"],
              ["⚡", "4 EM 1", "Mais praticidade"],
              ["🥤", "FÁCIL DE USAR", "Rotina simplificada"],
              ["🚚", "ENTREGA GRÁTIS", "Em Luanda"],
            ].map(([icon, title, text]) => (
              <div key={title} className="rounded-2xl bg-white/5 p-3">
                <span className="text-xl">{icon}</span>
                <b className="mt-1 block text-[10px] sm:text-xs">{title}</b>
                <span className="text-[10px] text-white/60">{text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="rounded-full bg-[#fef9c3] px-3 py-1.5 text-[10px] font-black tracking-[.12em] text-[#dc2626]">VEJA EM AÇÃO</span>
              <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">DO FRUTO AO COPO. 🍊</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#4b5563] sm:text-base">
                Veja a FreshMix Pro em funcionamento e descubra como ela pode fazer parte da sua rotina.
              </p>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <ProductVideo src={ASSETS.video1} className="aspect-[9/16] max-h-[720px] md:mx-auto md:w-full" />
              <ProductVideo src={ASSETS.video2} className="aspect-[9/16] max-h-[720px] md:mx-auto md:w-full" />
            </div>
          </div>
        </section>

        <section className="bg-[#fff7ed] px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black tracking-[.12em]">POR QUE FRESHMIX PRO?</span>
              <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">MAIS PRATICIDADE NA SUA COZINHA.</h2>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(([Icon, title, text]) => {
                const I = Icon as typeof Zap;
                return (
                  <article key={title} className="rounded-3xl border border-green-100 bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,.06)]">
                    <span className="grid size-12 place-items-center rounded-2xl bg-[#16a34a] text-white"><I className="size-6" /></span>
                    <h3 className="mt-4 text-sm font-black">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#4b5563]">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <span className="rounded-full bg-[#fef9c3] px-3 py-1.5 text-[10px] font-black tracking-[.12em] text-[#dc2626]">4 EM 1</span>
              <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">
                UM SÓ EQUIPAMENTO PARA MAIS POSSIBILIDADES.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#4b5563] sm:text-base">
                A FreshMix Pro foi pensada para tornar o preparo mais simples e organizado. Conheça as peças, a embalagem e o modo de utilização na imagem abaixo.
              </p>

              <div className="mt-7 space-y-3">
                {["Peças organizadas", "Modo de utilização ilustrado", "Design compacto", "Pensada para uso doméstico"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#fff7ed] px-4 py-3 text-sm font-bold">
                    <span className="grid size-7 place-items-center rounded-full bg-[#f97316] text-white"><Check className="size-4" /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,.12)] ring-1 ring-black/5">
              <img src={ASSETS.details} alt="Peças, modo de utilização e embalagem da FreshMix Pro 4 em 1" className="w-full rounded-[1.5rem] object-contain" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="bg-[#173b24] px-4 py-14 text-white sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 md:grid-cols-[.8fr_1.2fr]">
              <div>
                <Leaf className="size-10 text-[#facc15]" />
                <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">
                  O SEU SUMO. DO SEU JEITO. 🍊
                </h2>
                <p className="mt-5 leading-7 text-white/70">
                  Prepare combinações de frutas de acordo com o seu gosto e transforme o momento de preparar uma bebida em uma tarefa mais prática.
                </p>
                <button onClick={buy} className={`${CTA} mt-7 h-14 w-full bg-[#dc2626] px-7 text-white sm:w-auto`}>
                  QUERO EXPERIMENTAR <ArrowRight className="size-5" />
                </button>
              </div>

              <ProductVideo src={ASSETS.video1} className="aspect-[9/16] max-h-[680px] md:mx-auto md:w-[72%]" />
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-[#fef9c3] px-3 py-1.5 text-[10px] font-black tracking-[.12em] text-[#dc2626]">OFERTA AURELIS</span>
            <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">FRESHMIX PRO 4 EM 1</h2>
            <p className="mt-3 text-base font-bold text-[#4b5563]">Faça Sumos Naturais em Segundos.</p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="text-4xl font-black">{formatKz(PRODUCT.price)}</span>
              <span className="text-xl font-bold text-[#94a3b8] line-through">{formatKz(PRODUCT.oldPrice)}</span>
            </div>
            <button onClick={buy} className={`${CTA} mt-7 h-16 w-full bg-[#16a34a] px-8 text-base text-white shadow-xl sm:w-auto sm:text-lg`}>
              🍊 ENCOMENDAR AGORA <ArrowRight className="size-5" />
            </button>
            <p className="mt-4 text-xs font-bold text-[#4b5563]">🚚 Entrega grátis em Luanda • 💵 Pagamento na entrega</p>
          </div>
        </section>

        <section className="bg-[#fff7ed] px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-black tracking-[-.04em] sm:text-5xl">PERGUNTAS FREQUENTES</h2>
            <div className="mt-8 divide-y divide-green-100 rounded-[2rem] border border-green-100 bg-white px-5 shadow-sm">
              {faqs.map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black">
                    <span>{q}</span>
                    <ChevronDown className="size-5 shrink-0 text-[#f97316] transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-6 text-[#4b5563]">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f97316] px-4 py-14 text-center text-white sm:py-20">
          <Sparkles className="mx-auto size-10" />
          <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">SEU PRÓXIMO SUMO COMEÇA AQUI. 🍊</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            FreshMix Pro 4 em 1 — uma solução prática para preparar sumos naturais em casa.
          </p>
          <div className="mt-5 text-4xl font-black">{formatKz(PRODUCT.price)}</div>
          <button onClick={buy} className={`${CTA} mt-7 h-16 w-full bg-white px-8 text-base text-[#16a34a] shadow-2xl sm:w-auto sm:text-lg`}>
            🍊 QUERO A FRESHMIX PRO <ArrowRight className="size-5" />
          </button>
          <p className="mt-4 text-xs font-bold text-white/80">📲 950 532 879 • 🚚 Entrega grátis em Luanda</p>
        </section>
      </main>

      <div className="h-20 md:hidden" />
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-green-100 bg-white/95 p-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,.12)] backdrop-blur md:hidden">
        <div className="min-w-0">
          <span className="block text-[9px] font-black uppercase text-[#64748b]">FRESHMIX PRO 4 EM 1</span>
          <strong className="block text-base leading-none">{formatKz(PRODUCT.price)}</strong>
        </div>
        <button onClick={buy} className="ml-auto h-11 rounded-xl bg-[#16a34a] px-5 text-xs font-black text-white shadow-lg">
          ENCOMENDAR
        </button>
      </div>

      <footer className="border-t border-green-100 px-5 py-8 text-center text-xs text-[#64748b]">
        AURELIS • Contacto: 950 532 879
      </footer>

      <CheckoutDrawer
        product={product}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={1}
        onQuantityChange={() => {}}
        onPlaced={(order) => {
          const message = encodeURIComponent(
            `Olá! Acabei de fazer um pedido da ${order.productName} AURELIS. 🍊
Quantidade: ${order.quantity}
Total: ${formatKz(order.total)}
O meu WhatsApp/telefone é: ${order.customerPhone}

Quero confirmar a minha encomenda. Obrigado!`
          );
          window.open(`https://wa.me/244950532879?text=${message}`, "_blank", "noopener,noreferrer");
          navigate({ to: "/obrigado", search: { produto: PRODUCT.name, qtd: order.quantity, total: order.total } });
        }}
      />
    </div>
  );
}
