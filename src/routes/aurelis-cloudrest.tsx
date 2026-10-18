import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Armchair, ArrowRight, CheckCircle2, Heart, ShieldCheck, Truck, Wallet, Zap } from "lucide-react";
import { CheckoutDrawer, type PlacedOrder } from "@/components/aurelis/CheckoutDrawer";
import { OrderSuccessDialog } from "@/components/aurelis/OrderSuccessDialog";
import { formatKz, type Product } from "@/lib/aurelis";

const PRODUCT = {
  id: "aurelis-cloudrest",
  name: "AURELIS CloudRest™ — Poltrona Puff Insuflável com Puff para os Pés",
  price: 39999,
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: null,
  cost_price: 0,
  description: "Poltrona puff insuflável com puff para os pés, para momentos de descanso e lazer em casa.",
  social_proof_text: "Entrega grátis para Luanda · Pagamento na entrega",
  top_bar_text: "ENTREGA GRÁTIS PARA LUANDA",
  top_bar_text_2: "✨ MAIS DE 2MIL CLIENTES SATISFEITOS · PAGAMENTO NA ENTREGA",
  store_name: "AURELIS",
  logo_url: null,
  main_image_1: null,
  main_image_2: null,
  main_image_3: null,
  content_image_1: null,
  content_image_2: null,
  content_image_3: null,
  content_image_4: null,
};

const CTA = "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition active:scale-[.98]";
const TRUST_MESSAGE = "ENTREGA GRÁTIS PARA LUANDA 🚚 PAGAMENTO NA ENTREGA ✨ AURELIS CLOUDREST™ — O TEU ESPAÇO DE CONFORTO";

const stories = [
  {
    eyebrow: "O TEU CANTINHO DE CONFORTO",
    title: "🛋️ O TEU CANTINHO DE CONFORTO COMEÇA AQUI",
    text: "Depois de um dia cheio de trabalho, estudo ou tarefas, tudo o que precisas é de um lugar para abrandar o ritmo. A AURELIS CloudRest™ foi pensada para dar um toque especial aos teus momentos de descanso, criando um espaço acolhedor para veres os teus filmes favoritos, leres ou simplesmente aproveitares o teu tempo.",
  },
  {
    eyebrow: "PRATICIDADE PARA O TEU DIA A DIA",
    title: "✨ MAIS LIBERDADE PARA ORGANIZARES O TEU ESPAÇO",
    text: "Queres criar um cantinho de descanso sem apostar numa poltrona tradicional volumosa? O formato insuflável oferece uma alternativa prática para os teus momentos de lazer. Podes esvaziá-la quando precisares de a guardar, conforme as instruções do modelo.",
  },
  {
    eyebrow: "O TEU ESPAÇO, A TUA MANEIRA DE RELAXAR",
    title: "🏡 O TEU ESPAÇO, A TUA MANEIRA DE RELAXAR",
    text: "No quarto, na sala ou naquele cantinho que gostas de chamar teu, a AURELIS CloudRest™ ajuda-te a criar um ambiente dedicado ao lazer. Prepara uma sessão de cinema, joga, lê um livro ou aproveita uma pausa. Porque a tua casa também merece um espaço pensado para ti.",
  },
];

