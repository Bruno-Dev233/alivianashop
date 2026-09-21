import { Link } from "@tanstack/react-router";

export function Footer({ storeName }: { storeName: string }) {
  return (
    <footer className="mt-12 border-t border-border bg-secondary/50">
      <div className="shell flex flex-col items-center gap-2 py-7 text-center">
        <span className="font-display text-base font-bold tracking-tight text-gradient-brand">
          {storeName}
        </span>
        <p className="text-xs text-muted-foreground">
          © 2026 {storeName} — Comércio Electrónico
        </p>
        <nav className="flex gap-4 text-xs font-medium text-muted-foreground">
          <Link to="/termos" className="hover:text-primary">
            Termos e Condições
          </Link>
          <Link to="/privacidade" className="hover:text-primary">
            Política de Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}
