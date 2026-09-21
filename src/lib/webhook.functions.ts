import { createServerFn } from "@tanstack/react-start";

const WEBHOOK_URL = "https://api.webhooky.app/uaYmKAMXOAEkXiG0VhYcNzj2CPDAhXN1";

export type OrderWebhookPayload = {
  event: string;
  product_name: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  province: string;
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
 * Fire-and-forget notification. Never blocks or fails the order flow.
 */
export const sendOrderWebhook = createServerFn({ method: "POST" })
  .inputValidator((data: OrderWebhookPayload) => data)
  .handler(async ({ data }) => {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          store: "AURELIS",
          payment: { method: "COD", currency: "AOA" },
        }),
      });
    } catch (error) {
      console.error("webhook failed", error);
    }
    return { ok: true };
  });
