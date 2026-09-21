import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Clock, CreditCard, Loader2, ShoppingCart, TrendingUp, Wallet } from "lucide-react";

import { AdminShell } from "@/components/aurelis/AdminShell";
import { PeriodFilter } from "@/components/aurelis/PeriodFilter";
import {
  OrderDetailDialog,
  StatusBadge,
  useUpdateOrderStatus,
} from "@/components/aurelis/OrderDetailDialog";
import { useOrders } from "@/hooks/useAdminOrders";
import {
  buildChartData,
  computeMetrics,
  inRange,
  periodRange,
  type Period,
} from "@/lib/admin-data";
import {
  formatDateTime,
  formatKz,
  ORDER_STATUSES,
  STATUS_LABELS,
  type Order,
} from "@/lib/aurelis";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard | AURELIS Gestão" },
      { name: "description", content: "Métricas em tempo real dos pedidos COD da AURELIS." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Dashboard | AURELIS Gestão" },
      {
        property: "og:description",
        content: "Métricas em tempo real dos pedidos COD da AURELIS.",
      },
    ],
  }),
  component: () => (
    <AdminShell title="Dashboard">
      <HomeDashboard />
    </AdminShell>
  ),
});

function HomeDashboard() {
  const { data: orders = [], isLoading, dataUpdatedAt } = useOrders();
  const [period, setPeriod] = useState<Period>("7d");
  const [customDate, setCustomDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selected, setSelected] = useState<Order | null>(null);
  const updateStatus = useUpdateOrderStatus();

  const range = useMemo(() => periodRange(period, customDate), [period, customDate]);
  const scoped = useMemo(() => orders.filter((o) => inRange(o, range)), [orders, range]);
  const metrics = useMemo(() => computeMetrics(scoped), [scoped]);
  const chart = useMemo(() => buildChartData(orders, range), [orders, range]);

  const cards = [
    {
      label: "Receita Bruta",
      value: formatKz(metrics.grossRevenue),
      hint: `↗ ${metrics.total} pedido${metrics.total === 1 ? "" : "s"}`,
      icon: TrendingUp,
      tone: "success" as const,
    },
    {
      label: "Total Pedidos",
      value: String(metrics.total),
      hint: `↗ ${metrics.total} no período`,
      icon: ShoppingCart,
      tone: "ink" as const,
    },
    {
      label: "Receita Líquida",
      value: formatKz(metrics.netRevenue),
      hint: `Lucro após ${formatKz(metrics.productCost)} de custos`,
      icon: Wallet,
      tone: "success" as const,
    },
    {
      label: "Saldo Disponível",
      value: formatKz(metrics.availableBalance),
      hint: `${metrics.delivered} pedido${metrics.delivered === 1 ? "" : "s"} entregue${metrics.delivered === 1 ? "" : "s"}`,
      icon: CreditCard,
      tone: "ink" as const,
    },
  ];

  const recent = scoped.slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Bem-vindo de volta</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
          <Clock className="size-3.5 text-success" />
          Atualizado{" "}
          {dataUpdatedAt
            ? new Date(dataUpdatedAt).toLocaleTimeString("pt-PT", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "agora"}
        </span>
      </div>

      <PeriodFilter
        period={period}
        onPeriodChange={setPeriod}
        customDate={customDate}
        onCustomDateChange={setCustomDate}
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {cards.map(({ label, value, hint, icon: Icon, tone }) => (
              <div
                key={label}
                className="animate-in fade-in rounded-2xl border border-border bg-card p-4 shadow-soft duration-500"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-xl",
                      tone === "success" ? "bg-success/12 text-success" : "bg-sky text-ink",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                </div>
                <p className="mt-2 font-display text-xl font-bold sm:text-2xl">{value}</p>
                <p className="mt-1 text-[11px] font-medium text-success">{hint}</p>
              </div>
            ))}
          </div>

          <section className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <h3 className="font-display text-lg font-bold">Relatório de Vendas</h3>
            <p className="text-xs text-muted-foreground">Faturamento no período</p>
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart} margin={{ left: 4, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="vendas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--success)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--success)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    width={54}
                    tickFormatter={(v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v))}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const point = payload[0]!.payload as { vendas: number; pedidos: number };
                      return (
                        <div className="rounded-xl border border-border bg-card p-3 text-xs shadow-card">
                          <p className="font-bold">{label}</p>
                          <p className="mt-1 text-muted-foreground">
                            Vendas: <span className="font-semibold text-success">{formatKz(point.vendas)}</span>
                          </p>
                          <p className="text-muted-foreground">
                            Pedidos: <span className="font-semibold text-foreground">{point.pedidos}</span>
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="vendas"
                    stroke="var(--success)"
                    strokeWidth={2.5}
                    fill="url(#vendas)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold">Resumo</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {ORDER_STATUSES.map((status) => (
                <div
                  key={status}
                  className="rounded-2xl border border-border bg-card p-3 shadow-soft"
                >
                  <p className="text-[11px] font-semibold text-muted-foreground">
                    {STATUS_LABELS[status]}
                  </p>
                  <p className="font-display text-xl font-bold">{metrics.counts[status]}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-bold">Pedidos Recentes</h3>
              <Link to="/admin/pedidos" className="text-sm font-semibold text-success">
                Ver todos
              </Link>
            </div>
            {recent.length === 0 ? (
              <p className="mt-3 rounded-2xl border border-dashed border-border bg-card py-10 text-center text-sm text-muted-foreground">
                Nenhum pedido neste período.
              </p>
            ) : (
              <div className="mt-3 space-y-2">
                {recent.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelected(order)}
                    className="w-full rounded-2xl border border-border bg-card p-4 text-left shadow-soft transition hover:border-success/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-bold">
                        #AUR-{order.order_number}
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="mt-1 font-semibold">{order.customer_name}</p>
                    <p className="truncate text-xs text-muted-foreground">{order.product_name}</p>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {order.quantity} unidade{order.quantity === 1 ? "" : "s"} ·{" "}
                        {formatDateTime(order.created_at)}
                      </span>
                      <span className="font-bold text-success">
                        {formatKz(Number(order.total_price))}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      <OrderDetailDialog
        order={selected}
        onClose={() => setSelected(null)}
        onStatusChange={(order, status) => {
          void updateStatus(order, status);
          setSelected({ ...order, status });
        }}
      />
    </div>
  );
}
