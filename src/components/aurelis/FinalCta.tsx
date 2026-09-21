import { Button } from "@/components/ui/button";

import bg from "@/assets/final-bg.jpg.asset.json";

export function FinalCta({ onBuy }: { onBuy: () => void }) {
  return (
    <section
      className="relative mt-12 min-h-[450px] overflow-hidden rounded-3xl bg-cover bg-center shadow-card sm:min-h-[560px]"
      style={{ backgroundImage: `url(${bg.url})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75" />

      <div className="relative flex min-h-[450px] flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[560px] sm:px-10">
        <h2 className="max-w-xl font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
          ✨ Uma pele com aparência mais uniforme
        </h2>
        <p className="mt-3 font-semibold text-primary">🌸 Mais confiança na própria pele</p>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/85">
          Cuide da sua pele, mantenha uma rotina consistente e transforme alguns minutos do seu dia
          em um momento de autocuidado.
        </p>

        <Button
          type="button"
          onClick={onBuy}
          variant="ghost"
          className="mt-7 h-16 w-full max-w-sm rounded-2xl bg-ink text-base font-bold text-ink-foreground shadow-ink transition-transform hover:bg-ink/90 hover:text-ink-foreground active:scale-[0.98]"
        >
          COMPRAR AGORA
        </Button>
      </div>
    </section>
  );
}
