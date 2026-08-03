'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function SuccessScreen() {
  const t = useTranslations('requestProject');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-aurora-gradient"
      >
        <span className="absolute inset-0 animate-glow rounded-full bg-aurora-gradient blur-xl" />
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Check size={36} className="relative text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 font-display text-2xl font-semibold text-mist sm:text-3xl"
      >
        {t('success.title')}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist/60"
      >
        {t('success.subtitle')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-mist transition-colors hover:border-violet-light/40 hover:text-violet-light"
        >
          {t('success.backHome')}
        </Link>
      </motion.div>
    </motion.div>
  );
}
