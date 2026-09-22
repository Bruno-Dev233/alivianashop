import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
};

export function QuantityStepper({ value, onChange, max = 10, min = 1 }: Props) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background p-1 shadow-soft">
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="grid size-10 place-items-center rounded-full text-foreground transition hover:bg-muted disabled:opacity-40"
      >
        <Minus className="size-4" />
      </button>
      <span aria-live="polite" className="w-10 text-center font-display text-base font-bold">
        {value}
      </span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="grid size-10 place-items-center rounded-full text-foreground transition hover:bg-muted disabled:opacity-40"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
