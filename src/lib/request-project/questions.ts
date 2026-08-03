import type { ProjectType } from './options';

// Cada tipo de projeto mostra um conjunto diferente de perguntas na
// Etapa "Informações". Os campos compartilham o mesmo `id` entre tipos
// sempre que a pergunta é a mesma (ex: "business", "reference"), então
// o texto da pergunta só precisa ser traduzido uma vez em
// requestProject.fields.<id> nos arquivos src/messages/*.json.

export type FieldType = 'text' | 'textarea' | 'boolean';

export type QuestionField = {
  id: string;
  type: FieldType;
};

export const PROJECT_INFO_FIELDS: Record<ProjectType, QuestionField[]> = {
  'landing-page': [
    { id: 'business', type: 'text' },
    { id: 'goal', type: 'textarea' },
    { id: 'hasBranding', type: 'boolean' },
    { id: 'hasDomain', type: 'boolean' },
    { id: 'hasHosting', type: 'boolean' },
    { id: 'hasCopy', type: 'boolean' },
    { id: 'hasImages', type: 'boolean' },
    { id: 'wantsAnimations', type: 'boolean' },
    { id: 'reference', type: 'text' },
  ],
  institutional: [
    { id: 'business', type: 'text' },
    { id: 'goal', type: 'textarea' },
    { id: 'pagesCount', type: 'text' },
    { id: 'hasBranding', type: 'boolean' },
    { id: 'hasDomain', type: 'boolean' },
    { id: 'hasCopy', type: 'boolean' },
    { id: 'reference', type: 'text' },
  ],
  ecommerce: [
    { id: 'productCount', type: 'text' },
    { id: 'onlinePayment', type: 'boolean' },
    { id: 'stockControl', type: 'boolean' },
    { id: 'adminPanel', type: 'boolean' },
    { id: 'login', type: 'boolean' },
    { id: 'coupons', type: 'boolean' },
    { id: 'shipping', type: 'boolean' },
    { id: 'integrations', type: 'text' },
  ],
  'web-app': [
    { id: 'problem', type: 'textarea' },
    { id: 'userCount', type: 'text' },
    { id: 'login', type: 'boolean' },
    { id: 'existingDatabase', type: 'boolean' },
    { id: 'integrations', type: 'text' },
  ],
  dashboard: [
    { id: 'problem', type: 'textarea' },
    { id: 'userCount', type: 'text' },
    { id: 'login', type: 'boolean' },
    { id: 'charts', type: 'text' },
    { id: 'existingDatabase', type: 'boolean' },
  ],
  blog: [
    { id: 'topic', type: 'text' },
    { id: 'postFrequency', type: 'text' },
    { id: 'hasCopy', type: 'boolean' },
    { id: 'wantsNewsletter', type: 'boolean' },
    { id: 'reference', type: 'text' },
  ],
  other: [
    { id: 'description', type: 'textarea' },
    { id: 'reference', type: 'text' },
  ],
};
