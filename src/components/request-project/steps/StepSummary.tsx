'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Pencil, Loader2, Send } from 'lucide-react';
import { PROJECT_INFO_FIELDS } from '@/lib/request-project/questions';
import type { RequestProjectInput } from '@/lib/request-project/schema';
import type { WizardStep } from '@/lib/request-project/schema';

function SummaryCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest2 text-violet-light">{title}</p>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 text-xs text-mist/50 transition-colors hover:text-mist"
        >
          <Pencil size={12} />
        </button>
      </div>
      <div className="text-sm text-mist/80">{children}</div>
    </div>
  );
}

export default function StepSummary({
  onEdit,
  isSubmitting,
}: {
  onEdit: (step: WizardStep) => void;
  isSubmitting: boolean;
}) {
  const t = useTranslations('requestProject');
  const { watch } = useFormContext<RequestProjectInput>();
  const data = watch();

  const infoFields = PROJECT_INFO_FIELDS[data.projectType] ?? [];
  const filledInfo = infoFields.filter((f) => data.info?.[f.id]);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.summary.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.summary.subtitle')}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SummaryCard title={t('steps.projectType.title')} onEdit={() => onEdit('projectType')}>
          {t(`projectTypes.${data.projectType}.title`)}
        </SummaryCard>

        <SummaryCard title={t('steps.timeline.title')} onEdit={() => onEdit('timeline')}>
          {t(`timelines.${data.timeline}`)}
        </SummaryCard>

        <SummaryCard title={t('steps.budget.title')} onEdit={() => onEdit('budget')}>
          {t(`budgets.${data.budget}`)}
        </SummaryCard>

        <SummaryCard title={t('steps.design.title')} onEdit={() => onEdit('design')}>
          <div className="flex flex-wrap gap-1.5">
            {(data.designStyles ?? []).map((style) => (
              <span
                key={style}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs"
              >
                {t(`designStyles.${style}`)}
              </span>
            ))}
          </div>
        </SummaryCard>

        <SummaryCard title={t('steps.info.title')} onEdit={() => onEdit('info')}>
          {filledInfo.length === 0 ? (
            <span className="text-mist/40">{t('summary.empty')}</span>
          ) : (
            <ul className="space-y-1">
              {filledInfo.map((field) => (
                <li key={field.id}>
                  <span className="text-mist/50">{t(`fields.${field.id}`)}: </span>
                  {field.type === 'boolean'
                    ? data.info[field.id] === 'yes'
                      ? t('yes')
                      : t('no')
                    : data.info[field.id]}
                </li>
              ))}
            </ul>
          )}
        </SummaryCard>

        <SummaryCard title={t('steps.features.title')} onEdit={() => onEdit('features')}>
          {(data.features ?? []).length === 0 ? (
            <span className="text-mist/40">{t('summary.empty')}</span>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {(data.features ?? []).map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs"
                >
                  {t(`features.${feature}`)}
                </span>
              ))}
            </div>
          )}
        </SummaryCard>

        <SummaryCard title={t('steps.contact.title')} onEdit={() => onEdit('contact')}>
          <p>{data.contactName}</p>
          {data.contactCompany && <p className="text-mist/50">{data.contactCompany}</p>}
          <p className="text-mist/50">{data.contactEmail}</p>
          {data.contactWhatsapp && <p className="text-mist/50">{data.contactWhatsapp}</p>}
          <p className="mt-1 text-xs text-violet-light">
            {t('fields.preferredContact')}: {t(`preferredContacts.${data.preferredContact}`)}
          </p>
        </SummaryCard>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-aurora-gradient px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {t('steps.summary.sending')}
          </>
        ) : (
          <>
            <Send size={16} />
            {t('steps.summary.submit')}
          </>
        )}
      </button>
    </div>
  );
}
