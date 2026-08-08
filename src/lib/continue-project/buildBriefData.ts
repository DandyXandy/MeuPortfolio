import { createTranslator } from 'next-intl';
import type { ContinueProjectInput } from './schema';
import { PROJECT_TYPES_WITH_PRODUCTS } from './options';
import type { BriefData } from '../pdf/ProjectBriefDocument';

export async function buildContinueProjectBriefData(data: ContinueProjectInput): Promise<BriefData> {
  const messages = (await import(`../../messages/${data.locale}.json`)).default;
  const t = createTranslator({ locale: data.locale, messages, namespace: 'continueProject' });

  const localeTag = data.locale === 'pt' ? 'pt-BR' : data.locale === 'es' ? 'es-PE' : 'en-US';
  const hasProducts = PROJECT_TYPES_WITH_PRODUCTS.includes(data.projectType);

  return {
    heading: t('pdf.heading'),
    projectTypeTitle: t(`projectTypes.${data.projectType}`),
    clientName: data.contactName,
    submittedAt: new Date().toLocaleString(localeTag, { dateStyle: 'long', timeStyle: 'short' }),
    sections: [
      {
        title: t('steps.clientInfo.title'),
        rows: [
          { label: t('fields.contactName'), value: data.contactName },
          ...(data.companyName ? [{ label: t('fields.companyName'), value: data.companyName }] : []),
          { label: t('fields.contactWhatsapp'), value: data.contactWhatsapp },
          { label: t('fields.contactEmail'), value: data.contactEmail },
          ...(data.instagram ? [{ label: t('fields.instagram'), value: data.instagram }] : []),
          ...(data.currentSite ? [{ label: t('fields.currentSite'), value: data.currentSite }] : []),
        ],
      },
      {
        title: t('steps.business.title'),
        rows: [
          { label: t('steps.business.title'), value: t(`businessSegments.${data.businessSegment}`) },
          ...(data.businessDescription
            ? [{ label: t('fields.businessDescription'), value: data.businessDescription }]
            : []),
        ],
      },
      {
        title: t('steps.projectType.title'),
        rows: [
          { label: t('steps.projectType.title'), value: t(`projectTypes.${data.projectType}`) },
          ...(hasProducts && data.productCount
            ? [{ label: t('steps.products.title'), value: t(`productCounts.${data.productCount}`) }]
            : []),
        ],
      },
      {
        title: t('steps.features.title'),
        rows: [
          {
            label: t('steps.features.title'),
            value:
              data.features.length > 0
                ? data.features.map((f) => t(`features.${f}`)).join(', ')
                : t('summary.empty'),
          },
          ...(data.paymentGateway
            ? [{ label: t('steps.features.gatewayQuestion'), value: t(`paymentGateways.${data.paymentGateway}`) }]
            : []),
        ],
      },
      {
        title: t('steps.references.title'),
        rows: (() => {
          const rows = [
            ...(data.referenceSite ? [{ label: t('fields.referenceSite'), value: data.referenceSite }] : []),
            ...(data.desiredStyle ? [{ label: t('fields.desiredStyle'), value: data.desiredStyle }] : []),
            ...(data.visualReferences
              ? [{ label: t('fields.visualReferences'), value: data.visualReferences }]
              : []),
          ];
          return rows.length > 0 ? rows : [{ label: t('summary.empty'), value: '' }];
        })(),
      },
      {
        title: t('steps.timeline.title'),
        rows: [{ label: t('steps.timeline.title'), value: t(`timelines.${data.timeline}`) }],
      },
      {
        title: t('steps.budget.title'),
        rows: [{ label: t('steps.budget.title'), value: t(`budgets.${data.budget}`) }],
      },
    ],
  };
}
