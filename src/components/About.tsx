'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, CalendarDays, MapPin, Languages, Code2 } from 'lucide-react';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { icon: GraduationCap, label: t('stats.university.label'), value: t('stats.university.value') },
    { icon: CalendarDays, label: t('stats.cycle.label'), value: t('stats.cycle.value') },
    { icon: MapPin, label: t('stats.location.label'), value: t('stats.location.value') },
    { icon: Languages, label: t('stats.languages.label'), value: t('stats.languages.value') },
    { icon: Code2, label: t('stats.focus.label'), value: t('stats.focus.value') },
  ];

  const softSkills = t.raw('softSkills') as string[];
  const courses = t.raw('courses') as string[];

  return (
    <section id="sobre" className="relative bg-ink py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
            {t('eyebrow')}
          </p>
          <h2 className="font-display text-3xl font-semibold text-mist sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist/70">{t('paragraph')}</p>
        </div>

        <div
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="card-glow flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aurora-gradient-soft text-violet-light">
                <Icon size={18} />
              </div>
              <p className="text-[11px] uppercase tracking-widest2 text-mist/60">{label}</p>
              <p className="font-display text-sm text-mist">{value}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {softSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-mist/70"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="200">
          <p className="mb-3 text-[11px] uppercase tracking-widest2 text-mist/50">
            {t('coursesLabel')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {courses.map((course) => (
              <span
                key={course}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] text-mist/60"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
