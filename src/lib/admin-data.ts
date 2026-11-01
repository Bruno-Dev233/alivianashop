import type { Order } from "@/lib/aurelis";

export const ordersKey = ["admin", "orders"] as const;

export const PERIODS = ["hoje", "ontem", "7d", "15d", "mensal", "data"] as const;
export type Period = (typeof PERIODS)[number];

export const PERIOD_LABELS: Record<Period, string> = {
  hoje: "Hoje",
  ontem: "Ontem",
  "7d": "7 Dias",
  "15d": "15 Dias",
  mensal: "Mensal",
  data: "Data",
};

export type Range = { start: Date; end: Date; granularity: "hour" | "day" };

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function periodRange(period: Period, customDate?: string): Range {
  const now = new Date();
  const today = startOfDay(now);

  if (period === "hoje") {
    return { start: today, end: now, granularity: "hour" };
  }
  if (period === "ontem") {
    const start = new Date(today);
    start.setDate(start.getDate() - 1);
    return { start, end: today, granularity: "hour" };
  }
  if (period === "data") {
    const base = customDate ? startOfDay(new Date(`${customDate}T00:00:00`)) : today;
    const end = new Date(base);
    end.setDate(end.getDate() + 1);
    return { start: base, end, granularity: "hour" };
  }
  const days = period === "7d" ? 7 : period === "15d" ? 15 : 30;
  const start = new Date(today);
  start.setDate(start.getDate() - (days - 1));
  return { start, end: now, granularity: "day" };
}

export function inRange(order: Order, range: Range): boolean {
  const t = new Date(order.created_at).getTime();
  return t >= range.start.getTime() && t <= range.end.getTime();
}

export type Metrics = {
  total: number;
  grossRevenue: number;
  productCost: number;
  netRevenue: number;
  availableBalance: number;
  counts: Record<string, number>;
  cancelled: number;
  delivered: number;
};

export function computeMetrics(orders: Order[]): Metrics {
  const valid = orders.filter((o) => o.status !== "CANCELADO");
  const delivered = orders.filter((o) => o.status === "ENTREGUE");
  const grossRevenue = valid.reduce((s, o) => s + Number(o.unit_price) * o.quantity, 0);
  const productCost = valid.reduce((s, o) => s + Number(o.unit_cost ?? 0) * o.quantity, 0);
  const availableBalance = delivered.reduce(
    (s, o) => s + (Number(o.unit_price) - Number(o.unit_cost ?? 0)) * o.quantity,
    0,
  );

  const counts = {
    NOVO: 0,
    CONFIRMADO: 0,
    "EM PREPARACAO": 0,
    ENVIADO: 0,
    ENTREGUE: 0,
    CANCELADO: 0,
  } as Record<OrderStatus, number>;
  for (const order of orders) counts[order.status] = (counts[order.status] ?? 0) + 1;

  return {
    total: valid.length,
    grossRevenue,
    productCost,
    netRevenue: grossRevenue - productCost,
    availableBalance,
    counts,
    cancelled: counts.CANCELADO,
    delivered: delivered.length,
  };
}

export type ChartPoint = { label: string; vendas: number; pedidos: number };

export function buildChartData(orders: Order[], range: Range): ChartPoint[] {
  const valid = orders.filter((o) => o.status !== "CANCELADO" && inRange(o, range));

  if (range.granularity === "hour") {
    const buckets: ChartPoint[] = Array.from({ length: 24 }, (_, h) => ({
      label: `${h}h`,
      vendas: 0,
      pedidos: 0,
    }));
    for (const order of valid) {
      const hour = new Date(order.created_at).getHours();
      const bucket = buckets[hour]!;
      bucket.vendas += Number(order.unit_price) * order.quantity;
      bucket.pedidos += 1;
    }
    return buckets;
  }

  const days: ChartPoint[] = [];
  const index = new Map<string, ChartPoint>();
  const cursor = new Date(range.start);
  while (cursor.getTime() <= range.end.getTime()) {
    const key = cursor.toISOString().slice(0, 10);
    const point: ChartPoint = {
      label: cursor.toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit" }),
      vendas: 0,
      pedidos: 0,
    };
    days.push(point);
    index.set(key, point);
    cursor.setDate(cursor.getDate() + 1);
  }
  for (const order of valid) {
    const key = new Date(order.created_at).toISOString().slice(0, 10);
    const point = index.get(key);
    if (!point) continue;
    point.vendas += Number(order.unit_price) * order.quantity;
    point.pedidos += 1;
  }
  return days;
}

export const STATUS_EVENTS: Record<OrderStatus, string> = {
  NOVO: "order.created",
  CONFIRMADO: "order.confirmed",
  "EM PREPARACAO": "order.preparing",
  ENVIADO: "order.shipped",
  ENTREGUE: "order.delivered",
  CANCELADO: "order.cancelled",
};
