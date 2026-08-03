'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Rocket, Building2, ShoppingCart, AppWindow, LayoutDashboard, Newspaper, Sparkles } from 'lucide-react';
import { PROJECT_TYPES, type ProjectType } from '@/lib/request-project/options';
import type { RequestProjectInput } from '@/lib/request-project/schema';
import OptionCard from '../ui/OptionCard';

const ICONS: Record<ProjectType, typeof Rocket> = {
  'landing-page': Rocket,
  institutional: Building2,
  ecommerce: ShoppingCart,
  'web-app': AppWindow,
  dashboard: LayoutDashboard,
  blog: Newspaper,
  other: Sparkles,
};

export default function StepProjectType() {
  const t = useTranslations('requestProject');
  const { watch, setValue } = useFormContext<RequestProjectInput>();
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
            title={t(`projectTypes.${type}.title`)}
            description={t(`projectTypes.${type}.description`)}
            selected={selected === type}
            onClick={() => setValue('projectType', type, { shouldValidate: true })}
          />
        ))}
      </div>
    </div>
  );
}
