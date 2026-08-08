'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  UtensilsCrossed,
  Dumbbell,
  Store,
  Pill,
  Shirt,
  Briefcase,
  UserRound,
  Sparkles,
} from 'lucide-react';
import { BUSINESS_SEGMENTS, type BusinessSegment } from '@/lib/continue-project/options';
import type { ContinueProjectInput } from '@/lib/continue-project/schema';
import OptionCard from '@/components/request-project/ui/OptionCard';
import TextAreaField from '@/components/request-project/ui/TextAreaField';

const ICONS: Record<BusinessSegment, typeof UtensilsCrossed> = {
  restaurant: UtensilsCrossed,
  gym: Dumbbell,
  store: Store,
  supplements: Pill,
  fashion: Shirt,
  services: Briefcase,
  freelancer: UserRound,
  other: Sparkles,
};

export default function StepBusiness() {
  const t = useTranslations('continueProject');
  const { watch, setValue, register } = useFormContext<ContinueProjectInput>();
  const selected = watch('businessSegment');

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.business.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.business.subtitle')}</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {BUSINESS_SEGMENTS.map((segment) => (
          <OptionCard
            key={segment}
            compact
            icon={ICONS[segment]}
            title={t(`businessSegments.${segment}`)}
            selected={selected === segment}
            onClick={() => setValue('businessSegment', segment, { shouldValidate: true })}
          />
        ))}
      </div>

      <div className="mt-8">
        <TextAreaField label={t('fields.businessDescription')} {...register('businessDescription')} />
      </div>
    </div>
  );
}
