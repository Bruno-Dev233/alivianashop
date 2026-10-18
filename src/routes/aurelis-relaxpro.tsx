import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Heart, ShieldCheck, Star, Truck, Wallet, Zap } from "lucide-react";
import { CheckoutDrawer, type PlacedOrder } from "@/components/aurelis/CheckoutDrawer";
import { OrderSuccessDialog } from "@/components/aurelis/OrderSuccessDialog";
import { formatKz, type Product } from "@/lib/aurelis";
import galeria4 from "@/assets/galeria-4.jpg.asset.json";

const PRODUCT = {
  id: "aurelis-relaxpro",
  name: "AURELIS RELAXPRO™ — Massageador Elétrico de Pescoço e Costas",
  price: 59500,
  oldPrice: 101999,
  image: galeria4.url, // Substituir pela imagem principal específica do RELAXPRO quando estiver disponível no projeto.
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  cost_price: 0,
  description: "Um massageador elétrico pensado para tornar os teus momentos de descanso mais práticos e confortáveis.",
  social_proof_text: "4,8/5 · Mais de 10.000 clientes satisfeitos",
  top_bar_text: "PRODUTOS SELECIONADOS COM CONFIANÇA",
  top_bar_text_2: "ENVIAMOS PARA TODO O TERRITÓRIO NACIONAL 🇦🇴 · COMPRA COM PAGAMENTO NA ENTREGA",
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

const TRUST_MESSAGE =
  "PRODUTOS SELECIONADOS COM CONFIANÇA 🚚 ENVIAMOS PARA TODO O TERRITÓRIO NACIONAL 🇦🇴 🛡️ COMPRA COM PAGAMENTO NA ENTREGA";

const stories = [
  {
    kind: "video",
    src: "https://files.catbox.moe/4yrx6c.mp4",
    alt: "Demonstração do AURELIS RELAXPRO",
    eyebrow: "O TEU MOMENTO DE RELAXAMENTO",
    title: "💆 O TEU MOMENTO DE RELAXAMENTO",
    text: "Deixa a correria do dia a dia de lado e reserva alguns minutos para ti. O AURELIS RELAXPRO foi pensado para tornar os teus momentos de descanso mais confortáveis, sem complicações.",
  },
  {
    kind: "image",
    src: "https://files.catbox.moe/4fm866.png",
    alt: "AURELIS RELAXPRO em destaque",
    eyebrow: "CONFORTO QUE ACOMPANHA A TUA ROTINA",
    title: "✨ CONFORTO QUE ACOMPANHA A TUA ROTINA",
    text: "Depois de um longo dia de trabalho ou de muitas tarefas, desfruta de uma experiência de relaxamento no conforto da tua casa. Simples, prático e pensado para o teu bem-estar diário.",
  },
  {
    kind: "video",
    src: "https://files.catbox.moe/7vhguq.mp4",
    alt: "AURELIS RELAXPRO para momentos de descanso em casa",
    eyebrow: "O TEU BEM-ESTAR, NO TEU ESPAÇO",
    title: "🏡 O TEU BEM-ESTAR, NO TEU ESPAÇO",
    text: "Não precisas de sair de casa para criar um ambiente de descanso. Aproveita o teu tempo livre, relaxa ao teu ritmo e transforma pequenas pausas em momentos dedicados a ti.",
  },
];

export const Route = createFileRoute("/aurelis-relaxpro")({
  head: () => ({
    meta: [
      { title: "AURELIS RELAXPRO™ | O teu momento de bem-estar" },
      { name: "description", content: "Descobre o AURELIS RELAXPRO™, uma forma prática de desfrutar de momentos de relaxamento e conforto em casa. Pagamento na entrega em Angola." },
      { property: "og:title", content: "AURELIS RELAXPRO™ | AURELIS" },
      { property: "og:description", content: "O teu momento de bem-estar, no conforto da tua casa." },
      { property: "og:image", content: PRODUCT.image },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function TrustBar() {
  return (
    <div className="overflow-hidden bg-[#20392F] py-3 text-white" aria-label={TRUST_MESSAGE}>
      <div className="relaxpro-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((item) => (
          <span key={item} aria-hidden={item === 1} className="px-5 text-xs font-black tracking-wide sm:text-sm">
            {TRUST_MESSAGE} &nbsp; • &nbsp; {TRUST_MESSAGE} &nbsp; • &nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

function Page() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const priceReady = PRODUCT.price > 0;

  const benefits = [
    { icon: Heart, title: "MOMENTOS DE RELAXAMENTO", text: "Uma forma prática de incluir uma pausa de conforto na tua rotina." },
    { icon: Zap, title: "PRÁTICO NO DIA A DIA", text: "Pensado para acompanhar os teus momentos de descanso em casa." },
    { icon: CheckCircle2, title: "CONFORTO AO TEU RITMO", text: "Cria espaço para pequenas pausas dedicadas a ti e ao teu bem-estar." },
  ];

  const faqs = [
    ["O que é o AURELIS RELAXPRO™?", "É um massageador elétrico pensado para tornar os momentos de descanso mais práticos e confortáveis."],
    ["Como posso encomendar?", "Clica num dos botões de encomenda, preenche os teus dados e confirma o pedido. A nossa equipa poderá entrar em contacto para confirmar a entrega."],
    ["Quando pago o meu pedido?", "O pagamento é feito na entrega, de acordo com as condições de entrega disponíveis na tua zona."],
    ["Fazem entregas fora de Luanda?", "Sim. Enviamos para todo o território nacional 🇦🇴. A disponibilidade e o prazo são confirmados conforme a tua localização."],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F3F0E7] pb-20 text-[#171A17] sm:pb-0">
      <div className="bg-[#20392F] px-4 py-3 text-center text-xs font-black uppercase tracking-[.12em] text-white sm:text-sm">
        AURELIS — QUALIDADE QUE SE SENTE, CONFORTO QUE SE DESFRUTA
      </div>

      <header className="sticky top-0 z-40 border-b border-[#deddd4] bg-[#F3F0E7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="/aurelis-relaxpro" className="text-3xl font-black tracking-[-.06em] text-[#20392F] sm:text-4xl" aria-label="AURELIS início">AURELIS</a>
          <span className="hidden rounded-md bg-[#20392F] px-3 py-2 text-xs font-black tracking-[.12em] text-white sm:inline-flex">RELAXPRO™</span>
          <button type="button" onClick={() => priceReady && setCheckoutOpen(true)} disabled={!priceReady} className={`${CTA} min-h-11 rounded-lg bg-[#20392F] px-4 text-xs text-white disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm`}>
            {priceReady ? "ENCOMENDAR" : "PREÇO EM BREVE"}
          </button>
        </div>
      </header>

      <TrustBar />
      <style>{`
        @keyframes relaxpro-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .relaxpro-marquee { animation: relaxpro-marquee 27s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .relaxpro-marquee { animation: none; } }
      `}</style>

      <main>
        <section className="px-4 pb-12 pt-7 sm:px-6 sm:pb-16 sm:pt-12">
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
            <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_24px_70px_rgba(32,57,47,.16)] sm:p-5">
              <div className="absolute left-6 top-6 z-10 rounded-full bg-[#20392F] px-4 py-2 text-xs font-black uppercase tracking-wider text-white">AURELIS WELLNESS</div>
              <img src={PRODUCT.image} alt="Massageador elétrico AURELIS RELAXPRO" className="aspect-square w-full rounded-[1.4rem] object-contain" fetchPriority="high" />
            </div>

            <div className="mx-auto w-full max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#597164]">Bem-estar pensado para ti</p>
              <h1 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-.045em] text-[#20392F] sm:text-5xl xl:text-6xl">AURELIS RELAXPRO™</h1>
              <p className="mt-4 text-lg leading-relaxed text-[#444941] sm:text-xl">Descobre uma forma prática de desfrutar de momentos de relaxamento e conforto depois de um dia cheio.</p>

              <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="Avaliação média da AURELIS: 4,8 em 5">
                <span className="flex gap-0.5 text-[#0EAD78]" aria-hidden="true">{[0,1,2,3,4].map((star) => <Star key={star} className="size-5 fill-current" />)}</span>
                <span className="text-sm font-black text-[#20392F]">4,8/5</span>
                <span className="text-sm font-semibold text-[#4B514B]">Mais de 10.000 clientes satisfeitos</span>
              </div>
              <p className="mt-1 text-xs text-[#6C716B]">A confiança dos nossos clientes em todo o território nacional 🇦🇴</p>

              <div className="mt-7 space-y-3">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#20392F] text-white"><Icon className="size-4" /></span>
                    <div><p className="font-black text-[#171A17]">{title}</p><p className="mt-0.5 text-sm leading-relaxed text-[#555B54]">{text}</p></div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#D8D9CE] bg-white/80 p-4 sm:p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-[#20392F]">Preço especial</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-3"><p className="text-2xl font-black text-[#20392F]">{formatKz(PRODUCT.price)}</p><p className="text-base font-semibold text-[#777D75] line-through">{formatKz(PRODUCT.oldPrice)}</p><span className="rounded-full bg-[#E1EEE5] px-3 py-1 text-xs font-black text-[#20392F]">-42% DE DESCONTO</span></div>
                <p className="mt-2 text-sm text-[#555B54]">🚚 Enviamos para todo o território nacional · 💵 Pagamento na entrega</p>
                <button type="button" onClick={() => priceReady && setCheckoutOpen(true)} disabled={!priceReady} className={`${CTA} mt-4 min-h-14 w-full rounded-xl bg-[#20392F] px-5 text-sm text-white shadow-lg shadow-[#20392F]/20 hover:bg-[#2B4A3D] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base`}>
                  {priceReady ? "QUERO O MEU RELAXPRO" : "ENCOMENDAS EM BREVE"} <ArrowRight className="size-5" />
                </button>
                <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-[#566057]">
                  <span className="inline-flex items-center gap-1"><Wallet className="size-3.5" /> Paga ao receber</span>
                  <span className="inline-flex items-center gap-1"><Truck className="size-3.5" /> Entrega ao domicílio</span>
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5" /> Pedido seguro</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {stories.map((story, index) => (
          <div key={story.src}>
            <TrustBar />
            <section className={`px-4 py-10 sm:px-6 sm:py-16 ${index % 2 === 1 ? "bg-white" : "bg-[#F3F0E7]"}`}>
              <div className={`mx-auto grid max-w-6xl items-center gap-7 md:grid-cols-2 md:gap-12 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="overflow-hidden rounded-[1.7rem] border border-[#E5E2D8] bg-white shadow-[0_18px_55px_rgba(32,57,47,.12)]">
                  {story.kind === "video" ? (
                    <video className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]" src={story.src} aria-label={story.alt} autoPlay muted loop playsInline preload="metadata" />
                  ) : (
                    <img className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]" src={story.src} alt={story.alt} loading="lazy" />
                  )}
                </div>
                <div className="py-2 md:py-8">
                  <p className="text-xs font-black uppercase tracking-[.18em] text-[#597164]">{story.eyebrow}</p>
                  <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-.03em] text-[#20392F] sm:text-3xl lg:text-4xl">{story.title}</h2>
                  <p className="mt-4 text-base leading-8 text-[#4D534C] sm:text-lg">{story.text}</p>
                  <button type="button" onClick={() => setCheckoutOpen(true)} className={`${CTA} mt-6 min-h-12 rounded-xl bg-[#20392F] px-5 text-sm text-white hover:bg-[#2B4A3D]`}>
                    DESCOBRIR O RELAXPRO <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        ))}

        <TrustBar />

        <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-xs font-black uppercase tracking-[.2em] text-[#597164]">Conforto no teu ritmo</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-black tracking-tight text-[#20392F] sm:text-4xl">Uma pausa de conforto, sempre que precisares</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {benefits.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-[#E5E5DD] bg-[#F7F5EF] p-6"><span className="grid size-11 place-items-center rounded-xl bg-[#20392F] text-white"><Icon className="size-5" /></span><h3 className="mt-4 font-black text-[#20392F]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#565B54]">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#20392F] px-6 py-9 text-center text-white sm:px-12 sm:py-12">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#D6CDAE]">AURELIS RELAXPRO™</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">💚 O teu conforto merece atenção.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85">Descobre o AURELIS RELAXPRO e dá um novo significado aos teus momentos de descanso.</p>
            <p className="mt-5 text-lg font-black">AURELIS RELAXPRO — O teu momento de bem-estar.</p>
            <button type="button" onClick={() => setCheckoutOpen(true)} className={`${CTA} mt-6 min-h-14 rounded-xl bg-[#F3F0E7] px-6 text-sm text-[#20392F]`}>ENCOMENDAR AGORA · {formatKz(PRODUCT.price)} <ArrowRight className="size-5" /></button>
          </div>
        </section>

        <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-black tracking-tight text-[#20392F] sm:text-4xl">Perguntas frequentes</h2>
            <div className="mt-7 divide-y divide-[#E4E4DC] border-y border-[#E4E4DC]">
              {faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-4 font-bold text-[#20392F] marker:hidden">{question}<span className="float-right ml-3 text-xl group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#555B54]">{answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#172A22] px-4 py-8 text-center text-sm text-white/80">
        <p className="text-xl font-black tracking-[-.04em] text-white">AURELIS</p>
        <p className="mt-2">Produtos selecionados com qualidade e confiança.</p>
        <p className="mt-1">🇦🇴 Entregas em todo o território nacional · Pagamento na entrega</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D8D9CE] bg-[#F3F0E7]/95 p-3 shadow-[0_-8px_30px_rgba(23,42,34,.12)] backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#597164]">Preço especial</p>
            <p className="truncate text-lg font-black leading-tight text-[#20392F]">{formatKz(PRODUCT.price)}</p>
            <p className="text-[11px] text-[#686D66] line-through">{formatKz(PRODUCT.oldPrice)}</p>
          </div>
          <button type="button" onClick={() => setCheckoutOpen(true)} className={`${CTA} min-h-12 shrink-0 rounded-xl bg-[#20392F] px-5 text-xs text-white`}>ENCOMENDAR <ArrowRight className="size-4" /></button>
        </div>
      </div>

      <CheckoutDrawer product={product} open={checkoutOpen} onOpenChange={setCheckoutOpen} quantity={1} onQuantityChange={() => undefined} onPlaced={setPlaced} />
      <OrderSuccessDialog order={placed} onClose={() => setPlaced(null)} />
    </div>
  );
}
