import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import secao1 from "@/assets/secao-1.jpg.asset.json";
import secao2 from "@/assets/secao-2.jpg.asset.json";
import secao3 from "@/assets/secao-3.jpg.asset.json";

type Section = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  text: string;
};

const sections: Section[] = [
  {
    image: secao1.url,
    eyebrow: "💆‍♂️ Relaxamento",
    title: "🌿 RELAXE COMO VOCÊ MERECE!",
    text: "Alivie a sensação de tensão e desfrute de uma massagem confortável no conforto da sua casa. 💆‍♀️✨",
  },
  {
    image: secao2.url,
    eyebrow: "💆 Bem-estar diário",
    title: "ADEUS, TENSÃO. OLÁ, RELAXAMENTO!",
    text: "O Massageador Shiatsu proporciona uma experiência de massagem inspirada no movimento das mãos, perfeita para depois de um dia cansativo. 😌❤️",
  },
  {
    image: secao3.url,
    eyebrow: "❤️ Cuide mais de você",
    title: "Não espere o corpo pedir descanso",
    subtitle: "Reserve minutos só para si",
    text: "Reserve alguns minutos do seu dia para relaxar, recuperar o conforto e aproveitar uma sensação agradável de bem-estar.",
  },
];

export function StorySections({ onBuy }: { onBuy: () => void }) {
  return (
    <div className="mt-10 space-y-10 sm:space-y-14">
      {sections.map((section, i) => (
        <section
          key={section.title}
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-card sm:grid sm:grid-cols-2 sm:items-center"
        >
          <div
            className={cn(
              "bg-background",
              i % 2 === 1 ? "sm:order-2" : "sm:order-1",
            )}
          >
            <img
              src={section.image}
              alt={section.title}
              className="aspect-4/3 w-full object-cover sm:aspect-square"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            className={cn(
              "p-5 sm:p-8",
              i % 2 === 1 ? "sm:order-1" : "sm:order-2",
            )}
          >
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              {section.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-xl font-bold leading-tight sm:text-2xl">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mt-1 text-sm font-semibold text-primary">{section.subtitle}</p>
            )}
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {section.text}
            </p>

            <Button
              type="button"
              onClick={onBuy}
              variant="ghost"
              className="mt-5 h-14 w-full rounded-2xl bg-ink text-base font-bold text-ink-foreground shadow-ink transition-transform hover:bg-ink/90 hover:text-ink-foreground active:scale-[0.98] sm:w-auto sm:px-8"
            >
              COMPRAR AGORA
            </Button>
            <p className="mt-2 text-center text-xs font-medium text-primary sm:text-left">
              Frete grátis · Pague na entrega
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
