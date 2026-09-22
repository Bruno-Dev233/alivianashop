import img1 from "@/assets/lancheira-1.jpg.asset.json";
import img2 from "@/assets/lancheira-2.jpg.asset.json";
import img3 from "@/assets/lancheira-3.jpg.asset.json";
import img4 from "@/assets/lancheira-4.avif.asset.json";

export type LandingOffer = {
  quantity: number;
  label: string;
  price: number;
  old: number;
  cta: string;
  tag: string;
};

export type LandingFaq = { q: string; a: string };
export type LandingStep = { n: string; text: string };

export type LandingContent = {
  seoTitle: string;
  seoDescription: string;
  topBar: string;
  brand: string;
  headerCta: string;
  badge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroDescription: string;
  productName: string;
  price: number;
  oldPrice: number;
  heroCta: string;
  note1: string;
  note2: string;
  images: string[];
  problemTitle: string;
  problemParagraphs: string[];
  solutionTitle: string;
  solutionItems: string[];
  howTitle: string;
  steps: LandingStep[];
  galleryTitle: string;
  offersTitle: string;
  offers: LandingOffer[];
  benefitsTitle: string;
  benefits: string[];
  audienceTitle: string;
  audience: string[];
  finalTitle: string;
  finalTitleHighlight: string;
  finalText: string;
  finalCta: string;
  faqTitle: string;
  faq: LandingFaq[];
  footerText: string;
};

export const DEFAULT_LANDING: LandingContent = {
  seoTitle: "Lancheira Elétrica 2 em 1 | AURELIS",
  seoDescription:
    "Lancheira Elétrica 2 em 1 da AURELIS: aquecedor de alimentos portátil à prova de vazamento, 1,5L. 32.750 Kz com entrega grátis em Luanda e pagamento na entrega.",
  topBar: "🚚 Entrega grátis em Luanda • 💵 Pague apenas quando receber",
  brand: "AURELIS",
  headerCta: "🔥 Comprar",
  badge: "🔥 OFERTA ESPECIAL",
  heroTitle: "🔥 CANSADO DE COMER",
  heroTitleHighlight: "COMIDA FRIA?",
  heroSubtitle:
    "Tenha sua refeição com você e aqueça de forma prática no trabalho, na escola ou em casa. 🍱⚡",
  heroDescription:
    "Com a Lancheira Elétrica 2 em 1 da AURELIS, você pode transportar sua refeição e aquecê-la diretamente na lancheira.",
  productName:
    "Lancheira Elétrica 2 em 1 – Aquecedor de Alimentos Portátil à Prova de Vazamento",
  price: 32750,
  oldPrice: 54999,
  heroCta: "🔥 COMPRAR AGORA",
  note1: "🚚 Entrega grátis em Luanda",
  note2: "💵 Pagamento na entrega",
  images: [img1.url, img2.url, img3.url, img4.url],
  problemTitle: "😩 COMIDA FRIA DE NOVO?",
  problemParagraphs: [
    "Você leva sua comida para o trabalho ou para a escola e, quando chega a hora de comer, ela já está fria.",
    "Nem sempre existe um micro-ondas disponível.",
    "A Lancheira Elétrica AURELIS foi pensada para tornar esse momento mais prático.",
  ],
  solutionTitle: "🔥 LEVE. AQUEÇA. COMA.",
  solutionItems: [
    "🍱 Capacidade de 1,5L",
    "⚡ Aquecimento diretamente na lancheira",
    "💧 Design à prova de vazamento",
    "🥄 Compartimento para colher",
    "🏠 Ideal para trabalho, escola ou casa",
    "🧼 Fácil de usar e limpar",
  ],
  howTitle: "🔥 COMO FUNCIONA?",
  steps: [
    { n: "01", text: "🍱 COLOQUE SUA REFEIÇÃO" },
    { n: "02", text: "🔌 CONECTE A LANCHEIRA" },
    { n: "03", text: "🔥 AQUEÇA SUA REFEIÇÃO" },
    { n: "04", text: "😋 COMA QUENTE" },
  ],
  galleryTitle: "🍱 PRATICIDADE PARA O SEU DIA",
  offersTitle: "🔥 ESCOLHA SUA OFERTA",
  offers: [
    { quantity: 1, label: "1 LANCHEIRA", price: 32750, old: 54999, cta: "COMPRAR 1 UNIDADE", tag: "" },
    {
      quantity: 2,
      label: "2 LANCHEIRAS",
      price: 59900,
      old: 109998,
      cta: "COMPRAR 2 UNIDADES",
      tag: "🔥 MAIS VENDIDO",
    },
    {
      quantity: 3,
      label: "3 LANCHEIRAS",
      price: 84900,
      old: 164997,
      cta: "COMPRAR 3 UNIDADES",
      tag: "👑 MELHOR VALOR",
    },
  ],
  benefitsTitle: "✨ FEITA PARA FACILITAR SUA ROTINA",
  benefits: [
    "🍱 1,5L de capacidade",
    "⚡ Aquecimento prático",
    "💧 À prova de vazamento",
    "🥄 Compartimento para colher",
    "🏫 Ideal para escola",
    "💼 Ideal para trabalho",
  ],
  audienceTitle: "👥 PARA QUEM É A LANCHEIRA AURELIS?",
  audience: [
    "Quem trabalha fora",
    "Estudantes",
    "Quem leva comida de casa",
    "Quem busca praticidade",
    "Quem não tem micro-ondas disponível",
  ],
  finalTitle: "🔥 CANSADO DE COMER",
  finalTitleHighlight: "COMIDA FRIA?",
  finalText:
    "Leve sua refeição com você e tenha uma forma prática de aquecê-la durante o dia.",
  finalCta: "🔥 COMPRAR AGORA",
  faqTitle: "Perguntas frequentes",
  faq: [
    { q: "Qual é a capacidade?", a: "A Lancheira Elétrica AURELIS possui capacidade de 1,5L." },
    {
      q: "Posso usar no trabalho ou na escola?",
      a: "Sim. Ela foi pensada para facilitar o transporte e aquecimento das refeições no dia a dia.",
    },
    {
      q: "Preciso de micro-ondas?",
      a: "A proposta do produto é permitir o aquecimento diretamente na própria lancheira.",
    },
    { q: "Possui compartimento para colher?", a: "Sim." },
    { q: "Como funciona o pagamento?", a: "O pagamento é realizado na entrega." },
    { q: "Onde entregam?", a: "Atualmente, a entrega está disponível em Luanda." },
    { q: "A entrega é grátis?", a: "Sim, a entrega é grátis em Luanda." },
  ],
  footerText: "AURELIS — Entrega grátis em Luanda • Pagamento na entrega",
};

/** Junta o conteúdo guardado na base de dados com os valores por omissão. */
export function mergeLanding(stored: unknown): LandingContent {
  if (!stored || typeof stored !== "object") return DEFAULT_LANDING;
  const merged = { ...DEFAULT_LANDING } as Record<string, unknown>;
  for (const [key, value] of Object.entries(stored as Record<string, unknown>)) {
    if (value === null || value === undefined || value === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (key in merged) merged[key] = value;
  }
  return merged as LandingContent;
}
