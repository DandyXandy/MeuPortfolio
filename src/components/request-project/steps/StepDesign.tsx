'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Square, Briefcase, Gem, Crown, Cpu, Moon, Sun, Palette } from 'lucide-react';
import { DESIGN_STYLES, type DesignStyle } from '@/lib/request-project/options';
import type { RequestProjectInput } from '@/lib/request-project/schema';
import OptionCard from '../ui/OptionCard';
import TextField from '../ui/TextField';

const ICONS: Record<DesignStyle, typeof Square> = {
  minimalist: Square,
  corporate: Briefcase,
  elegant: Gem,
  luxurious: Crown,
  tech: Cpu,
  dark: Moon,
  light: Sun,
  colorful: Palette,
};

export default function StepDesign() {
  const t = useTranslations('requestProject');
  const { watch, setValue, register } = useFormContext<RequestProjectInput>();
  const selected = watch('designStyles') ?? [];

  function toggle(style: DesignStyle) {
    const next = selected.includes(style)
      ? selected.filter((s) => s !== style)
      : [...selected, style];
    setValue('designStyles', next, { shouldValidate: true });
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.design.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.design.subtitle')}</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {DESIGN_STYLES.map((style) => (
          <OptionCard
            key={style}
            compact
            icon={ICONS[style]}
            title={t(`designStyles.${style}`)}
            selected={selected.includes(style)}
            onClick={() => toggle(style)}
          />
        ))}
      </div>

      <div className="mt-8">
        <TextField
          label={t('fields.designReference')}
          placeholder="https://..."
          {...register('designReference')}
        />
      </div>
    </div>
  );
}
