import { z } from 'zod';
import {
  PROJECT_TYPES,
  DESIGN_STYLES,
  FEATURES,
  TIMELINES,
  BUDGETS,
  PREFERRED_CONTACTS,
} from './options';

// Schema único, usado tanto no formulário (client) quanto na rota da
// API (server) — assim a validação nunca fica dessincronizada.
export const requestProjectSchema = z
  .object({
    projectType: z.enum(PROJECT_TYPES),

    // Respostas dinâmicas da Etapa "Informações" (campos variam por
    // projectType, ver src/lib/request-project/questions.ts).
    info: z.record(z.string(), z.string()).default({}),

    designStyles: z
      .array(z.enum(DESIGN_STYLES))
      .min(1, 'Escolha ao menos um estilo.'),
    designReference: z.string().optional().default(''),

    features: z.array(z.enum(FEATURES)).default([]),

    timeline: z.enum(TIMELINES),
    budget: z.enum(BUDGETS),

    contactName: z.string().trim().min(2, 'Informe seu nome.'),
    contactCompany: z.string().optional().default(''),
    contactEmail: z.string().trim().email('E-mail inválido.'),
    contactWhatsapp: z.string().optional().default(''),
    preferredContact: z.enum(PREFERRED_CONTACTS),

    locale: z.enum(['pt', 'en', 'es']).default('pt'),

    // Campo-armadilha invisível para bots. Se vier preenchido, a
    // rota da API ignora o envio silenciosamente.
    website: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (
      (data.preferredContact === 'whatsapp' || data.preferredContact === 'phone') &&
      data.contactWhatsapp.trim().length < 6
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['contactWhatsapp'],
        message: 'Informe um número válido para esse tipo de contato.',
      });
    }
  });

export type RequestProjectInput = z.infer<typeof requestProjectSchema>;

// Steps usados pela barra de progresso e pela navegação do wizard.
export const WIZARD_STEPS = [
  'projectType',
  'info',
  'design',
  'features',
  'timeline',
  'budget',
  'contact',
  'summary',
] as const;

export type WizardStep = (typeof WIZARD_STEPS)[number];

// Quais campos de `RequestProjectInput` precisam estar válidos para
// avançar de cada etapa (usado com react-hook-form's `trigger`).
export const STEP_FIELDS: Record<WizardStep, (keyof RequestProjectInput)[]> = {
  projectType: ['projectType'],
  info: ['info'],
  design: ['designStyles', 'designReference'],
  features: ['features'],
  timeline: ['timeline'],
  budget: ['budget'],
  contact: ['contactName', 'contactCompany', 'contactEmail', 'contactWhatsapp', 'preferredContact'],
  summary: [],
};
