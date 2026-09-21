export type Product = {
  id: string;
  name: string;
  price: number;
  old_price: number | null;
  cost_price: number;
  description: string | null;
  social_proof_text: string;
  top_bar_text: string;
  top_bar_text_2: string;
  store_name: string;
  logo_url: string | null;
  main_image_1: string | null;
  main_image_2: string | null;
  main_image_3: string | null;
  content_image_1: string | null;
  content_image_2: string | null;
  content_image_3: string | null;
  content_image_4: string | null;
};

export type Order = {
  id: string;
  order_number: number;
  product_id: string | null;
  product_name: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  quantity: number;
  unit_price: number;
  unit_cost: number;
  total_price: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export type StatusHistory = {
  id: string;
  order_id: string;
  old_status: string | null;
  new_status: string;
  created_at: string;
};

export const ORDER_STATUSES = [
  "NOVO",
  "CONFIRMADO",
  "EM PREPARACAO",
  "ENVIADO",
  "ENTREGUE",
  "CANCELADO",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  NOVO: "Novo",
  CONFIRMADO: "Confirmado",
  "EM PREPARACAO": "Em preparação",
  ENVIADO: "Enviado",
  ENTREGUE: "Entregue",
  CANCELADO: "Cancelado",
};

export const STATUS_CLASSES: Record<OrderStatus, string> = {
  NOVO: "bg-info/12 text-info border-info/30",
  CONFIRMADO: "bg-primary/12 text-primary border-primary/30",
  "EM PREPARACAO": "bg-warning/15 text-warning-foreground border-warning/40",
  ENVIADO: "bg-accent text-accent-foreground border-primary/25",
  ENTREGUE: "bg-success/15 text-success border-success/35",
  CANCELADO: "bg-destructive/10 text-destructive border-destructive/30",
};

export function formatKz(value: number): string {
  return `${new Intl.NumberFormat("pt-AO", { maximumFractionDigits: 0 }).format(value)} Kz`;
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function productImages(product: Product): string[] {
  return [product.main_image_1, product.main_image_2, product.main_image_3].filter(
    (url): url is string => Boolean(url),
  );
}

export function contentImages(product: Product): string[] {
  return [
    product.content_image_1,
    product.content_image_2,
    product.content_image_3,
    product.content_image_4,
  ].filter((url): url is string => Boolean(url));
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}
