import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Check, ChevronDown, Dumbbell, Hand, ShieldCheck,
  ShoppingBag, Sparkles, Truck, Zap
} from "lucide-react";
import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { formatKz, type Product } from "@/lib/aurelis";

const ASSETS = {
  mainVideo: "https://cdn.shoppaas.com/uploads/7d6319191df1d2fb/4fb5b604a4448269773764c43bb1e04e.gif?format=webp&width=500",
  video2: "https://cdn.shoppaas.com/uploads/7d6319191df1d2fb/291a5bc6d75390f1fe11c9a31e6cf65d.gif?format=webp&width=500",
  video3: "https://cdn.shoppaas.com/uploads/7d6319191df1d2fb/e64d67a40540fcb23ac37c9d4ca24009.gif?format=webp&width=500",
  video4: "https://cdn.shoppaas.com/uploads/7d6319191df1d2fb/c54e541103213fea66ae92335caad8fa.gif?format=webp&width=500",
  productPhoto: "https://cdn.shoppaas.com/uploads/7d6319191df1d2fb/530fd64ad14d0814cbcf58f438448b9b.png?format=webp&width=500",
  muscleMap: "https://sc04.alicdn.com/kf/Hc2ba86d1f64e46789b1d7bd70c11eab9L/252192477/Hc2ba86d1f64e46789b1d7bd70c11eab9L.png",
  productDetails: "https://cdn.shoppaas.com/uploads/7d6319191df1d2fb/fb46ab789214bc1d497ba46fdb63ef62.png?format=webp&width=500",
  productExtra: "https://cdn.shoppaas.com/uploads/7d6319191df1d2fb/d1a4d7b96a94db19aee3355805f3f60d.jpg?format=webp&width=500",
};

const PRODUCT = {
  id: "prancha-flexoes",
  name: "Prancha de Flexões",
  price: 26500,
  oldPrice: 49000,
  image: ASSETS.productPhoto,
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  cost_price: 0,
  description: "Prancha de flexões com posições de apoio por cores para variar o treino de peito, ombros, braços e costas.",
  social_proof_text: "",
  top_bar_text: "",
  top_bar_text_2: "",
  store_name: "AURELIS",
  logo_url: null,
  main_image_1: PRODUCT.image,
  main_image_2: ASSETS.productDetails,
  main_image_3: ASSETS.productExtra,
  content_image_1: ASSETS.muscleMap,
  content_image_2: ASSETS.productDetails,
  content_image_3: ASSETS.productExtra,
  content_image_4: ASSETS.mainVideo,
};

const CTA = "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition hover:-translate-y-0.5 active:translate-y-0";

