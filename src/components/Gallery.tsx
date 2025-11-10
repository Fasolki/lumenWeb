import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

// TODO: Replace with actual gallery images
const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/halloween2025_1.jpg', alt: 'House Party Halloween 2025', caption: 'Halloween 2025 House Party' },
  { src: '/images/gallery/crowd-1.jpg', alt: 'Energized crowd dancing', caption: 'Tomorrowland Main Stage' },
  { src: '/images/gallery/performance-2.jpg', alt: 'LÜMEN behind the decks', caption: 'Berghain Berlin' },
  { src: '/images/gallery/crowd-2.jpg', alt: 'Crowd at sunset session', caption: 'Sunset Session Ibiza' },
  { src: '/images/gallery/halloween2025_2.jpg', alt: 'LÜMEN mixing live at house party', caption: 'House Party Halloween 2025' },
  { src: '/images/gallery/crowd-3.jpg', alt: 'Festival crowd energy', caption: 'Coachella Weekend 2' },
  { src: '/images/gallery/performance-4.jpg', alt: 'Intimate club performance', caption: 'Fabric London' },
  { src: '/images/gallery/crowd-4.jpg', alt: 'Rooftop party crowd', caption: 'Rooftop Session NYC' },
];

export const Gallery: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-6">
            {t.ui.gallery}
          </h2>
          <p className="text-xl text-text/80 max-w-3xl mx-auto">
            {t.ui.momentsCapturedFromPerformances}
          </p>
        </motion.div>

        <div className="relative">
          {/* Blurred Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 filter blur-sm pointer-events-none">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <div className="w-full h-full bg-surface rounded-lg overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${image.src})`,
                    }}
                  />
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="glass p-12 rounded-2xl text-center backdrop-blur-md border border-white/20">
              <h3 className="font-display text-6xl md:text-8xl font-bold gradient-text mb-4">
                {t.ui.comingSoon}
              </h3>
              <p className="text-xl text-text/80 max-w-md mx-auto">
                {t.ui.galleryPhotosBeingPrepared}
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
