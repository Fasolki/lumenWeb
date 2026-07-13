import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { galleryImages, srcSet, fallbackSrc, type ImageAsset } from '../data/images';

const ROTATE_INTERVAL_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'lumen-gallery-state-v2';
const GALLERY_SLOTS = 8;

const shuffledIndices = (count: number): number[] => {
  const indices = Array.from({ length: count }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};

const take = (indices: number[]): ImageAsset[] =>
  indices
    .slice(0, GALLERY_SLOTS)
    .map((idx) => galleryImages[idx])
    .filter(Boolean);

/**
 * Picks which images are on show, reshuffling at most once a day so a
 * returning visitor sees a different selection.
 */
const getActiveImages = (): ImageAsset[] => {
  if (galleryImages.length === 0) return [];

  const now = Date.now();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { indices: number[]; shuffledAt: number };
      const isFresh = now - parsed.shuffledAt < ROTATE_INTERVAL_MS;
      const isValid =
        Array.isArray(parsed.indices) &&
        parsed.indices.every((i) => Number.isInteger(i) && i >= 0 && i < galleryImages.length);

      if (isFresh && isValid) {
        const selected = take(parsed.indices);
        if (selected.length > 0) return selected;
      }
    }
  } catch {
    // Corrupted state; fall through and reshuffle.
  }

  const indices = shuffledIndices(galleryImages.length);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ indices, shuffledAt: now }));
  } catch {
    // Private browsing or storage full — the shuffle just won't persist.
  }
  return take(indices);
};

export const Gallery: React.FC = () => {
  const { t } = useLanguage();

  // Shown on first paint and to crawlers, which never run the shuffle, so the
  // grid is never empty.
  const initialImages = useMemo(() => galleryImages.slice(0, GALLERY_SLOTS), []);
  const [visibleImages, setVisibleImages] = useState<ImageAsset[]>(initialImages);

  useEffect(() => {
    setVisibleImages(getActiveImages());
    const interval = setInterval(() => setVisibleImages(getActiveImages()), ROTATE_INTERVAL_MS);
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
              key={image.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-surface group"
            >
              <img
                src={fallbackSrc('gallery', image)}
                srcSet={srcSet('gallery', image)}
                sizes="(min-width: 768px) 25vw, 50vw"
                width={image.width}
                height={image.height}
                alt={t.ui.galleryImageAlt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
