// src/pages/LandingPage.tsx
import { Hero } from '../components/landing/Hero';
import { TechMarquee } from '../components/landing/TechMarquee';
import { Gallery } from '../components/landing/Gallery';
import { CoreModules } from '../components/landing/CoreModules';
import { Footer } from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Gallery />
      <CoreModules />
      <Footer />
    </>
  );
};

export default LandingPage;