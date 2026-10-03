import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  large?: boolean;
};

export function QuantityStepper({ value, onChange, max = 10, min = 1, large = false }: Props) {
  return (
    <div
      className={`inline-flex items-center rounded-full border bg-background shadow-soft ${large ? "border-2 border-foreground/70 p-1.5" : "border-border p-1"}`}
    >
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`grid place-items-center rounded-full text-foreground transition hover:bg-muted disabled:opacity-40 ${large ? "size-12" : "size-10"}`}
      >
        <Minus className={large ? "size-5" : "size-4"} />
      </button>
      <span
        aria-live="polite"
        className={`${large ? "w-12 text-xl" : "w-10 text-base"} text-center font-display font-bold`}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`grid place-items-center rounded-full text-foreground transition hover:bg-muted disabled:opacity-40 ${large ? "size-12" : "size-10"}`}
      >
        <Plus className={large ? "size-5" : "size-4"} />
      </button>
    </div>
  );
}
