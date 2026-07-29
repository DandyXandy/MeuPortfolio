import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, Linkedin, Github } from 'lucide-react';

const WHATSAPP_NUMBER = '51913056331';
const EMAIL = 'dandyabadie12@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/dandy-abadie-atoche-32b119336/';
const GITHUB_URL = 'https://github.com/DandyXandy';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const socials = [
    { icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: 'WhatsApp' },
    { icon: Mail, href: `mailto:${EMAIL}`, label: 'Email' },
    { icon: Linkedin, href: LINKEDIN_URL, label: 'LinkedIn' },
    { icon: Github, href: GITHUB_URL, label: 'GitHub' },
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

        <p className="text-xs text-mist/40">
          © {year} Dandy Abadie Atoche. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
