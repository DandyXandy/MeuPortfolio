import { generateOgImage, ogImageSize, ogImageContentType } from '@/lib/og/generate';

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = 'Dandy Abadie — Full-Stack Developer';

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateOgImage(locale);
}
