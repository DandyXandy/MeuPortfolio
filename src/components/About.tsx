'use client';

import { useTranslations } from 'next-intl';
import { MapPin, GraduationCap, Sparkles } from 'lucide-react';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { icon: MapPin, label: t('originLabel'), value: t('originValue') },
    { icon: GraduationCap, label: t('studyLabel'), value: t('studyValue') },
    { icon: Sparkles, label: t('driveLabel'), value: t('driveValue') },
  ];

  return (
    <section id="sobre" className="relative bg-ink py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-5 lg:px-10">
        <div className="lg:col-span-3" data-aos="fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
            {t('eyebrow')}
          </p>
          <h2 className="font-display text-3xl font-semibold text-mist sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist/70">
            {t('paragraph1')}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-mist/70">
            {t('paragraph2')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:col-span-2" data-aos="fade-up" data-aos-delay="150">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="card-glow flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aurora-gradient-soft text-violet-light">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest2 text-mist/40">{label}</p>
                <p className="mt-1 font-display text-lg text-mist">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
