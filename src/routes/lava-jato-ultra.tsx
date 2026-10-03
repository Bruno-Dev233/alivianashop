import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Car,
  Check,
  Droplets,
  Home,
  Lock,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { formatKz, type Product } from "@/lib/aurelis";
import alivianaLogo from "@/assets/aliviana-logo.png";

const PRODUCT = {
  id: "lava-jato-ultra",
  name: "Lava Jato Ultra",
  price: 44998,
  oldPrice: 84998,
  discount: 47,
  image: "https://files.catbox.moe/4x53om.avif",
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  cost_price: 0,
  description:
    "Lava jato portátil para facilitar a limpeza do carro, moto, bicicleta e diferentes superfícies laváveis.",
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
      { title: "Lava Jato Ultra | AURELIS" },
      {
        name: "description",
        content:
          "Lava Jato Ultra — solução portátil para limpar carro, moto e bicicleta com mais praticidade.",
      },
      { property: "og:title", content: "Lava Jato Ultra" },
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
      "O que é o Lava Jato Ultra?",
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
      <div className="bg-[#101820] px-4 py-2 text-center text-[11px] font-black uppercase tracking-wide text-white sm:text-sm">
        🚗 LAVA JATO ULTRA • 🚚 ENTREGA AO DOMICÍLIO • 💵 PAGUE NA ENTREGA
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e5edf2] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <img
            src={alivianaLogo}
            alt="AURELIS"
            className="h-8 w-auto object-contain sm:h-9"
          />
          <button
            onClick={buy}
            className={`${CTA} h-11 bg-[#087EF5] px-5 text-sm text-white shadow-lg shadow-[#087EF5]/25`}
          >
            <Car className="size-4" /> ENCOMENDAR
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#eef8ff] via-white to-[#d9edff]">
          <div className="absolute -right-40 -top-40 size-[30rem] rounded-full bg-[#087EF5]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 size-[28rem] rounded-full bg-[#00B8D9]/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:py-12 md:grid-cols-2 md:py-16">
            <div className="order-2 md:order-1">
              <span className="inline-flex rounded-full bg-[#dff1ff] px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#087EF5]">
                🚗 LAVA JATO PORTÁTIL
              </span>

              <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[.98] tracking-tight sm:text-5xl lg:text-6xl">
                LIMPE O SEU CARRO COM MAIS PRATICIDADE
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#506574] sm:text-lg">
                O <strong>Lava Jato Ultra</strong> ajuda a remover poeira,
                barro e sujeira com um jato de água, sem a complicação de
                equipamentos grandes.
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <div>
                  <span className="block text-xs font-bold uppercase text-[#687b88]">
                    Oferta de hoje
                  </span>
                  <span className="text-4xl font-black text-[#101820] sm:text-5xl">
                    {formatKz(PRODUCT.price)}
                  </span>
                </div>
                <span className="mb-1 text-xl font-bold text-[#82919a] line-through">
                  {formatKz(PRODUCT.oldPrice)}
                </span>
                <span className="mb-1 rounded-full bg-[#101820] px-3 py-1.5 text-sm font-black text-white">
                  -{PRODUCT.discount}%
                </span>
              </div>

              <button
                onClick={buy}
                className={`${CTA} mt-6 h-16 w-full bg-[#087EF5] px-7 text-base text-white shadow-xl shadow-[#087EF5]/25 sm:max-w-xl sm:text-lg`}
              >
                🚗 QUERO O MEU LAVA JATO ULTRA
                <ArrowRight className="size-5" />
              </button>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#506574]">
                <span>💵 Pague somente quando receber</span>
                <span>🚚 Entrega ao domicílio</span>
                <span>🔒 Pedido seguro</span>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_25px_70px_rgba(8,126,245,.18)] sm:p-6">
                <div className="absolute left-5 top-5 z-10 rounded-full bg-[#101820] px-4 py-2 text-sm font-black text-white shadow-xl">
                  -{PRODUCT.discount}% OFF
                </div>
                <img
                  src={PRODUCT.image}
                  alt="Lava Jato Ultra"
                  className="aspect-square w-full rounded-[1.5rem] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d9edf7] bg-[#101820] text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-5 md:grid-cols-4">
            {[
              [Droplets, "JATO DE ÁGUA", "Para facilitar a limpeza"],
              [Zap, "SEM FIOS", "Mais liberdade de utilização"],
              [Car, "IDEAL PARA CARROS", "Também para motos e bikes"],
              [Truck, "PAGUE NA ENTREGA", "Compre sem pagamento antecipado"],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Droplets;
              return (
                <div
                  key={title as string}
                  className="flex gap-2 p-3 sm:items-center sm:justify-center"
                >
                  <I className="mt-0.5 size-5 shrink-0 text-[#32b6ff]" />
                  <div>
                    <b className="block text-[10px] sm:text-xs">{title as string}</b>
                    <span className="text-[10px] text-white/65 sm:text-xs">
                      {text as string}
                    </span>
                  </div>
                </div>
              );
            })}
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
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black tracking-wider text-[#087EF5]">
                ADEUS À COMPLICAÇÃO
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                UM EQUIPAMENTO PRÁTICO PARA O SEU DIA A DIA
              </h2>
              <p className="mt-5 leading-7 text-[#506574]">
                O Lava Jato Ultra foi pensado para quem quer mais praticidade
                na hora de cuidar do carro e de outras superfícies. Compacto e
                portátil, pode acompanhar diferentes momentos da sua rotina.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  "Ajuda a remover poeira e sujeira",
                  "Prático para levar e guardar",
                  "Ideal para diferentes superfícies laváveis",
                  "Mais liberdade durante a limpeza",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-bold">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#087EF5] text-white">
                      <Check className="size-4" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={buy}
                className={`${CTA} mt-8 h-14 bg-[#101820] px-7 text-white shadow-xl`}
              >
                🚗 QUERO O MEU AGORA <ArrowRight className="size-5" />
              </button>
            </div>

            <div className="rounded-[2rem] border border-white bg-white p-4 shadow-[0_20px_60px_rgba(8,126,245,.14)]">
              <img
                src={PRODUCT.image}
                alt="Lava Jato Ultra em destaque"
                className="mx-auto aspect-square w-full object-contain"
              />
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <span className="rounded-full bg-[#e9f5ff] px-3 py-1.5 text-[11px] font-black text-[#087EF5]">
              MUITO ALÉM DO CARRO
            </span>
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">
              USE ONDE A LIMPEZA FOR NECESSÁRIA
            </h2>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {uses.map(([emoji, title, text]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-[#e1ebf0] bg-white p-7 shadow-sm"
                >
                  <div className="text-4xl">{emoji}</div>
                  <h3 className="mt-3 font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#607481]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#101820] px-5 py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] bg-white p-4">
              <img
                src={PRODUCT.image}
                alt="Lava Jato Ultra"
                className="aspect-square w-full object-contain"
              />
            </div>

            <div>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wider text-[#32b6ff]">
                OFERTA ESPECIAL
              </span>
              <h2 className="mt-5 text-3xl font-black sm:text-5xl">
                TENHA MAIS PRATICIDADE POR APENAS
              </h2>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <span className="text-4xl font-black text-[#32b6ff] sm:text-5xl">
                  {formatKz(PRODUCT.price)}
                </span>
                <span className="text-xl font-bold text-white/40 line-through">
                  {formatKz(PRODUCT.oldPrice)}
                </span>
              </div>

              <p className="mt-4 text-white/65">
                Aproveite a oferta atual e faça o seu pedido com pagamento
                somente no momento da entrega.
              </p>

              <button
                onClick={buy}
                className={`${CTA} mt-7 h-15 w-full bg-[#087EF5] px-7 py-4 text-white shadow-xl shadow-[#087EF5]/20 sm:w-auto`}
              >
                🚗 QUERO O LAVA JATO ULTRA <ArrowRight className="size-5" />
              </button>

              <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold text-white/70">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-[#32b6ff]" /> Pedido seguro
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="size-4 text-[#32b6ff]" /> Entrega ao domicílio
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="size-4 text-[#32b6ff]" /> Pague na entrega
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7fbfe] px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-black sm:text-5xl">
              PERGUNTAS FREQUENTES
            </h2>

            <div className="mt-8 divide-y divide-[#dce8ee] rounded-3xl border border-[#dce8ee] bg-white px-5">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black">
                    <span>❓ {question}</span>
                    <span className="text-[#087EF5] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-6 text-[#607481]">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#087EF5] to-[#0058b5] px-5 py-16 text-center text-white sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Droplets className="mx-auto size-10" />
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">
              SEU CARRO LIMPO COM MAIS PRATICIDADE
            </h2>
            <p className="mt-4 text-white/80">
              Lava Jato Ultra — portátil, prático e fácil de usar.
            </p>
            <div className="mt-5 text-4xl font-black">
              {formatKz(PRODUCT.price)}
            </div>
            <button
              onClick={buy}
              className={`${CTA} mt-7 h-16 w-full bg-[#101820] px-8 text-base text-white shadow-xl sm:w-auto sm:text-lg`}
            >
              🚗 QUERO O MEU LAVA JATO ULTRA
              <ArrowRight className="size-5" />
            </button>
            <p className="mt-4 text-xs text-white/70">
              💵 Pague somente quando receber • 🚚 Entrega ao domicílio
            </p>
          </div>
        </section>
      </main>

      <div className="h-20 md:hidden" />

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-[#dce8ee] bg-white/95 p-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(16,24,32,.12)] backdrop-blur md:hidden">
        <div className="min-w-0">
          <span className="block text-[9px] font-black uppercase text-[#607481]">
            LAVA JATO ULTRA
          </span>
          <strong className="block text-base leading-none text-[#101820]">
            {formatKz(PRODUCT.price)}
          </strong>
        </div>
        <button
          onClick={buy}
          className="ml-auto h-11 rounded-xl bg-[#087EF5] px-5 text-xs font-black text-white shadow-lg"
        >
          ENCOMENDAR AGORA
        </button>
      </div>

      <footer className="border-t border-[#dce8ee] px-5 py-8 text-center text-xs text-[#607481]">
        AURELIS • LAVA JATO ULTRA
      </footer>

      <CheckoutDrawer
        product={product}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={1}
        onQuantityChange={() => {}}
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
    </div>
  );
}
