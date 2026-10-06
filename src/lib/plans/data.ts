// Dados dos planos e da comparação. Todo o texto vem das traduções
// (namespace "plans" em src/messages/*.json) — aqui só ficam preços,
// ids e a matriz de quais recursos cada plano inclui. Nenhum preço
// interno, custo ou margem aparece aqui: só os valores públicos.

// deliveryDays conta a partir do recebimento de textos, fotos e logo.
// exampleUrl aponta pra um site real ou demo publicado de cada tipo.
export const PLANS = [
  {
    id: 'institutional',
    priceFrom: 700,
    deliveryDays: 7,
    exampleUrl: 'https://orthozent-six.vercel.app',
    featured: false,
  },
  {
    id: 'catalog',
    priceFrom: 750,
    deliveryDays: 10,
    exampleUrl: 'https://casamerengue.vercel.app',
    featured: false,
  },
  {
    id: 'ecommerce-whatsapp',
    priceFrom: 1250,
    deliveryDays: 15,
    exampleUrl: 'https://resaca-ebon.vercel.app',
    featured: false,
  },
  {
    id: 'ecommerce-gateway',
    priceFrom: 1500,
    deliveryDays: 21,
    exampleUrl: 'https://onyrak.com',
    featured: true,
  },
] as const;

export type PlanId = (typeof PLANS)[number]['id'];

// true/false para cada plano, na mesma ordem de PLANS.
export const COMPARISON_ROWS: { id: string; included: boolean[] }[] = [
  { id: 'modernDesign', included: [true, true, true, true] },
  { id: 'upToFivePages', included: [true, true, true, true] },
  { id: 'domainIncluded', included: [true, true, true, true] },
  { id: 'homeAboutInfo', included: [true, true, true, true] },
  { id: 'whatsappButton', included: [true, true, true, true] },
  { id: 'googleMaps', included: [true, true, true, true] },
  { id: 'socialIntegration', included: [true, true, true, true] },
  { id: 'contactForm', included: [true, true, true, true] },
  { id: 'productCatalog', included: [false, true, true, true] },
  { id: 'upToThirtyProducts', included: [false, true, true, true] },
  { id: 'shoppingCart', included: [false, false, true, true] },
  { id: 'whatsappCheckout', included: [false, false, true, true] },
  { id: 'clientArea', included: [false, false, false, true] },
  { id: 'adminPanel', included: [false, true, true, true] },
  { id: 'productOrderManagement', included: [false, true, true, true] },
  { id: 'paymentGateway', included: [false, false, false, true] },
  { id: 'onlineCheckout', included: [false, false, false, true] },
  { id: 'paymentStatus', included: [false, false, false, true] },
];

export const EXTRAS = ['extraProduct', 'productPackages', 'extraPage', 'extraFeatures'] as const;

// O tier "basic" (hospedagem + domínio + pequenos ajustes) não existe pro
// e-commerce com gateway: pagamento online exige acompanhamento contínuo.
export const MAINTENANCE_PLANS = [
  {
    id: 'institutionalCatalog',
    tiers: [{ id: 'basic', price: 60 }, { id: 'essential', price: 150 }, { id: 'pro', price: 220 }],
  },
  {
    id: 'ecommerceWhatsapp',
    tiers: [{ id: 'basic', price: 80 }, { id: 'essential', price: 200 }, { id: 'pro', price: 300 }],
  },
  { id: 'ecommerceGateway', tiers: [{ id: 'essential', price: 300 }, { id: 'pro', price: 400 }] },
] as const;

export const CONDITIONS_COUNT = 9;

// Formata em Soles com ponto como separador de milhar (padrão peruano).
// Não usamos toLocaleString('es-PE') porque os dados do ICU pra esse
// locale retornam vírgula, não ponto.
export function formatSoles(value: number) {
  return `S/${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
