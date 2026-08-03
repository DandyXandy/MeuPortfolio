// Opções fixas usadas em várias etapas do wizard "Solicitar Projeto".
// Os `id`s nunca mudam de idioma — só o texto mostrado (que vem dos
// arquivos de tradução em src/messages/*.json, chave requestProject.*).

export const PROJECT_TYPES = [
  'landing-page',
  'institutional',
  'ecommerce',
  'web-app',
  'dashboard',
  'blog',
  'other',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const DESIGN_STYLES = [
  'minimalist',
  'corporate',
  'elegant',
  'luxurious',
  'tech',
  'dark',
  'light',
  'colorful',
] as const;

export type DesignStyle = (typeof DESIGN_STYLES)[number];

export const FEATURES = [
  'login',
  'client-area',
  'blog',
  'chat',
  'whatsapp',
  'scheduling',
  'map',
  'payments',
  'cms',
  'dashboard',
  'api',
  'database',
  'auth',
  'file-upload',
  'newsletter',
] as const;

export type Feature = (typeof FEATURES)[number];

export const TIMELINES = ['urgent', '15-days', '30-days', '60-days', 'no-deadline'] as const;
export type Timeline = (typeof TIMELINES)[number];

export const BUDGETS = [
  'under-300',
  '300-600',
  '600-1000',
  '1000-3000',
  'over-3000',
  'unsure',
] as const;
export type Budget = (typeof BUDGETS)[number];

export const PREFERRED_CONTACTS = ['whatsapp', 'email', 'videocall', 'phone'] as const;
export type PreferredContact = (typeof PREFERRED_CONTACTS)[number];
