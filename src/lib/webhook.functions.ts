import { createServerFn } from "@tanstack/react-start";

// Server-only destination: Webhooky treats the endpoint URL as its credential.
const WEBHOOK_URL = "https://api.webhooky.app/hx7qxbmnv75vnjhbf11yjgt8";

export type OrderWebhookPayload = {
  event: string;
  product_name: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  province: string;
  municipality?: string;
  neighborhood?: string;
  source?: string;
  landing_page?: string;
  email: string | null;
  reference: string | null;
  quantity: number;
  unit_price: number;
  supplier_cost: number;
  total_price: number;
  estimated_profit: number;
  status: string;
};

/**
 * Sends a Webhooky push after an order has been successfully saved.
 * Notification failures never block or undo the order.
 */
export const sendOrderWebhook = createServerFn({ method: "POST" })
  .inputValidator((data: OrderWebhookPayload) => data)
  .handler(async ({ data }) => {
    try {
      const amount = `${data.total_price.toLocaleString("pt-AO")} Kz`;
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: "🛍️ Nova encomenda AURELIS",
          message: `${data.product_name} · Qtd: ${data.quantity} · Total: ${amount}`,
          sound: "cash_register",
          vibrate: true,
          event: data.event,
          product_name: data.product_name,
          quantity: data.quantity,
          total_price: data.total_price,
          status: data.status,
          timestamp: new Date().toISOString(),
          store: "AURELIS",
          payment: { method: "COD", currency: "AOA" },
        }),
      });

      // Webhooky may return HTTP 200 even when the monthly delivery quota is exhausted.
      const result = await response.json().catch(() => null) as { success?: boolean; reason?: string } | null;
      if (!response.ok || result?.success === false) {
        console.error("Webhooky notification was not delivered", {
          status: response.status,
          reason: result?.reason ?? "unknown",
        });
      }
    } catch (error) {
      console.error("Webhooky notification failed", error);
    }
    return { ok: true };
  });
