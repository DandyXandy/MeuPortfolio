import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Páginas privadas por token de cliente — no deben indexarse ni
      // rastrearse aunque alguien encuentre un link viejo.
      disallow: ['/*/projeto/', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
