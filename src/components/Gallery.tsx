import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const ROTATE_INTERVAL_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'lumen-gallery-state-v1';
const GALLERY_SLOTS = 8;

const galleryFileMap = import.meta.glob('/public/images/gallery/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>;

const allGalleryImages: GalleryImage[] = Object.entries(galleryFileMap).map(([filePath, resolvedUrl]) => {
  const fileName = filePath.split('/').pop() ?? 'gallery-image';
  return {
    src: resolvedUrl,
    alt: `LUMEN gallery image ${fileName}`,
  };
});

const getShuffledIndices = (count: number): number[] => {
  const indices = Array.from({ length: count }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};

const getActiveImages = (): GalleryImage[] => {
  if (allGalleryImages.length === 0) {
    return [];
  }

  const now = Date.now();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { shuffledIndices: number[]; shuffledAt: number };
      const isStillFresh = now - parsed.shuffledAt < ROTATE_INTERVAL_MS;
      const indicesAreValid = Array.isArray(parsed.shuffledIndices)
        && parsed.shuffledIndices.every((idx) => Number.isInteger(idx) && idx >= 0 && idx < allGalleryImages.length);

      if (isStillFresh && indicesAreValid) {
        const selected = parsed.shuffledIndices.slice(0, GALLERY_SLOTS).map((idx) => allGalleryImages[idx]).filter(Boolean);
        if (selected.length > 0) {
          return selected.length >= GALLERY_SLOTS
            ? selected
            : Array.from({ length: GALLERY_SLOTS }, (_, i) => selected[i % selected.length]);
        }
      }
    }
  } catch {
    // Ignore corrupted localStorage state and regenerate below.
  }

  const shuffledIndices = getShuffledIndices(allGalleryImages.length);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ shuffledIndices, shuffledAt: now }));
  const selected = shuffledIndices.slice(0, GALLERY_SLOTS).map((idx) => allGalleryImages[idx]).filter(Boolean);
  return selected.length >= GALLERY_SLOTS
    ? selected
    : Array.from({ length: GALLERY_SLOTS }, (_, i) => selected[i % selected.length]);
};

export const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const fallbackImages = useMemo(() => {
    if (allGalleryImages.length === 0) {
      return [];
    }
    return allGalleryImages.length >= GALLERY_SLOTS
      ? allGalleryImages.slice(0, GALLERY_SLOTS)
      : Array.from({ length: GALLERY_SLOTS }, (_, i) => allGalleryImages[i % allGalleryImages.length]);
  }, []);
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>(fallbackImages);

  useEffect(() => {
    setVisibleImages(getActiveImages());

    const interval = setInterval(() => {
      setVisibleImages(getActiveImages());
    }, ROTATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {visibleImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <div className="w-full h-full bg-surface rounded-lg overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
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

      </div>
    </section>
  );
};
