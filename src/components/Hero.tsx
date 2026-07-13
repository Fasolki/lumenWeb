import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollToBooking, scrollToSection } from '../utils/scroll';
import { heroImages, srcSet, fallbackSrc } from '../data/images';

const carouselImages = heroImages;

export const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  // Slide 0 loads with the page; the rest are fetched only once reached, plus
  // the next one so it's warm before it fades in.
  const [mountedSlides, setMountedSlides] = useState<Set<number>>(new Set([0]));
  const { t } = useLanguage();

  useEffect(() => {
    const next = (currentImage + 1) % carouselImages.length;
    setMountedSlides((prev) => {
      if (prev.has(currentImage) && prev.has(next)) return prev;
      return new Set(prev).add(currentImage).add(next);
    });
  }, [currentImage]);

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

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={image.name}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* A hidden slide is still inside the viewport, so `loading="lazy"`
                would not defer it. Only mount the slides we've reached. */}
            {mountedSlides.has(index) && (
              <img
                src={fallbackSrc('hero', image)}
                srcSet={srcSet('hero', image)}
                sizes="100vw"
                width={image.width}
                height={image.height}
                alt={t.content.hero.imageAlts[index] ?? ''}
                fetchPriority={index === 0 ? 'high' : 'low'}
                decoding={index === 0 ? 'sync' : 'async'}
                className="w-full h-full object-cover blur-[2px]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          onClick={prevImage}
          className="glass p-3 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring"
          aria-label={t.ui.a11y.previousImage}
        >
          <ChevronLeft size={24} className="text-text" />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          onClick={nextImage}
          className="glass p-3 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring"
          aria-label={t.ui.a11y.nextImage}
        >
          <ChevronRight size={24} className="text-text" />
        </button>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="glass p-3 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring"
          aria-label={isPlaying ? t.ui.a11y.pauseCarousel : t.ui.a11y.playCarousel}
        >
          {isPlaying ? <Pause size={20} className="text-text" /> : <Play size={20} className="text-text" />}
        </button>
      </div>

      {/* Carousel Indicators (sit above the scroll indicator at the bottom of the hero) */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 focus-ring ${
              index === currentImage ? 'bg-accent' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`${t.ui.a11y.goToImage} ${index + 1}`}
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

          {/* Booking is the one thing this page is for, so it gets the only
              primary button; the rest are secondary links under it. */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={scrollToBooking}
              className="px-10 py-5 text-lg bg-accent text-white font-semibold rounded-lg shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all duration-200 focus-ring transform hover:scale-105"
            >
              {t.ui.bookContact}
            </button>

            <div className="flex flex-wrap gap-3 justify-center items-center">
              {([
                ['#watch', t.ui.watch],
                ['#gallery', t.ui.gallery],
                ['#about', t.ui.aboutMe],
              ] as const).map(([anchor, label]) => (
                <button
                  key={anchor}
                  onClick={() => scrollToSection(anchor)}
                  className="px-5 py-2.5 glass text-text font-medium rounded-lg hover:bg-accent/20 transition-all duration-200 focus-ring"
                >
                  {label}
                </button>
              ))}
            </div>
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
