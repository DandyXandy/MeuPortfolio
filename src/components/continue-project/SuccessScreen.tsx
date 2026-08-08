'use client';

import { motion } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const WHATSAPP_NUMBER = '51913056331';

export default function SuccessScreen({ clientName }: { clientName: string }) {
  const t = useTranslations('continueProject');

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
        <Check size={36} className="relative text-white" strokeWidth={3} />
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
        {t('success.subtitle', { name: clientName })}
      </motion.p>

      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-ink-950 transition-transform hover:scale-105"
      >
        <MessageCircle size={18} />
        {t('success.whatsappCta')}
      </motion.a>
    </motion.div>
  );
}
