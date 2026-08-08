import { z } from 'zod';
import {
  BUSINESS_SEGMENTS,
  PROJECT_TYPES,
  PROJECT_TYPES_WITH_PRODUCTS,
  PRODUCT_COUNTS,
  FEATURES,
  PAYMENT_GATEWAYS,
  TIMELINES,
  BUDGETS,
} from './options';

export const continueProjectSchema = z
  .object({
    // Etapa 1 — dados do cliente
    contactName: z.string().trim().min(2, 'Informe seu nome.'),
    companyName: z.string().optional().default(''),
    contactWhatsapp: z.string().trim().min(6, 'Informe um WhatsApp válido.'),
    contactEmail: z.string().trim().email('E-mail inválido.'),
    instagram: z.string().optional().default(''),
    currentSite: z.string().optional().default(''),

    // Etapa 2 — sobre o negócio
    businessSegment: z.enum(BUSINESS_SEGMENTS),
    businessDescription: z.string().optional().default(''),

    // Etapa 3 — tipo de projeto
    projectType: z.enum(PROJECT_TYPES),

    // Etapa 4 — produtos (só relevante pra catálogo/e-commerce)
    productCount: z.enum(PRODUCT_COUNTS).optional(),

    // Etapa 5 — recursos
    features: z.array(z.enum(FEATURES)).default([]),
    paymentGateway: z.enum(PAYMENT_GATEWAYS).optional(),

    // Etapa 6 — referências
    referenceSite: z.string().optional().default(''),
    desiredStyle: z.string().optional().default(''),
    visualReferences: z.string().optional().default(''),

    // Etapa 7 — prazo
    timeline: z.enum(TIMELINES),

    // Etapa 8 — investimento
    budget: z.enum(BUDGETS),

    locale: z.enum(['pt', 'en', 'es']).default('pt'),
    website: z.string().optional().default(''), // honeypot
  })
  .superRefine((data, ctx) => {
    if (PROJECT_TYPES_WITH_PRODUCTS.includes(data.projectType) && !data.productCount) {
      ctx.addIssue({ code: 'custom', path: ['productCount'], message: 'Selecione uma opção.' });
    }
    if (data.features.includes('onlinePayment') && !data.paymentGateway) {
      ctx.addIssue({ code: 'custom', path: ['paymentGateway'], message: 'Selecione uma opção.' });
    }
  });

export type ContinueProjectInput = z.infer<typeof continueProjectSchema>;

export const WIZARD_STEPS = [
  'clientInfo',
  'business',
  'projectType',
  'products',
  'features',
  'references',
  'timeline',
  'budget',
  'summary',
] as const;

export type WizardStep = (typeof WIZARD_STEPS)[number];

// "products" só entra na sequência quando o tipo de projeto escolhido
// tem produtos (catálogo/e-commerce). Assim o cliente que pediu uma
// Landing Page, por exemplo, nunca vê essa etapa.
export function getVisibleSteps(projectType: ContinueProjectInput['projectType'] | undefined): WizardStep[] {
  const needsProducts = projectType ? PROJECT_TYPES_WITH_PRODUCTS.includes(projectType) : true;
  return WIZARD_STEPS.filter((step) => step !== 'products' || needsProducts);
}

export const STEP_FIELDS: Record<WizardStep, (keyof ContinueProjectInput)[]> = {
  clientInfo: ['contactName', 'companyName', 'contactWhatsapp', 'contactEmail', 'instagram', 'currentSite'],
  business: ['businessSegment', 'businessDescription'],
  projectType: ['projectType'],
  products: ['productCount'],
  features: ['features', 'paymentGateway'],
  references: ['referenceSite', 'desiredStyle', 'visualReferences'],
  timeline: ['timeline'],
  budget: ['budget'],
  summary: [],
};
