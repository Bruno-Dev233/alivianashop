import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Truck, Wallet, Wind, Zap } from "lucide-react";
import { CheckoutDrawer, type PlacedOrder } from "@/components/aurelis/CheckoutDrawer";
import { OrderSuccessDialog } from "@/components/aurelis/OrderSuccessDialog";
import { formatKz, type Product } from "@/lib/aurelis";

const PRODUCT = {
  id: "aurelis-turbovac",
  name: "AURELIS TURBOVAC™ — Soprador de Folhas Sem Fio",
  price: 32750,
  oldPrice: 74999,
  image: "https://files.catbox.moe/p35b5n.png",
};

const OFFERS = [
  {
    id: "single",
    quantity: 1,
    total: 32750,
    oldTotal: 74999,
    saving: 42249,
    title: "1 UNIDADE",
    label: "A OFERTA ESSENCIAL",
    description: "Uma solução prática para a limpeza do dia a dia.",
    button: "QUERO 1 UNIDADE",
  },
  {
    id: "double",
    quantity: 2,
    total: 59990,
    oldTotal: 149998,
    saving: 90008,
    title: "2 UNIDADES",
    label: "🔥 MAIS POPULAR",
    description: "🔥 2 BATERIAS INCLUÍDAS + A MALA",
    button: "QUERO O PACOTE DE 2",
  },
  {
    id: "triple",
    quantity: 3,
    total: 84990,
    oldTotal: 224997,
    saving: 140007,
    title: "3 UNIDADES",
    label: "MAIOR POUPANÇA",
    description: "Poupe 140.007 Kz e leve 3 unidades mais a solução que precisa.",
    button: "QUERO O PACOTE DE 3",
  },
] as const;

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  // Estimativa provisória: ponto médio do custo informado (15.000–20.000 Kz); ajustar ao custo real.
  cost_price: 17500,
  description: "Soprador sem fios para ajudar a remover folhas, pó e pequenos detritos de áreas exteriores.",
  social_proof_text: "",
  top_bar_text: "💨 AURELIS TURBOVAC™ · 🍃 POTÊNCIA E PRATICIDADE",
  top_bar_text_2: "🚚 ENTREGA EM LUANDA EM ATÉ 12H · 💵 PAGAMENTO NA ENTREGA",
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

const CTA = "inline-flex items-center justify-center gap-2 rounded-xl font-black transition active:scale-[.98]";

const STORIES = [
  {
    src: "https://files.catbox.moe/sz5vfv.mp4",
    title: "POTÊNCIA PARA ENFRENTAR A SUJIDADE 💨",
    text: "Ajude a remover folhas caídas, pó e pequenos detritos de pátios, entradas, quintais e outras áreas exteriores.",
  },
  {
    src: "https://files.catbox.moe/z4j1bo.mp4",
    title: "UM SÓ EQUIPAMENTO, VÁRIAS POSSIBILIDADES",
    text: "Uma opção prática para tarefas de limpeza em casa ou no exterior, sem depender de um cabo de alimentação durante a utilização.",
  },
  {
    src: "https://files.catbox.moe/mdq9dx.mp4",
    title: "SEM FIOS A ATRAPALHAR. MAIS LIBERDADE PARA LIMPAR.",
    text: "O formato sem fios facilita a movimentação entre diferentes zonas. Consulte os acessórios incluídos no kit antes de confirmar a encomenda.",
  },
];

