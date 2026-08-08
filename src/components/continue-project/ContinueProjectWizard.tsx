'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import {
  continueProjectSchema,
  getVisibleSteps,
  STEP_FIELDS,
  type ContinueProjectInput,
  type WizardStep,
} from '@/lib/continue-project/schema';
import StepProgressBar from '@/components/ui/StepProgressBar';
import StepClientInfo from './steps/StepClientInfo';
import StepBusiness from './steps/StepBusiness';
import StepProjectType from './steps/StepProjectType';
import StepProducts from './steps/StepProducts';
import StepFeatures from './steps/StepFeatures';
import StepReferences from './steps/StepReferences';
import StepTimeline from './steps/StepTimeline';
import StepBudget from './steps/StepBudget';
import StepSummary from './steps/StepSummary';
import SuccessScreen from './SuccessScreen';

const STORAGE_KEY = 'continue-project-draft';

const STEP_COMPONENTS: Record<WizardStep, React.ComponentType<any>> = {
  clientInfo: StepClientInfo,
  business: StepBusiness,
  projectType: StepProjectType,
  products: StepProducts,
  features: StepFeatures,
  references: StepReferences,
  timeline: StepTimeline,
  budget: StepBudget,
  summary: StepSummary,
};

const DEFAULT_VALUES: Partial<ContinueProjectInput> = {
  contactName: '',
  companyName: '',
  contactWhatsapp: '',
  contactEmail: '',
  instagram: '',
  currentSite: '',
  businessSegment: undefined,
  businessDescription: '',
  projectType: undefined,
  productCount: undefined,
  features: [],
  paymentGateway: undefined,
  referenceSite: '',
  desiredStyle: '',
  visualReferences: '',
  timeline: undefined,
  budget: undefined,
  website: '',
};

export default function ContinueProjectWizard() {
  const t = useTranslations('continueProject');
  const locale = useLocale();
  const [currentStepId, setCurrentStepId] = useState<WizardStep>('clientInfo');
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStepHint, setShowStepHint] = useState(false);

  const methods = useForm<ContinueProjectInput>({
    resolver: zodResolver(continueProjectSchema),
    mode: 'onChange',
    defaultValues: { ...DEFAULT_VALUES, locale: locale as 'pt' | 'en' | 'es' } as Partial<ContinueProjectInput>,
  });

  // Restaura rascunho salvo no navegador (se existir e for válido).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) methods.reset({ ...JSON.parse(saved), locale: locale as 'pt' | 'en' | 'es' });
    } catch {
      // rascunho corrompido ou indisponível — ignora e segue com o formulário vazio
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Salva o rascunho a cada mudança, pra não perder nada se o
  // visitante fechar a aba no meio do preenchimento.
  const watchedValues = methods.watch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
      } catch {
        // storage cheio ou bloqueado — sem problema, é só uma conveniência
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [watchedValues]);

  const projectType = methods.watch('projectType');
  const visibleSteps = useMemo(() => getVisibleSteps(projectType), [projectType]);

  // Se a etapa "produtos" some da lista (o cliente trocou de tipo de
  // projeto pra um sem produtos) e era onde ele estava, avança sozinho.
  useEffect(() => {
    if (!visibleSteps.includes(currentStepId)) {
      setCurrentStepId('features');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleSteps]);

  const stepIndex = Math.max(0, visibleSteps.indexOf(currentStepId));
  const StepComponent = STEP_COMPONENTS[currentStepId];

  const stepLabels: Record<WizardStep, string> = {
    clientInfo: t('progress.clientInfo'),
    business: t('progress.business'),
    projectType: t('progress.projectType'),
    products: t('progress.products'),
    features: t('progress.features'),
    references: t('progress.references'),
    timeline: t('progress.timeline'),
    budget: t('progress.budget'),
    summary: t('progress.summary'),
  };

  function goTo(index: number, dir: 1 | -1) {
    setDirection(dir);
    setCurrentStepId(visibleSteps[index]);
    setShowStepHint(false);
  }

  async function handleNext() {
    const fields = STEP_FIELDS[currentStepId];
    const valid = fields.length === 0 || (await methods.trigger(fields));
    if (valid && stepIndex < visibleSteps.length - 1) {
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
    const index = visibleSteps.indexOf(step);
    if (index >= 0) goTo(index, -1);
  }

  async function onSubmit(data: ContinueProjectInput) {
    setSubmitError(null);

    if (data.website) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/continue-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('request-failed');

      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ok deixar o rascunho pra trás nesse caso
      }
      setSubmitted(true);
    } catch {
      setSubmitError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return <SuccessScreen clientName={methods.getValues('contactName')} />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          {...methods.register('website')}
        />

        <StepProgressBar
          steps={visibleSteps}
          currentStep={currentStepId}
          labels={stepLabels}
          onStepClick={handleStepClick}
        />

        <div className="relative mt-8 min-h-[420px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStepId}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentStepId === 'summary' ? (
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

        {showStepHint && currentStepId !== 'summary' && (
          <p className="mt-4 flex items-center gap-2 text-sm text-red-300">
            <AlertCircle size={15} />
            {t('selectRequired')}
          </p>
        )}

        {currentStepId !== 'summary' && (
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

        {currentStepId === 'summary' && stepIndex > 0 && (
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
