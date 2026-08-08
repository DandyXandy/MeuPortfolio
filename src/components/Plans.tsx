'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Building2, LayoutGrid, ShoppingCart, CreditCard } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PLANS, formatSoles } from '@/lib/plans/data';

const ICONS = {
  institutional: Building2,
  catalog: LayoutGrid,
  'ecommerce-whatsapp': ShoppingCart,
  'ecommerce-gateway': CreditCard,
};

export default function Plans() {
  const t = useTranslations('plans');

  return (
    <section id="planos" className="relative bg-ink py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-16 text-center" data-aos="fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
            {t('eyebrow')}
          </p>
          <h2 className="font-display text-3xl font-semibold text-mist sm:text-4xl">{t('title')}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-mist/60">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => {
            const Icon = ICONS[plan.id];
            return (
              <div
                key={plan.id}
                data-aos="fade-up"
                className={`card-glow relative flex flex-col rounded-2xl border p-6 ${
                  plan.featured
                    ? 'border-violet-light/50 bg-aurora-gradient-soft'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-aurora-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-white">
                    {t('popular')}
                  </span>
                )}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-aurora-gradient-soft text-violet-light">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-mist">
                  {t(`items.${plan.id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/60">
                  {t(`items.${plan.id}.description`)}
                </p>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-widest2 text-mist/40">{t('from')}</p>
                  <p className="font-display text-2xl font-semibold text-mist">
                    {formatSoles(plan.priceFrom)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center" data-aos="fade-up">
          <Link
            href="/planos"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-mist transition-colors hover:border-violet-light/40 hover:text-violet-light"
          >
            {t('compareCta')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
