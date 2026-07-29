'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, Linkedin, Github } from 'lucide-react';

const WHATSAPP_NUMBER = '51913056331';
const EMAIL = 'dandyabadie12@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/dandy-abadie-atoche-32b119336/';
const GITHUB_URL = 'https://github.com/DandyXandy';

export default function Contact() {
  const t = useTranslations('contact');

  const channels = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+51 913 056 331',
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('whatsappMessage'))}`,
      highlight: true,
    },
    {
      icon: Mail,
      label: 'Email',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'dandy-abadie-atoche',
      href: LINKEDIN_URL,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'DandyXandy',
      href: GITHUB_URL,
    },
  ];

  return (
    <section id="contato" className="relative overflow-hidden bg-ink py-28">
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-violet-light"
          data-aos="fade-up"
        >
          {t('eyebrow')}
        </p>
        <h2
          className="font-display text-3xl font-semibold text-mist sm:text-4xl"
          data-aos="fade-up"
        >
          {t('title')}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-mist/60" data-aos="fade-up">
          {t('subtitle')}
        </p>

        <div
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {channels.map(({ icon: Icon, label, value, href, highlight }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-glow flex items-center gap-4 rounded-2xl border p-5 text-left transition-transform hover:-translate-y-1 ${
                highlight
                  ? 'border-violet-light/40 bg-aurora-gradient-soft'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-aurora-gradient text-white">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest2 text-mist/40">{label}</p>
                <p className="mt-1 font-medium text-mist">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
