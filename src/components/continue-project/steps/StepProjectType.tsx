'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Building2, LayoutGrid, ShoppingCart, CreditCard, Rocket, Sparkles } from 'lucide-react';
import { PROJECT_TYPES, type ProjectType } from '@/lib/continue-project/options';
import type { ContinueProjectInput } from '@/lib/continue-project/schema';
import OptionCard from '@/components/request-project/ui/OptionCard';

const ICONS: Record<ProjectType, typeof Building2> = {
  institutional: Building2,
  catalog: LayoutGrid,
  ecommerce: ShoppingCart,
  'ecommerce-payment': CreditCard,
  'landing-page': Rocket,
  other: Sparkles,
};

export default function StepProjectType() {
  const t = useTranslations('continueProject');
  const { watch, setValue } = useFormContext<ContinueProjectInput>();
  const selected = watch('projectType');

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.projectType.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.projectType.subtitle')}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECT_TYPES.map((type) => (
          <OptionCard
            key={type}
            icon={ICONS[type]}
            title={t(`projectTypes.${type}`)}
            selected={selected === type}
            onClick={() => setValue('projectType', type, { shouldValidate: true })}
          />
        ))}
      </div>
    </div>
  );
}
