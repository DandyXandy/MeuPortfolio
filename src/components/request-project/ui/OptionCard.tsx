'use client';

import type { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OptionCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
  compact = false,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      className={`card-glow relative flex h-full flex-col gap-2 rounded-2xl border p-5 text-left transition-colors ${
        compact ? 'items-center text-center' : ''
      } ${
        selected
          ? 'border-violet-light/60 bg-aurora-gradient-soft'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20'
      }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-aurora-gradient text-white">
          <Check size={12} strokeWidth={3} />
        </span>
      )}
      {Icon && (
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            selected ? 'bg-aurora-gradient text-white' : 'bg-white/5 text-mist/60'
          }`}
        >
          <Icon size={18} />
        </div>
      )}
      <p className="font-display text-base font-semibold text-mist">{title}</p>
      {description && <p className="text-xs leading-relaxed text-mist/50">{description}</p>}
    </motion.button>
  );
}
