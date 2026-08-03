'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import {
  requestProjectSchema,
  WIZARD_STEPS,
  STEP_FIELDS,
  type RequestProjectInput,
  type WizardStep,
} from '@/lib/request-project/schema';
import ProgressBar from './ProgressBar';
import StepProjectType from './steps/StepProjectType';
import StepInfo from './steps/StepInfo';
import StepDesign from './steps/StepDesign';
import StepFeatures from './steps/StepFeatures';
import StepTimeline from './steps/StepTimeline';
import StepBudget from './steps/StepBudget';
import StepContact from './steps/StepContact';
import StepSummary from './steps/StepSummary';
import SuccessScreen from './SuccessScreen';

const STEP_COMPONENTS: Record<WizardStep, React.ComponentType<any>> = {
  projectType: StepProjectType,
  info: StepInfo,
  design: StepDesign,
  features: StepFeatures,
  timeline: StepTimeline,
  budget: StepBudget,
  contact: StepContact,
  summary: StepSummary,
};

export default function RequestProjectWizard() {
  const t = useTranslations('requestProject');
  const locale = useLocale();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStepHint, setShowStepHint] = useState(false);

  const methods = useForm<RequestProjectInput>({
    resolver: zodResolver(requestProjectSchema),
    mode: 'onChange',
    defaultValues: {
      projectType: undefined,
      info: {},
      designStyles: [],
      designReference: '',
      features: [],
      timeline: undefined,
      budget: undefined,
      contactName: '',
      contactCompany: '',
      contactEmail: '',
      contactWhatsapp: '',
      preferredContact: undefined,
      locale: locale as 'pt' | 'en' | 'es',
      website: '',
    } as Partial<RequestProjectInput>,
  });

  const currentStep = WIZARD_STEPS[stepIndex];
  const StepComponent = STEP_COMPONENTS[currentStep];

  const stepLabels: Record<WizardStep, string> = {
    projectType: t('progress.projectType'),
    info: t('progress.info'),
    design: t('progress.design'),
    features: t('progress.features'),
    timeline: t('progress.timeline'),
    budget: t('progress.budget'),
    contact: t('progress.contact'),
    summary: t('progress.summary'),
  };

  async function goTo(index: number, dir: 1 | -1) {
    setDirection(dir);
    setStepIndex(index);
    setShowStepHint(false);
  }

  async function handleNext() {
    const fields = STEP_FIELDS[currentStep];
    const valid = fields.length === 0 || (await methods.trigger(fields));
    if (valid && stepIndex < WIZARD_STEPS.length - 1) {
      goTo(stepIndex + 1, 1);
    } else if (!valid) {
      setShowStepHint(true);
    }
  }

  function handleBack() {
    if (stepIndex > 0) goTo(stepIndex - 1, -1);
  }

  function handleStepClick(_step: WizardStep, index: number) {
    goTo(index, index > stepIndex ? 1 : -1);
  }

  function handleEditFromSummary(step: WizardStep) {
    const index = WIZARD_STEPS.indexOf(step);
    goTo(index, -1);
  }

  async function onSubmit(data: RequestProjectInput) {
    setSubmitError(null);

    if (data.website) {
      // honeypot preenchido -> provável bot, finge sucesso e não faz nada
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/request-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('request-failed');

      setSubmitted(true);
    } catch {
      setSubmitError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return <SuccessScreen />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* honeypot anti-spam, escondido para humanos */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          {...methods.register('website')}
        />

        <ProgressBar currentStep={currentStep} labels={stepLabels} onStepClick={handleStepClick} />

        <div className="relative mt-8 min-h-[420px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentStep === 'summary' ? (
                <StepSummary onEdit={handleEditFromSummary} isSubmitting={isSubmitting} />
              ) : (
                <StepComponent />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {submitError && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle size={16} />
            {submitError}
          </div>
        )}

        {showStepHint && currentStep !== 'summary' && (
          <p className="mt-4 flex items-center gap-2 text-sm text-red-300">
            <AlertCircle size={15} />
            {t('selectRequired')}
          </p>
        )}

        {currentStep !== 'summary' && (
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={stepIndex === 0}
              className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-mist/70 transition-colors hover:text-mist disabled:opacity-0"
            >
              <ArrowLeft size={16} />
              {t('back')}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 rounded-full bg-aurora-gradient px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              {t('next')}
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {currentStep === 'summary' && stepIndex > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-mist/50 transition-colors hover:text-mist"
          >
            <ArrowLeft size={16} />
            {t('back')}
          </button>
        )}
      </form>
    </FormProvider>
  );
}
