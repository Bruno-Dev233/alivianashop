import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowRight, Check, ChevronDown, Dumbbell, Hand, ShieldCheck,
  ShoppingBag, Sparkles, Truck, Zap
} from "lucide-react";
import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { formatKz, type Product } from "@/lib/aurelis";

const PRODUCT = {
  id: "prancha-flexoes",
  name: "Prancha de Flexões",
  price: 10500,
  oldPrice: 13000,
  image: "/prancha-flexoes.webp",
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  cost_price: 0,
  description: "Prancha de flexões com diferentes posições de apoio para trabalhar peito, ombros, braços e costas.",
  social_proof_text: "",
  top_bar_text: "",
  top_bar_text_2: "",
  store_name: "AlexBaza",
  logo_url: null,
  main_image_1: PRODUCT.image,
  main_image_2: null,
  main_image_3: null,
  content_image_1: null,
  content_image_2: null,
  content_image_3: null,
  content_image_4: null,
};

const CTA = "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition hover:-translate-y-0.5 active:translate-y-0";

export const Route = createFileRoute("/prancha-flexoes")({
  head: () => ({
    meta: [
      { title: "Prancha de Flexões | AlexBaza" },
      {
        name: "description",
        content: "Treine peito, ombros, braços e costas com diferentes posições de apoio. Entrega grátis em Luanda.",
      },
      { property: "og:title", content: "Prancha de Flexões — AlexBaza" },
      { property: "og:description", content: "Equipe o seu treino em casa com a Prancha de Flexões." },
      { property: "og:image", content: PRODUCT.image },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [videoPaused, setVideoPaused] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const buy = () => setCheckoutOpen(true);
  const discount = Math.round(((PRODUCT.oldPrice - PRODUCT.price) / PRODUCT.oldPrice) * 100);

  const benefits = [
    [Dumbbell, "DIFERENTES POSIÇÕES", "Escolha diferentes apoios para variar o seu treino."],
    [Hand, "PEGAS ANTIDERRAPANTES", "Mais firmeza durante os exercícios."],
    [ShieldCheck, "PRÁTICA E RESISTENTE", "Estrutura pensada para treinos em casa."],
    [Zap, "FÁCIL DE GUARDAR", "Use, retire as pegas e guarde com praticidade."],
  ] as const;

  const muscles = [
    ["💪", "PEITO", "Trabalhe a região peitoral com diferentes posições de apoio."],
    ["🏋️", "OMBROS", "Varie o posicionamento das mãos para mudar o estímulo."],
    ["🔥", "BRAÇOS", "Inclua diferentes apoios na sua rotina de exercícios."],
    ["⚡", "COSTAS", "Tenha mais opções para complementar o treino."],
  ];

  const faqs = [
    ["Para que serve a prancha de flexões?", "É um equipamento para realizar flexões com diferentes posições de apoio, ajudando a variar a sua rotina de treino."],
    ["Quais músculos posso trabalhar?", "A prancha permite variar as posições de apoio para treinar peito, ombros, braços e costas."],
    ["Posso usar em casa?", "Sim. O produto foi pensado para facilitar treinos em casa e pode ser guardado depois da utilização."],
    ["A prancha é fácil de transportar?", "Sim. A estrutura é prática para transportar e guardar."],
    ["Como faço o pedido?", "Clique em qualquer botão de encomenda, preencha os seus dados no checkout e confirme o pedido."],
    ["Como funciona o pagamento?", "O pedido utiliza o checkout da loja e o pagamento é feito na entrega."],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#151515]">
      <div className="bg-[#111111] px-4 py-2 text-center text-[11px] font-black uppercase tracking-wide text-white sm:text-sm">
        🏋️ EQUIPA O TEU TREINO • 🚚 ENTREGA GRÁTIS EM LUANDA • 💵 PAGUE NA ENTREGA
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e8e8e8] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="text-xl font-black tracking-tight sm:text-2xl">
            Alex<span className="text-[#e11d48]">Baza</span>
          </div>
          <button
            onClick={buy}
            className={`${CTA} h-11 bg-[#e11d48] px-5 text-sm text-white shadow-lg shadow-[#e11d48]/20`}
          >
            <ShoppingBag className="size-4" /> ENCOMENDAR
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7f8] via-white to-[#f2f2f2]">
          <div className="absolute -right-32 -top-32 size-96 rounded-full bg-[#e11d48]/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:py-12 md:grid-cols-2 md:py-16">
            <div className="order-2 md:order-1">
              <span className="inline-flex rounded-full bg-[#111111] px-3 py-1.5 text-[11px] font-black tracking-wider text-white">
                PRANCHA DE FLEXÕES
              </span>
              <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[.98] tracking-tight sm:text-5xl lg:text-6xl">
                TRANSFORMA O TEU TREINO DE FLEXÕES. 💪
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#555] sm:text-lg">
                Treina peito, ombros, braços e costas com diferentes posições de apoio. Uma forma prática de variar o teu treino em casa.
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <span className="text-4xl font-black text-[#111] sm:text-5xl">{formatKz(PRODUCT.price)}</span>
                <span className="pb-1 text-xl font-bold text-[#888] line-through sm:text-2xl">{formatKz(PRODUCT.oldPrice)}</span>
                <span className="mb-1 rounded-full bg-[#e11d48] px-3 py-1.5 text-sm font-black text-white">-{discount}% OFF</span>
              </div>

              <button
                onClick={buy}
                className={`${CTA} mt-6 h-16 w-full bg-[#e11d48] px-7 text-base text-white shadow-xl shadow-[#e11d48]/25 sm:max-w-xl sm:text-lg`}
              >
                🔥 QUERO A MINHA PRANCHA <ArrowRight className="size-5" />
              </button>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#555]">
                <span>🚚 Entrega grátis em Luanda</span>
                <span>💵 Pague na entrega</span>
                <span>📅 Até 15 de outubro*</span>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_25px_70px_rgba(0,0,0,.12)] sm:p-6">
                <img
                  src={PRODUCT.image}
                  alt="Prancha de Flexões"
                  className="aspect-square w-full rounded-[1.5rem] object-contain"
                />
                <div className="absolute left-5 top-5 rounded-full bg-[#e11d48] px-4 py-2.5 text-sm font-black text-white shadow-xl ring-2 ring-white/80">
                  {formatKz(PRODUCT.price)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#eeeeee] bg-[#111111] text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-5 md:grid-cols-4">
            {[
              ["💪", "TREINO VARIADO", "Diferentes posições de apoio"],
              ["🛡️", "PEGAS FIRMES", "Mais estabilidade no exercício"],
              ["🏠", "PARA CASA", "Treine onde quiser"],
              ["🚚", "ENTREGA GRÁTIS", "Em toda Luanda"],
            ].map(([icon, title, text]) => (
              <div key={title} className="flex gap-2 p-3 sm:items-center sm:justify-center">
                <span className="text-xl">{icon}</span>
                <div>
                  <b className="block text-[10px] sm:text-xs">{title}</b>
                  <span className="text-[10px] text-white/70 sm:text-xs">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <span className="rounded-full bg-[#fff0f2] px-3 py-1.5 text-[11px] font-black text-[#e11d48]">
              TREINO MAIS INTELIGENTE
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
              UMA PRANCHA. VÁRIAS POSIÇÕES. 🔥
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-7 text-[#666]">
              As marcações da prancha ajudam a posicionar as pegas de acordo com o grupo muscular que pretendes trabalhar, permitindo variar a tua rotina de flexões.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(([Icon, title, text]) => {
                const I = Icon as typeof Dumbbell;
                return (
                  <article key={title} className="rounded-3xl border border-[#eeeeee] bg-white p-6 text-left shadow-[0_12px_35px_rgba(0,0,0,.06)]">
                    <span className="grid size-12 place-items-center rounded-2xl bg-[#fff0f2] text-[#e11d48]">
                      <I className="size-6" />
                    </span>
                    <h3 className="mt-4 font-black">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#666]">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f7] px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#e11d48]">TRABALHA DIFERENTES GRUPOS</span>
              <h2 className="mt-5 text-3xl font-black sm:text-5xl">TREINA O CORPO SUPERIOR</h2>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {muscles.map(([icon, title, text]) => (
                <article key={title} className="rounded-3xl bg-white p-7 text-center shadow-sm">
                  <div className="text-4xl">{icon}</div>
                  <h3 className="mt-4 font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#666]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#111111] px-5 py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wider text-[#ff6b8a]">
                FÁCIL DE UTILIZAR
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                MONTA, POSICIONA E COMEÇA A TREINAR.
              </h2>
              <p className="mt-5 leading-7 text-white/70">
                Escolhe a posição de apoio indicada na prancha, encaixa as pegas e realiza as tuas flexões. Depois do treino, podes desmontar e guardar facilmente.
              </p>
              <ul className="mt-7 space-y-3 text-sm font-bold">
                {[
                  "Marcações para diferentes posições",
                  "Pegas com superfície antiderrapante",
                  "Formato prático para treinos em casa",
                  "Fácil de transportar e guardar",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid size-6 place-items-center rounded-full bg-[#e11d48]"><Check className="size-4" /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={buy} className={`${CTA} mt-8 bg-[#e11d48] px-7 py-4 text-white`}>
                💪 QUERO COMEÇAR A TREINAR <ArrowRight className="size-5" />
              </button>
            </div>

            <div className="rounded-[2rem] bg-white p-4 shadow-2xl">
              <img src={PRODUCT.image} alt="Prancha de Flexões com pegas" className="w-full rounded-[1.5rem] object-contain" />
            </div>
          </div>
        </section>

        <section className="border-y border-[#eeeeee] bg-white px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-[#fff0f2] px-3 py-1.5 text-[11px] font-black text-[#e11d48]">OFERTA</span>
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">LEVA A PRANCHA POR {formatKz(PRODUCT.price)}</h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="text-4xl font-black">{formatKz(PRODUCT.price)}</span>
              <span className="text-xl font-bold text-[#999] line-through">{formatKz(PRODUCT.oldPrice)}</span>
            </div>
            <div className="mx-auto mt-5 max-w-xl rounded-2xl border border-[#f3cbd2] bg-[#fff6f7] px-5 py-4 text-sm font-bold text-[#9f1239]">
              📅 Promoção válida até 15 de outubro ou enquanto houver stock.
            </div>
            <button onClick={buy} className={`${CTA} mt-7 h-16 w-full bg-[#e11d48] px-8 text-base text-white shadow-xl sm:w-auto sm:text-lg`}>
              🔥 ENCOMENDAR AGORA <ArrowRight className="size-5" />
            </button>
            <p className="mt-4 text-xs font-bold text-[#666]">🚚 Entrega grátis em toda Luanda • 💵 Pagamento na entrega</p>
          </div>
        </section>

        <section className="bg-[#f7f7f7] px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-black sm:text-5xl">PERGUNTAS FREQUENTES</h2>
            <div className="mt-8 divide-y divide-[#eeeeee] rounded-3xl border border-[#eeeeee] bg-white px-5">
              {faqs.map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black">
                    <span>❓ {q}</span>
                    <ChevronDown className="size-5 shrink-0 text-[#e11d48] transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-6 text-[#666]">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#e11d48] px-5 py-16 text-center text-white sm:py-20">
          <Sparkles className="mx-auto size-10" />
          <h2 className="mt-5 text-3xl font-black sm:text-5xl">EQUIPA O TEU TREINO. 💪</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Prancha de Flexões — prática, versátil e pensada para variar os teus exercícios.
          </p>
          <div className="mt-5 text-4xl font-black">{formatKz(PRODUCT.price)}</div>
          <button onClick={buy} className={`${CTA} mt-7 h-16 w-full bg-white px-8 text-base text-[#e11d48] shadow-2xl sm:w-auto sm:text-lg`}>
            🔥 QUERO A MINHA PRANCHA <ArrowRight className="size-5" />
          </button>
          <p className="mt-4 text-xs font-bold text-white/80">📲 933 054 114 • 🚚 Entrega grátis em Luanda</p>
        </section>
      </main>

      <div className="h-20 md:hidden" />
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-[#eeeeee] bg-white/95 p-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,.12)] backdrop-blur md:hidden">
        <div className="min-w-0">
          <span className="block text-[9px] font-black uppercase text-[#777]">PRANCHA DE FLEXÕES</span>
          <strong className="block text-base leading-none text-[#111]">{formatKz(PRODUCT.price)}</strong>
        </div>
        <button onClick={buy} className="ml-auto h-11 rounded-xl bg-[#e11d48] px-5 text-xs font-black text-white shadow-lg">
          ENCOMENDAR
        </button>
      </div>

      <footer className="border-t border-[#eeeeee] px-5 py-8 text-center text-xs text-[#777]">
        AlexBaza — equipa o teu treino.
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
