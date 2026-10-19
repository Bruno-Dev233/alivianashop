import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, CircleHelp, Droplets, Hand, MessageCircle, PackageCheck, ShieldCheck, Sparkles, Truck, Zap } from "lucide-react";
import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { formatKz, type Product } from "@/lib/aurelis";
import alivianaLogo from "@/assets/aliviana-logo.png";
import dispenserAsset from "@/assets/dispensador-sabao-espuma-main.webp.asset.json";

const PRODUCT = {
  id: "dispensador-sabao-espuma",
  name: "Dispensador de Sabão em Espuma Sensor Automático Sem Toque",
  price: 29999,
  oldPrice: 59998,
  image: dispenserAsset.url,
};

const product: Product = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  old_price: PRODUCT.oldPrice,
  cost_price: 0,
  description: "Dispensador automático de sabão em espuma com sensor sem toque, para uma rotina de higiene mais prática.",
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

const CTA = "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition active:scale-[.98]";

export const Route = createFileRoute("/dispensador-sabao-espuma")({
  head: () => ({
    meta: [
      { title: "Dispensador Automático de Sabão em Espuma | AURELIS" },
      { name: "description", content: "Simplifique a higiene das mãos com um dispensador de sabão em espuma com sensor automático e utilização sem toque. Promoção: 29.999 Kz." },
      { property: "og:title", content: "Dispensador de Sabão em Espuma — Sensor Automático Sem Toque" },
      { property: "og:description", content: "Mais praticidade para lavar as mãos, com dispensa automática de espuma." },
      { property: "og:image", content: `https://lojaurelis.lovable.app${PRODUCT.image}` },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const buy = () => setCheckoutOpen(true);

  const faqs = [
    ["Como funciona o sensor?", "Aproxime as mãos da zona do sensor e o dispensador liberta espuma automaticamente, sem precisar de pressionar um botão."],
    ["Que tipo de sabão devo utilizar?", "Utilize sabonete líquido adequado para dispensadores de espuma. Se o fabricante indicar diluição, siga as instruções do produto e do sabão utilizado."],
    ["Onde posso colocar o dispensador?", "Pode ser uma opção prática para a casa de banho, cozinha ou lavatório do escritório, desde que fique numa superfície estável e protegido de salpicos excessivos."],
    ["Como faço a encomenda?", "Clique em “Encomendar agora”, preencha os seus dados e confirme o pedido. O pagamento é feito na entrega."],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7faf9] text-[#172c2a]">
      <section className="border-b border-[#dbe8e5] bg-[#f7faf9]">
        <div className="px-4 py-3 text-center">
          <p className="text-sm font-black sm:text-base">✨ MAIS PRATICIDADE NA SUA ROTINA DE HIGIENE ✨</p>
        </div>
        <div className="overflow-hidden bg-[#123f3a] py-2.5 text-white">
          <div className="soap-marquee flex w-max whitespace-nowrap">
            <span className="px-5 text-xs font-black sm:text-sm">🫧 SENSOR AUTOMÁTICO • DISPENSA DE ESPUMA SEM TOQUE • PAGAMENTO NA ENTREGA •</span>
            <span className="px-5 text-xs font-black sm:text-sm" aria-hidden="true">🫧 SENSOR AUTOMÁTICO • DISPENSA DE ESPUMA SEM TOQUE • PAGAMENTO NA ENTREGA •</span>
          </div>
        </div>
        <style>{`
          @keyframes soap-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
          .soap-marquee { animation: soap-marquee 19s linear infinite; will-change: transform; }
          @media (prefers-reduced-motion: reduce) { .soap-marquee { animation: none; } }
        `}</style>
      </section>

      <header className="sticky top-0 z-40 border-b border-[#dbe8e5] bg-[#f7faf9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <img src={alivianaLogo} alt="AURELIS" className="h-8 w-auto object-contain sm:h-9" />
          <button onClick={buy} className={CTA + " h-11 bg-[#123f3a] px-5 text-sm text-white shadow-lg hover:bg-[#1c5750]"}>ENCOMENDAR <ArrowRight className="size-4" /></button>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-[#e8f2ef] via-[#f7faf9] to-[#f7faf9] px-4 pb-12 pt-7 sm:pb-16 sm:pt-10">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe2dd] bg-white px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-[#26766b]">HIGIENE INTELIGENTE</span>
              <h1 className="mt-4 text-3xl font-black leading-[1.08] tracking-[-.04em] sm:text-5xl">LAVE AS MÃOS COM MAIS PRATICIDADE 🫧</h1>
              <p className="mt-3 text-lg font-bold leading-snug text-[#26766b] sm:text-2xl">Dispensador de Sabão em Espuma com Sensor Automático — sem toque, sem complicação.</p>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#526763] sm:text-lg">Aproxime as mãos e receba a espuma automaticamente. Uma solução prática para tornar a rotina de higiene mais simples em casa ou no trabalho.</p>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-[#dbe8e5] bg-white p-3 shadow-[0_25px_70px_rgba(18,63,58,.12)] sm:p-6">
              <span className="absolute right-5 top-5 z-10 rounded-full bg-[#d94f45] px-4 py-2 text-sm font-black text-white shadow-lg">-50%</span>
              <img src={PRODUCT.image} alt="Dispensador de sabão em espuma branco com sensor automático" className="aspect-square w-full rounded-[1.5rem] object-contain" />
            </div>

            <div className="mt-5 text-center">
              <h2 className="text-xl font-black leading-tight sm:text-2xl">{PRODUCT.name}</h2>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <span className="text-4xl font-black tracking-tight text-[#123f3a] sm:text-5xl">{formatKz(PRODUCT.price)}</span>
                <span className="text-xl font-bold text-[#7b8985] line-through">{formatKz(PRODUCT.oldPrice)}</span>
              </div>
              <p className="mt-2 text-sm font-bold text-[#26766b]">Promoção de 50% sobre o preço anterior indicado.</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-[#dbe8e5] bg-white p-4"><Hand className="size-6 shrink-0 text-[#26766b]" /><span className="text-sm font-bold">Dispensa sem toque</span></div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#dbe8e5] bg-white p-4"><Droplets className="size-6 shrink-0 text-[#26766b]" /><span className="text-sm font-bold">Espuma na dose certa, conforme o uso</span></div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#dbe8e5] bg-white p-4"><Sparkles className="size-6 shrink-0 text-[#26766b]" /><span className="text-sm font-bold">Bancada mais organizada</span></div>
            </div>

            <div className="mt-9 rounded-3xl border border-[#cfe2dd] bg-white p-5 sm:p-7">
              <div className="flex items-center justify-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[#e5f3ef] text-[#26766b]"><Zap className="size-6" /></span><h2 className="text-xl font-black sm:text-2xl">POR QUE ESCOLHER UM DISPENSADOR AUTOMÁTICO?</h2></div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[["01", "Menos contacto", "A dispensa automática reduz a necessidade de tocar no recipiente durante a utilização."], ["02", "Rotina simples", "Basta aproximar as mãos da área do sensor para ativar a saída de espuma."], ["03", "Várias divisões", "Pode ser usado junto ao lavatório da casa de banho, cozinha ou escritório."], ["04", "Design discreto", "O acabamento branco combina facilmente com diferentes estilos de decoração."]].map(([n, title, text]) => <div key={n} className="flex gap-3 rounded-2xl bg-[#f4f8f6] p-4"><span className="text-sm font-black text-[#68a59b]">{n}</span><div><h3 className="font-black">{title}</h3><p className="mt-1 text-sm leading-6 text-[#526763]">{text}</p></div></div>)}
              </div>
            </div>

            <section className="mt-10 overflow-hidden rounded-[2rem] border border-[#dbe8e5] bg-white p-3 shadow-[0_20px_60px_rgba(18,63,58,.10)] sm:mt-12 sm:p-5">
              <div className="mx-auto max-w-2xl px-2 pb-4 pt-3 text-center sm:pb-6">
                <span className="rounded-full bg-[#e5f3ef] px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#26766b]">BENEFÍCIOS EM DESTAQUE</span>
                <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight sm:text-3xl">MAIS HIGIENE E PRATICIDADE EM CADA UTILIZAÇÃO</h2>
                <p className="mt-2 text-sm leading-6 text-[#526763] sm:text-base">Veja como o sensor automático e o formato compacto podem facilitar a sua rotina.</p>
              </div>
              <img
                src="https://files.catbox.moe/otiv80.png"
                alt="Infográfico com setas a destacar os benefícios do dispensador automático de sabão em espuma: sensor sem toque, espuma, design compacto e janela para ver o nível do líquido."
                loading="lazy"
                className="mx-auto block h-auto w-full max-w-4xl rounded-2xl object-contain"
              />
              <div className="px-2 pb-3 pt-4 text-center sm:pt-5">
                <p className="text-sm font-bold text-[#26766b]">Um pequeno gesto para uma rotina mais prática.</p>
                <button onClick={buy} className={CTA + " mt-4 h-12 w-full bg-[#123f3a] px-5 text-sm text-white hover:bg-[#1c5750] sm:w-auto sm:px-8"}>ENCOMENDAR POR 29.999 KZ <ArrowRight className="size-4" /></button>
              </div>
            </section>

            <a
              href="https://wa.me/244955526741?text=Ol%C3%A1!%20Tenho%20interesse%20em%20adquirir%20o%20Dispensador%20de%20Sab%C3%A3o%20em%20Espuma%20Autom%C3%A1tico%20da%20AURELIS%20por%2029.999%20Kz.%20Quero%20aproveitar%20a%20oferta%20de%20entrega%20gr%C3%A1tis%20nas%20pr%C3%B3ximas%2072%20horas.%20Podem%20confirmar%20a%20disponibilidade%20e%20as%20condi%C3%A7%C3%B5es%20de%20entrega%3F"
              target="_blank"
              rel="noopener noreferrer"
              className={CTA + " mt-3 h-14 w-full border-2 border-[#1fa855] bg-[#e9f8ef] px-5 text-sm text-[#126b36] shadow-sm hover:bg-[#d9f2e3] sm:text-base"}
            >
              <MessageCircle className="size-5" /> QUERO ENTREGA GRÁTIS — FALAR NO WHATSAPP
            </a>
            <p className="mt-2 text-center text-xs font-semibold text-[#526763]">Fale connosco para confirmar a oferta de entrega grátis válida nas próximas 72 horas.</p>
            <button onClick={buy} className={CTA + " mt-6 h-14 w-full bg-[#123f3a] px-7 text-base text-white shadow-xl hover:bg-[#1c5750] sm:text-lg"}>QUERO O MEU DISPENSADOR POR 29.999 KZ <ArrowRight className="size-5" /></button>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold text-[#526763]"><span>💵 Pague apenas ao receber</span><span>🚚 Entrega ao domicílio</span><span>🔒 Encomenda simples</span></div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center"><span className="rounded-full bg-[#e5f3ef] px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#26766b]">COMO UTILIZAR</span><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">3 PASSOS PARA USAR</h2><p className="mt-3 leading-7 text-[#526763]">Uma experiência simples para o dia a dia.</p></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[["1", "Prepare o dispensador", "Encha com o sabão líquido compatível, seguindo as instruções do fabricante."], ["2", "Aproxime as mãos", "Coloque as mãos por baixo do sensor, sem tocar no aparelho."], ["3", "Receba a espuma", "Use a espuma para lavar as mãos e enxague normalmente."]].map(([n, title, text]) => <article key={n} className="rounded-3xl border border-[#dbe8e5] bg-[#f7faf9] p-6"><span className="grid size-10 place-items-center rounded-full bg-[#123f3a] text-lg font-black text-white">{n}</span><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#526763]">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#e8f2ef] px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center"><PackageCheck className="mx-auto size-9 text-[#26766b]" /><h2 className="mt-3 text-3xl font-black sm:text-4xl">PEÇA O SEU COMODAMENTE</h2><p className="mt-3 text-[#526763]">Faça a encomenda online e pague apenas quando receber.</p></div>
            <div className="mt-7 rounded-3xl border border-[#d0e2dd] bg-white p-6 sm:p-8">
              <div className="flex flex-col items-center gap-5 sm:flex-row"><img src={PRODUCT.image} alt="Dispensador automático de sabão em espuma" className="w-full max-w-[220px] object-contain" /><div className="flex-1 text-center sm:text-left"><h3 className="text-xl font-black">Dispensador de Sabão em Espuma</h3><p className="mt-2 text-sm text-[#526763]">Sensor automático • utilização sem toque</p><p className="mt-3 text-3xl font-black text-[#123f3a]">{formatKz(PRODUCT.price)}</p><p className="mt-1 text-sm text-[#7b8985] line-through">{formatKz(PRODUCT.oldPrice)}</p></div></div>
              <div className="mt-5 flex items-center justify-center gap-4"><span className="text-sm font-bold">Quantidade</span><button aria-label="Diminuir quantidade" disabled={quantity <= 1} onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="grid size-10 place-items-center rounded-xl border border-[#dbe8e5] text-xl font-black disabled:opacity-40">−</button><span className="min-w-8 text-center text-lg font-black">{quantity}</span><button aria-label="Aumentar quantidade" disabled={quantity >= 10} onClick={() => setQuantity((q) => Math.min(10, q + 1))} className="grid size-10 place-items-center rounded-xl border border-[#dbe8e5] text-xl font-black disabled:opacity-40">+</button></div>
              <div className="mt-4 text-center"><span className="text-sm text-[#526763]">Total da encomenda</span><p className="text-3xl font-black text-[#123f3a]">{formatKz(PRODUCT.price * quantity)}</p></div>
              <button onClick={buy} className={CTA + " mt-6 h-14 w-full bg-[#123f3a] px-6 text-white hover:bg-[#1c5750]"}>ENCOMENDAR AGORA <ArrowRight className="size-5" /></button>
              <div className="mt-5 grid gap-3 text-sm font-bold text-[#526763] sm:grid-cols-3"><span className="flex items-center justify-center gap-2"><Truck className="size-5" /> Entrega ao domicílio</span><span className="flex items-center justify-center gap-2"><ShieldCheck className="size-5" /> Pagamento na entrega</span><span className="flex items-center justify-center gap-2"><Check className="size-5" /> Pedido simples</span></div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:py-16">
          <div className="mx-auto max-w-4xl"><div className="flex items-center justify-center gap-3"><CircleHelp className="size-7 text-[#26766b]" /><h2 className="text-2xl font-black sm:text-3xl">PERGUNTAS FREQUENTES</h2></div><div className="mt-7 grid gap-4 sm:grid-cols-2">{faqs.map(([question, answer]) => <article key={question} className="rounded-2xl border border-[#dbe8e5] bg-[#f7faf9] p-5"><h3 className="font-black">{question}</h3><p className="mt-2 text-sm leading-6 text-[#526763]">{answer}</p></article>)}</div></div>
        </section>
      </main>

      <div className="h-20 md:hidden" />
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-[#dbe8e5] bg-[#f7faf9]/95 p-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(23,44,42,.12)] backdrop-blur md:hidden">
        <div className="min-w-0"><span className="block text-[9px] font-black uppercase text-[#526763]">DISPENSADOR AUTOMÁTICO</span><strong className="block text-base leading-none">{formatKz(PRODUCT.price)} / un.</strong><span className="text-[10px] text-[#526763]">Total: {formatKz(PRODUCT.price * quantity)}</span></div>
        <a href="https://wa.me/244955526741?text=Ol%C3%A1!%20Tenho%20interesse%20em%20adquirir%20o%20Dispensador%20de%20Sab%C3%A3o%20em%20Espuma%20Autom%C3%A1tico%20da%20AURELIS%20por%2029.999%20Kz.%20Quero%20aproveitar%20a%20oferta%20de%20entrega%20gr%C3%A1tis%20nas%20pr%C3%B3ximas%2072%20horas.%20Podem%20confirmar%20a%20disponibilidade%20e%20as%20condi%C3%A7%C3%B5es%20de%20entrega%3F" target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp sobre entrega grátis" className="flex h-11 shrink-0 items-center justify-center gap-1 rounded-xl border border-[#1fa855] bg-[#e9f8ef] px-3 text-[10px] font-black text-[#126b36]"><MessageCircle className="size-4" /> WHATSAPP</a>
        <button onClick={buy} className="ml-auto h-11 shrink-0 rounded-xl bg-[#123f3a] px-3 text-[10px] font-black text-white">ENCOMENDAR</button>
      </div>
      <footer className="border-t border-[#dbe8e5] px-5 py-8 text-center text-xs text-[#526763]">AURELIS • DISPENSADOR DE SABÃO EM ESPUMA</footer>

      <CheckoutDrawer
        product={product}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        quantity={quantity}
        minQuantity={quantity}
        maxQuantity={quantity}
        onQuantityChange={setQuantity}
        onPlaced={(order) => {
          navigate({
            to: "/obrigado",
            search: { produto: PRODUCT.name, qtd: order.quantity, total: order.total },
          });
        }}
      />
    </div>
  );
}
