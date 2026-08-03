'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function RequestProjectCta() {
  const t = useTranslations('requestProjectCta');

  return (
    <section className="relative bg-ink py-6">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div
          className="card-glow relative overflow-hidden rounded-3xl border border-violet-light/30 bg-gradient-to-br from-white/[0.05] to-transparent p-8 text-center sm:p-14"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="relative">
            <span className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-violet-light/40 bg-aurora-gradient-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
              <Sparkles size={13} />
              {t('badge')}
            </span>
            <h2 className="mx-auto max-w-2xl font-display text-2xl font-semibold text-mist sm:text-3xl">
              {t('title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mist/60 sm:text-base">
              {t('subtitle')}
            </p>
            <Link
              href="/solicitar-projeto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-aurora-gradient px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              {t('cta')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
