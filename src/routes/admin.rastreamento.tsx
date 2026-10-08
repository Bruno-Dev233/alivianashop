import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, Clock3, ExternalLink, Loader2, RadioTower, ShoppingCart, Users } from "lucide-react";
import { AdminShell } from "@/components/aurelis/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Visitor = {
  session_id: string;
  path: string;
  page_type: "landing" | "checkout";
  product_name: string | null;
  last_seen: string;
};

export const Route = createFileRoute("/admin/rastreamento")({
  head: () => ({ meta: [{ title: "Rastreamento | AURELIS Gestão" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminShell title="Rastreamento">
      <VisitorTrackingPage />
    </AdminShell>
  ),
});

function VisitorTrackingPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    const cutoff = new Date(Date.now() - 90000).toISOString();
    const { data, error: queryError } = await (supabase as any)
      .from("visitor_sessions")
      .select("session_id,path,page_type,product_name,last_seen")
      .gte("last_seen", cutoff)
      .order("last_seen", { ascending: false })
      .limit(500);
    if (queryError) {
      setError("Não foi possível ler os visitantes. Confirme se a migração de rastreamento foi aplicada no Supabase.");
    } else {
      setError("");
      setVisitors((data ?? []) as Visitor[]);
      setLastUpdated(new Date());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), 10000);
    const channel = supabase
      .channel("aurelis-visitor-sessions")
      .on("postgres_changes", { event: "*", schema: "public", table: "visitor_sessions" }, () => void refresh())
      .subscribe();
    return () => {
      window.clearInterval(timer);
      void supabase.removeChannel(channel);
    };
  }, [refresh]);

  const landingVisitors = useMemo(() => visitors.filter((v) => v.page_type !== "checkout"), [visitors]);
  const checkoutVisitors = useMemo(() => visitors.filter((v) => v.page_type === "checkout"), [visitors]);
  const pages = useMemo(() => {
    const counts = new Map<string, number>();
    visitors.forEach((visitor) => {
      const label = visitor.product_name && visitor.page_type === "checkout"
        ? `Checkout · ${visitor.product_name}`
        : visitor.path;
      counts.set(label, (counts.get(label) ?? 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [visitors]);

  const formatTime = (value: string) => new Date(value).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const timeAgo = (value: string) => {
    const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
    return seconds < 60 ? `${seconds}s atrás` : `${Math.floor(seconds / 60)} min atrás`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-success"><span className="size-2 animate-pulse rounded-full bg-success" /> Rastreamento em tempo real</p>
          <h2 className="mt-1 font-display text-2xl font-bold">Visitantes ao vivo</h2>
          <p className="mt-1 text-sm text-muted-foreground">Veja quantas pessoas estão nas landing pages e no formulário de checkout.</p>
        </div>
        <div className="text-xs text-muted-foreground">
          {lastUpdated ? `Actualizado às ${formatTime(lastUpdated.toISOString())}` : "A actualizar…"}
        </div>
      </div>

      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric icon={Users} label="Visitantes activos" value={visitors.length} hint="Últimos 90 segundos" />
        <Metric icon={ExternalLink} label="Nas landing pages" value={landingVisitors.length} hint="A consultar produtos" />
        <Metric icon={ShoppingCart} label="No checkout" value={checkoutVisitors.length} hint="Com o formulário aberto" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div><h3 className="font-display font-bold">Sessões activas</h3><p className="text-xs text-muted-foreground">Actualização automática a cada 10 segundos</p></div>
            <RadioTower className="size-5 text-success" />
          </div>
          {loading ? <div className="flex justify-center py-12"><Loader2 className="size-6 animate-spin text-primary" /></div> : visitors.length === 0 ? (
            <div className="px-4 py-12 text-center"><Users className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 text-sm font-semibold">Ainda não há visitantes activos</p><p className="mt-1 text-xs text-muted-foreground">Abra uma landing page numa nova janela para testar o rastreamento.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/60 text-xs text-muted-foreground"><tr><th className="px-4 py-3">Última actividade</th><th className="px-4 py-3">Página</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3">Visto</th></tr></thead>
                <tbody>{visitors.map((visitor) => <tr key={visitor.session_id} className="border-t border-border">
                  <td className="whitespace-nowrap px-4 py-3">{formatTime(visitor.last_seen)}</td>
                  <td className="max-w-56 truncate px-4 py-3 font-medium">{visitor.product_name && visitor.page_type === "checkout" ? visitor.product_name : visitor.path}</td>
                  <td className="px-4 py-3"><span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", visitor.page_type === "checkout" ? "bg-sky text-ink" : "bg-success/12 text-success")}>{visitor.page_type === "checkout" ? "Checkout" : "Landing page"}</span></td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">{timeAgo(visitor.last_seen)}</td>
                </tr>)}</tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2"><Activity className="size-5 text-success" /><h3 className="font-display font-bold">Páginas com mais visitantes</h3></div>
          <p className="mt-1 text-xs text-muted-foreground">Distribuição das sessões activas</p>
          {pages.length === 0 ? <p className="py-10 text-center text-sm text-muted-foreground">Sem dados para mostrar.</p> : <div className="mt-5 space-y-5">{pages.map(([name, count]) => <div key={name}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm"><span className="truncate">{name}</span><strong>{count}</strong></div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-success transition-all" style={{ width: `${Math.max(5, (count / Math.max(visitors.length, 1)) * 100)}%` }} /></div>
          </div>)}</div>}
          <div className="mt-6 rounded-xl bg-success/10 p-3 text-xs leading-relaxed text-muted-foreground"><Clock3 className="mr-1 inline size-4 text-success" /> Uma sessão é considerada activa enquanto envia sinal nos últimos 90 segundos. O sistema não recolhe nome, telefone ou outros dados pessoais do visitante.</div>
        </section>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, hint }: { icon: typeof Users; label: string; value: number; hint: string }) {
  return <div className="rounded-2xl border border-border bg-card p-4 shadow-soft"><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold text-muted-foreground">{label}</p><span className="flex size-9 items-center justify-center rounded-xl bg-success/12 text-success"><Icon className="size-4" /></span></div><p className="mt-3 font-display text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{hint}</p></div>;
}
