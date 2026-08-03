'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Zap, CalendarDays, CalendarRange, Infinity as InfinityIcon } from 'lucide-react';
import { TIMELINES, type Timeline } from '@/lib/request-project/options';
import type { RequestProjectInput } from '@/lib/request-project/schema';
import OptionCard from '../ui/OptionCard';

const ICONS: Record<Timeline, typeof Zap> = {
  urgent: Zap,
  '15-days': CalendarDays,
  '30-days': CalendarDays,
  '60-days': CalendarRange,
  'no-deadline': InfinityIcon,
};

export default function StepTimeline() {
  const t = useTranslations('requestProject');
  const { watch, setValue } = useFormContext<RequestProjectInput>();
  const selected = watch('timeline');

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.timeline.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.timeline.subtitle')}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TIMELINES.map((timeline) => (
          <OptionCard
            key={timeline}
            icon={ICONS[timeline]}
            title={t(`timelines.${timeline}`)}
            selected={selected === timeline}
            onClick={() => setValue('timeline', timeline, { shouldValidate: true })}
          />
        ))}
      </div>
    </div>
  );
}
