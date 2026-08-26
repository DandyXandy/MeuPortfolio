'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respeta la preferencia del sistema: con reduced motion activado, se
    // deja el scroll nativo del navegador en vez de suavizarlo con JS.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Lenis maneja el scroll de forma virtual, así que un salto nativo a
    // un #hash no mueve su posición interna — hay que pedírselo a mano.
    // Se usa `immediate: true`: la animación suave depende de que el loop
    // de raf ya esté corriendo de forma estable, algo que no siempre pasa
    // en el primer instante tras un montaje/navegación — un salto directo
    // es menos vistoso pero nunca falla en quedarse pegado en el lugar.
    function scrollToHash(hash: string) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) lenis.scrollTo(target, { immediate: true });
    }

    // Caso 1: se llega a esta página ya con el hash en la URL (ej. desde
    // el Navbar en /planos hacia "/#sobre" — la navegación entre rutas
    // recién montó esta página). Un pequeño delay evita pedirle a Lenis
    // que scrollee antes de terminar de medir el layout recién montado.
    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash), 100);
    }

    // Caso 2: se hace click en un link con #hash ya estando en esta misma
    // página. Next.js navega con `history.pushState`, que a diferencia de
    // cambiar `location.hash` a mano NO dispara el evento `hashchange` del
    // navegador — por eso se intercepta el click directamente en vez de
    // depender de ese evento.
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement)?.closest('a[href*="#"]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      const target = document.getElementById(hash.replace('#', ''));
      // Solo se intercepta si la sección ya existe en esta página — si no
      // (ej. viniendo de otra ruta), se deja que Next.js navegue normal y
      // el Caso 1 se encarga en la página de destino.
      if (target) {
        e.preventDefault();
        history.replaceState(null, '', hash);
        lenis.scrollTo(target, { immediate: true });
      }
    }
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
