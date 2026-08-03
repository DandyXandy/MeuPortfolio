'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { PROJECT_INFO_FIELDS } from '@/lib/request-project/questions';
import type { RequestProjectInput } from '@/lib/request-project/schema';
import TextField from '../ui/TextField';
import TextAreaField from '../ui/TextAreaField';
import ToggleField from '../ui/ToggleField';

export default function StepInfo() {
  const t = useTranslations('requestProject');
  const { register, watch, setValue } = useFormContext<RequestProjectInput>();
  const projectType = watch('projectType');
  const info = watch('info') ?? {};

  const fields = PROJECT_INFO_FIELDS[projectType] ?? [];

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.info.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.info.subtitle')}</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const label = t(`fields.${field.id}`);

          if (field.type === 'boolean') {
            return (
              <div key={field.id} className="sm:col-span-1">
                <ToggleField
                  label={label}
                  value={info[field.id] ?? ''}
                  onChange={(value) => setValue(`info.${field.id}`, value)}
                  yesLabel={t('yes')}
                  noLabel={t('no')}
                />
              </div>
            );
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.id} className="sm:col-span-2">
                <TextAreaField label={label} {...register(`info.${field.id}`)} />
              </div>
            );
          }

          return (
            <div key={field.id} className="sm:col-span-1">
              <TextField label={label} {...register(`info.${field.id}`)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
