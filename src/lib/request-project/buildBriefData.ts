import { createTranslator } from 'next-intl';
import type { RequestProjectInput } from './schema';
import { PROJECT_INFO_FIELDS } from './questions';
import type { BriefData } from '../pdf/ProjectBriefDocument';

// Monta a estrutura já traduzida (usada tanto no PDF quanto no corpo
// do e-mail de notificação) a partir dos dados brutos do formulário.
// `createTranslator` é a forma do next-intl de traduzir fora de uma
// request (rotas de API, jobs, etc.), sem depender do middleware.
export async function buildBriefData(data: RequestProjectInput): Promise<BriefData> {
  const messages = (await import(`../../messages/${data.locale}.json`)).default;
  const t = createTranslator({ locale: data.locale, messages, namespace: 'requestProject' });

  const infoFields = PROJECT_INFO_FIELDS[data.projectType] ?? [];
  const infoRows = infoFields
    .filter((field) => data.info?.[field.id])
    .map((field) => ({
      label: t(`fields.${field.id}`),
      value:
        field.type === 'boolean'
          ? data.info[field.id] === 'yes'
            ? t('yes')
            : t('no')
          : data.info[field.id],
    }));

  const localeTag = data.locale === 'pt' ? 'pt-BR' : data.locale === 'es' ? 'es-PE' : 'en-US';

  return {
    heading: t('pdf.heading'),
    projectTypeTitle: t(`projectTypes.${data.projectType}.title`),
    clientName: data.contactName,
    submittedAt: new Date().toLocaleString(localeTag, {
      dateStyle: 'long',
      timeStyle: 'short',
    }),
    sections: [
      {
        title: t('steps.info.title'),
        rows: infoRows.length > 0 ? infoRows : [{ label: t('summary.empty'), value: '' }],
      },
      {
        title: t('steps.design.title'),
        rows: [
          {
            label: t('steps.design.title'),
            value: data.designStyles.map((s) => t(`designStyles.${s}`)).join(', '),
          },
          ...(data.designReference
            ? [{ label: t('fields.designReference'), value: data.designReference }]
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
        ],
      },
      {
        title: t('steps.timeline.title'),
        rows: [{ label: t('steps.timeline.title'), value: t(`timelines.${data.timeline}`) }],
      },
      {
        title: t('steps.budget.title'),
        rows: [{ label: t('steps.budget.title'), value: t(`budgets.${data.budget}`) }],
      },
      {
        title: t('steps.contact.title'),
        rows: [
          { label: t('fields.contactName'), value: data.contactName },
          ...(data.contactCompany
            ? [{ label: t('fields.contactCompany'), value: data.contactCompany }]
            : []),
          { label: t('fields.contactEmail'), value: data.contactEmail },
          ...(data.contactWhatsapp
            ? [{ label: t('fields.contactWhatsapp'), value: data.contactWhatsapp }]
            : []),
          {
            label: t('fields.preferredContact'),
            value: t(`preferredContacts.${data.preferredContact}`),
          },
        ],
      },
    ],
  };
}
