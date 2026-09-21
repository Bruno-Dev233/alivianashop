import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import mariana from "@/assets/depoimento-mariana.png.asset.json";
import anaPaula from "@/assets/depoimento-anapaula.png.asset.json";
import carla from "@/assets/depoimento-carla.png.asset.json";

type Testimonial = {
  image: string;
  title: string;
  name: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    image: mariana.url,
    title: "✨ As manchas das minhas espinhas ficaram menos visíveis",
    name: "Mariana dos Santos — Luanda, Angola",
    text: "Eu tinha marcas de acne principalmente nas bochechas e testa. Comecei a usar o 345 Relief Cream na minha rotina e, com o uso contínuo, notei a pele mais hidratada e uniforme, com as manchas pós-acne menos aparentes.",
  },
  {
    image: anaPaula.url,
    title: "✨ Minha pele ficou mais confortável e hidratada",
    name: "Ana Paula António — Benguela, Angola",
    text: "Eu tinha espinhas frequentes e muitas marcas que ficavam depois. Gostei do creme porque não senti aquela textura pesada na pele e, depois de algumas semanas, percebi uma melhora na aparência das manchas e na textura da pele.",
  },
  {
    image: carla.url,
    title: "✨ O que mais me incomodava eram as marcas de acne",
    name: "Carla Joaquim — Lubango, Angola",
    text: "Depois das espinhas, ficavam manchas escuras que demoravam a desaparecer. Ao incluir o 345 Relief Cream na minha rotina, senti a pele mais macia e hidratada e comecei a notar as marcas menos evidentes.",
  },
];

export function Testimonials({ onBuy }: { onBuy: () => void }) {
  return (
    <div className="mt-12 space-y-12 sm:space-y-16">
      {testimonials.map((item, i) => (
        <section
          key={item.name}
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow hover:shadow-lg sm:grid sm:grid-cols-2 sm:items-center"
        >
          <div className={cn("bg-background", i % 2 === 1 ? "sm:order-2" : "sm:order-1")}>
            <img
              src={item.image}
              alt={item.name}
              className="block h-auto w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className={cn("p-5 sm:p-8", i % 2 === 1 ? "sm:order-1" : "sm:order-2")}>
            <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-primary">{item.name}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{item.text}</p>

            <Button
              type="button"
              onClick={onBuy}
              variant="ghost"
              className="mt-5 h-14 w-full rounded-2xl bg-ink text-base font-bold text-ink-foreground shadow-ink transition-transform hover:bg-ink/90 hover:text-ink-foreground active:scale-[0.98] sm:w-auto sm:px-8"
            >
              COMPRAR AGORA
            </Button>
          </div>
        </section>
      ))}
    </div>
  );
}
