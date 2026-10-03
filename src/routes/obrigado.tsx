import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
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
          📱 Mantenha o telefone disponível para confirmarmos a entrega.
        </p>
      </div>
    </div>
  );
}
