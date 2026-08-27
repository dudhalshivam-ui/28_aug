import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { galleryPhotos } from '../data';
import type { GalleryCategory, GalleryPhoto } from '../data';

const CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'her', label: 'HER ❤️' },
  { id: 'us', label: 'US' },
  { id: 'favorite', label: 'FAVORITE MEMORIES' },
  { id: 'special', label: 'SPECIAL MOMENTS' },
];

function PhotoCard({ photo, onClick }: { photo: GalleryPhoto; onClick: () => void }) {
  const rowSpan = photo.size === 'lg' ? 'row-span-2' : '';

  return (
    <div
      className={`relative photo-ph cursor-pointer group overflow-hidden ${rowSpan}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
        <svg
          className="w-5 h-5 opacity-12 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p className="text-xs font-mono tracking-[0.12em] text-ivory opacity-12">
          {String(photo.id).padStart(2, '0')}
        </p>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-burgundy/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20 flex items-end p-3">
        {photo.caption && (
          <p className="text-xs text-ivory/80 italic leading-snug">{photo.caption}</p>
        )}
      </div>
    </div>
  );
}

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center anim-fade-in"
      style={{ background: 'rgba(10, 8, 7, 0.97)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full h-full flex items-center justify-center p-6 md:p-14"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-ivory/40 hover:text-ivory text-2xl transition-colors"
        >
          ×
        </button>

        {/* Counter */}
        <div className="absolute top-5 left-5 z-10">
          <p className="text-xs font-mono text-ivory/35 tracking-widest">
            {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </p>
        </div>

        {/* Prev */}
        {index > 0 && (
          <button
            onClick={onPrev}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center glass border border-ivory/10 text-ivory/55 hover:text-ivory text-2xl font-light transition-all duration-300 hover:bg-white/5"
          >
            ‹
          </button>
        )}

        {/* Photo */}
        <div className="max-w-2xl max-h-full w-full flex flex-col gap-4">
          <div
            className={`photo-ph w-full anim-fade-scale ${
              photo.size === 'lg' ? 'aspect-[3/4]' : 'aspect-square'
            }`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
              <svg
                className="w-10 h-10 opacity-12 text-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p className="text-xs font-mono tracking-[0.2em] text-ivory opacity-12">
                PHOTO {String(photo.id).padStart(2, '0')}
              </p>
            </div>
          </div>
          {photo.caption && (
            <p className="text-center text-sm text-ivory/42 italic">{photo.caption}</p>
          )}
        </div>

        {/* Next */}
        {index < photos.length - 1 && (
          <button
            onClick={onNext}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center glass border border-ivory/10 text-ivory/55 hover:text-ivory text-2xl font-light transition-all duration-300 hover:bg-white/5"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}

export default function MemoriesGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  const filtered =
    activeCategory === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory);

  const openLightbox = (photoId: number) => {
    const idx = filtered.findIndex((p) => p.id === photoId);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <section id="memories" className="py-24 px-4 md:px-8">
      {/* Header */}
      <div ref={headerRef} className="reveal text-center mb-14">
        <p className="text-xs tracking-[0.4em] text-gold/55 mb-4 uppercase">Gallery</p>
        <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-4">OUR MEMORIES 📸</h2>
        <p className="text-sm text-ivory/42 italic">Some moments are too beautiful to forget.</p>
        <div className="w-10 h-px bg-gold/28 mx-auto mt-7" />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-xs tracking-[0.18em] px-4 py-2 border transition-all duration-300 ${
              activeCategory === cat.id
                ? 'border-gold/55 text-gold bg-gold/6'
                : 'border-ivory/10 text-ivory/35 hover:border-ivory/28 hover:text-ivory/58'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div
        ref={gridRef}
        className="reveal max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[160px] md:auto-rows-[190px]"
      >
        {filtered.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} onClick={() => openLightbox(photo.id)} />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i !== null ? Math.max(0, i - 1) : 0))}
          onNext={() =>
            setLightboxIndex((i) =>
              i !== null ? Math.min(filtered.length - 1, i + 1) : 0
            )
          }
        />
      )}
    </section>
  );
}
