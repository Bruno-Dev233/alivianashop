import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Truck,
  Usb,
  Waves,
} from "lucide-react";
import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { formatKz, type Product } from "@/lib/aurelis";
import alivianaLogo from "@/assets/aliviana-logo.png";

// A imagem do produto será adicionada aqui posteriormente.
const PRODUCT_IMAGE = "https://archive.org/download/IRRIGADOR/IRRIGADOR.jpg";

const PRODUCT = {
  id: "irrigador-bucal",
  name: "Irrigador Bucal Portátil",
  price: 28799,
  oldPrice: 39999,
  discount: 28,
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  cost_price: 0,
  description:
    "Irrigador bucal portátil recarregável USB com reservatório de 220 ml para complementar a limpeza entre os dentes e junto à gengiva.",
  social_proof_text: "",
  top_bar_text: "",
  top_bar_text_2: "",
  store_name: "AURELIS",
  logo_url: null,
  main_image_1: PRODUCT_IMAGE || null,
  main_image_2: null,
  main_image_3: null,
  content_image_1: null,
  content_image_2: null,
  content_image_3: null,
  content_image_4: null,
};

const CTA =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition active:scale-[.98]";

export const Route = createFileRoute("/irrigador-bucal")({
  head: () => ({
    meta: [
      { title: "Irrigador Bucal Portátil | AURELIS" },
      {
        name: "description",
        content:
          "Irrigador Bucal Portátil USB de 220 ml — uma forma prática de complementar a limpeza entre os dentes e junto à gengiva.",
      },
      { property: "og:title", content: "Irrigador Bucal Portátil" },
      {
        property: "og:description",
        content: "Mais praticidade para a sua rotina de higiene oral.",
      },
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
      icon: Waves,
      title: "LIMPEZA ENTRE OS DENTES",
      text: "O jato de água ajuda a alcançar espaços de difícil acesso.",
    },
    {
      icon: HeartPulse,
      title: "CUIDADO COM A GENGIVA",
      text: "Complementa a rotina de higiene oral junto à escovação.",
    },
    {
      icon: Usb,
      title: "RECARREGÁVEL USB",
      text: "Prático para carregar e utilizar no dia a dia.",
    },
    {
      icon: Sparkles,
      title: "PORTÁTIL",
      text: "Compacto para ter em casa ou levar consigo.",
    },
  ];

  const faqs = [
    [
      "O que é um irrigador bucal?",
      "É um dispositivo que utiliza um jato de água para complementar a limpeza entre os dentes e ao longo da linha da gengiva.",
    ],
    [
      "Qual é a capacidade do reservatório?",
      "Este modelo possui reservatório com capacidade de 220 ml.",
    ],
    [
      "É recarregável?",
      "Sim. O produto foi desenvolvido para carregamento através de USB.",
    ],
    [
      "Substitui a escova de dentes?",
      "Não. O irrigador deve ser usado como complemento da rotina de higiene oral, e não como substituto da escovação.",
    ],
    [
      "Como faço o pedido?",
      "Clique em COMPRAR AGORA, preencha os seus dados no checkout e confirme a encomenda.",
    ],
    [
      "Como funciona o pagamento?",
      "O pagamento é feito na entrega, conforme o fluxo da loja.",
    ],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#102033]">
      <div className="bg-[#0d8fb8] px-4 py-2 text-center text-[11px] font-black uppercase tracking-wide text-white sm:text-sm">
        🦷 HIGIENE ORAL • 🚚 ENTREGA AO DOMICÍLIO • 💵 PAGUE NA ENTREGA
      </div>

      <header className="sticky top-0 z-40 border-b border-[#dcecf2] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <img
            src={alivianaLogo}
            alt="AURELIS"
            className="h-8 w-auto object-contain sm:h-9"
          />
          <button
            onClick={buy}
            className={`${CTA} h-11 bg-[#0d8fb8] px-5 text-sm text-white shadow-lg shadow-[#0d8fb8]/25`}
          >
            COMPRAR AGORA
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#eafaff] via-white to-[#d8f4fb]">
          <div className="absolute -right-32 -top-32 size-[28rem] rounded-full bg-[#13b9d5]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-[30rem] rounded-full bg-[#0d8fb8]/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:py-12 md:grid-cols-2 md:py-16">
            <div className="order-2 md:order-1">
              <span className="inline-flex rounded-full bg-[#d9f6fb] px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#087c9f]">
                ✨ CUIDADO ORAL MAIS PRÁTICO
              </span>

              <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[.98] tracking-tight sm:text-5xl lg:text-6xl">
                DENTES MAIS LIMPOS. UMA ROTINA MAIS COMPLETA.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#536c79] sm:text-lg">
                O <strong>Irrigador Bucal Portátil</strong> utiliza um jato de
                água para complementar a limpeza entre os dentes e junto à
                gengiva, de forma prática e confortável.
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <div>
                  <span className="block text-xs font-bold uppercase text-[#718895]">
                    Oferta especial
                  </span>
                  <span className="text-4xl font-black text-[#102033] sm:text-5xl">
                    {formatKz(PRODUCT.price)}
                  </span>
                </div>
                <span className="mb-1 text-xl font-bold text-[#8ca0aa] line-through">
                  {formatKz(PRODUCT.oldPrice)}
                </span>
                <span className="mb-1 rounded-full bg-[#102033] px-3 py-1.5 text-sm font-black text-white">
                  -{PRODUCT.discount}%
                </span>
              </div>

              <button
                onClick={buy}
                className={`${CTA} mt-6 h-16 w-full bg-[#0d8fb8] px-7 text-base text-white shadow-xl shadow-[#0d8fb8]/25 sm:max-w-xl sm:text-lg`}
              >
                🦷 QUERO O MEU IRRIGADOR BUCAL
                <ArrowRight className="size-5" />
              </button>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#536c79]">
                <span>💵 Pague somente quando receber</span>
                <span>🚚 Entrega ao domicílio</span>
                <span>🔒 Pedido seguro</span>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_25px_70px_rgba(13,143,184,.18)] sm:p-6">
                <div className="absolute left-5 top-5 z-10 rounded-full bg-[#102033] px-4 py-2 text-sm font-black text-white shadow-xl">
                  -{PRODUCT.discount}% OFF
                </div>
                {PRODUCT_IMAGE ? (
                  <img
                    src={PRODUCT_IMAGE}
                    alt="Irrigador Bucal Portátil"
                    className="aspect-square w-full rounded-[1.5rem] object-contain"
                  />
                ) : (
                  <div className="flex aspect-square w-full flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#effcff] via-white to-[#d8f7fc] px-8 text-center">
                    <span className="grid size-24 place-items-center rounded-full bg-white text-[#0d8fb8] shadow-xl sm:size-28">
                      <Waves className="size-12 sm:size-14" />
                    </span>
                    <span className="mt-5 text-lg font-black text-[#102033] sm:text-xl">
                      IMAGEM DO PRODUTO
                    </span>
                    <span className="mt-2 text-sm text-[#6a818c]">
                      Espaço reservado para a foto do irrigador bucal
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8edf3] bg-[#102033] text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-5 md:grid-cols-4">
            {[
              [Waves, "JATO DE ÁGUA", "Alcança espaços difíceis"],
              [HeartPulse, "CUIDADO ORAL", "Complementa a higiene"],
              [Usb, "USB", "Recarregável"],
              [Truck, "PAGUE NA ENTREGA", "Sem pagamento antecipado"],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Waves;
              return (
                <div key={title as string} className="flex gap-2 p-3 sm:items-center sm:justify-center">
                  <I className="mt-0.5 size-5 shrink-0 text-[#39c6df]" />
                  <div>
                    <b className="block text-[10px] sm:text-xs">{title as string}</b>
                    <span className="text-[10px] text-white/65 sm:text-xs">{text as string}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-full bg-[#e8f9fc] px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#087c9f]">
                POR QUE USAR?
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                MAIS PRATICIDADE NA SUA ROTINA DE HIGIENE ORAL
              </h2>
              <p className="mt-4 leading-7 text-[#607985]">
                A limpeza entre os dentes faz parte dos cuidados diários com a
                saúde oral. O irrigador oferece uma alternativa prática para
                complementar essa rotina.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-3xl border border-[#dcecf1] bg-white p-6 shadow-[0_12px_35px_rgba(16,32,51,.06)]"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#e8f9fc] text-[#0d8fb8]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#607985]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eafaff] px-5 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black tracking-wider text-[#087c9f]">
                PEQUENO NO TAMANHO. PRÁTICO NO DIA A DIA.
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                ALCANCE ONDE A ESCOVA NEM SEMPRE CONSEGUE
              </h2>
              <p className="mt-5 leading-7 text-[#536c79]">
                O jato de água pode ajudar a remover restos de alimentos e
                placa em áreas entre os dentes e junto à linha da gengiva,
                complementando a escovação diária.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  "Ajuda a limpar entre os dentes",
                  "Complementa a higiene junto à gengiva",
                  "Reservatório de 220 ml",
                  "Design portátil e recarregável por USB",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-bold text-[#233b49]">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#0d8fb8] text-white">
                      <Check className="size-4" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white bg-white p-7 shadow-xl">
              <div className="rounded-3xl bg-gradient-to-br from-[#0d8fb8] to-[#39c6df] p-8 text-white">
                <ShieldCheck className="size-12" />
                <h3 className="mt-6 text-2xl font-black">UMA ROTINA MAIS COMPLETA</h3>
                <p className="mt-3 leading-7 text-white/85">
                  Use o irrigador como complemento da escovação e da limpeza
                  interdental diária.
                </p>
                <button
                  onClick={buy}
                  className="mt-7 h-14 w-full rounded-2xl bg-white px-5 font-black text-[#087c9f] shadow-lg transition active:scale-[.98]"
                >
                  COMPRAR AGORA
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <span className="rounded-full bg-[#e8f9fc] px-3 py-1.5 text-[11px] font-black text-[#087c9f]">
                OFERTA ESPECIAL
              </span>
              <h2 className="mt-5 text-3xl font-black sm:text-5xl">
                CUIDE MELHOR DA SUA ROTINA ORAL
              </h2>
              <p className="mt-4 text-[#607985]">
                Irrigador Bucal Portátil • 220 ml • Recarregável USB
              </p>
            </div>

            <div className="mt-9 rounded-[2rem] border border-[#d8edf3] bg-[#f7fdff] p-6 text-center shadow-xl sm:p-10">
              <div className="mx-auto inline-flex rounded-full bg-[#102033] px-4 py-2 text-xs font-black uppercase text-white">
                OFERTA DE HOJE
              </div>
              <div className="mt-5 flex flex-wrap items-end justify-center gap-3">
                <strong className="text-5xl font-black text-[#0d8fb8] sm:text-6xl">
                  {formatKz(PRODUCT.price)}
                </strong>
                <span className="mb-2 text-xl font-bold text-[#8ca0aa] line-through">
                  {formatKz(PRODUCT.oldPrice)}
                </span>
              </div>
              <p className="mt-3 font-bold text-[#536c79]">
                Aproveite o preço especial e pague somente quando receber.
              </p>
              <button
                onClick={buy}
                className={`${CTA} mt-7 h-16 w-full bg-[#0d8fb8] px-7 text-base text-white shadow-xl sm:text-lg`}
              >
                🦷 QUERO O MEU AGORA <ArrowRight className="size-5" />
              </button>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-bold text-[#536c79]">
                <span>✓ Pedido seguro</span>
                <span>✓ Pagamento na entrega</span>
                <span>✓ Entrega ao domicílio</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#102033] px-5 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-black sm:text-5xl">DÚVIDAS FREQUENTES</h2>
            </div>
            <div className="mt-8 space-y-3">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group rounded-2xl bg-white/7 p-5">
                  <summary className="cursor-pointer list-none pr-8 font-black marker:hidden">
                    {question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-white/70">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#e8f9fc] to-white px-5 py-16 text-center sm:py-20">
          <Sparkles className="mx-auto size-10 text-[#0d8fb8]" />
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black sm:text-5xl">
            MAIS PRATICIDADE PARA CUIDAR DO SEU SORRISO
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#607985]">
            Faça o seu pedido hoje e receba em casa. Você só paga quando receber.
          </p>
          <button
            onClick={buy}
            className={`${CTA} mt-7 h-16 w-full max-w-xl bg-[#0d8fb8] px-7 text-base text-white shadow-xl sm:text-lg`}
          >
            🦷 COMPRAR IRRIGADOR BUCAL <ArrowRight className="size-5" />
          </button>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#cfe7ee] bg-white/96 p-3 shadow-[0_-10px_35px_rgba(16,32,51,.12)] backdrop-blur md:hidden">
        <button
          onClick={buy}
          className={`${CTA} h-14 w-full bg-[#0d8fb8] text-sm text-white shadow-lg`}
        >
          🦷 COMPRAR AGORA • {formatKz(PRODUCT.price)}
        </button>
      </div>

      <CheckoutDrawer
        product={product}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={1}
        onQuantityChange={() => undefined}
        onPlaced={(order) =>
          navigate({
            to: "/obrigado",
            search: {
              produto: order.productName,
              qtd: order.quantity,
              total: order.total,
            },
          })
        }
      />
    </div>
  );
}
