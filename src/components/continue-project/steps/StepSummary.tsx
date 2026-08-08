'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Pencil, Loader2, Send } from 'lucide-react';
import type { ContinueProjectInput, WizardStep } from '@/lib/continue-project/schema';
import { PROJECT_TYPES_WITH_PRODUCTS } from '@/lib/continue-project/options';

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
  const t = useTranslations('continueProject');
  const { watch } = useFormContext<ContinueProjectInput>();
  const data = watch();
  const hasProducts = PROJECT_TYPES_WITH_PRODUCTS.includes(data.projectType);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.summary.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.summary.subtitle')}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SummaryCard title={t('steps.clientInfo.title')} onEdit={() => onEdit('clientInfo')}>
          <p>{data.contactName}</p>
          {data.companyName && <p className="text-mist/50">{data.companyName}</p>}
          <p className="text-mist/50">{data.contactWhatsapp}</p>
          <p className="text-mist/50">{data.contactEmail}</p>
        </SummaryCard>

        <SummaryCard title={t('steps.business.title')} onEdit={() => onEdit('business')}>
          {t(`businessSegments.${data.businessSegment}`)}
        </SummaryCard>

        <SummaryCard title={t('steps.projectType.title')} onEdit={() => onEdit('projectType')}>
          {t(`projectTypes.${data.projectType}`)}
        </SummaryCard>

        {hasProducts && data.productCount && (
          <SummaryCard title={t('steps.products.title')} onEdit={() => onEdit('products')}>
            {t(`productCounts.${data.productCount}`)}
          </SummaryCard>
        )}

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

        <SummaryCard title={t('steps.timeline.title')} onEdit={() => onEdit('timeline')}>
          {t(`timelines.${data.timeline}`)}
        </SummaryCard>

        <SummaryCard title={t('steps.budget.title')} onEdit={() => onEdit('budget')}>
          {t(`budgets.${data.budget}`)}
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
