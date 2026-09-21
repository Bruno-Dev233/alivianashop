import { createFileRoute, Link } from "@tanstack/react-router";

const title = "Termos e Condições | AURELIS";
const description =
  "Condições de venda, entrega e pagamento na entrega dos produtos comercializados pela AURELIS em Angola.";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="shell py-10">
      <h1 className="font-display text-2xl font-bold">Termos e Condições</h1>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Ao encomendar na AURELIS, o cliente aceita as condições descritas nesta página. Todos os
          pedidos são confirmados por telefone antes da expedição.
        </p>
        <h2 className="font-display text-base font-semibold text-foreground">Pagamento</h2>
        <p>
          Trabalhamos exclusivamente com pagamento na entrega. Não são efectuados pagamentos online
          nem transferências antecipadas.
        </p>
        <h2 className="font-display text-base font-semibold text-foreground">Entrega</h2>
        <p>
          A entrega é gratuita em todo Angola. O prazo depende da localidade e é comunicado no
          contacto de confirmação do pedido.
        </p>
        <h2 className="font-display text-base font-semibold text-foreground">Cancelamentos</h2>
        <p>
          O pedido pode ser cancelado sem custos até ao momento da expedição, através do contacto
          telefónico usado na confirmação.
        </p>
      </div>
      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
        ← Voltar à loja
      </Link>
    </main>
  );
}
