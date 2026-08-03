'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, Video, Phone } from 'lucide-react';
import { PREFERRED_CONTACTS, type PreferredContact } from '@/lib/request-project/options';
import type { RequestProjectInput } from '@/lib/request-project/schema';
import TextField from '../ui/TextField';
import OptionCard from '../ui/OptionCard';

const ICONS: Record<PreferredContact, typeof MessageCircle> = {
  whatsapp: MessageCircle,
  email: Mail,
  videocall: Video,
  phone: Phone,
};

export default function StepContact() {
  const t = useTranslations('requestProject');
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<RequestProjectInput>();
  const preferredContact = watch('preferredContact');

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.contact.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.contact.subtitle')}</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          label={t('fields.contactName')}
          error={errors.contactName ? t('required') : undefined}
          {...register('contactName')}
        />
        <TextField label={t('fields.contactCompany')} {...register('contactCompany')} />
        <TextField
          type="email"
          label={t('fields.contactEmail')}
          error={errors.contactEmail ? t('required') : undefined}
          {...register('contactEmail')}
        />
        <TextField
          label={t('fields.contactWhatsapp')}
          placeholder="+51 9XX XXX XXX"
          error={errors.contactWhatsapp ? t('required') : undefined}
          {...register('contactWhatsapp')}
        />
      </div>

      <p className="mb-4 mt-8 text-sm text-mist/70">{t('fields.preferredContact')}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PREFERRED_CONTACTS.map((option) => (
          <OptionCard
            key={option}
            compact
            icon={ICONS[option]}
            title={t(`preferredContacts.${option}`)}
            selected={preferredContact === option}
            onClick={() => setValue('preferredContact', option, { shouldValidate: true })}
          />
        ))}
      </div>
    </div>
  );
}