export const Route = createFileRoute("/prancha-flexoes")({
  head: () => ({
    meta: [
      { title: "Prancha de Flexões | AURELIS" },
      {
        name: "description",
        content: "Prancha de Flexões AURELIS: varie as posições de apoio e treine peito, ombros, braços e costas em casa.",
      },
      { property: "og:title", content: "Prancha de Flexões — AURELIS" },
      { property: "og:description", content: "Um sistema prático para variar as suas flexões e organizar o treino em casa." },
      { property: "og:image", content: ASSETS.productPhoto },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function MediaCard({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.5rem] bg-[#111] shadow-[0_18px_50px_rgba(0,0,0,.12)] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="block h-full w-full object-cover" />
    </div>
  );
}

function Page() {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const buy = () => setCheckoutOpen(true);
  const discount = Math.round(((PRODUCT.oldPrice - PRODUCT.price) / PRODUCT.oldPrice) * 100);

  const benefits = [
    [Dumbbell, "VÁRIAS POSIÇÕES", "Mude a posição das pegas para variar o estímulo do exercício."],
    [Hand, "PEGAS FIRMES", "Pegas pensadas para proporcionar uma base de apoio confortável."],
    [ShieldCheck, "ESTRUTURA PRÁTICA", "Uma solução simples para organizar o treino de flexões."],
    [Zap, "FÁCIL DE GUARDAR", "Depois do treino, pode ser desmontada e guardada com praticidade."],
  ] as const;

  const faqs = [
    ["Para que serve a prancha de flexões?", "Serve para realizar flexões com diferentes posições de apoio, ajudando a variar a rotina de treino."],
    ["Que partes do corpo posso trabalhar?", "As diferentes posições permitem dar mais ênfase ao peito, ombros, braços e costas durante a rotina de flexões."],
    ["Como funcionam as cores?", "Cada cor indica uma posição de encaixe das pegas. Basta seguir as marcações da prancha para mudar a posição das mãos."],
    ["Posso usar em casa?", "Sim. É uma solução compacta para treinos em casa, sem necessidade de uma máquina de ginásio."],
    ["É fácil de transportar?", "Sim. O formato é prático para guardar e transportar quando necessário."],
    ["Como faço o pedido?", "Clique em um dos botões, preencha os seus dados no checkout e confirme a encomenda."],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#111]">
      <div className="bg-[#111] px-4 py-2 text-center text-[10px] font-black uppercase tracking-[.08em] text-white sm:text-xs">
        AURELIS • ENTREGA GRÁTIS EM LUANDA • PAGAMENTO NA ENTREGA
      </div>

      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="text-2xl font-black tracking-[-.05em]">AURELIS</div>
          <button onClick={buy} className={`${CTA} h-11 bg-[#111] px-5 text-xs text-white shadow-lg sm:text-sm`}>
            <ShoppingBag className="size-4" /> ENCOMENDAR
          </button>
        </div>
      </header>

      <main>
        <section className="bg-[#f5f5f3]">
          <div className="mx-auto grid max-w-7xl items-center gap-7 px-4 py-6 sm:py-10 md:grid-cols-2 md:py-14">
            <div className="order-2 md:order-1">
              <span className="inline-flex rounded-full bg-[#111] px-3 py-1.5 text-[10px] font-black tracking-[.12em] text-white">
                AURELIS FITNESS
              </span>
              <h1 className="mt-5 text-[2.55rem] font-black leading-[.94] tracking-[-.05em] sm:text-5xl lg:text-6xl">
                MAXIMIZA O TEU TREINO DE FLEXÕES. 💪
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#555] sm:text-lg">
                Uma prancha com diferentes posições de apoio para variar o treino de peito, ombros, braços e costas — em casa, no teu ritmo.
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <span className="text-4xl font-black sm:text-5xl">{formatKz(PRODUCT.price)}</span>
                <span className="pb-1 text-xl font-bold text-[#999] line-through">{formatKz(PRODUCT.oldPrice)}</span>
                <span className="mb-1 rounded-full bg-[#e11d48] px-3 py-1.5 text-sm font-black text-white">-{discount}%</span>
              </div>

              <button onClick={buy} className={`${CTA} mt-6 h-16 w-full bg-[#e11d48] px-6 text-base text-white shadow-xl shadow-[#e11d48]/25 sm:max-w-xl sm:text-lg`}>
                🔥 QUERO A MINHA PRANCHA <ArrowRight className="size-5" />
              </button>

              <div className="mt-4 grid grid-cols-1 gap-2 text-xs font-bold text-[#555] sm:grid-cols-3">
                <span>🚚 Entrega grátis</span>
                <span>💵 Pague na entrega</span>
                <span>📍 Luanda</span>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-[2rem] bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,.18)]">
                <img src={ASSETS.mainVideo} alt="Demonstração da Prancha de Flexões AURELIS" className="block aspect-[4/5] w-full object-cover sm:aspect-square" />
                <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-black shadow-xl">
                  {formatKz(PRODUCT.price)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#111] px-4 py-5 text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 md:grid-cols-4">
            {[
              ["💪", "TREINO VARIADO", "Diferentes posições"],
              ["🎯", "POSIÇÕES POR COR", "Escolha o apoio"],
              ["🏠", "PARA CASA", "Treine onde quiser"],
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
              <span className="rounded-full bg-[#f1f1f1] px-3 py-1.5 text-[10px] font-black tracking-[.12em]">MAIS DO QUE UMA PRANCHA</span>
              <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">
                UM SISTEMA PARA VARIAR AS TUAS FLEXÕES.
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#666] sm:text-base">
                As marcações ajudam a posicionar as pegas de acordo com diferentes objetivos de treino. Assim, podes mudar a posição das mãos sem ficar sempre preso à mesma flexão.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(([Icon, title, text]) => {
                const I = Icon as typeof Dumbbell;
                return (
                  <article key={title} className="rounded-3xl border border-[#e8e8e8] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,.06)]">
                    <span className="grid size-12 place-items-center rounded-2xl bg-[#111] text-white"><I className="size-6" /></span>
                    <h3 className="mt-4 text-sm font-black">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#666]">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f3f3f1] px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-8 md:grid-cols-[.9fr_1.1fr]">
              <div>
                <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black tracking-[.12em]">POSIÇÕES DE TREINO</span>
                <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">
                  CADA COR AJUDA A GUIAR O TEU APOIO.
                </h2>
                <p className="mt-5 text-sm leading-7 text-[#555] sm:text-base">
                  Consulta o mapa de cores da própria prancha e escolhe a posição correspondente ao grupo muscular que queres trabalhar.
                </p>
                <div className="mt-7 space-y-3 text-sm font-bold">
                  {["Peito", "Ombros", "Tríceps e braços", "Costas"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <span className="grid size-7 place-items-center rounded-full bg-[#111] text-xs text-white">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,.12)]">
                <img src={ASSETS.muscleMap} alt="Mapa de posições e grupos musculares da prancha de flexões" className="w-full rounded-[1.5rem] object-contain" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="rounded-full bg-[#f1f1f1] px-3 py-1.5 text-[10px] font-black tracking-[.12em]">VEJA EM AÇÃO</span>
              <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">MÚLTIPLAS FORMAS DE TREINAR.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666]">
                Diferentes posições permitem construir uma rotina mais variada usando o mesmo equipamento.
              </p>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <MediaCard src={ASSETS.video2} alt="Demonstração de exercício com a prancha" className="aspect-[4/5]" />
              <MediaCard src={ASSETS.video3} alt="Demonstração de treino com a prancha" className="aspect-[4/5]" />
              <MediaCard src={ASSETS.video4} alt="Demonstração adicional da prancha" className="aspect-[4/5]" />
            </div>
          </div>
        </section>

        <section className="bg-[#111] px-4 py-14 text-white sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black tracking-[.12em] text-white">DETALHES DO PRODUTO</span>
              <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">
                PENSADA PARA TORNAR O TREINO MAIS PRÁTICO.
              </h2>
              <p className="mt-5 leading-7 text-white/70">
                O sistema de encaixe permite trocar as pegas entre as marcações. A superfície e a base foram pensadas para proporcionar uma utilização mais estável durante o exercício.
              </p>
              <ul className="mt-7 space-y-3 text-sm font-bold">
                {[
                  "Diferentes pontos de encaixe",
                  "Pegas removíveis",
                  "Formato compacto",
                  "Fácil de guardar",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid size-6 place-items-center rounded-full bg-[#e11d48]"><Check className="size-4" /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="rounded-[2rem] bg-white p-3 shadow-2xl">
                <img src={ASSETS.productDetails} alt="Detalhes da Prancha de Flexões" className="w-full rounded-[1.5rem] object-contain" loading="lazy" />
              </div>
              <div className="rounded-[2rem] bg-white p-3 shadow-2xl">
                <img src={ASSETS.productExtra} alt="Vista adicional da Prancha de Flexões" className="w-full rounded-[1.5rem] object-contain" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-[2rem] bg-[#f4f4f2] p-7 sm:p-10">
                <span className="text-3xl">🎯</span>
                <h3 className="mt-4 text-2xl font-black">MUDA A POSIÇÃO. MUDA O ESTÍMULO.</h3>
                <p className="mt-4 text-sm leading-7 text-[#666]">
                  Em vez de fazer sempre a mesma flexão, usa as marcações da prancha para experimentar diferentes posições e montar uma rotina mais completa.
                </p>
              </article>
              <article className="rounded-[2rem] bg-[#111] p-7 text-white sm:p-10">
                <span className="text-3xl">🏠</span>
                <h3 className="mt-4 text-2xl font-black">O TEU GINÁSIO PODE COMEÇAR EM CASA.</h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Sem ocupar muito espaço, a prancha pode fazer parte da tua rotina de exercícios em casa, no quarto, na sala ou onde tenhas uma superfície adequada.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f3f1] px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black tracking-[.12em]">OFERTA AURELIS</span>
            <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">LEVA A TUA PRANCHA POR {formatKz(PRODUCT.price)}</h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="text-4xl font-black">{formatKz(PRODUCT.price)}</span>
              <span className="text-xl font-bold text-[#999] line-through">{formatKz(PRODUCT.oldPrice)}</span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#666]">
              Aproveita o preço promocional da AURELIS e começa a variar o teu treino de flexões.
            </p>
            <button onClick={buy} className={`${CTA} mt-7 h-16 w-full bg-[#e11d48] px-8 text-base text-white shadow-xl sm:w-auto sm:text-lg`}>
              🔥 ENCOMENDAR AGORA <ArrowRight className="size-5" />
            </button>
            <p className="mt-4 text-xs font-bold text-[#666]">🚚 Entrega grátis em Luanda • 💵 Pagamento na entrega</p>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-black tracking-[-.04em] sm:text-5xl">PERGUNTAS FREQUENTES</h2>
            <div className="mt-8 divide-y divide-[#eaeaea] rounded-[2rem] border border-[#eaeaea] bg-white px-5 shadow-sm">
              {faqs.map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black">
                    <span>{q}</span>
                    <ChevronDown className="size-5 shrink-0 text-[#e11d48] transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-6 text-[#666]">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#e11d48] px-4 py-14 text-center text-white sm:py-20">
          <Sparkles className="mx-auto size-10" />
          <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">PRONTO PARA TREINAR? 💪</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Prancha de Flexões AURELIS — várias posições, um só equipamento e uma rotina de treino mais variada.
          </p>
          <div className="mt-5 text-4xl font-black">{formatKz(PRODUCT.price)}</div>
          <button onClick={buy} className={`${CTA} mt-7 h-16 w-full bg-white px-8 text-base text-[#e11d48] shadow-2xl sm:w-auto sm:text-lg`}>
            🔥 QUERO A MINHA PRANCHA <ArrowRight className="size-5" />
          </button>
          <p className="mt-4 text-xs font-bold text-white/80">📲 950 532 879 • 🚚 Entrega grátis em Luanda</p>
        </section>
      </main>

      <div className="h-20 md:hidden" />
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-[#e5e5e5] bg-white/95 p-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,.12)] backdrop-blur md:hidden">
        <div className="min-w-0">
          <span className="block text-[9px] font-black uppercase text-[#777]">PRANCHA DE FLEXÕES</span>
          <strong className="block text-base leading-none">{formatKz(PRODUCT.price)}</strong>
        </div>
        <button onClick={buy} className="ml-auto h-11 rounded-xl bg-[#e11d48] px-5 text-xs font-black text-white shadow-lg">
          ENCOMENDAR
        </button>
      </div>

      <footer className="border-t border-[#e5e5e5] px-5 py-8 text-center text-xs text-[#777]">
        AURELIS • Contacto: 950 532 879
      </footer>

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
