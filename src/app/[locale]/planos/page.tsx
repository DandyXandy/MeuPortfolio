import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Check, Minus, ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import AosInit from '@/components/AosInit';
import { PLANS, COMPARISON_ROWS, EXTRAS, MAINTENANCE_PLANS, CONDITIONS_COUNT, formatSoles } from '@/lib/plans/data';
import { buildAlternates } from '@/lib/site';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'plans' });
  return {
    title: t('compareTitle'),
    description: t('compareSubtitle'),
    alternates: buildAlternates(locale as Locale, '/planos'),
  };
}

export default async function PlansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'plans' });

  return (
    <>
      <AosInit />
      <Navbar />
      <main className="relative bg-ink pb-28 pt-32">
        <div className="absolute inset-0 bg-grid-lines bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_0%,transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
            {t('eyebrow')}
          </p>
          <h1 className="font-display text-3xl font-semibold text-mist sm:text-4xl">
            {t('compareTitle')}
          </h1>
          <p className="mt-3 max-w-xl text-base text-mist/60">{t('compareSubtitle')}</p>

          {/* Mobile: um card por plano, só com o que está incluído */}
          <div className="mt-10 space-y-5 md:hidden">
            {PLANS.map((plan, planIndex) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-5 ${
                  plan.featured
                    ? 'border-violet-light/50 bg-aurora-gradient-soft'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <p className="font-display text-lg font-semibold text-mist">
                  {t(`items.${plan.id}.title`)}
                </p>
                <p className="mt-1 text-sm text-mist/60">
                  {t('from')}{' '}
                  <span className="font-semibold text-mist">{formatSoles(plan.priceFrom)}</span>
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-mist/60">
                  <Clock size={13} className="text-violet-light" />
                  {t('delivery', { days: plan.deliveryDays })}
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest2 text-mist/50">
                  {t('mobileIncluded')}
                </p>
                <ul className="mt-3 space-y-2">
                  {COMPARISON_ROWS.filter((row) => row.included[planIndex]).map((row) => (
                    <li key={row.id} className="flex gap-2.5 text-sm text-mist/70">
                      <Check size={16} className="mt-0.5 shrink-0 text-violet-light" />
                      {t(`rows.${row.id}`)}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.exampleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-violet-light"
                >
                  {t(`exampleLabels.${plan.exampleKind}`)}
                  <ArrowUpRight size={15} />
                </a>
              </div>
            ))}
          </div>

          {/* Desktop/tablet: tabela comparativa com a primeira coluna fixa */}
          <div className="mt-12 hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="sticky left-0 z-10 bg-ink-900 px-5 py-4 text-left font-medium text-mist/50">
                    {t('feature')}
                  </th>
                  {PLANS.map((plan) => (
                    <th key={plan.id} className="min-w-[140px] px-5 py-4 text-left align-top">
                      <p className="font-display text-sm font-semibold text-mist">
                        {t(`items.${plan.id}.title`)}
                      </p>
                      <p className="mt-1 text-xs font-normal text-mist/60">
                        {t('from')} {formatSoles(plan.priceFrom)}
                      </p>
                      <p className="mt-1 text-xs font-normal text-mist/60">
                        {t('delivery', { days: plan.deliveryDays })}
                      </p>
                      <a
                        href={plan.exampleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-violet-light hover:text-mist"
                      >
                        {t(`exampleLabels.${plan.exampleKind}`)}
                        <ArrowUpRight size={13} />
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.id}
                    className={i % 2 === 0 ? 'bg-white/[0.015]' : ''}
                  >
                    <td className="sticky left-0 z-10 bg-ink-900 px-5 py-3.5 text-mist/70">
                      {t(`rows.${row.id}`)}
                    </td>
                    {row.included.map((included, j) => (
                      <td key={j} className="px-5 py-3.5">
                        {included ? (
                          <Check size={17} className="text-violet-light" />
                        ) : (
                          <Minus size={17} className="text-mist/20" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-mist/50">{t('examplesNote')}</p>

          <div className="mt-8 text-center">
            <Link
              href="/solicitar-projeto"
              className="inline-flex items-center gap-2 rounded-full bg-aurora-gradient px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              {t('requestCta')}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Extras */}
          <div className="mt-24" data-aos="fade-up">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
              {t('extras.eyebrow')}
            </p>
            <h2 className="font-display text-2xl font-semibold text-mist">{t('extras.title')}</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {EXTRAS.map((extraId) => (
                <div
                  key={extraId}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="font-medium text-mist">{t(`extraItems.${extraId}.label`)}</p>
                  <p className="mt-1 text-sm text-mist/50">{t(`extraItems.${extraId}.value`)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Manutenção */}
          <div className="mt-20" data-aos="fade-up">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
              {t('maintenance.eyebrow')}
            </p>
            <h2 className="font-display text-2xl font-semibold text-mist">{t('maintenance.title')}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist/60">
              {t('maintenance.basicNote')}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {MAINTENANCE_PLANS.map((group) => (
                <div key={group.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-medium text-mist">{t(`maintenanceGroups.${group.id}`)}</p>
                  <div className="mt-4 space-y-2.5">
                    {group.tiers.map((tier) => (
                      <div key={tier.id} className="flex items-center justify-between text-sm">
                        <span className="text-mist/60">{t(`maintenanceTiers.${tier.id}`)}</span>
                        <span className="font-semibold text-mist">
                          S/{tier.price}
                          {t('perMonth')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Condições */}
          <div className="mt-20 max-w-2xl" data-aos="fade-up">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
              {t('conditions.eyebrow')}
            </p>
            <h2 className="font-display text-2xl font-semibold text-mist">{t('conditions.title')}</h2>
            <ul className="mt-6 space-y-3">
              {Array.from({ length: CONDITIONS_COUNT }).map((_, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-mist/60">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-light" />
                  {t(`conditions.items.${i}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
