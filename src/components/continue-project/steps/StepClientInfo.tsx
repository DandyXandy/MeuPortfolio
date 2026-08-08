'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { ContinueProjectInput } from '@/lib/continue-project/schema';
import TextField from '@/components/request-project/ui/TextField';

export default function StepClientInfo() {
  const t = useTranslations('continueProject');
  const {
    register,
    formState: { errors },
  } = useFormContext<ContinueProjectInput>();

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.clientInfo.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.clientInfo.subtitle')}</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          label={t('fields.contactName')}
          error={errors.contactName ? t('required') : undefined}
          {...register('contactName')}
        />
        <TextField label={t('fields.companyName')} {...register('companyName')} />
        <TextField
          label={t('fields.contactWhatsapp')}
          placeholder="+51 9XX XXX XXX"
          error={errors.contactWhatsapp ? t('required') : undefined}
          {...register('contactWhatsapp')}
        />
        <TextField
          type="email"
          label={t('fields.contactEmail')}
          error={errors.contactEmail ? t('required') : undefined}
          {...register('contactEmail')}
        />
        <TextField label={t('fields.instagram')} placeholder="@suaempresa" {...register('instagram')} />
        <TextField label={t('fields.currentSite')} placeholder="https://..." {...register('currentSite')} />
      </div>
    </div>
  );
}
