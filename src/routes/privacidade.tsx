import { createFileRoute, Link } from "@tanstack/react-router";

const title = "Política de Privacidade | AURELIS";
const description =
  "Como a AURELIS recolhe e protege os dados pessoais usados para confirmar e entregar os pedidos com pagamento na entrega.";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="shell py-10">
      <h1 className="font-display text-2xl font-bold">Política de Privacidade</h1>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Recolhemos apenas os dados necessários para processar e entregar a encomenda: nome,
          telefone e endereço de entrega.
        </p>
        <h2 className="font-display text-base font-semibold text-foreground">Utilização</h2>
        <p>
          Os dados são utilizados exclusivamente para confirmar o pedido, organizar a entrega e
          prestar apoio ao cliente. Nunca são vendidos a terceiros.
        </p>
        <h2 className="font-display text-base font-semibold text-foreground">Acesso</h2>
        <p>
          Só a equipa administrativa da AURELIS tem acesso aos pedidos. Nenhum cliente consegue
          consultar os dados de outro cliente.
        </p>
        <h2 className="font-display text-base font-semibold text-foreground">Remoção</h2>
        <p>
          Pode solicitar a remoção dos seus dados a qualquer momento através do contacto telefónico
          utilizado na encomenda.
        </p>
      </div>
      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
        ← Voltar à loja
      </Link>
    </main>
  );
}
