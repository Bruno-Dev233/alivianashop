import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BatteryCharging, Check, Gauge, Headphones, Lock, RotateCcw, Shield, ShoppingBag, Star, Truck, Zap } from "lucide-react";

import { CheckoutDrawer } from "@/components/aurelis/CheckoutDrawer";
import { QuantityStepper } from "@/components/aurelis/QuantityStepper";
import { formatKz, type Product } from "@/lib/aurelis";

const PRODUCT = {
  id: "auxiliador-partida-4-em-1",
  name: "Auxiliador de Partida Da Bateria 4 EM 1 - Insuflador de pneus portátil com ecrã digital",
  price: 58998,
  oldPrice: 79999,
  image: "https://files.catbox.moe/d22gyj.jpg",
};
const DESCRIPTION = "🚗 NÃO FIQUE PARADO POR CAUSA DE UM IMPREVISTO! ⚡ O Auxiliador de Partida da Bateria 4 em 1 combina praticidade e potência para estar sempre ao seu lado na estrada. 🔋 Além de auxiliar na partida do veículo, conta com insuflador de pneus portátil e ecrã digital, reunindo funções essenciais num único equipamento compacto. 🛞📱 Ideal para manter no carro e ter à mão quando mais precisar. Esteja preparado para imprevistos e conduza com mais tranquilidade. 🚘🔥";
const discount = "-26%";
const cta = "inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition hover:-translate-y-0.5";

function productData(): Product {
  return {
    id: PRODUCT.id, name: PRODUCT.name, price: PRODUCT.price, old_price: PRODUCT.oldPrice,
    cost_price: 0, description: DESCRIPTION, social_proof_text: "", top_bar_text: "",
    top_bar_text_2: "", store_name: "AURELIS", logo_url: null, main_image_1: PRODUCT.image,
    main_image_2: null, main_image_3: null, content_image_1: null, content_image_2: null,
    content_image_3: null, content_image_4: null,
  };
}