export const Route = createFileRoute("/aurelis-cloudrest")({
  head: () => ({
    meta: [
      { title: "AURELIS CloudRest™ | Poltrona Puff Insuflável" },
      { name: "description", content: "Conhece a AURELIS CloudRest™, uma poltrona puff insuflável com puff para os pés, para momentos de descanso e lazer. Pagamento na entrega." },
      { property: "og:title", content: "AURELIS CloudRest™ | AURELIS" },
      { property: "og:description", content: "O teu espaço de descanso, do teu jeito." },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function TrustBar() {
  return (
    <div className="overflow-hidden bg-[#20392F] py-3 text-white" aria-label={TRUST_MESSAGE}>
      <div className="cloudrest-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((item) => (
          <span key={item} aria-hidden={item === 1} className="px-5 text-xs font-black tracking-wide sm:text-sm">
            {TRUST_MESSAGE} &nbsp; • &nbsp; {TRUST_MESSAGE} &nbsp; • &nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

function VisualPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-[1.7rem] border border-[#D8D9CE] bg-gradient-to-br from-[#E7E1D2] via-[#F8F6F0] to-[#D9D0BE] p-6 text-center shadow-[0_18px_55px_rgba(32,57,47,.12)] sm:aspect-[5/4]">
      <div className="grid size-16 place-items-center rounded-full bg-[#20392F] text-white"><Armchair className="size-8" /></div>
      <p className="mt-4 text-xs font-black uppercase tracking-[.18em] text-[#597164]">AURELIS</p>
      <p className="mt-1 text-2xl font-black text-[#20392F]">CloudRest™</p>
      <p className="mt-2 text-sm text-[#555B54]">{label}</p>
      <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-[#777D75]">Imagem / GIF do produto a inserir</p>
    </div>
  );
}

function Page() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);

  const benefits = [
    { icon: Heart, title: "O TEU CANTINHO DE CONFORTO", text: "Um lugar acolhedor para ver filmes, ler, jogar ou simplesmente descansar." },
    { icon: Zap, title: "FORMATO INSUFLÁVEL", text: "Uma alternativa prática para os teus momentos de lazer, conforme as instruções do modelo." },
    { icon: CheckCircle2, title: "PUFF PARA OS PÉS", text: "Aproveita o conjunto para esticar as pernas e desfrutar dos teus momentos de descanso." },
  ];

  const faqs = [
    ["O que é a AURELIS CloudRest™?", "É uma poltrona puff insuflável com puff para os pés, pensada para momentos de descanso e lazer."],
    ["A bomba de ar vem incluída?", "A inclusão da bomba ainda precisa de ser confirmada para este modelo. Confirma esse detalhe antes de finalizar a encomenda."],
    ["Como posso encomendar?", "Clica num dos botões de encomenda, preenche os teus dados e confirma o pedido. A equipa poderá entrar em contacto para confirmar a entrega."],
    ["A entrega grátis é válida em Luanda?", "A oferta anunciada é entrega grátis para Luanda. Para outras localidades, confirma a disponibilidade e o custo com a equipa AURELIS."],
    ["Quando pago o meu pedido?", "O pagamento é feito na entrega, de acordo com as condições confirmadas pela equipa AURELIS."],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F3F0E7] pb-20 text-[#171A17] sm:pb-0">
      <div className="bg-[#20392F] px-4 py-3 text-center text-xs font-black uppercase tracking-[.12em] text-white sm:text-sm">
        ENTREGA GRÁTIS PARA LUANDA <span aria-hidden="true">|</span> ✨ MAIS DE 2MIL CLIENTES SATISFEITOS
      </div>

      <header className="sticky top-0 z-40 border-b border-[#deddd4] bg-[#F3F0E7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="/aurelis-cloudrest" className="text-3xl font-black tracking-[-.06em] text-[#20392F] sm:text-4xl" aria-label="AURELIS início">AURELIS</a>
          <span className="hidden rounded-md bg-[#20392F] px-3 py-2 text-xs font-black tracking-[.12em] text-white sm:inline-flex">CLOUDREST™</span>
          <button type="button" onClick={() => setCheckoutOpen(true)} className={`${CTA} min-h-11 rounded-lg bg-[#20392F] px-4 text-xs text-white sm:text-sm`}>ENCOMENDAR</button>
        </div>
      </header>

      <TrustBar />
      <style>{`
        @keyframes cloudrest-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cloudrest-marquee { animation: cloudrest-marquee 27s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .cloudrest-marquee { animation: none; } }
      `}</style>

      <main>
        <section className="px-4 pb-12 pt-7 sm:px-6 sm:pb-16 sm:pt-12">
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
            <div className="mx-auto w-full max-w-xl">
              <VisualPlaceholder label="Poltrona puff insuflável com puff para os pés" />
            </div>
            <div className="mx-auto w-full max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#597164]">O teu novo lugar favorito</p>
              <h1 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-.045em] text-[#20392F] sm:text-5xl xl:text-6xl">AURELIS CloudRest™</h1>
              <p className="mt-4 text-lg leading-relaxed text-[#444941] sm:text-xl">A poltrona puff insuflável com puff para os pés que transforma o teu cantinho num espaço de descanso e lazer.</p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-sm font-black text-[#20392F]">ENTREGA GRÁTIS PARA LUANDA</span>
                <span className="text-sm font-semibold text-[#4B514B]">Pagamento na entrega</span>
              </div>
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
                <p className="mt-1 text-2xl font-black text-[#20392F]">{formatKz(PRODUCT.price)}</p>
                <p className="mt-2 text-sm text-[#555B54]">🚚 Entrega grátis para Luanda · 💵 Pagamento na entrega</p>
                <button type="button" onClick={() => setCheckoutOpen(true)} className={`${CTA} mt-4 min-h-14 w-full rounded-xl bg-[#20392F] px-5 text-sm text-white shadow-lg shadow-[#20392F]/20 hover:bg-[#2B4A3D] sm:text-base`}>
                  QUERO A MINHA CLOUDREST <ArrowRight className="size-5" />
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
          <div key={story.eyebrow}>
            <TrustBar />
            <section className={`px-4 py-10 sm:px-6 sm:py-16 ${index % 2 === 1 ? "bg-white" : "bg-[#F3F0E7]"}`}>
              <div className={`mx-auto grid max-w-6xl items-center gap-7 md:grid-cols-2 md:gap-12 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <VisualPlaceholder label={story.eyebrow} />
                <div className="py-2 md:py-8">
                  <p className="text-xs font-black uppercase tracking-[.18em] text-[#597164]">{story.eyebrow}</p>
                  <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-.03em] text-[#20392F] sm:text-3xl lg:text-4xl">{story.title}</h2>
                  <p className="mt-4 text-base leading-8 text-[#4D534C] sm:text-lg">{story.text}</p>
                  <button type="button" onClick={() => setCheckoutOpen(true)} className={`${CTA} mt-6 min-h-12 rounded-xl bg-[#20392F] px-5 text-sm text-white hover:bg-[#2B4A3D]`}>
                    QUERO A MINHA CLOUDREST <ArrowRight className="size-4" />
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
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#D6CDAE]">AURELIS CloudRest™</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">💚 O teu espaço merece conforto.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85">Descobre a AURELIS CloudRest™ e cria o teu próprio cantinho para relaxar, ver filmes, ler ou aproveitar os teus momentos de lazer.</p>
            <p className="mt-5 text-lg font-black">AURELIS CloudRest™ — O teu espaço. O teu conforto. O teu momento.</p>
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
        <p className="mt-1">🇦🇴 Entrega grátis para Luanda · Pagamento na entrega</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D8D9CE] bg-[#F3F0E7]/95 p-3 shadow-[0_-8px_30px_rgba(23,42,34,.12)] backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#597164]">Preço especial</p>
            <p className="truncate text-lg font-black leading-tight text-[#20392F]">{formatKz(PRODUCT.price)}</p>
          </div>
          <button type="button" onClick={() => setCheckoutOpen(true)} className={`${CTA} min-h-12 shrink-0 rounded-xl bg-[#20392F] px-5 text-xs text-white`}>ENCOMENDAR <ArrowRight className="size-4" /></button>
        </div>
      </div>

      <CheckoutDrawer product={product} open={checkoutOpen} onOpenChange={setCheckoutOpen} quantity={1} onQuantityChange={() => undefined} onPlaced={setPlaced} />
      <OrderSuccessDialog order={placed} onClose={() => setPlaced(null)} />
    </div>
  );
}
