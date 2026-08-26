import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import { routing, type Locale } from '@/i18n/routing';
import { SITE_URL, ogLocale } from '@/lib/site';
import '../globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — Dandy Abadie` },
    description,
    icons: {
      icon: '/favicon.svg',
    },
    openGraph: {
      type: 'website',
      siteName: 'Dandy Abadie',
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      locale: ogLocale(locale as Locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink font-sans antialiased">
        {/* reducedMotion="user" hace que TODAS las animaciones de Framer
            Motion en el sitio respeten prefers-reduced-motion del SO
            automáticamente — antes solo el Hero lo chequeaba a mano
            (Navbar, FloatingWhatsApp, los wizards no lo hacían). Las
            animaciones infinitas del Hero (blobs) siguen además con su
            propio check manual, porque acortar la duración no alcanza
            para "apagar" un loop infinito — eso sí necesita quitarse. */}
        <MotionConfig reducedMotion="user">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
