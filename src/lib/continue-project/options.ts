// Opções fixas do wizard "Continuar Projeto" (para leads que já
// conversaram pelo WhatsApp/Instagram). Mesmo padrão do wizard
// "Solicitar Projeto": os `id`s não mudam de idioma, só o texto
// (vem de src/messages/*.json, namespace continueProject.*).

export const BUSINESS_SEGMENTS = [
  'restaurant',
  'gym',
  'store',
  'supplements',
  'fashion',
  'services',
  'freelancer',
  'other',
] as const;
export type BusinessSegment = (typeof BUSINESS_SEGMENTS)[number];

export const PROJECT_TYPES = [
  'institutional',
  'catalog',
  'ecommerce',
  'ecommerce-payment',
  'landing-page',
  'other',
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

// Tipos de projeto para os quais a etapa "Produtos" faz sentido.
export const PROJECT_TYPES_WITH_PRODUCTS: ProjectType[] = [
  'catalog',
  'ecommerce',
  'ecommerce-payment',
];

export const PRODUCT_COUNTS = ['1-30', '31-100', '101-300', '300-plus'] as const;
export type ProductCount = (typeof PRODUCT_COUNTS)[number];

export const FEATURES = [
  'whatsapp',
  'googleMaps',
  'catalog',
  'cart',
  'clientLogin',
  'clientArea',
  'adminPanel',
  'productManagement',
  'orderManagement',
  'onlinePayment',
  'contactForm',
  'blog',
  'socialIntegration',
  'other',
] as const;
export type Feature = (typeof FEATURES)[number];

export const PAYMENT_GATEWAYS = [
  'mercadopago',
  'culqi',
  'niubiz',
  'izipay',
  'other',
  'unsure',
] as const;
export type PaymentGateway = (typeof PAYMENT_GATEWAYS)[number];

export const TIMELINES = ['asap', '1-2-weeks', '2-4-weeks', 'no-deadline'] as const;
export type Timeline = (typeof TIMELINES)[number];

export const BUDGETS = [
  'under-700',
  '700-1000',
  '1000-1500',
  '1500-2500',
  'over-2500',
  'recommendation',
] as const;
export type Budget = (typeof BUDGETS)[number];
