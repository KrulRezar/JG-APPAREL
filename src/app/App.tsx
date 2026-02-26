import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Gallery } from './components/Gallery';
import { CoreModules } from './components/CoreModules';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div 
      className="min-h-screen"
      style={{ 
        scrollSnapType: 'y mandatory',
        overflowY: 'scroll',
        height: '100vh',
      }}
    >
      <Navbar />
      <Hero />
      <TechMarquee />
      <Gallery />
      <CoreModules />
      <Footer />
    </div>
  );
}
