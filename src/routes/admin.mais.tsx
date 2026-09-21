import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  ChevronRight,
  LogOut,
  Settings,
  User,
  Webhook,
} from "lucide-react";

import { AdminShell } from "@/components/aurelis/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { useNotifications } from "@/lib/admin-notifications";

export const Route = createFileRoute("/admin/mais")({
  head: () => ({
    meta: [
      { title: "Mais | AURELIS Gestão" },
      { name: "description", content: "Configurações, notificações e integrações da AURELIS." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Mais | AURELIS Gestão" },
      {
        property: "og:description",
        content: "Configurações, notificações e integrações da AURELIS.",
      },
    ],
  }),
  component: () => (
    <AdminShell title="Mais">
      <MorePage />
    </AdminShell>
  ),
});

function MorePage() {
  const navigate = useNavigate();
  const notifications = useNotifications();

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold">Mais</h2>

      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <Link to="/admin/product" className="flex items-center gap-3 px-4 py-4 hover:bg-secondary/60">
          <Settings className="size-4 text-success" />
          <span className="flex-1 text-sm font-semibold">Configurações do produto</span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>

        <div className="flex items-center gap-3 px-4 py-4">
          <Bell className="size-4 text-success" />
          <span className="flex-1 text-sm font-semibold">Notificações</span>
          <span className="text-xs text-muted-foreground">
            {notifications.length} recente{notifications.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="flex items-start gap-3 px-4 py-4">
          <Webhook className="mt-0.5 size-4 text-success" />
          <div className="flex-1">
            <p className="text-sm font-semibold">Webhooks</p>
            <p className="text-xs text-muted-foreground">
              Integração activa — eventos order.created, order.confirmed, order.preparing,
              order.shipped, order.delivered e order.cancelled.
            </p>
          </div>
        </div>

        <Link to="/admin/financas" className="flex items-center gap-3 px-4 py-4 hover:bg-secondary/60">
          <BarChart3 className="size-4 text-success" />
          <span className="flex-1 text-sm font-semibold">Relatórios</span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>

        <div className="flex items-center gap-3 px-4 py-4">
          <User className="size-4 text-success" />
          <span className="flex-1 text-sm font-semibold">Conta</span>
          <span className="text-xs text-muted-foreground">Administrador</span>
        </div>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            void navigate({ to: "/admin/login" });
          }}
          className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-secondary/60"
        >
          <LogOut className="size-4 text-destructive" />
          <span className="flex-1 text-sm font-semibold text-destructive">Sair</span>
        </button>
      </div>
    </div>
  );
}
