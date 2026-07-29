'use client';

import { useTranslations } from 'next-intl';

const categories = [
  {
    key: 'backend',
    items: ['Java', 'Spring Boot', 'Node.js', 'PostgreSQL', 'Prisma'],
  },
  {
    key: 'frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    key: 'mobile',
    items: ['React Native', 'Expo'],
  },
  {
    key: 'tools',
    items: ['Git & GitHub', 'Vercel', 'NextAuth', 'REST APIs', 'Figma'],
  },
];

const terminalLines = [
  '> whoami',
  'dandy_abadie — full-stack developer',
  '',
  '> stack --list',
  '[backend]  java · spring boot · postgresql',
  '[frontend] react · next.js · typescript',
  '[mobile]   react native',
  '',
  '> status',
  'sempre aprendendo, sempre construindo_',
];

export default function Skills() {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="relative bg-ink-900 bg-ink py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-16 text-center" data-aos="fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
            {t('eyebrow')}
          </p>
          <h2 className="font-display text-3xl font-semibold text-mist sm:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-3" data-aos="fade-up">
            {categories.map((cat) => (
              <div
                key={cat.key}
                className="card-glow rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="mb-4 text-sm font-semibold text-mist">{t(`categories.${cat.key}`)}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="lg:col-span-2"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-950 shadow-2xl shadow-violet/10">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-mist/40">dandy@portfolio ~ %</span>
              </div>
              <pre className="whitespace-pre-wrap px-5 py-6 font-mono text-[13px] leading-relaxed text-mist/80">
                {terminalLines.map((line, i) => (
                  <span key={i} className={line.startsWith('>') ? 'text-violet-light' : ''}>
                    {line}
                    {'\n'}
                  </span>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
