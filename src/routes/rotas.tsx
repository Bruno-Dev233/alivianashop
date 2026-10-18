import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink, Package, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/rotas")({
  head: () => ({
    meta: [
      { title: "Mapa de Rotas | AURELIS" },
      { name: "description", content: "Índice das páginas e rotas disponíveis na plataforma AURELIS." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RouteDirectoryPage,
});

const productRoutes = [
  { path: "/", name: "Massageador Shiatsu", description: "Landing page principal da loja" },
  { path: "/aparador-sobrancelhas", name: "Aparador de Sobrancelhas", description: "Aparador elétrico 2 em 1" },
  { path: "/aqua-go", name: "Aqua Go", description: "Chuveiro portátil" },
  { path: "/aurelis-relaxpro", name: "AURELIS RELAXPRO", description: "Produto de massagem e relaxamento" },
  { path: "/aurelis-cloudrest", name: "AURELIS CloudRest", description: "Poltrona puff insuflável" },
  { path: "/auxiliador-partida", name: "Auxiliador de Partida 4 em 1", description: "Equipamento automóvel" },
  { path: "/celimax-retinal-shot", name: "Celimax Retinal Shot", description: "Produto de cuidados da pele" },
  { path: "/depilador-eletrico", name: "Depilador Elétrico", description: "Landing page de produto" },
  { path: "/dispensador-sabao-espuma", name: "Dispensador de Sabão", description: "Dispensador automático de espuma" },
  { path: "/dry-step-pro", name: "DRYSTEP PRO", description: "Secador elétrico de sapatos" },
  { path: "/freshmix-pro", name: "FreshMix Pro 4 em 1", description: "Máquina portátil para sumos" },
  { path: "/irrigador-bucal", name: "Irrigador Bucal", description: "Higiene oral" },
  { path: "/lancheira-eletrica", name: "Lancheira Elétrica", description: "Lancheira para refeições" },
  { path: "/lava-jato-ultra", name: "HydroForce / Lava-Jato Ultra", description: "Lavadora de pressão portátil" },
  { path: "/prancha-flexoes", name: "Prancha de Flexões", description: "Equipamento de treino" },
];

const informationRoutes = [
  { path: "/obrigado", name: "Página de agradecimento", description: "Confirmação de encomenda; pode exigir parâmetros de pesquisa" },
  { path: "/privacidade", name: "Política de Privacidade", description: "Informação de privacidade" },
  { path: "/termos", name: "Termos e Condições", description: "Condições de utilização" },
];

const adminRoutes = [
  { path: "/admin", name: "Painel principal", description: "Visão geral administrativa" },
  { path: "/admin/login", name: "Login administrativo", description: "Entrada na área administrativa" },
  { path: "/admin/pedidos", name: "Pedidos", description: "Gestão de encomendas" },
  { path: "/admin/financas", name: "Finanças", description: "Indicadores financeiros" },
  { path: "/admin/rastreamento", name: "Rastreamento", description: "Visitantes e atividade" },
  { path: "/admin/aqua-go", name: "Gestão Aqua Go", description: "Configuração específica do produto" },
  { path: "/admin/product", name: "Gestão de produto", description: "Dados e configuração de produto" },
  { path: "/admin/mais", name: "Mais opções", description: "Ferramentas administrativas adicionais" },
  { path: "/admin/landing", name: "Gestão de landing pages", description: "Lista de landing pages dinâmicas" },
  { path: "/admin/landing/:slug", name: "Landing page por slug", description: "Rota dinâmica: substituir :slug pelo identificador" },
];

function RouteDirectoryPage() {
  return (
    <main className="min-h-screen bg-[#F3F0E7] px-4 py-8 text-[#20392F] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#456354] hover:underline">
          <ArrowLeft className="size-4" /> Voltar à loja
        </a>

        <header className="mt-6 rounded-3xl bg-[#20392F] p-6 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#D6CDAE]">AURELIS · Mapa do projeto</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Todas as rotas num só lugar</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Índice de páginas registadas no projeto. Abre qualquer rota para verificar a página correspondente. As rotas administrativas continuam sujeitas às proteções de acesso já existentes.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
            <span className="rounded-full bg-white/10 px-3 py-2">{productRoutes.length} páginas de produto</span>
            <span className="rounded-full bg-white/10 px-3 py-2">{informationRoutes.length} páginas informativas</span>
            <span className="rounded-full bg-white/10 px-3 py-2">{adminRoutes.length} rotas administrativas</span>
          </div>
        </header>

        <RouteSection title="Páginas de produtos" subtitle="Landing pages públicas" icon={<Package className="size-5" />} routes={productRoutes} />
        <RouteSection title="Páginas informativas" subtitle="Páginas de apoio e políticas" icon={<ExternalLink className="size-5" />} routes={informationRoutes} />
        <RouteSection title="Área administrativa" subtitle="O acesso continua protegido pelas regras existentes" icon={<ShieldCheck className="size-5" />} routes={adminRoutes} />

        <footer className="mt-10 border-t border-[#D8D9CE] pt-5 text-xs leading-relaxed text-[#5D665E]">
          Este índice facilita a navegação e a verificação das rotas; não altera permissões, checkout COD, dashboard, preços ou regras de encomenda.
        </footer>
      </div>
    </main>
  );
}

function RouteSection({
  title,
  subtitle,
  icon,
  routes,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  routes: { path: string; name: string; description: string }[];
}) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-white text-[#20392F] shadow-sm">{icon}</span>
        <div>
          <h2 className="text-xl font-black sm:text-2xl">{title}</h2>
          <p className="mt-0.5 text-sm text-[#626A62]">{subtitle}</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <a
            key={route.path}
            href={route.path.replace(":slug", "exemplo")}
            className="group rounded-2xl border border-[#D8D9CE] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#20392F] hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-black text-[#20392F]">{route.name}</h3>
              <ExternalLink className="mt-0.5 size-4 shrink-0 text-[#879087] transition group-hover:text-[#20392F]" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#60675F]">{route.description}</p>
            <p className="mt-3 break-all rounded-lg bg-[#F3F0E7] px-2.5 py-2 font-mono text-xs text-[#3F5A4B]">{route.path}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
