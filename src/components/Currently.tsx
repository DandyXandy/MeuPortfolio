import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Currently() {
  const t = await getTranslations('currently');
  const tVenture = await getTranslations('venture');
  const items = t.raw('items') as string[];

  return (
    <section id="agora" className="relative bg-ink py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-md text-center" data-aos="fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-violet-light">
            {t('eyebrow')}
          </p>
          <h2 className="font-display text-2xl font-semibold text-mist">{t('title')}</h2>

          <ul className="mt-6 flex flex-col gap-2.5 text-left">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-mist/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-light" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="card-glow mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 rounded-2xl border border-gold/20 bg-gradient-to-br from-white/[0.03] to-transparent p-5 sm:flex-row sm:p-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink-950">
            <Image
              src="/branding/exitocoach-logo.png"
              alt="ExitoCoach"
              width={675}
              height={900}
              className="h-full w-full object-contain p-2"
            />
          </div>

          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest2 text-gold">
              {tVenture('badge')}
            </span>
            <h3 className="mt-2 font-display text-base font-semibold text-mist">{tVenture('title')}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-mist/50">{tVenture('description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
