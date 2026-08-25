import { getTranslations } from 'next-intl/server';
import { MessageCircle, Mail, Linkedin, Github } from 'lucide-react';
import { profile, mailtoLink } from '@/data/profile';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  const socials = [
    { icon: MessageCircle, href: `https://wa.me/${profile.whatsappNumber}`, label: 'WhatsApp' },
    { icon: Mail, href: mailtoLink(), label: 'Email' },
    { icon: Linkedin, href: profile.linkedinUrl, label: 'LinkedIn' },
    { icon: Github, href: profile.githubUrl, label: 'GitHub' },
  ];

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center lg:px-10">
        <p className="font-display text-xl text-mist">
          DANDY<span className="text-aurora-gradient">.DEV</span>
        </p>

        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mist/60 transition-colors hover:border-violet-light/40 hover:text-violet-light"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>

        <p className="text-xs text-mist/60">
          © {year} {profile.fullName}. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
