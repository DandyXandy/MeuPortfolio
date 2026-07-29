'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '51913056331';

export default function FloatingWhatsApp() {
  const t = useTranslations('contact');

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('whatsappMessage'))}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-[#25D366]/30"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 -z-10 animate-glow rounded-full bg-[#25D366] blur-md" />
      <MessageCircle size={20} />
      <span className="hidden sm:inline">{t('floatingCta')}</span>
    </motion.a>
  );
}
