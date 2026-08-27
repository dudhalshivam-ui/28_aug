import { useState, useRef, useEffect, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal';
import type { Chapter } from '../data';
import PhotoImage from './PhotoImage';

function PhotoPlaceholder({ chapterNum, photoIndex }: { chapterNum: string; photoIndex: number }) {
  const slot = `chapter-${chapterNum}-${photoIndex}`;
  return (
    <PhotoImage
      slot={slot}
      className="photo-ph absolute inset-0"
      fallback={
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <svg
            className="w-8 h-8 opacity-15 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="1" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-xs font-mono tracking-[0.2em] text-ivory opacity-15">
            CH.{chapterNum} · {String(photoIndex + 1).padStart(2, '0')}
          </p>
        </div>
      }
    />
  );
}

interface Props {
  chapter: Chapter;
  chapterIndex: number;
  onChapterEnter: (index: number) => void;
}

export default function ChapterSection({ chapter, chapterIndex, onChapterEnter }: Props) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [animDir, setAnimDir] = useState<'right' | 'left'>('right');
  const [animKey, setAnimKey] = useState(0);
  const pointerStartX = useRef(0);
  const transitionRef = useReveal<HTMLDivElement>();
  const contentRef = useReveal<HTMLDivElement>();
  const detectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = detectRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onChapterEnter(chapterIndex);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [chapterIndex, onChapterEnter]);

  const goNext = useCallback(() => {
    if (currentPhoto < chapter.photoCount - 1) {
      setAnimDir('right');
      setAnimKey((k) => k + 1);
      setCurrentPhoto((p) => p + 1);
    }
  }, [currentPhoto, chapter.photoCount]);

  const goPrev = useCallback(() => {
    if (currentPhoto > 0) {
      setAnimDir('left');
      setAnimKey((k) => k + 1);
      setCurrentPhoto((p) => p - 1);
    }
  }, [currentPhoto]);

  const handlePointerDown = (e: { clientX: number }) => {
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: { clientX: number }) => {
    const delta = e.clientX - pointerStartX.current;
    if (delta < -40) goNext();
    else if (delta > 40) goPrev();
  };

  return (
    <div>
      {/* Chapter Transition Screen */}
      <div ref={detectRef}>
        <div
          ref={transitionRef}
          className="reveal min-h-screen flex flex-col items-center justify-center relative"
          style={{
            background:
              'linear-gradient(180deg, #0c0a09 0%, #130d0b 50%, #0c0a09 100%)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-gold/25 to-transparent" />

          <div className="text-center px-8 select-none">
            <p className="text-xs font-mono tracking-[0.5em] text-gold/45 mb-5 uppercase">
              Chapter
            </p>
            <p
              className="font-mono text-8xl md:text-[10rem] text-ivory/6 font-bold mb-1 leading-none"
              aria-hidden
            >
              {chapter.number}
            </p>
            <div className="w-14 h-px bg-gold/25 mx-auto mb-7" />
            <h3 className="font-serif text-2xl md:text-4xl text-ivory mb-9 italic">
              {chapter.title}
            </h3>
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-sm text-gold/55 tracking-[0.3em]">♫</p>
              <p className="text-sm text-ivory/45 tracking-wider">{chapter.songTitle}</p>
              <p className="text-xs text-ivory/28 tracking-widest">{chapter.artist}</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-t from-transparent via-gold/25 to-transparent" />
        </div>
      </div>

      {/* Chapter Content */}
      <section ref={contentRef} className="reveal py-12 px-4 md:px-8 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Chapter label row */}
          <div className="flex items-center gap-4 mb-8">
            <p className="text-xs font-mono tracking-[0.3em] text-gold/55 whitespace-nowrap">
              CHAPTER {chapter.number}
            </p>
            <div className="flex-1 h-px bg-gold/12" />
          </div>

          {/* Photo Swiper */}
          <div
            className="relative w-full aspect-[4/5] md:aspect-[3/4] cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <div
              key={animKey}
              className={animDir === 'right' ? 'anim-slide-right' : 'anim-slide-left'}
              style={{ position: 'absolute', inset: 0 }}
            >
              <PhotoPlaceholder chapterNum={chapter.number} photoIndex={currentPhoto} />
            </div>

            {/* Prev arrow */}
            {currentPhoto > 0 && (
              <button
                onClick={goPrev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center glass border border-ivory/10 text-ivory/60 hover:text-ivory hover:border-ivory/25 transition-all duration-300 text-xl font-light"
              >
                ‹
              </button>
            )}

            {/* Next arrow */}
            {currentPhoto < chapter.photoCount - 1 && (
              <button
                onClick={goNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center glass border border-ivory/10 text-ivory/60 hover:text-ivory hover:border-ivory/25 transition-all duration-300 text-xl font-light"
              >
                ›
              </button>
            )}

            {/* Counter */}
            <div className="absolute top-3 right-3 z-20 glass border border-ivory/8 px-3 py-1">
              <p className="text-xs font-mono text-ivory/45 tracking-widest">
                {String(currentPhoto + 1).padStart(2, '0')} /{' '}
                {String(chapter.photoCount).padStart(2, '0')}
              </p>
            </div>

            {/* Swipe hint */}
            {chapter.photoCount > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
                <p className="text-xs text-ivory/28 tracking-wider">← Swipe →</p>
              </div>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center items-center gap-2 mt-5">
            {Array.from({ length: chapter.photoCount }).map((_, i) => (
              <button
                key={i}
                aria-label={`Photo ${i + 1}`}
                onClick={() => {
                  setAnimDir(i > currentPhoto ? 'right' : 'left');
                  setAnimKey((k) => k + 1);
                  setCurrentPhoto(i);
                }}
                className={`rounded-full transition-all duration-400 ${
                  i === currentPhoto
                    ? 'w-7 h-1.5 bg-gold'
                    : 'w-1.5 h-1.5 bg-ivory/18 hover:bg-ivory/40'
                }`}
              />
            ))}
          </div>

          {/* Quote */}
          <div className="mt-12 text-center">
            <p className="font-serif italic text-xl md:text-2xl text-ivory/72 leading-relaxed">
              "{chapter.quote}"
            </p>
            <p className="mt-4 text-xs text-ivory/28 tracking-widest">{chapter.note}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
