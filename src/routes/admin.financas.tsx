import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import { AdminShell } from "@/components/aurelis/AdminShell";
import { PeriodFilter } from "@/components/aurelis/PeriodFilter";
import { useOrders } from "@/hooks/useAdminOrders";
import { computeMetrics, inRange, periodRange, type Period } from "@/lib/admin-data";
import { formatKz } from "@/lib/aurelis";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/financas")({
  head: () => ({
    meta: [
      { title: "Finanças | AURELIS Gestão" },
      { name: "description", content: "Receita bruta, custos, lucro e saldo disponível da AURELIS." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Finanças | AURELIS Gestão" },
      {
        property: "og:description",
        content: "Receita bruta, custos, lucro e saldo disponível da AURELIS.",
      },
    ],
  }),
  component: () => (
    <AdminShell title="Finanças">
      <FinancePage />
    </AdminShell>
  ),
});

function FinancePage() {
  const { data: orders = [], isLoading } = useOrders();
  const [period, setPeriod] = useState<Period>("mensal");
  const [customDate, setCustomDate] = useState(() => new Date().toISOString().slice(0, 10));

  const range = useMemo(() => periodRange(period, customDate), [period, customDate]);
  const scoped = useMemo(() => orders.filter((o) => inRange(o, range)), [orders, range]);
  const metrics = useMemo(() => computeMetrics(scoped), [scoped]);

  const cards = [
    { label: "Receita Bruta", value: formatKz(metrics.grossRevenue), accent: true },
    { label: "Custos", value: formatKz(metrics.productCost), accent: false },
    { label: "Receita Líquida (Lucro)", value: formatKz(metrics.netRevenue), accent: true },
    { label: "Saldo Disponível (entregues)", value: formatKz(metrics.availableBalance), accent: true },
  ];

  const report = [
    { label: "Vendas", value: formatKz(metrics.grossRevenue) },
    { label: "Custo dos produtos", value: formatKz(metrics.productCost) },
    { label: "Lucro", value: formatKz(metrics.netRevenue) },
    { label: "Pedidos entregues", value: String(metrics.delivered) },
    { label: "Pedidos cancelados", value: String(metrics.cancelled) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Finanças</h2>
        <p className="text-sm text-muted-foreground">Resultado do período seleccionado</p>
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
            {cards.map((card) => (
              <div
                key={card.label}
                className={cn(
                  "rounded-2xl border bg-card p-4 shadow-soft",
                  card.accent ? "border-success/30" : "border-border",
                )}
              >
                <p className="text-xs font-semibold text-muted-foreground">{card.label}</p>
                <p
                  className={cn(
                    "mt-2 font-display text-xl font-bold sm:text-2xl",
                    card.accent ? "text-success" : "text-foreground",
                  )}
                >
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h3 className="font-display text-lg font-bold">Relatório financeiro</h3>
            <dl className="mt-4 divide-y divide-border text-sm">
              {report.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">
              O saldo disponível considera apenas o lucro de pedidos com estado ENTREGUE.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
