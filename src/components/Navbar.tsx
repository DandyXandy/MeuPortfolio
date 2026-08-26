'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, FileDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { profile } from '@/data/profile';
import LocaleSwitcher from './LocaleSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sigue el mismo orden de la Home: proyectos primero (prueba técnica),
  // la parte comercial (Servicios) casi al final.
  const links = [
    { href: '#projetos', label: t('projects') },
    { href: '#sobre', label: t('about') },
    { href: '#skills', label: t('skills') },
    { href: '#planos', label: t('plans') },
    { href: '#contato', label: t('contact') },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-ink/80 py-3 backdrop-blur-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="font-display text-xl tracking-wide text-mist">
          DANDY<span className="text-aurora-gradient">.DEV</span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={`/${link.href}`}
              className="text-sm font-medium tracking-wide text-mist/70 transition-colors hover:text-mist"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full text-mist/60 transition-colors hover:text-mist"
          >
            <Github size={17} />
          </a>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-mist/80 transition-colors hover:border-violet-light/40 hover:text-mist"
          >
            <FileDown size={14} />
            {t('cv')}
          </a>
          <LocaleSwitcher />
          <Link
            href="/solicitar-projeto"
            className="rounded-full bg-aurora-gradient px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            {t('cta')}
          </Link>
        </div>

        <button
          className="-mr-2.5 flex h-11 w-11 items-center justify-center text-mist lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-ink/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  onClick={() => setOpen(false)}
                  className="text-lg text-mist/80 hover:text-mist"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-lg text-mist/80 hover:text-mist"
              >
                <FileDown size={18} />
                {t('cv')}
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-lg text-mist/80 hover:text-mist"
              >
                <Github size={18} />
                {t('github')}
              </a>
              <div className="flex items-center justify-between pt-2">
                <LocaleSwitcher />
                <Link
                  href="/solicitar-projeto"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-aurora-gradient px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {t('cta')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
