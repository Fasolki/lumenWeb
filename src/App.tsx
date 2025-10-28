import { ThemeController } from './components/ThemeController';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Watch } from './components/Watch';
import { SunsetSessions } from './components/SunsetSessions';
import { Experience } from './components/Experience';
import { Gigs } from './components/Gigs';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Tech } from './components/Tech';

function App() {
  return (
    <LanguageProvider>
      <ThemeController>
        <div className="min-h-screen">
          <Navigation />
          <main>
            <Hero />
            <About />
            <Watch />
            <SunsetSessions />
            <Experience />
            <Gigs />
            <Gallery />
            <Contact />
            <Tech />
          </main>
          
          {/* Footer */}
          <footer className="py-12 px-4 border-t border-white/10">
            <div className="max-w-6xl mx-auto text-center">
              <div className="mb-8">
                <h3 className="font-display text-3xl font-bold gradient-text mb-4">
                  DJ LÜMEN
                </h3>
                <p className="text-text/80 max-w-2xl mx-auto">
                  Bringing the energy that moves your soul. Professional DJ services for events worldwide.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
                <a 
                  href="mailto:lifeonfullvolume@gmail.com"
                  className="text-text/80 hover:text-accent transition-colors duration-200"
                >
                  lifeonfullvolume@gmail.com
                </a>
                <a 
                  href="https://wa.me/+16507144540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text/80 hover:text-accent transition-colors duration-200"
                >
                  +1 (650) 714-4540
                </a>
              </div>
              
              <div className="text-text/60 text-sm">
                <p>&copy; 2024 DJ LÜMEN. All rights reserved.</p>
                <p className="mt-2">
                  Built with React, Tailwind CSS, and Framer Motion
                </p>
              </div>
            </div>
          </footer>
        </div>
      </ThemeController>
    </LanguageProvider>
  );
}

export default App;
