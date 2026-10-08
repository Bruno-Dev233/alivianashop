import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  Check,
  Home,
  Loader2,
  LogOut,
  LayoutTemplate,
  RadioTower,
  Menu,
  Package,
  ShoppingCart,
  Wallet,
  MoreHorizontal,
  Moon,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAdminSession } from "@/hooks/useAdminSession";
import { useAdminTheme } from "@/hooks/useAdminTheme";
import { useOrdersRealtime } from "@/hooks/useAdminOrders";
import { markAllRead, useNotifications } from "@/lib/admin-notifications";
import { supabase } from "@/integrations/supabase/client";
import { formatDateTime } from "@/lib/aurelis";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/admin", label: "Início", icon: Home },
  { to: "/admin/financas", label: "Finanças", icon: Wallet },
  { to: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { to: "/admin/product", label: "Produtos", icon: Package },
  { to: "/admin/mais", label: "Mais", icon: MoreHorizontal },
] as const;

/** Barra lateral e menu completo (a barra inferior mantém apenas 5 atalhos). */
const FULL_NAV = [
  { to: "/admin", label: "Início", icon: Home },
  { to: "/admin/financas", label: "Finanças", icon: Wallet },
  { to: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { to: "/admin/product", label: "Produtos", icon: Package },
  { to: "/admin/landing", label: "Landing Pages", icon: LayoutTemplate },
  { to: "/admin/rastreamento", label: "Rastreamento", icon: RadioTower },
  { to: "/admin/mais", label: "Mais", icon: MoreHorizontal },
] as const;


export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const { loading, session, isAdmin } = useAdminSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !session) {
      void navigate({ to: "/admin/login" });
    }
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-card">
          <h1 className="font-display text-lg font-bold">Acesso restrito</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Esta conta não tem permissões de administrador.
          </p>
          <Button className="mt-4 w-full" variant="outline" onClick={() => supabase.auth.signOut()}>
            Terminar sessão
          </Button>
        </div>
      </div>
    );
  }

  return <AdminChrome title={title} pathname={pathname} email={session.user.email ?? ""}>{children}</AdminChrome>;
}

function AdminChrome({
  title,
  pathname,
  email,
  children,
}: {
  title: string;
  pathname: string;
  email: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  useOrdersRealtime();
  const { theme, toggle } = useAdminTheme();
  const notifications = useNotifications();
  const unread = notifications.filter((n) => !n.read).length;
  const [menuOpen, setMenuOpen] = useState(false);

  const signOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/admin/login" });
  };

  const isActive = (to: string) => (to === "/admin" ? pathname === "/admin" : pathname.startsWith(to));

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card px-4 py-5 lg:flex">
        <div className="px-2">
          <p className="font-display text-lg font-bold tracking-tight">AURELIS</p>
          <p className="text-xs text-muted-foreground">Painel de gestão</p>
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {FULL_NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                isActive(to)
                  ? "bg-success/12 text-success"
                  : "text-muted-foreground hover:bg-secondary",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
        <Button variant="outline" className="justify-start" onClick={signOut}>
          <LogOut className="size-4" />
          Sair
        </Button>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-5">
                <SheetTitle className="font-display text-lg">AURELIS</SheetTitle>
                <nav className="mt-4 flex flex-col gap-1">
                  {FULL_NAV.map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                        isActive(to)
                          ? "bg-success/12 text-success"
                          : "text-muted-foreground hover:bg-secondary",
                      )}
                    >
                      <Icon className="size-4" />
                      {label}
                    </Link>
                  ))}
                </nav>
                <Button variant="outline" className="mt-4 w-full" onClick={signOut}>
                  <LogOut className="size-4" />
                  Sair
                </Button>
              </SheetContent>
            </Sheet>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                AURELIS
              </p>
              <h1 className="truncate font-display text-base font-bold leading-tight">{title}</h1>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-label={theme === "dark" ? "Modo claro" : "Modo escuro"}
            >
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>

            <Popover onOpenChange={(open) => open && markAllRead()}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notificações">
                  <Bell className="size-5" />
                  {unread > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-success text-[10px] font-bold text-success-foreground">
                      {unread > 9 ? "9+" : unread}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-sm font-bold">Notificações</p>
                  {notifications.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs text-success">
                      <Check className="size-3" /> lidas
                    </span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                      Sem notificações por agora.
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="border-b border-border px-4 py-3 last:border-0">
                        <p className="text-sm font-semibold">{n.title}</p>
                        <p className="text-xs text-muted-foreground">{n.body}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {formatDateTime(n.createdAt)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success text-sm font-bold text-success-foreground"
                  aria-label="Conta"
                >
                  {(email[0] ?? "A").toUpperCase()}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-60">
                <p className="text-xs text-muted-foreground">Sessão activa</p>
                <p className="truncate text-sm font-semibold">{email}</p>
                <Button variant="outline" className="mt-3 w-full" onClick={signOut}>
                  <LogOut className="size-4" />
                  Sair
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-5 lg:pb-10">{children}</main>
      </div>

      {/* Navegação inferior mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition",
                isActive(to) ? "text-success" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-xl transition",
                  isActive(to) && "bg-success/12",
                )}
              >
                <Icon className="size-4" />
              </span>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
