'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AosInit() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    AOS.init({
      duration: prefersReducedMotion ? 0 : 900,
      once: true,
      offset: 60,
      easing: 'ease-out-cubic',
      disable: prefersReducedMotion,
    });
  }, []);

  return null;
}
