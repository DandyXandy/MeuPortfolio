import { ImageResponse } from 'next/og';
import type { Locale } from '@/i18n/routing';
import { profile } from '@/data/profile';

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = 'image/png';

const TAGLINES: Record<Locale, string> = {
  pt: 'Full-Stack Developer · Estudante de Engenharia de Sistemas',
  es: 'Full-Stack Developer · Estudiante de Ingeniería de Sistemas',
  en: 'Full-Stack Developer · Systems Engineering Student',
};

// Imagen de Open Graph / Twitter Card generada por código (Satori/ImageResponse),
// no un asset estático — no había ningún logo/branding propio del portfolio
// del que partir, así que se reconstruye la identidad visual del sitio
// (fondo casi negro, blobs de gradiente aurora) directamente acá.
export function generateOgImage(locale: string) {
  const tagline = TAGLINES[locale as Locale] ?? TAGLINES.pt;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: '#05050A',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -140,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: '#3B82F6',
            opacity: 0.35,
            filter: 'blur(120px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background: '#D946EF',
            opacity: 0.3,
            filter: 'blur(130px)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 24px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.14)',
            color: '#A78BFA',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          Full-Stack Developer
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 108,
            fontWeight: 700,
            color: '#F2F3F8',
            letterSpacing: -2,
          }}
        >
          {profile.professionalName}
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: 'rgba(242,243,248,0.7)',
            textAlign: 'center',
            maxWidth: 860,
          }}
        >
          {tagline}
        </div>

        <div
          style={{
            marginTop: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 24,
            color: 'rgba(242,243,248,0.4)',
            fontFamily: 'monospace',
          }}
        >
          portfoliodandy.com
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
