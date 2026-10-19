import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import { formatKz } from "@/lib/aurelis";

const search = z.object({
  produto: z.string().optional().catch(undefined),
  qtd: z.coerce.number().optional().catch(undefined),
  total: z.coerce.number().optional().catch(undefined),
});

export const Route = createFileRoute("/obrigado")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Pedido recebido — AURELIS" },
      { name: "description", content: "Obrigado pela sua encomenda. Pagamento na entrega em Luanda." },
      { property: "og:title", content: "Pedido recebido — AURELIS" },
      { property: "og:description", content: "Obrigado pela sua encomenda na AURELIS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  const { produto, qtd, total } = Route.useSearch();

  const [whatsappOrder, setWhatsappOrder] = useState<{
    productName: string;
    quantity: number;
    total: number;
    customerName: string;
    customerPhone: string;
    address: string;
    province: string;
    reference?: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.sessionStorage.getItem("aurelis_whatsapp_order");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.productName === "string") setWhatsappOrder(parsed);
      }
    } catch {
      // Thank-you page remains usable if session storage is unavailable.
    }


  }, [produto, qtd, total]);

  const confirmOnWhatsApp = () => {
    if (!whatsappOrder || typeof window === "undefined") return;
    const message = [
      "Olá! 👋 Quero confirmar a minha encomenda AURELIS.",
      "",
      `📦 Produto: ${whatsappOrder.productName}`,
      `🔢 Quantidade: ${whatsappOrder.quantity}`,
      `💰 Total: ${formatKz(whatsappOrder.total)}`,
      `👤 Nome: ${whatsappOrder.customerName}`,
      `📞 Telefone: ${whatsappOrder.customerPhone}`,
      `📍 Província: ${whatsappOrder.province}`,
      `🏠 Endereço: ${whatsappOrder.address}`,
      whatsappOrder.reference ? `📌 Ponto de referência: ${whatsappOrder.reference}` : "",
      "",
      "💵 Pagamento na entrega.",
      "Por favor, confirmem a minha encomenda. Obrigado!",
    ].filter(Boolean).join("\\n");
    const url = `https://wa.me/244950532879?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const rows: [string, string][] = [
    ["Produto", produto ?? "—"],
    ["Quantidade", qtd ? String(qtd) : "—"],
    ["Total", total ? formatKz(total) : "—"],
    ["Pagamento", "Na entrega"],
    ["Local de entrega", "Luanda"],
  ];
  return (
    <div className="grid min-h-screen place-items-center bg-rose-soft px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-card p-6 text-center shadow-xl sm:p-8">
        <CheckCircle2 className="mx-auto size-14 text-rose" />
        <h1 className="mt-4 font-display text-2xl font-extrabold">🎉 PEDIDO RECEBIDO!</h1>
        <p className="mt-2 font-semibold">Obrigado pela sua encomenda!</p>
        <p className="text-sm text-muted-foreground">Recebemos seu pedido com sucesso.</p>
        <dl className="mt-6 space-y-2 rounded-2xl border border-border p-4 text-left text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 rounded-2xl bg-rose-soft p-3 text-sm font-medium">
          📱 Confirme os dados da sua encomenda pelo WhatsApp para facilitar o acompanhamento.
        </p>
        {whatsappOrder && (
          <button
            type="button"
            onClick={confirmOnWhatsApp}
            className="mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-base font-bold text-white transition hover:bg-[#1fb85a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <MessageCircle className="size-5" />
            Confirmar pedido no WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}
