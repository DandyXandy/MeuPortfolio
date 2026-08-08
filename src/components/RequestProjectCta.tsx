'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles, MessageCircleMore } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function RequestProjectCta() {
  const t = useTranslations('requestProjectCta');

  return (
    <section className="relative bg-ink py-6">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <p
          className="mb-6 text-center text-xs font-semibold uppercase tracking-widest2 text-violet-light"
          data-aos="fade-up"
        >
          {t('eyebrow')}
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Novo cliente */}
          <div
            className="card-glow relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8"
            data-aos="fade-up"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-mist/50">
              <Sparkles size={12} />
              {t('newClient.badge')}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-mist">
              {t('newClient.title')}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist/60">{t('newClient.subtitle')}</p>
            <Link
              href="/solicitar-projeto"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-aurora-gradient px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              {t('newClient.cta')}
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Já conversamos */}
          <div
            className="card-glow relative overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-white/[0.04] to-transparent p-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-gold">
              <MessageCircleMore size={12} />
              {t('existingClient.badge')}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-mist">
              {t('existingClient.title')}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist/60">
              {t('existingClient.subtitle')}
            </p>
            <Link
              href="/continuar-projeto"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
            >
              {t('existingClient.cta')}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
