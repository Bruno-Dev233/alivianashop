import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Car,
  Check,
  Droplets,
  Sparkles,
  Zap,
} from "lucide-react";
import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { formatKz, type Product } from "@/lib/aurelis";
import alivianaLogo from "@/assets/aliviana-logo.png";

const PRODUCT = {
  id: "lava-jato-ultra",
  name: "HydroForce",
  price: 44998,
  oldPrice: 84998,
  discount: 47,
  image: "https://ia600701.us.archive.org/8/items/captura-de-ecra-2026-10-03-114940/Captura%20de%20ecr%C3%A3%202026-10-03%20114940.png",
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  cost_price: 0,
  description:
    "HydroForce — lavadora de pressão portátil para facilitar a limpeza do carro, moto, bicicleta e diferentes superfícies laváveis.",
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

const CTA =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition active:scale-[.98]";

export const Route = createFileRoute("/lava-jato-ultra")({
  head: () => ({
    meta: [
      { title: "HydroForce | AURELIS" },
      {
        name: "description",
        content:
          "HydroForce — lavadora de pressão portátil para limpar carro, moto e bicicleta com mais praticidade.",
      },
      { property: "og:title", content: "HydroForce" },
      {
        property: "og:description",
        content:
          "Mais praticidade para limpar o seu carro, moto e bicicleta.",
      },
      { property: "og:image", content: PRODUCT.image },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [offerQuantity, setOfferQuantity] = useState(1);

  const buy = () => setCheckoutOpen(true);

  const benefits = [
    {
      icon: Droplets,
      title: "JATO DE ÁGUA",
      text: "Ajuda a remover poeira, barro e sujeira acumulada.",
    },
    {
      icon: Zap,
      title: "SEM FIOS",
      text: "Mais liberdade para utilizar onde precisar.",
    },
    {
      icon: Car,
      title: "PARA O SEU CARRO",
      text: "Uma solução prática para a limpeza do dia a dia.",
    },
    {
      icon: Sparkles,
      title: "FÁCIL DE USAR",
      text: "Pensado para tornar a limpeza mais simples.",
    },
  ];

  const uses = [
    ["🚗", "CARROS", "Limpeza prática do veículo."],
    ["🏍️", "MOTOS", "Ajude a remover sujeira após o uso."],
    ["🚲", "BICICLETAS", "Uma solução portátil para a limpeza."],
    ["🏠", "CASA", "Útil para diferentes superfícies laváveis."],
  ];

  const faqs = [
    [
      "O que é o HydroForce?",
      "É um equipamento portátil pensado para facilitar a limpeza de carros, motos, bicicletas e outras superfícies laváveis.",
    ],
    [
      "Posso usar no meu carro?",
      "Sim. O produto foi pensado para ajudar na limpeza de veículos, incluindo carros e motos.",
    ],
    [
      "Ele funciona sem fios?",
      "Sim. O conceito portátil permite utilizar o equipamento sem ficar preso a uma tomada durante a utilização.",
    ],
    [
      "Onde posso utilizar?",
      "Pode ser utilizado em casa, garagem, quintal e outros locais adequados para limpeza com água.",
    ],
    [
      "Como faço o pedido?",
      "Clique em um dos botões de encomenda, preencha os seus dados e confirme o pedido no checkout.",
    ],
    [
      "Como funciona o pagamento?",
      "O pagamento é feito na entrega, conforme o fluxo de pagamento da loja.",
    ],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#101820]">
      <section className="border-b border-green-100 bg-white text-[#173b24]">
        <div className="px-4 py-3 text-center">
          <h1 className="whitespace-nowrap text-[clamp(1.05rem,4.5vw,1.9rem)] font-black leading-none tracking-[-.035em] text-[#173b24]">
            Enviamos para todo o território nacional 🇦🇴
          </h1>
        </div>
        <div className="overflow-hidden bg-[#173b24] py-3 text-white">
          <div className="lava-marquee flex w-max whitespace-nowrap">
            <span className="px-5 text-sm font-black tracking-[.01em] sm:text-base">
              ✨ PRODUTOS ORIGINAIS, SELECIONADOS COM QUALIDADE E CONFIANÇA ✨ 🛡️ 30 DIAS DE GARANTIA EM TODOS OS PRODUTOS ✨ 🚚 ENVIO RÁPIDO EM ATÉ 12 HORAS ✨
            </span>
            <span className="px-5 text-sm font-black tracking-[.01em] sm:text-base" aria-hidden="true">
              ✨ PRODUTOS ORIGINAIS, SELECIONADOS COM QUALIDADE E CONFIANÇA ✨ 🛡️ 30 DIAS DE GARANTIA EM TODOS OS PRODUTOS ✨ 🚚 ENVIO RÁPIDO EM ATÉ 12 HORAS ✨
            </span>
          </div>
        </div>
        <style>{`
          @keyframes lava-marquee {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-50%, 0, 0); }
          }
          .lava-marquee {
            animation: lava-marquee 18s linear infinite;
            will-change: transform;
          }
        `}</style>
      </section>

      <header className="sticky top-0 z-40 border-b border-[#dce8ee] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <img src={alivianaLogo} alt="AURELIS" className="h-8 w-auto object-contain sm:h-9" />
          <button onClick={buy} className={`${CTA} h-11 bg-[#173b24] px-5 text-sm text-white shadow-lg shadow-[#173b24]/30 hover:bg-[#1f5233]`}>
            <Car className="size-4" /> ENCOMENDAR
          </button>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-[#eef8ff] via-white to-white px-4 pb-10 pt-7 sm:pb-14 sm:pt-10">
          <div className="mx-auto max-w-3xl">

            <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_25px_70px_rgba(23,79,70,.18)] sm:mt-8 sm:p-6">
              <div className="absolute left-5 top-5 z-10 rounded-full bg-[#101820] px-4 py-2 text-sm font-black text-white shadow-xl">
                -{PRODUCT.discount}% OFF
              </div>
              <img src={PRODUCT.image} alt="HydroForce — Lavadora de Pressão Portátil" className="aspect-square w-full rounded-[1.5rem] object-contain" />
            </div>

            <div className="mt-5 text-center">
              <h2 className="text-3xl font-black leading-tight tracking-[-.03em] text-[#173b24] sm:text-4xl">
                HydroForce — Lavadora de Pressão Portátil
              </h2>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-4xl font-black text-[#4B91A5] sm:text-5xl">{formatKz(PRODUCT.price)}</span>
                <span className="text-2xl font-bold text-[#222222] line-through">{formatKz(PRODUCT.oldPrice)}</span>
              </div>
              <p className="mt-3 text-sm font-bold text-[#222222] sm:text-base">
                ⭐ 4,7/5 | Mais de 12.000 clientes satisfeitos em todo o território nacional
              </p>
            </div>

            <div className="mt-7 space-y-3">
              <p className="text-xl font-black italic uppercase leading-tight text-[#111111] sm:text-2xl">❤️ UMA MÁQUINA PARA MUITO MAIS DO QUE CARROS</p>
              <p className="text-xl font-black italic uppercase leading-tight text-[#111111] sm:text-2xl">✨ 6 MODOS DE JATO PARA DIFERENTES TAREFAS</p>
              <p className="text-xl font-black italic uppercase leading-tight text-[#111111] sm:text-2xl">🧸 LEVE A LIMPEZA PARA QUALQUER LUGAR</p>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div className="h-[2px] flex-1 bg-[#174B43]" />
              <span className="shrink-0 text-center text-lg font-black uppercase text-[#111111] sm:text-xl">PAGUE MENOS E LEVE MAIS</span>
              <div className="h-[2px] flex-1 bg-[#174B43]" />
            </div>

            <div className="mt-7 space-y-4">
              {[
                { quantity: 1, label: "1× HYDROFORCE", price: PRODUCT.price, old: PRODUCT.oldPrice, saving: PRODUCT.oldPrice - PRODUCT.price },
                { quantity: 2, label: "2× HYDROFORCE", price: PRODUCT.price * 2, old: PRODUCT.oldPrice * 2, saving: (PRODUCT.oldPrice - PRODUCT.price) * 2, badge: "Mais Popular" },
                { quantity: 3, label: "3× HYDROFORCE", price: PRODUCT.price * 3, old: PRODUCT.oldPrice * 3, saving: (PRODUCT.oldPrice - PRODUCT.price) * 3, badge: "Melhor Valor" },
              ].map((offer) => {
                const selected = offerQuantity === offer.quantity;
                return (
                  <button
                    key={offer.quantity}
                    type="button"
                    onClick={() => setOfferQuantity(offer.quantity)}
                    className={`relative w-full rounded-[20px] border-2 p-5 text-left transition active:scale-[.99] ${selected ? "border-[#174F46] bg-[#8BB7AD]" : "border-[#AFAFAF] bg-white hover:border-[#174F46]"}`}
                  >
                    {offer.badge && (
                      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#174F46] bg-white px-4 py-1.5 text-xs font-black text-[#111111]">
                        {offer.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <span className={`grid size-9 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-[#174F46] bg-[#174F46] text-white" : "border-[#555] bg-white"}`}>
                        {selected && <Check className="size-5" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="block text-lg font-black text-[#111111] sm:text-xl">{offer.label}</span>
                        <span className="mt-1 block text-sm font-bold text-[#111111] sm:text-base">💰 Poupe {formatKz(offer.saving)}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-lg font-black text-[#111111] sm:text-xl">{formatKz(offer.price)}</span>
                        <span className="block text-sm font-bold text-[#222222] line-through sm:text-base">{formatKz(offer.old)}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button onClick={buy} className={`${CTA} mt-7 h-16 w-full bg-[#173b24] px-7 text-base text-white shadow-xl shadow-[#173b24]/25 hover:bg-[#1f5233] sm:text-lg`}>
              🚗 QUERO O MEU HYDROFORCE <ArrowRight className="size-5" />
            </button>

            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold text-[#506574]">
              <span>💵 Pague somente quando receber</span>
              <span>🚚 Entrega ao domicílio</span>
              <span>🔒 Pedido seguro</span>
            </div>
          </div>
        </section>
        <section className="bg-white px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-full bg-[#e9f5ff] px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#087EF5]">
                MAIS PRATICIDADE
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                TUDO O QUE VOCÊ PRECISA PARA FACILITAR A LIMPEZA
              </h2>
              <p className="mt-4 leading-7 text-[#607481]">
                Tenha uma solução portátil para aqueles momentos em que quer
                limpar o seu veículo sem depender de equipamentos grandes.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-3xl border border-[#dfeaf0] bg-white p-6 shadow-[0_12px_35px_rgba(16,24,32,.06)]"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#e9f5ff] text-[#087EF5]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#607481]">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eef8ff] px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-6 md:grid-cols-[1.15fr_.85fr]">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(23,79,70,.14)]">
                <video
                  src="https://files.catbox.moe/l48q5u.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="HydroForce 21V em funcionamento"
                  className="mx-auto block aspect-[9/16] max-h-[720px] w-full object-contain"
                  onClick={(event) => {
                    const video = event.currentTarget;
                    if (video.paused) void video.play();
                    else video.pause();
                  }}
                />
              </div>
              <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_20px_60px_rgba(23,79,70,.14)]">
                <img
                  src="https://files.catbox.moe/bba2ty.jpeg"
                  alt="Tamanho da HydroForce 21V"
                  className="w-full object-contain"
                />
              </div>
            </div>

            <div className="mt-8 text-left">
              <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-4xl">
                🚗💦 LAVE O SEU CARRO SEM PRECISAR DE TORNEIRA
              </h2>
              <h3 className="mt-2 text-xl font-black text-[#174F46] sm:text-2xl">
                Conheça a HydroForce™ 21 V
              </h3>
              <div className="mt-5 space-y-4 text-base leading-7 text-[#33443f] sm:text-lg">
                <p>A lavadora portátil que permite levar a limpeza até onde você precisa.</p>
                <p>Tem um balde, bidão ou tanque com água?</p>
                <p className="font-black text-[#173b24]">Então você já tem o que precisa para começar.</p>
                <p>A HydroForce™ puxa água diretamente do seu reservatório e transforma-a em um poderoso jato de limpeza — sem depender de uma torneira próxima.</p>
              </div>
            </div>

            <div className="mt-9 overflow-hidden rounded-xl bg-[#173b24] py-3 text-white">
              <div className="lava-marquee flex w-max whitespace-nowrap">
                <span className="px-5 text-sm font-black sm:text-base">
                  ✨ PRODUTOS ORIGINAIS, SELECIONADOS COM QUALIDADE E CONFIANÇA ✨ 🛡️ 30 DIAS DE GARANTIA EM TODOS OS PRODUTOS ✨ 🚚 ENVIO RÁPIDO EM ATÉ 12 HORAS ✨
                </span>
                <span className="px-5 text-sm font-black sm:text-base" aria-hidden="true">
                  ✨ PRODUTOS ORIGINAIS, SELECIONADOS COM QUALIDADE E CONFIANÇA ✨ 🛡️ 30 DIAS DE GARANTIA EM TODOS OS PRODUTOS ✨ 🚚 ENVIO RÁPIDO EM ATÉ 12 HORAS ✨
                </span>
              </div>
            </div>

            <div className="mt-7 overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_20px_60px_rgba(23,79,70,.12)]">
              <img
                src="https://files.catbox.moe/z6pelq.jpeg"
                alt="Kit completo HydroForce"
                className="w-full object-contain"
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-[2rem] bg-[#101820] shadow-[0_25px_70px_rgba(23,79,70,.16)]">
              <video
                src="https://files.catbox.moe/gh2amw.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="HydroForce removendo sujeira"
                className="mx-auto block aspect-[9/16] max-h-[720px] w-full object-contain"
                onClick={(event) => {
                  const video = event.currentTarget;
                  if (video.paused) void video.play();
                  else video.pause();
                }}
              />
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-4xl">
                🚗 VEJA A SUJEIRA SAIR DO SEU CARRO
              </h2>
              <p className="mt-4 text-base leading-7 text-[#33443f] sm:text-lg">
                A HydroForce™ coloca um jato direcionado de água nas suas mãos para facilitar a limpeza de:
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "🚗 CARROS",
                  "🏍️ MOTAS",
                  "🔘 JANTES E PNEUS",
                  "🏠 QUINTAIS",
                  "🧱 PAVIMENTOS",
                  "🌿 JARDINS",
                  "🚪 PORTÕES",
                  "🪑 ÁREAS EXTERIORES",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-[#dce8e4] bg-[#f7fbfa] px-5 py-4 text-base font-black text-[#173b24] sm:text-lg">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#eef8ff] px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-[2rem] bg-[#101820] shadow-[0_25px_70px_rgba(23,79,70,.16)]">
              <video
                src="https://files.catbox.moe/eo4ds6.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="HydroForce 21V sem fios"
                className="block max-h-[720px] w-full object-contain"
                onClick={(event) => {
                  const video = event.currentTarget;
                  if (video.paused) void video.play();
                  else video.pause();
                }}
              />
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-4xl">
                ⚡ SEM FIOS. MAIS LIBERDADE.
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-[#33443f] sm:text-lg">
                <p>A HydroJato™ funciona com bateria de <strong>21V</strong>.</p>
                <p>Sem depender de uma tomada durante a utilização.</p>
                <p>Isso significa que você pode utilizá-la em diferentes locais com muito mais liberdade.</p>
                <p className="font-black text-[#173b24]">🔋 E A OFERTA INCLUI 2 BATERIAS.</p>
                <p>Tenha uma segunda bateria disponível para prolongar a utilização.</p>
              </div>
            </div>
          </div>
        </section>

      <div className="h-20 md:hidden" />

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-[#dce8ee] bg-white/95 p-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(16,24,32,.12)] backdrop-blur md:hidden">
        <div className="min-w-0">
          <span className="block text-[9px] font-black uppercase text-[#607481]">
            HYDROFORCE
          </span>
          <strong className="block text-base leading-none text-[#101820]">
            {formatKz(PRODUCT.price)}
          </strong>
        </div>
        <button
          onClick={buy}
          className="ml-auto h-11 rounded-xl bg-[#173b24] px-5 text-xs font-black text-white shadow-lg hover:bg-[#1f5233]"
        >
          ENCOMENDAR AGORA
        </button>
      </div>

      <footer className="border-t border-[#dce8ee] px-5 py-8 text-center text-xs text-[#607481]">
        AURELIS • HYDROFORCE
      </footer>

      <CheckoutDrawer
        product={product}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={offerQuantity}
        onQuantityChange={setOfferQuantity}
        onPlaced={(order) =>
          navigate({
            to: "/obrigado",
            search: {
              produto: PRODUCT.name,
              qtd: order.quantity,
              total: order.total,
            },
          })
        }
      />
      </main>
    </div>
  );
}
