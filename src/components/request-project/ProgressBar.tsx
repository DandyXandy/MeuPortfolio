'use client';

import { Check } from 'lucide-react';
import { WIZARD_STEPS, type WizardStep } from '@/lib/request-project/schema';

export default function ProgressBar({
  currentStep,
  labels,
  onStepClick,
}: {
  currentStep: WizardStep;
  labels: Record<WizardStep, string>;
  onStepClick: (step: WizardStep, index: number) => void;
}) {
  const currentIndex = WIZARD_STEPS.indexOf(currentStep);

  return (
    <div className="w-full overflow-x-auto pb-2">
      <ol className="flex min-w-max items-center gap-1.5 sm:gap-2">
        {WIZARD_STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isClickable = index <= currentIndex;

          return (
            <li key={step} className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step, index)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  isCurrent
                    ? 'border-violet-light/60 bg-aurora-gradient-soft text-mist'
                    : isDone
                      ? 'border-white/15 text-mist/60 hover:text-mist'
                      : 'border-white/5 text-mist/25'
                }`}
              >
                {isDone ? (
                  <Check size={13} className="text-violet-light" />
                ) : (
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                      isCurrent ? 'bg-aurora-gradient text-white' : 'bg-white/10'
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
                <span className="hidden sm:inline">{labels[step]}</span>
              </button>
              {index < WIZARD_STEPS.length - 1 && (
                <span className="h-px w-3 bg-white/10 sm:w-6" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
