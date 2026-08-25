import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { featuredProjects } from '@/data/projects';
import { SITE_URL } from '@/lib/site';

// Rutas públicas indexables. La página privada /projeto/[token] queda
// afuera a propósito (ya lleva `robots: { index: false }`, y sus
// tokens no deben aparecer nunca en un sitemap público).
const STATIC_PATHS = ['', '/planos', '/solicitar-projeto', '/continuar-projeto'];

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyPaths = featuredProjects
    .filter((p) => p.caseStudy)
    .map((p) => `/projects/${p.caseStudy}`);

  const paths = [...STATIC_PATHS, ...caseStudyPaths];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : path.startsWith('/projects/') ? 0.8 : 0.5,
    }))
  );
}
