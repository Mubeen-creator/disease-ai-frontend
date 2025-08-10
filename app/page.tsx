import { Header } from '@/components/common/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { About } from '@/components/landing/About';
import { Testimonials } from '@/components/landing/Testimonials';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <Footer />
    </main>
  );
}