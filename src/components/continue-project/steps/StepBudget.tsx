'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Coins, Wallet, Banknote, Gem, HelpCircle } from 'lucide-react';
import { BUDGETS, type Budget } from '@/lib/continue-project/options';
import type { ContinueProjectInput } from '@/lib/continue-project/schema';
import OptionCard from '@/components/request-project/ui/OptionCard';

const ICONS: Record<Budget, typeof Coins> = {
  'under-700': Coins,
  '700-1000': Wallet,
  '1000-1500': Wallet,
  '1500-2500': Banknote,
  'over-2500': Gem,
  recommendation: HelpCircle,
};

export default function StepBudget() {
  const t = useTranslations('continueProject');
  const { watch, setValue } = useFormContext<ContinueProjectInput>();
  const selected = watch('budget');

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
        {t('steps.budget.title')}
      </h2>
      <p className="mt-2 text-sm text-mist/50">{t('steps.budget.subtitle')}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BUDGETS.map((budget) => (
          <OptionCard
            key={budget}
            icon={ICONS[budget]}
            title={t(`budgets.${budget}`)}
            selected={selected === budget}
            onClick={() => setValue('budget', budget, { shouldValidate: true })}
          />
        ))}
      </div>
    </div>
  );
}
