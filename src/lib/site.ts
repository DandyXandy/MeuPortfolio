// Constantes de SEO/metadata compartidas — una sola fuente de verdad
// para la URL canónica del sitio, evita hardcodear "portfoliodandy.com"
// en cada archivo que genera metadata.

import { routing, type Locale } from '@/i18n/routing';
import { profile } from '@/data/profile';

export const SITE_URL = 'https://portfoliodandy.com';

const OG_LOCALES: Record<Locale, string> = {
  pt: 'pt_BR',
  es: 'es_PE',
  en: 'en_US',
};

export function ogLocale(locale: Locale) {
  return OG_LOCALES[locale];
}

// Dado un path sin locale (ej: "/", "/planos", "/projects/ironmind"),
// arma el canonical del locale actual + el mapa hreflang de los 3
// idiomas, para pasarlo directo a `alternates` en generateMetadata.
export function buildAlternates(locale: Locale, path: string) {
  const clean = path === '/' ? '' : path;

  return {
    canonical: `${SITE_URL}/${locale}${clean}`,
    languages: Object.fromEntries([
      ...routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}${clean}`]),
      ['x-default', `${SITE_URL}/${routing.defaultLocale}${clean}`],
    ]),
  };
}

// Solo datos reales/verificados (nombre, universidad, redes) — nada de
// metricas, empleadores o rating inventados.
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.fullName,
    alternateName: profile.professionalName,
    url: SITE_URL,
    image: `${SITE_URL}/${routing.defaultLocale}/opengraph-image`,
    jobTitle: 'Full-Stack Developer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Piura',
      addressCountry: 'PE',
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: profile.university,
    },
    knowsLanguage: profile.languages.map((l) => l.code),
    sameAs: [profile.githubUrl, profile.linkedinUrl],
  };
}