export const Route = createFileRoute("/auxiliador-partida")({
  head: () => ({
    meta: [
      { title: "Auxiliador de Partida 4 em 1 — Aliviana" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: PRODUCT.name },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: PRODUCT.image },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const product = productData();
  const buy = () => setOpen(true);

  const features = [
    [Zap, "PARTIDA DE EMERGÊNCIA", "Tenha um equipamento de apoio quando a bateria do veículo perder força."],
    [Gauge, "INSUFLADOR PORTÁTIL", "Uma solução prática para ajudar a manter os pneus com a pressão adequada."],
    [BatteryCharging, "ECRÃ DIGITAL", "Consulte as informações do equipamento de forma clara e prática."],
    [Shield, "4 EM 1", "Várias funções reunidas num único equipamento para levar no carro."],
  ] as const;

  return (
    <div className="min-h-screen bg-white text-[#101828]">
      <div className="bg-[#e52429] px-3 py-2 text-center text-xs font-bold text-white sm:text-sm">
        🚚 Frete Gratuito • 💵 Pagamento na Entrega • ⚡ Entrega em 12h a 24h
      </div>

      <header className="sticky top-0 z-30 border-b border-[#eee] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <img src={alivianaLogo} alt="Aliviana — Bem-Estar e Leveza" className="h-8 w-auto object-contain sm:h-9" />
          <span className="hidden max-w-sm truncate text-sm font-semibold text-[#667085] md:block">{PRODUCT.name}</span>
          <button onClick={buy} className={`${cta} h-11 bg-[#e52429] px-5 text-sm text-white shadow-md`}><ShoppingBag className="size-4" /> Encomendar Agora</button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 md:grid-cols-2 md:py-14">
        <div className="order-2 md:order-1">
          <span className="inline-flex rounded-full bg-[#fee4e5] px-3 py-1 text-xs font-black tracking-wide text-[#c91d24]">• AUTOMÓVEL</span>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-black leading-[1.02] sm:text-5xl lg:text-6xl">Arranque o seu carro quando mais precisar.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#667085] sm:text-lg">{DESCRIPTION}</p>
          <div className="mt-5 flex items-center gap-2"><span className="flex text-[#f5b800]">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-5 fill-current"/>)}</span><b>4.9</b><span className="text-sm text-[#667085]">• Produto em destaque</span></div>
          <div className="mt-6 flex flex-wrap items-end gap-3"><span className="font-display text-4xl font-black sm:text-5xl">{formatKz(PRODUCT.price)}</span><span className="mb-1 text-lg text-[#98a2b3] line-through">{formatKz(PRODUCT.oldPrice)}</span><span className="mb-2 rounded-full bg-[#e52429] px-2.5 py-1 text-xs font-black text-white">{discount}</span></div>
          <p className="mt-1 text-sm text-[#667085]">Pagamento na entrega. Sem custos adicionais.</p>
          <div className="mt-5 flex max-w-xl flex-col gap-3 sm:flex-row"><QuantityStepper value={qty} onChange={setQty}/><button onClick={buy} className={`${cta} h-14 flex-1 bg-[#e52429] px-6 text-base text-white shadow-xl shadow-red-200`}>🚗 ENCOMENDAR AGORA <ArrowRight className="size-5"/></button></div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#667085]"><span>🔒 Pagamento na Entrega</span><span>🚚 Entrega Garantida</span><span>↩️ 30 Dias de Garantia</span></div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#eaecf0] bg-[#f8fafc] p-4 shadow-2xl sm:p-7">
            <span className="absolute right-5 top-5 z-10 rounded-full bg-[#e52429] px-3 py-2 text-xs font-black text-white">{formatKz(PRODUCT.price)}</span>
            <img src={PRODUCT.image} alt={PRODUCT.name} className="aspect-square w-full rounded-2xl object-cover"/>
            <span className="absolute bottom-7 left-7 rounded-full bg-[#667085] px-3 py-1 text-xs font-bold text-white">4 EM 1</span>
          </div>
        </div>
      </section>

      <section className="border-y border-[#f2f4f7] bg-[#f8fafc]"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 py-7 md:grid-cols-4">
        {[[Truck,"Entrega Rápida","12h a 24h em Luanda"],[BatteryCharging,"Auxilia na Partida","Mais praticidade no carro"],[RotateCcw,"Garantia 30 Dias","Mais tranquilidade"],[Headphones,"Suporte","Estamos disponíveis"]].map(([Icon,title,text])=>{const I=Icon as typeof Truck;return <div key={title as string} className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#fee4e5] text-[#e52429]"><I className="size-5"/></span><div><p className="text-sm font-bold">{title as string}</p><p className="text-xs text-[#667085]">{text as string}</p></div></div>})}
      </div></section>

      <section className="mx-auto max-w-7xl px-4 py-14 text-center">
        <h2 className="font-display text-3xl font-black sm:text-4xl">Por que ter um Auxiliador de Partida 4 em 1?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-[#667085]">Uma solução compacta para estar preparado para situações inesperadas na estrada.</p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{features.map(([Icon,title,text])=>{const I=Icon as typeof Zap;return <div key={title} className="rounded-3xl border border-[#eaecf0] bg-white p-6 text-left shadow-sm"><span className="grid size-12 place-items-center rounded-2xl bg-[#ecfdf3] text-[#16803a]"><I className="size-6"/></span><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#667085]">{text}</p></div>})}</div>
      </section>


      <section className="border-y border-[#f2f4f7] bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:py-16">
          <h2 className="font-display text-3xl font-black leading-tight sm:text-4xl">🎥 VEJA O AUXILIADOR 4 EM 1 EM AÇÃO</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#667085] sm:text-base">Mais praticidade para lidar com imprevistos na estrada, tudo em um único equipamento. 🚗⚡</p>
          <div className="mx-auto mt-8 w-full max-w-3xl">
            <div className="overflow-hidden rounded-[20px] border border-[#eaecf0] bg-black shadow-2xl shadow-[#101828]/15 sm:rounded-[24px]">
              <video
                src="https://files.catbox.moe/sq9fx9.mp4"
                className="aspect-video w-full object-contain"
                controls
                preload="metadata"
                playsInline
              />
            </div>
            <button onClick={buy} className={`${cta} mt-7 h-14 w-full bg-[#e52429] px-6 text-base text-white shadow-xl shadow-red-200 sm:h-16 sm:w-auto sm:px-12 sm:text-lg`}>🚗 QUERO O MEU AGORA <ArrowRight className="size-5"/></button>
            <p className="mt-3 text-xs font-medium text-[#667085]">🔒 Pagamento na Entrega · 🚚 Entrega Garantida</p>
          </div>
        </div>
      </section>

      <section className="bg-black text-white"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div><p className="text-xs font-black tracking-[0.2em] text-[#9be36a]">O QUE ESTÁ INCLUÍDO</p><h2 className="mt-3 font-display text-3xl font-black sm:text-5xl">Tudo o que precisa,<br/>num único produto.</h2><ul className="mt-7 space-y-3 text-sm text-white/85">{["Auxiliador de partida","Insuflador de pneus portátil","Ecrã digital","Design compacto para o carro","Prático para situações de emergência","Equipamento multifuncional 4 em 1"].map(item=><li key={item} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full bg-[#9be36a] text-black"><Check className="size-4"/></span>{item}</li>)}</ul></div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 sm:p-8"><p className="text-xs font-bold tracking-widest text-[#9be36a]">PREÇO ESPECIAL</p><p className="mt-2 font-display text-4xl font-black">{formatKz(PRODUCT.price)}</p><p className="text-sm text-white/45 line-through">{formatKz(PRODUCT.oldPrice)}</p><span className="mt-2 inline-flex rounded-full bg-[#9be36a] px-3 py-1 text-xs font-black text-black">{discount} DE DESCONTO</span><button onClick={buy} className={`${cta} mt-7 h-14 w-full bg-[#9be36a] text-black`}>Encomendar Agora <ArrowRight className="size-5"/></button><p className="mt-3 text-center text-xs text-white/50">🔒 Pagamento na entrega · Sem risco</p></div>
      </div></section>

      <section className="mx-auto max-w-7xl px-4 py-14"><div className="grid items-center gap-8 md:grid-cols-2"><div className="overflow-hidden rounded-3xl bg-[#f8fafc]"><img src={PRODUCT.image} alt="" className="w-full object-cover"/></div><div><span className="text-xs font-black tracking-widest text-[#e52429]">PREPARE-SE PARA O IMPREVISTO</span><h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Não espere ficar parado para perceber que precisava dele.</h2><p className="mt-4 leading-7 text-[#667085]">Ter um equipamento multifuncional no carro pode tornar situações inesperadas mais simples de resolver. Guarde-o no porta-malas e tenha uma ferramenta prática disponível quando precisar.</p><button onClick={buy} className={`${cta} mt-6 bg-[#e52429] px-7 py-4 text-white`}>🚗 QUERO O MEU <ArrowRight className="size-5"/></button></div></div></section>

      <section className="border-y border-[#eaecf0] bg-[#f8fafc]"><div className="mx-auto max-w-7xl px-4 py-14 text-center"><h2 className="font-display text-3xl font-black sm:text-4xl">Uma ferramenta para levar sempre consigo</h2><div className="mx-auto mt-9 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">{[[Zap,"Prático"],[Gauge,"Insuflador"],[BatteryCharging,"Auxiliador"],[Lock,"Compacto"]].map(([Icon,label])=>{const I=Icon as typeof Zap;return <div key={label as string} className="rounded-2xl bg-white p-6 shadow-sm"><I className="mx-auto size-8 text-[#e52429]"/><p className="mt-3 font-bold">{label as string}</p></div>})}</div></div></section>

      <section className="bg-[#176b0b] text-white"><div className="mx-auto max-w-4xl px-4 py-12 text-center"><h2 className="font-display text-3xl font-black sm:text-4xl">Oferta por tempo limitado</h2><p className="mt-2 text-sm">Aproveite a condição especial enquanto estiver disponível.</p><div className="mt-4 flex items-center justify-center gap-3"><span className="text-3xl font-black">{formatKz(PRODUCT.price)}</span><span className="text-sm line-through opacity-70">{formatKz(PRODUCT.oldPrice)}</span></div><button onClick={buy} className={`${cta} mt-6 h-14 bg-white px-10 text-[#176b0b]`}>Encomendar Agora <ArrowRight className="size-5"/></button></div></section>

      <section className="bg-black text-white"><div className="mx-auto max-w-2xl px-4 py-16 text-center"><img src={PRODUCT.image} alt="" className="mx-auto size-24 rounded-2xl object-cover"/><h2 className="mt-6 font-display text-3xl font-black sm:text-4xl">Pronto para estar preparado?</h2><p className="mt-3 text-white/70">Tenha um auxiliar de emergência sempre à mão e conduza com mais tranquilidade.</p><button onClick={buy} className={`${cta} mt-7 h-14 w-full bg-[#9be36a] px-8 text-black sm:w-auto`}>🚗 ENCOMENDAR AGORA <ArrowRight className="size-5"/></button><p className="mt-3 flex items-center justify-center gap-1 text-xs text-white/50"><Lock className="size-3"/> Pagamento na entrega · Sem risco</p></div></section>

      <CheckoutDrawer product={product} open={open} onOpenChange={setOpen} quantity={qty} onQuantityChange={setQty} onPlaced={(order)=>navigate({to:"/obrigado",search:{produto:PRODUCT.name,qtd:order.quantity,total:order.total}})}/>
    </div>
  );
}
