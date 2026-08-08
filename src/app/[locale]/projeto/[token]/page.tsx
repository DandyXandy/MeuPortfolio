import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MessageCircle, FileText } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AosInit from '@/components/AosInit';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { adaptRowToInput, type ProjectBriefingRow } from '@/lib/continue-project/adaptRow';
import { buildContinueProjectBriefData } from '@/lib/continue-project/buildBriefData';

const WHATSAPP_NUMBER = '51913056331';
const STATUS_VALUES = ['received', 'in_review', 'proposal_sent', 'approved'] as const;

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Seu Projeto — Dandy Abadie', robots: { index: false, follow: false } };
}

async function getBriefing(token: string) {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('project_briefings')
      .select('*')
      .eq('token', token)
      .single();

    if (error || !data) return null;
    return data as ProjectBriefingRow;
  } catch {
    return null;
  }
}

export default async function ProjectTokenPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  const localeTyped = locale as 'pt' | 'en' | 'es';
  const t = await getTranslations({ locale, namespace: 'projectPage' });
  const row = await getBriefing(token);

  if (!row) {
    return (
      <div className="relative min-h-screen bg-ink">
        <AosInit />
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <FileText size={40} className="mb-6 text-mist/30" />
          <h1 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
            {t('notFound.title')}
          </h1>
          <p className="mt-3 max-w-md text-sm text-mist/60">{t('notFound.subtitle')}</p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-mist transition-colors hover:border-violet-light/40 hover:text-violet-light"
          >
            {t('notFound.backHome')}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const briefData = await buildContinueProjectBriefData(adaptRowToInput(row, localeTyped));
  const status = STATUS_VALUES.includes(row.status as (typeof STATUS_VALUES)[number])
    ? row.status
    : 'received';

  return (
    <div className="relative min-h-screen bg-ink pb-20">
      <AosInit />
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_0%,transparent_70%)]" />
      <Navbar />

      <main className="relative mx-auto max-w-3xl px-6 pt-32 lg:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold">
          {t('eyebrow')}
        </p>
        <h1 className="font-display text-3xl font-semibold text-mist sm:text-4xl">
          {t('greeting', { name: row.contact_name.split(' ')[0] })}
        </h1>
        <p className="mt-3 max-w-xl text-base text-mist/60">{t('subtitle')}</p>

        <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <span className="text-sm text-mist/50">{t('statusLabel')}</span>
          <span className="rounded-full bg-aurora-gradient px-4 py-1.5 text-xs font-semibold text-white">
            {t(`status.${status}`)}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {briefData.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
                {section.title}
              </p>
              <div className="space-y-2 text-sm">
                {section.rows.map((row) => (
                  <div key={row.label}>
                    <span className="text-mist/50">{row.label}: </span>
                    <span className="text-mist/85">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="text-sm text-mist/60">{t('helpText')}</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-ink-950 transition-transform hover:scale-105"
          >
            <MessageCircle size={18} />
            {t('whatsappCta')}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
