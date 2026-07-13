import { ThemeController } from './components/ThemeController';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { QuickContact } from './components/QuickContact';
import { About } from './components/About';
import { Watch } from './components/Watch';
import { SunsetSessions } from './components/SunsetSessions';
import { Experience } from './components/Experience';
import { Gigs } from './components/Gigs';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Tech } from './components/Tech';
import { Footer } from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <ThemeController>
        <div className="min-h-screen">
          <Navigation />
          <main>
            <Hero />
            <About />
            <QuickContact />
            <Watch />
            <SunsetSessions />
            <Experience />
            <Gigs />
            <Gallery />
            <Contact />
            <Tech />
          </main>
          
          <Footer />
        </div>
      </ThemeController>
    </LanguageProvider>
  );
}

export default App;
