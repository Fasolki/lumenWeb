import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

// TODO: Replace with actual gallery images
const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/performance-1.jpg', alt: 'LÜMEN performing at festival', caption: 'Electric Daisy Carnival 2024' },
  { src: '/images/gallery/crowd-1.jpg', alt: 'Energized crowd dancing', caption: 'Tomorrowland Main Stage' },
  { src: '/images/gallery/performance-2.jpg', alt: 'LÜMEN behind the decks', caption: 'Berghain Berlin' },
  { src: '/images/gallery/crowd-2.jpg', alt: 'Crowd at sunset session', caption: 'Sunset Session Ibiza' },
  { src: '/images/gallery/performance-3.jpg', alt: 'LÜMEN mixing live', caption: 'Ultra Music Festival' },
  { src: '/images/gallery/crowd-3.jpg', alt: 'Festival crowd energy', caption: 'Coachella Weekend 2' },
  { src: '/images/gallery/performance-4.jpg', alt: 'Intimate club performance', caption: 'Fabric London' },
  { src: '/images/gallery/crowd-4.jpg', alt: 'Rooftop party crowd', caption: 'Rooftop Session NYC' },
];

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  };

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
            Gallery
          </h2>
          <p className="text-xl text-text/80 max-w-3xl mx-auto">
            Moments captured from performances around the world. Each image tells a story of energy, connection, and pure musical magic.
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
                COMING SOON
              </h3>
              <p className="text-xl text-text/80 max-w-md mx-auto">
                Gallery photos are being prepared. Check back soon for amazing visuals from LÜMEN's performances!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
              onKeyDown={handleKeyDown}
              tabIndex={-1}
            >
              <div className="relative max-w-6xl max-h-full">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].alt}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                  {galleryImages[selectedImage].caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                      <p className="text-white text-lg font-medium">
                        {galleryImages[selectedImage].caption}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Close button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 glass p-3 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring"
                  aria-label="Close lightbox"
                >
                  <X size={24} className="text-white" />
                </button>

                {/* Navigation buttons */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 glass p-3 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} className="text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 glass p-3 rounded-full hover:bg-accent/20 transition-all duration-200 focus-ring"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} className="text-white" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full">
                  <span className="text-white text-sm font-medium">
                    {selectedImage + 1} / {galleryImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
