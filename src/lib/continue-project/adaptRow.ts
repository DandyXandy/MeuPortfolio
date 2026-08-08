import type { ContinueProjectInput } from './schema';

// Formato da linha como vem do Supabase (snake_case). Convertemos pro
// mesmo formato usado no formulário (ContinueProjectInput) pra poder
// reaproveitar buildContinueProjectBriefData tanto no PDF/e-mail
// quanto na página individual /projeto/[token].
export type ProjectBriefingRow = {
  id: string;
  token: string;
  created_at: string;
  contact_name: string;
  company_name: string | null;
  contact_whatsapp: string;
  contact_email: string;
  instagram: string | null;
  current_site: string | null;
  business_segment: string;
  business_description: string | null;
  project_type: string;
  product_count: string | null;
  features: string[];
  payment_gateway: string | null;
  reference_site: string | null;
  desired_style: string | null;
  visual_references: string | null;
  timeline: string;
  budget: string;
  locale: string;
  pdf_url: string | null;
  status: string;
};

export function adaptRowToInput(
  row: ProjectBriefingRow,
  localeOverride: 'pt' | 'en' | 'es'
): ContinueProjectInput {
  return {
    contactName: row.contact_name,
    companyName: row.company_name ?? '',
    contactWhatsapp: row.contact_whatsapp,
    contactEmail: row.contact_email,
    instagram: row.instagram ?? '',
    currentSite: row.current_site ?? '',
    businessSegment: row.business_segment as ContinueProjectInput['businessSegment'],
    businessDescription: row.business_description ?? '',
    projectType: row.project_type as ContinueProjectInput['projectType'],
    productCount: (row.product_count ?? undefined) as ContinueProjectInput['productCount'],
    features: (row.features ?? []) as ContinueProjectInput['features'],
    paymentGateway: (row.payment_gateway ?? undefined) as ContinueProjectInput['paymentGateway'],
    referenceSite: row.reference_site ?? '',
    desiredStyle: row.desired_style ?? '',
    visualReferences: row.visual_references ?? '',
    timeline: row.timeline as ContinueProjectInput['timeline'],
    budget: row.budget as ContinueProjectInput['budget'],
    locale: localeOverride,
    website: '',
  };
}
