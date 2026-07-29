'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const badges = ['Java', 'Spring Boot', 'React', 'React Native', 'Next.js', 'PostgreSQL'];

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
      <div className="absolute inset-0 bg-radial-fade" />

      <motion.div
        className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-azure/20 blur-[100px]"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-16 bottom-16 h-80 w-80 rounded-full bg-magenta/20 blur-[110px]"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest2 text-violet-light"
        >
          {t('eyebrow')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-4xl font-semibold leading-tight text-mist sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t('headlinePre')}{' '}
          <span className="text-aurora-gradient">{t('headlineName')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-mist/70 sm:text-lg"
        >
          {t('subheadline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projetos"
            className="w-full rounded-full bg-aurora-gradient px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105 sm:w-auto"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href="#contato"
            className="w-full rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-mist transition-colors hover:border-violet-light hover:text-violet-light sm:w-auto"
          >
            {t('ctaSecondary')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] text-mist/60"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-mist/50"
      >
        <span className="text-[10px] uppercase tracking-widest2">{t('scroll')}</span>
        <ChevronDown size={18} className="text-violet-light" />
      </motion.div>
    </section>
  );
}
