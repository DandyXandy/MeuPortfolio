'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Venture() {
  const t = useTranslations('venture');

  return (
    <section className="relative bg-ink py-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div
          className="card-glow flex flex-col items-center gap-8 rounded-3xl border border-gold/20 bg-gradient-to-br from-white/[0.04] to-transparent p-8 sm:flex-row sm:p-10"
          data-aos="fade-up"
        >
          <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-ink-950">
            <Image
              src="/branding/exitocoach-logo.png"
              alt="ExitoCoach"
              width={675}
              height={900}
              className="h-full w-full object-contain p-3"
            />
          </div>

          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-gold">
              {t('badge')}
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-mist">
              {t('title')}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist/60">
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
