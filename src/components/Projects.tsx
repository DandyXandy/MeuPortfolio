'use client';

import { useTranslations } from 'next-intl';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const t = useTranslations('projects');

  return (
    <section id="projetos" className="relative bg-ink py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-16 text-center" data-aos="fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
            {t('eyebrow')}
          </p>
          <h2 className="font-display text-3xl font-semibold text-mist sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-mist/60">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              title={t(`items.${project.id}.title`)}
              description={t(`items.${project.id}.description`)}
              featuredLabel={t('featured')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
