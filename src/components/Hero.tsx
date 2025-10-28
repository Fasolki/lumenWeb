import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CarouselImage {
  src: string;
  alt: string;
}

const carouselImages: CarouselImage[] = [
  { src: '/images/hero/performance-1.jpg', alt: 'DJ LÜMEN performing at festival' },
  { src: '/images/hero/crowd-1.jpg', alt: 'Crowd dancing to LÜMEN\'s set' },
  { src: '/images/hero/performance-2.jpg', alt: 'LÜMEN behind the decks' },
  { src: '/images/hero/crowd-2.jpg', alt: 'Energized crowd at LÜMEN show' },
  { src: '/images/hero/performance-3.jpg', alt: 'LÜMEN mixing live' },
];

export const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  const scrollToSection = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${image.src})`,
                filter: 'blur(2px)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          onClick={prevImage}
          className="glass p-3 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="text-text" />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          onClick={nextImage}
          className="glass p-3 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring"
          aria-label="Next image"
        >
          <ChevronRight size={24} className="text-text" />
        </button>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="glass p-3 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring"
          aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
        >
          {isPlaying ? <Pause size={20} className="text-text" /> : <Play size={20} className="text-text" />}
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 focus-ring ${
              index === currentImage ? 'bg-accent' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 gradient-text">
            {t.content.hero.tagline}
          </h1>
          <p className="text-xl md:text-2xl text-text/90 mb-12 max-w-2xl mx-auto">
            {t.content.hero.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105"
            >
              {t.ui.bookContact}
            </button>
            <button
              onClick={() => scrollToSection('#gallery')}
              className="px-8 py-4 glass text-text font-semibold rounded-lg hover:bg-accent/20 transition-all duration-200 focus-ring transform hover:scale-105"
            >
              {t.ui.gallery}
            </button>
            <button
              onClick={() => scrollToSection('#watch')}
              className="px-8 py-4 glass text-text font-semibold rounded-lg hover:bg-accent/20 transition-all duration-200 focus-ring transform hover:scale-105"
            >
              {t.ui.watch}
            </button>
            <button
              onClick={() => scrollToSection('#about')}
              className="px-8 py-4 glass text-text font-semibold rounded-lg hover:bg-accent/20 transition-all duration-200 focus-ring transform hover:scale-105"
            >
              {t.ui.aboutMe}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-text/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-text/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
