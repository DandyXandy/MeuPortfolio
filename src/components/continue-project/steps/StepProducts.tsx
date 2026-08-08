'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';
import { PRODUCT_COUNTS, type ProductCount } from '@/lib/continue-project/options';
import type { ContinueProjectInput } from '@/lib/continue-project/schema';
import OptionCard from '@/components/request-project/ui/OptionCard';

export default function StepProducts() {
  const t = useTranslations('continueProject');
  const { watch, setValue } = useFormContext<ContinueProjectInput>();
  const selected = watch('productCount');

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.products.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.products.subtitle')}</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {PRODUCT_COUNTS.map((count: ProductCount) => (
          <OptionCard
            key={count}
            compact
            title={t(`productCounts.${count}`)}
            selected={selected === count}
            onClick={() => setValue('productCount', count, { shouldValidate: true })}
          />
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold/20 bg-gold/[0.06] p-4">
        <Info size={16} className="mt-0.5 shrink-0 text-gold" />
        <p className="text-sm leading-relaxed text-mist/60">{t('steps.products.notice')}</p>
      </div>
    </div>
  );
}