export const Route = createFileRoute("/aurelis-turbovac")({
  head: () => ({
    meta: [
      { title: "AURELIS TURBOVAC™ | Soprador de Folhas Sem Fio" },
      { name: "description", content: "Descubra o AURELIS TURBOVAC™, um soprador sem fios para ajudar na limpeza de folhas e pequenos detritos. Encomenda com pagamento na entrega em Luanda." },
      { property: "og:title", content: "AURELIS TURBOVAC™ | AURELIS" },
      { property: "og:description", content: "Mais praticidade para as tarefas de limpeza em casa e no exterior." },
      { property: "og:image", content: PRODUCT.image },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function TrustBar() {
  const message = "💨 AURELIS TURBOVAC™ · 🍃 POTÊNCIA E PRATICIDADE · 🚚 ENTREGA EM LUANDA EM ATÉ 12H · 💵 PAGAMENTO NA ENTREGA ·";
  return (
    <div className="overflow-hidden bg-[#C92332] py-3 text-white" aria-label={message}>
      <div className="turbovac-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((item) => (
          <span key={item} aria-hidden={item === 1} className="px-5 text-xs font-black tracking-wide sm:text-sm">
            {message} &nbsp; {message} &nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

function Page() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [selectedOfferId, setSelectedOfferId] = useState<(typeof OFFERS)[number]["id"]>("single");
  const [mainImageFailed, setMainImageFailed] = useState(false);
  const [failedStories, setFailedStories] = useState<string[]>([]);
  const selectedOffer = OFFERS.find((offer) => offer.id === selectedOfferId) ?? OFFERS[0];
  const checkoutProduct: Product = {
    ...product,
    name: `${PRODUCT.name} — Pacote de ${selectedOffer.quantity} ${selectedOffer.quantity === 1 ? "unidade" : "unidades"}`,
    price: selectedOffer.total / selectedOffer.quantity,
    old_price: PRODUCT.oldPrice,
  };

  const openCheckout = (offerId?: (typeof OFFERS)[number]["id"]) => {
    if (offerId) setSelectedOfferId(offerId);
    setCheckoutOpen(true);
  };

  const benefits = [
    { icon: Wind, title: "AJUDA A REMOVER FOLHAS E DETRITOS", text: "Uma ajuda prática para manter entradas, pátios e espaços exteriores mais limpos." },
    { icon: Zap, title: "FORMATO SEM FIOS", text: "Movimente-se entre diferentes zonas sem ter de arrastar um cabo de alimentação." },
    { icon: CheckCircle2, title: "PRÁTICO PARA A ROTINA", text: "Uma opção versátil para pequenas tarefas de limpeza em casa e no exterior." },
  ];

  const faqs = [
    ["O que é o AURELIS TURBOVAC™?", "É um soprador sem fios concebido para ajudar a remover folhas, pó e pequenos detritos."],
    ["Como posso encomendar?", "Escolha o pacote, clique no botão de encomenda e preencha o formulário. A equipa poderá contactar-lhe para confirmar os detalhes."],
    ["Quando faço o pagamento?", "O pagamento é feito na entrega, de acordo com as condições confirmadas pela equipa."],
    ["Onde fazem entregas?", "A oferta está configurada para Luanda, com entrega anunciada em até 12 horas. Confirme a disponibilidade da sua zona com a equipa."],
    ["O que está incluído no kit?", "Os acessórios dependem do conjunto fornecido. Para o pacote de 2 unidades, confirme a disponibilidade das 2 baterias e da mala antes de expedir."],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F5F0] pb-20 text-[#191919] sm:pb-0">
      <div className="bg-[#C92332] px-4 py-3 text-center text-xs font-black uppercase tracking-[.12em] text-white sm:text-sm">
        💨 AURELIS TURBOVAC™ <span aria-hidden="true">|</span> 🚚 ENTREGA EM LUANDA EM ATÉ 12H <span aria-hidden="true">|</span> 💵 PAGAMENTO NA ENTREGA
      </div>

      <header className="sticky top-0 z-40 border-b border-[#E8DDD8] bg-[#F8F5F0]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="/aurelis-turbovac" className="text-2xl font-black tracking-[-.06em] text-[#191919] sm:text-3xl" aria-label="AURELIS início">AURELIS</a>
          <span className="hidden rounded-md bg-[#C92332] px-3 py-2 text-xs font-black tracking-[.12em] text-white sm:inline-flex">TURBOVAC™</span>
          <button type="button" onClick={() => openCheckout()} className={`${CTA} min-h-11 bg-[#C92332] px-4 text-xs text-white hover:bg-[#A91E2B] sm:text-sm`}>
            ENCOMENDAR <ArrowRight className="size-4" />
          </button>
        </div>
      </header>

      <TrustBar />
      <style>{`
        @keyframes turbovac-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .turbovac-marquee { animation: turbovac-marquee 27s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .turbovac-marquee { animation: none; } }
      `}</style>

      <main>
        <section className="px-4 pb-12 pt-7 sm:px-6 sm:pb-16 sm:pt-12">
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
            <div className="mx-auto w-full max-w-xl">
              {mainImageFailed ? (
                <div className="grid min-h-[320px] place-items-center p-8 text-center sm:min-h-[440px]">
                  <div>
                    <Wind className="mx-auto size-16 text-[#C92332]" />
                    <p className="mt-4 text-2xl font-black">AURELIS TURBOVAC™</p>
                    <p className="mt-2 text-sm text-[#625A56]">A imagem do produto não carregou. Abra a imagem original para a visualizar.</p>
                    <a href={PRODUCT.image} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-xl bg-[#C92332] px-4 py-3 text-sm font-bold text-white">Ver imagem do produto</a>
                  </div>
                </div>
              ) : (
                <img src={PRODUCT.image} alt="AURELIS TURBOVAC, soprador de folhas sem fios" className="block h-auto w-full object-contain" fetchPriority="high" loading="eager" decoding="async" referrerPolicy="no-referrer" onError={() => setMainImageFailed(true)} />
              )}
            </div>
            <div className="mx-auto w-full max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#C92332]">🍃 Limpeza mais prática</p>
              <h1 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-.045em] sm:text-5xl xl:text-6xl">💨 AURELIS TURBOVAC™ 🍃</h1>
              <p className="mt-4 text-lg leading-relaxed text-[#4C4846] sm:text-xl">Dê mais praticidade à limpeza de folhas, pó e pequenos detritos com um soprador portátil sem fios.</p>

              <div className="mt-5 flex flex-wrap items-center gap-3" aria-label="Preço promocional de uma unidade">
                <span className="text-3xl font-black tracking-tight text-[#191919]">{formatKz(OFFERS[0].total)}</span>
                <span className="text-base font-bold text-[#77716E] line-through">{formatKz(OFFERS[0].oldTotal)}</span>
                <span className="rounded-full bg-[#C92332] px-3 py-1 text-xs font-black text-white">-56% DE DESCONTO</span>
              </div>
              <div id="pacotes" className="mt-3 rounded-2xl border border-[#E8DDD8] bg-white p-4 sm:p-5">
                <p className="text-xs font-black uppercase tracking-[.16em] text-[#C92332]">PAGUE MENOS E LEVE MAIS</p>
                <p className="mt-1 text-sm text-[#625A56]">Escolha o seu pacote:</p>
                <div className="mt-3 space-y-2">
                  {OFFERS.map((offer) => {
                    const selected = selectedOfferId === offer.id;
                    return (
                      <button key={offer.id} type="button" aria-pressed={selected} onClick={() => setSelectedOfferId(offer.id)}
                        className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition ${selected ? "border-[#C92332] bg-[#FFF4F4]" : "border-[#E8DDD8] bg-white hover:border-[#D9A0A5]"}`}>
                        <span className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-[#C92332]" : "border-[#B9B1AD]"}`}>
                          {selected && <span className="size-2.5 rounded-full bg-[#C92332]" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-black">{offer.quantity} {offer.quantity === 1 ? "UNIDADE" : "UNIDADES"}</span>
                            {offer.id === "double" && <span className="rounded-full bg-[#C92332] px-2 py-0.5 text-[10px] font-black text-white">MAIS POPULAR</span>}
                            {offer.id === "triple" && <span className="rounded-full bg-[#191919] px-2 py-0.5 text-[10px] font-black text-white">MAIOR POUPANÇA</span>}
                          </span>
                          <span className="mt-1 block text-xs text-[#625A56]">{offer.id === "double" ? "🔥 2 baterias incluídas + mala" : offer.id === "triple" ? "Melhor poupança para levar 3" : "Oferta essencial"}</span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="block text-base font-black">{formatKz(offer.total)}</span>
                          <span className="block text-[11px] font-semibold text-[#77716E] line-through">{formatKz(offer.oldTotal)}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs font-bold text-[#A91E2B]">Poupe {formatKz(selectedOffer.saving)} nesta oferta</p>
                <button type="button" onClick={() => openCheckout(selectedOffer.id)} className={`${CTA} mt-3 min-h-12 w-full bg-[#C92332] px-5 text-sm text-white shadow-lg shadow-[#C92332]/20 hover:bg-[#A91E2B] sm:text-base`}>
                  ENCOMENDAR — {formatKz(selectedOffer.total)} <ArrowRight className="size-5" />
                </button>
                <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-[#625A56]">
                  <span className="inline-flex items-center gap-1"><Wallet className="size-3.5" /> Paga ao receber</span>
                  <span className="inline-flex items-center gap-1"><Truck className="size-3.5" /> Entrega em até 12h</span>
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5" /> Pedido seguro</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[#C92332] text-white"><Icon className="size-4" /></span>
                    <div><p className="font-black">{title}</p><p className="mt-0.5 text-sm leading-relaxed text-[#5F5956]">{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {STORIES.map((story, index) => (
          <div key={story.src}>
            <TrustBar />
            <section className={`px-4 py-10 sm:px-6 sm:py-16 ${index % 2 === 1 ? "bg-white" : "bg-[#F8F5F0]"}`}>
              <div className={`mx-auto grid max-w-6xl items-center gap-7 md:grid-cols-2 md:gap-12 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="overflow-hidden rounded-[1.7rem] border border-[#E8DDD8] bg-white shadow-[0_18px_55px_rgba(120,20,30,.10)]">
                  {failedStories.includes(story.src) ? (
                    <div className="grid aspect-[4/5] place-items-center bg-[#F8F5F0] p-6 text-center sm:aspect-[5/4]">
                      <div>
                        <Wind className="mx-auto size-12 text-[#C92332]" />
                        <p className="mt-3 font-black">Vídeo indisponível nesta página</p>
                        <p className="mt-1 text-xs text-[#625A56]">Abra o ficheiro original para verificar se está acessível.</p>
                        <a href={story.src} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-lg bg-[#C92332] px-3 py-2 text-xs font-bold text-white">Abrir vídeo</a>
                      </div>
                    </div>
                  ) : (
                    <video className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]" src={story.src} poster={PRODUCT.image} aria-label={story.title} autoPlay muted loop playsInline preload="auto" controls onError={() => setFailedStories((current) => current.includes(story.src) ? current : [...current, story.src])}>
                      <source src={story.src} type="video/mp4" />
                    </video>
                  )}
                </div>
                <div className="py-2 md:py-8">
                  <p className="text-xs font-black uppercase tracking-[.18em] text-[#C92332]">AURELIS TURBOVAC™</p>
                  <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-.03em] sm:text-3xl lg:text-4xl">{story.title}</h2>
                  <p className="mt-4 text-base leading-8 text-[#4D4845] sm:text-lg">{story.text}</p>
                  <button type="button" onClick={() => { document.getElementById("pacotes")?.scrollIntoView({ behavior: "smooth" }); }} className={`${CTA} mt-6 min-h-12 bg-[#C92332] px-5 text-sm text-white hover:bg-[#A91E2B]`}>
                    VER OS PACOTES <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        ))}

        <TrustBar />
        <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-xs font-black uppercase tracking-[.2em] text-[#C92332]">AURELIS TURBOVAC™</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-black tracking-tight sm:text-4xl">Uma ajuda prática para as tarefas de limpeza</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {benefits.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-[#E8DDD8] bg-[#F8F5F0] p-6"><span className="grid size-11 place-items-center rounded-xl bg-[#C92332] text-white"><Icon className="size-5" /></span><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#56504D]">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">DÚVIDAS FREQUENTES</h2>
            <div className="mt-6 divide-y divide-[#E8DDD8] rounded-2xl border border-[#E8DDD8] bg-white px-5">
              {faqs.map(([question, answer]) => (
                <details key={question} className="py-4">
                  <summary className="cursor-pointer font-black">{question}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-[#5F5956]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-12 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#C92332] px-6 py-9 text-center text-white sm:px-12 sm:py-12">
            <p className="text-xs font-black uppercase tracking-[.2em] text-white/80">AURELIS TURBOVAC™</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">💨 Escolha o seu pacote e encomende hoje.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90">Selecione a sua oferta e pague apenas quando receber, após confirmação dos detalhes pela nossa equipa.</p>
            <button type="button" onClick={() => document.getElementById("pacotes")?.scrollIntoView({ behavior: "smooth" })} className={`${CTA} mt-6 min-h-14 bg-white px-6 text-sm text-[#C92332] hover:bg-[#FFF0F1] sm:text-base`}>
              ESCOLHER O MEU PACOTE <ArrowRight className="size-5" />
            </button>
            <a href="https://wa.me/244955526741?text=Ol%C3%A1%2C%20AURELIS!%20Tenho%20d%C3%BAvidas%20sobre%20o%20TURBOVAC%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20oferta%20e%20a%20entrega." target="_blank" rel="noreferrer" className="mx-auto mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/70 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10 sm:text-base">
              <MessageCircle className="size-5" /> TIRAR DÚVIDAS PELO WHATSAPP
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#191919] px-4 py-8 text-center text-sm text-white/80">
        <p className="text-xl font-black tracking-[-.04em] text-white">AURELIS</p>
        <p className="mt-2">Produtos selecionados com qualidade e confiança.</p>
        <p className="mt-1">🇦🇴 🚚 Entrega em Luanda em até 12h · 💵 Pagamento na entrega</p>
        <a className="mt-3 inline-flex font-bold text-white underline" href="https://wa.me/244955526741" target="_blank" rel="noreferrer">Dúvidas? Fale connosco no WhatsApp</a>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8DDD8] bg-[#F8F5F0]/95 p-3 shadow-[0_-8px_30px_rgba(25,25,25,.12)] backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#C92332]">A partir de</p>
            <p className="truncate text-lg font-black leading-tight">{formatKz(OFFERS[0].total)}</p>
            <p className="text-[11px] text-[#686D66] line-through">{formatKz(OFFERS[0].oldTotal)}</p>
          </div>
          <button type="button" onClick={() => document.getElementById("pacotes")?.scrollIntoView({ behavior: "smooth" })} className={`${CTA} min-h-12 shrink-0 bg-[#C92332] px-5 text-xs text-white`}>VER PACOTES <ArrowRight className="size-4" /></button>
        </div>
      </div>

      <CheckoutDrawer
        product={checkoutProduct}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={selectedOffer.quantity}
        onQuantityChange={() => undefined}
        minQuantity={selectedOffer.quantity}
        maxQuantity={selectedOffer.quantity}
        totalPriceOverride={selectedOffer.total}
        onPlaced={setPlaced}
      />
      <OrderSuccessDialog order={placed} onClose={() => setPlaced(null)} />
    </div>
  );
}
