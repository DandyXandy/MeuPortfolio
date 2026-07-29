'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const labels: Record<string, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
};

export default function LocaleSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm ${className}`}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors ${
            loc === locale
              ? 'bg-aurora-gradient text-white'
              : 'text-mist/60 hover:text-mist'
          }`}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
