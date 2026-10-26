import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Loader2, Search } from "lucide-react";

import { AdminShell } from "@/components/aurelis/AdminShell";
import {
  OrderDetailDialog,
  StatusBadge,
  useUpdateOrderStatus,
} from "@/components/aurelis/OrderDetailDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrders } from "@/hooks/useAdminOrders";
import { inRange, periodRange, PERIODS, PERIOD_LABELS, type Period } from "@/lib/admin-data";
import {
  formatDateTime,
  formatKz,
  ORDER_STATUSES,
  STATUS_LABELS,
  type Order,
  type OrderStatus,
} from "@/lib/aurelis";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/pedidos")({
  head: () => ({
    meta: [
      { title: "Pedidos | AURELIS Gestão" },
      { name: "description", content: "Pesquisa e gestão de todos os pedidos COD da AURELIS." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Pedidos | AURELIS Gestão" },
      {
        property: "og:description",
        content: "Pesquisa e gestão de todos os pedidos COD da AURELIS.",
      },
    ],
  }),
  component: () => (
    <AdminShell title="Pedidos">
      <OrdersPage />
    </AdminShell>
  ),
});

function OrdersPage() {
  const { data: orders = [], isLoading } = useOrders();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "TODOS">("TODOS");
  const [period, setPeriod] = useState<Period | "todos">("todos");
  const [selected, setSelected] = useState<Order | null>(null);
  const updateStatus = useUpdateOrderStatus();

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const range = period === "todos" ? null : periodRange(period);
    return orders.filter((order) => {
      if (status !== "TODOS" && order.status !== status) return false;
      if (range && !inRange(order, range)) return false;
      if (!term) return true;
      return (
        order.customer_name.toLowerCase().includes(term) ||
        order.customer_phone.toLowerCase().includes(term) ||
        order.product_name.toLowerCase().includes(term) ||
        String(order.order_number).includes(term)
      );
    });
  }, [orders, search, status, period]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome, telefone, produto ou nº"
            className="h-11 pl-9"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Select value={status} onValueChange={(v) => setStatus(v as OrderStatus | "TODOS")}>
            <SelectTrigger className="h-11 w-full sm:w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos os estados</SelectItem>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-1 rounded-2xl border border-border p-1">
            <button
              onClick={() => setPeriod("todos")}
              className={cn(
                "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                period === "todos"
                  ? "bg-success text-success-foreground"
                  : "text-muted-foreground hover:bg-secondary",
              )}
            >
              Todos
            </button>
            {PERIODS.filter((p) => p !== "data").map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                  period === p
                    ? "bg-success text-success-foreground"
                    : "text-muted-foreground hover:bg-secondary",
                )}
              >
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
          Nenhum pedido encontrado com estes filtros.
        </p>
      ) : (
        <>
          <div className="space-y-2 md:hidden">
            {filtered.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelected(order)}
                className="w-full rounded-2xl border border-border bg-card p-4 text-left shadow-soft"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold">#AUR-{order.order_number}</span>
                  <StatusBadge status={order.status} />
                </div>
                <p className="mt-1 font-semibold">{order.customer_name}</p>
                <p className="text-xs text-muted-foreground">{order.customer_phone}</p>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {order.quantity} unidade{order.quantity === 1 ? "" : "s"}
                  </span>
                  <span className="font-bold text-success">
                    {formatKz(Number(order.total_price))}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDateTime(order.created_at)}
                </p>
                {order.scheduled_delivery_date && <p className="mt-1 text-xs font-semibold text-violet-700">Entrega: {new Date(`${order.scheduled_delivery_date}T12:00:00`).toLocaleDateString("pt-PT", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}</p>}
              </button>
            ))}
          </div>

          <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-soft md:block">
            <table className="w-full text-sm">
              <thead className="bg-secondary/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Produto</th>
                  <th className="px-4 py-3">Qtd</th>
                  <th className="px-4 py-3">Valor</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Data do pedido / entrega</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelected(order)}
                    className="cursor-pointer border-t border-border transition hover:bg-secondary/50"
                  >
                    <td className="px-4 py-3 font-semibold">#AUR-{order.order_number}</td>
                    <td className="px-4 py-3 font-medium">{order.customer_name}</td>
                    <td className="max-w-[16rem] truncate px-4 py-3 text-muted-foreground">
                      {order.product_name}
                    </td>
                    <td className="px-4 py-3">{order.quantity}</td>
                    <td className="px-4 py-3 font-semibold text-success">
                      {formatKz(Number(order.total_price))}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDateTime(order.created_at)}
                      {order.scheduled_delivery_date && <p className="mt-1 font-semibold text-violet-700">Entrega: {new Date(`${order.scheduled_delivery_date}T12:00:00`).toLocaleDateString("pt-PT", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <OrderDetailDialog
        order={selected}
        onClose={() => setSelected(null)}
        onStatusChange={(order, next, scheduledDate) => {
          void updateStatus(order, next, scheduledDate);
          setSelected({ ...order, status: next, ...(scheduledDate !== undefined ? { scheduled_delivery_date: scheduledDate } : {}) });
        }}
      />
    </div>
  );
}
