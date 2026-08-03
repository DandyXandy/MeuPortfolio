'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  LogIn,
  UserCircle,
  Newspaper,
  MessageSquare,
  MessageCircle,
  CalendarClock,
  MapPin,
  CreditCard,
  FileEdit,
  LayoutDashboard,
  Webhook,
  Database,
  ShieldCheck,
  Upload,
  Mail,
} from 'lucide-react';
import { FEATURES, type Feature } from '@/lib/request-project/options';
import type { RequestProjectInput } from '@/lib/request-project/schema';
import OptionCard from '../ui/OptionCard';

const ICONS: Record<Feature, typeof LogIn> = {
  login: LogIn,
  'client-area': UserCircle,
  blog: Newspaper,
  chat: MessageSquare,
  whatsapp: MessageCircle,
  scheduling: CalendarClock,
  map: MapPin,
  payments: CreditCard,
  cms: FileEdit,
  dashboard: LayoutDashboard,
  api: Webhook,
  database: Database,
  auth: ShieldCheck,
  'file-upload': Upload,
  newsletter: Mail,
};

export default function StepFeatures() {
  const t = useTranslations('requestProject');
  const { watch, setValue } = useFormContext<RequestProjectInput>();
  const selected = watch('features') ?? [];

  function toggle(feature: Feature) {
    const next = selected.includes(feature)
      ? selected.filter((f) => f !== feature)
      : [...selected, feature];
    setValue('features', next);
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.features.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.features.subtitle')}</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <OptionCard
            key={feature}
            compact
            icon={ICONS[feature]}
            title={t(`features.${feature}`)}
            selected={selected.includes(feature)}
            onClick={() => toggle(feature)}
          />
        ))}
      </div>
    </div>
  );
}
