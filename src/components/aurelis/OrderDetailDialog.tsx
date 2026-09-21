import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { ordersKey } from "@/lib/admin-data";
import {
  formatDateTime,
  formatKz,
  ORDER_STATUSES,
  STATUS_CLASSES,
  STATUS_LABELS,
  type Order,
  type OrderStatus,
  type StatusHistory,
} from "@/lib/aurelis";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
        STATUS_CLASSES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return async (order: Order, status: OrderStatus) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", order.id);
    if (error) {
      toast.error("Não foi possível alterar o estado.");
      return false;
    }
    queryClient.setQueryData<Order[]>(ordersKey, (prev) =>
      prev ? prev.map((o) => (o.id === order.id ? { ...o, status } : o)) : prev,
    );
    toast.success(`Pedido actualizado para ${STATUS_LABELS[status]}.`);

    // Webhooks são enviados apenas no evento de criação do pedido.

    return true;
  };
}

export function OrderDetailDialog({
  order,
  onClose,
  onStatusChange,
}: {
  order: Order | null;
  onClose: () => void;
  onStatusChange: (order: Order, status: OrderStatus) => void;
}) {
  const { data: history = [] } = useQuery({
    queryKey: ["admin", "history", order?.id],
    enabled: Boolean(order),
    queryFn: async (): Promise<StatusHistory[]> => {
      const { data, error } = await supabase
        .from("order_status_history")
        .select("*")
        .eq("order_id", order!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as StatusHistory[];
    },
  });

  const profit = order
    ? (Number(order.unit_price) - Number(order.unit_cost ?? 0)) * order.quantity
    : 0;

  return (
    <Dialog open={Boolean(order)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl">
        {order && (
          <div>
            <div className="flex items-center justify-between gap-3">
              <DialogTitle className="font-display text-lg font-bold">
                Pedido #{order.order_number}
              </DialogTitle>
              <StatusBadge status={order.status} />
            </div>

            <dl className="mt-4 space-y-2 rounded-xl border border-border bg-secondary/50 p-4 text-sm">
              <Row label="Nome" value={order.customer_name} />
              <Row label="Telefone" value={order.customer_phone} />
              <Row label="Endereço / referência" value={order.customer_address} />
              <Row label="Produto" value={order.product_name} />
              <Row label="Quantidade" value={String(order.quantity)} />
              <Row label="Preço unitário" value={formatKz(Number(order.unit_price))} />
              <Row label="Custo fornecedor" value={formatKz(Number(order.unit_cost ?? 0))} />
              <Row label="Lucro previsto" value={formatKz(profit)} />
              <Row label="Total" value={formatKz(Number(order.total_price))} />
              <Row label="Data e hora" value={formatDateTime(order.created_at)} />
              <Row label="Pagamento" value="Na Entrega" />
            </dl>

            <div className="mt-4 space-y-2">
              <p className="text-sm font-semibold">Alterar estado</p>
              <Select
                value={order.status}
                onValueChange={(value) => onStatusChange(order, value as OrderStatus)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="mt-4 h-12 w-full bg-ink text-ink-foreground hover:bg-ink/90" asChild>
              <a href={`tel:${order.customer_phone.replace(/\s/g, "")}`}>
                <Phone className="size-4" />
                Contactar cliente
              </a>
            </Button>

            <div className="mt-5">
              <p className="text-sm font-semibold">Histórico de alterações</p>
              <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                {history.map((entry) => (
                  <li key={entry.id} className="flex justify-between gap-3">
                    <span>
                      {entry.old_status
                        ? `${STATUS_LABELS[entry.old_status as OrderStatus] ?? entry.old_status} → ${STATUS_LABELS[entry.new_status as OrderStatus] ?? entry.new_status}`
                        : `Pedido criado (${STATUS_LABELS[entry.new_status as OrderStatus] ?? entry.new_status})`}
                    </span>
                    <span className="shrink-0">{formatDateTime(entry.created_at)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
