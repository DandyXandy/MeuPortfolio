import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import AosInit from '@/components/AosInit';
import { projects, featuredProjects } from '@/data/projects';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    featuredProjects
      .filter((p) => p.caseStudy)
      .map((p) => ({ locale, slug: p.caseStudy as string }))
  );
}

function getProject(slug: string) {
  return featuredProjects.find((p) => p.caseStudy === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: 'projects' });
  const tCase = await getTranslations({ locale, namespace: 'caseStudies' });

  return {
    title: `${t(`items.${project.id}.title`)} — Dandy Abadie`,
    description: tCase(`${slug}.overview`),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);

  const t = await getTranslations({ locale, namespace: 'projects' });
  const tc = await getTranslations({ locale, namespace: 'caseStudy' });

  if (!project) {
    return (
      <div className="relative min-h-screen bg-ink">
        <AosInit />
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-2xl font-semibold text-mist sm:text-3xl">
            {tc('notFound.title')}
          </h1>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-mist transition-colors hover:border-violet-light/40 hover:text-violet-light"
          >
            {tc('notFound.backHome')}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const tcs = await getTranslations({ locale, namespace: `caseStudies.${slug}` });
  const keyFeatures = tcs.raw('keyFeatures') as string[];
  const engineeringDecisions = tcs.raw('engineeringDecisions') as string[];

  const sections = [
    { label: tc('problem'), body: tcs('problem') },
    { label: tc('solution'), body: tcs('solution') },
    { label: tc('responsibilities'), body: tcs('responsibilities') },
    { label: tc('architecture'), body: tcs('architecture') },
  ];

  return (
    <div className="relative min-h-screen bg-ink">
      <AosInit />
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_0%,transparent_70%)]" />
      <Navbar />

      <main className="relative mx-auto max-w-3xl px-6 pb-28 pt-32 lg:px-10">
        <Link
          href="/#projetos"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-mist/50 transition-colors hover:text-mist"
        >
          <ArrowLeft size={14} />
          {tc('backToProjects')}
        </Link>

        <div className="flex flex-wrap items-center gap-3" data-aos="fade-up">
          <span className="rounded-full bg-aurora-gradient px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-white">
            {t('featured')}
          </span>
          <span className="font-mono text-xs text-mist/50">
            {tc('year')} · {project.year}
          </span>
        </div>

        <h1
          className="mt-4 font-display text-3xl font-semibold text-mist sm:text-4xl"
          data-aos="fade-up"
        >
          {t(`items.${project.id}.title`)}
        </h1>

        <p className="mt-3 text-xs uppercase tracking-widest2 text-mist/50" data-aos="fade-up">
          {tc('role')} — {tc('roleValue')}
        </p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist/70" data-aos="fade-up">
          {tcs('overview')}
        </p>

        <div className="mt-6 flex flex-wrap gap-2" data-aos="fade-up">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-mist/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4" data-aos="fade-up">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-aurora-gradient px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <ExternalLink size={15} />
            {tc('viewLive')}
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-mist transition-colors hover:border-violet-light/40 hover:text-violet-light"
            >
              <Github size={15} />
              {tc('viewCode')}
            </a>
          )}
        </div>

        <div className="mt-16 flex flex-col gap-12">
          {sections.map((section) => (
            <div key={section.label} data-aos="fade-up">
              <h2 className="mb-3 font-display text-xl font-semibold text-mist">
                {section.label}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-mist/70">{section.body}</p>
            </div>
          ))}

          <div data-aos="fade-up">
            <h2 className="mb-4 font-display text-xl font-semibold text-mist">
              {tc('keyFeatures')}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {keyFeatures.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-mist/70">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-light"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {engineeringDecisions.length > 0 && (
            <div data-aos="fade-up">
              <h2 className="mb-4 font-display text-xl font-semibold text-mist">
                {tc('engineeringDecisions')}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {engineeringDecisions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-mist/70">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-light"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6"
            data-aos="fade-up"
          >
            <h2 className="mb-2 font-display text-base font-semibold text-mist/80">
              {tc('challenges')}
            </h2>
            <p className="text-sm italic leading-relaxed text-mist/60">
              {tc('challengesPending')}
            </p>
          </div>

          <div
            className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6"
            data-aos="fade-up"
          >
            <h2 className="mb-2 font-display text-base font-semibold text-mist/80">
              {tc('whatLearned')}
            </h2>
            <p className="text-sm italic leading-relaxed text-mist/60">
              {tc('whatLearnedPending')}
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
