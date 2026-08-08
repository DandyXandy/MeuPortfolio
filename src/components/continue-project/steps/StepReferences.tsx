'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { ContinueProjectInput } from '@/lib/continue-project/schema';
import TextField from '@/components/request-project/ui/TextField';
import TextAreaField from '@/components/request-project/ui/TextAreaField';

export default function StepReferences() {
  const t = useTranslations('continueProject');
  const { register } = useFormContext<ContinueProjectInput>();

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.references.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.references.subtitle')}</p>

      <div className="mt-8 space-y-5">
        <TextField
          label={t('fields.referenceSite')}
          placeholder="https://..."
          {...register('referenceSite')}
        />
        <TextField label={t('fields.desiredStyle')} {...register('desiredStyle')} />
        <TextAreaField label={t('fields.visualReferences')} {...register('visualReferences')} />
      </div>
    </div>
  );
}
