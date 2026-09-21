import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { ordersKey } from "@/lib/admin-data";
import { pushNotification } from "@/lib/admin-notifications";
import { formatKz, type Order } from "@/lib/aurelis";

export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) throw error;
  return (data ?? []) as Order[];
}

export function useOrders() {
  return useQuery({ queryKey: ordersKey, queryFn: fetchOrders });
}

function beep() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch {
    /* som é opcional */
  }
}

/** Assinatura Realtime única para toda a área de gestão. */
export function useOrdersRealtime(soundEnabled = true) {
  const queryClient = useQueryClient();
  const soundRef = useRef(soundEnabled);
  soundRef.current = soundEnabled;

  useEffect(() => {
    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          const order = payload.new as Order;
          queryClient.setQueryData<Order[]>(ordersKey, (prev) =>
            prev ? [order, ...prev.filter((o) => o.id !== order.id)] : [order],
          );
          const value = formatKz(Number(order.total_price));
          pushNotification({
            id: order.id,
            title: "🔔 Novo pedido recebido",
            body: `Novo pedido de ${order.customer_name} — ${value}`,
            createdAt: order.created_at,
          });
          toast.success("🔔 Novo pedido recebido", {
            description: `Você recebeu um novo pedido de ${value}.`,
          });
          if (soundRef.current) beep();
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          const order = payload.new as Order;
          queryClient.setQueryData<Order[]>(ordersKey, (prev) =>
            prev ? prev.map((o) => (o.id === order.id ? order : o)) : [order],
          );
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
