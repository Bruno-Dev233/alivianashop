import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

type HeaderProps = {
  storeName: string;
  logoUrl?: string | null;
  onOrder?: () => void;
};

export function Header({ storeName, logoUrl, onOrder }: HeaderProps) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur">
      <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`Logo ${storeName}`}
              className="h-10 w-auto object-contain"
              width={120}
              height={40}
            />
          ) : (
            <span className="truncate font-display text-lg font-bold tracking-tight text-gradient-brand">
              {storeName}
            </span>
          )}
        </Link>

        {onOrder ? (
          <Button
            type="button"
            onClick={onOrder}
            variant="ghost"
            className="h-11 shrink-0 rounded-full bg-cyan px-4 text-sm font-bold text-cyan-foreground shadow-cta transition hover:scale-[1.03] hover:bg-cyan/90 hover:text-cyan-foreground sm:px-6 sm:text-base"
          >
            <ShoppingBag className="mr-2 size-5" />
            Encomendar
          </Button>
        ) : (
          <span className="shrink-0 rounded-full border border-primary/25 bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-foreground">
            Pagamento na entrega
          </span>
        )}
      </div>
    </header>
  );
}
