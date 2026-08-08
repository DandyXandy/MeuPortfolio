import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Venture from '@/components/Venture';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Plans from '@/components/Plans';
import RequestProjectCta from '@/components/RequestProjectCta';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import SmoothScroll from '@/components/SmoothScroll';
import AosInit from '@/components/AosInit';

export default function HomePage() {
  return (
    <SmoothScroll>
      <AosInit />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Venture />
        <Skills />
        <Projects />
        <Plans />
        <RequestProjectCta />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
