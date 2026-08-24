import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Currently from '@/components/Currently';
import Plans from '@/components/Plans';
import RequestProjectCta from '@/components/RequestProjectCta';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import SmoothScroll from '@/components/SmoothScroll';
import AosInit from '@/components/AosInit';

// Orden pensado para "proof before sales": la evidencia técnica (proyectos)
// aparece justo después del Hero, antes de la narrativa personal y muy
// antes de la parte comercial (Plans/wizards), que sigue intacta más abajo.
export default function HomePage() {
  return (
    <SmoothScroll>
      <AosInit />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Currently />
        <Plans />
        <RequestProjectCta />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
