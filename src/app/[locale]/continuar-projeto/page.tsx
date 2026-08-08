import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import ContinueProjectWizard from '@/components/continue-project/ContinueProjectWizard';
import AosInit from '@/components/AosInit';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'continueProject' });

  return {
    title: `${t('title')} — Dandy Abadie`,
    description: t('subtitle'),
  };
}

export default async function ContinueProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'continueProject' });

  return (
    <div className="relative min-h-screen bg-ink py-16">
      <AosInit />
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-radial-fade" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-mist/50 transition-colors hover:text-mist"
        >
          ← Dandy Abadie
        </Link>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold">
          {t('eyebrow')}
        </p>
        <h1 className="font-display text-3xl font-semibold text-mist sm:text-4xl">{t('title')}</h1>
        <p className="mt-3 max-w-xl text-base text-mist/60">{t('subtitle')}</p>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm sm:p-10">
          <ContinueProjectWizard />
        </div>
      </div>
    </div>
  );
}
