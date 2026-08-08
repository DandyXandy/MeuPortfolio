'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  MessageCircle,
  MapPin,
  LayoutGrid,
  ShoppingCart,
  LogIn,
  UserCircle,
  LayoutDashboard,
  Package,
  ClipboardList,
  CreditCard,
  Mail,
  Newspaper,
  Share2,
  Sparkles,
} from 'lucide-react';
import { FEATURES, PAYMENT_GATEWAYS, type Feature, type PaymentGateway } from '@/lib/continue-project/options';
import type { ContinueProjectInput } from '@/lib/continue-project/schema';
import OptionCard from '@/components/request-project/ui/OptionCard';

const ICONS: Record<Feature, typeof MessageCircle> = {
  whatsapp: MessageCircle,
  googleMaps: MapPin,
  catalog: LayoutGrid,
  cart: ShoppingCart,
  clientLogin: LogIn,
  clientArea: UserCircle,
  adminPanel: LayoutDashboard,
  productManagement: Package,
  orderManagement: ClipboardList,
  onlinePayment: CreditCard,
  contactForm: Mail,
  blog: Newspaper,
  socialIntegration: Share2,
  other: Sparkles,
};

export default function StepFeatures() {
  const t = useTranslations('continueProject');
  const { watch, setValue } = useFormContext<ContinueProjectInput>();
  const selected = watch('features') ?? [];
  const paymentGateway = watch('paymentGateway');
  const wantsOnlinePayment = selected.includes('onlinePayment');

  function toggle(feature: Feature) {
    const next = selected.includes(feature)
      ? selected.filter((f) => f !== feature)
      : [...selected, feature];
    setValue('features', next, { shouldValidate: true });
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

      {wantsOnlinePayment && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="mb-4 text-sm text-mist/70">{t('steps.features.gatewayQuestion')}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PAYMENT_GATEWAYS.map((gateway: PaymentGateway) => (
              <OptionCard
                key={gateway}
                compact
                title={t(`paymentGateways.${gateway}`)}
                selected={paymentGateway === gateway}
                onClick={() => setValue('paymentGateway', gateway, { shouldValidate: true })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
