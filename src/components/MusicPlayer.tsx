import { useState, useEffect, useRef } from 'react';
import type { Chapter } from '../data';

interface Props {
  chapters: Chapter[];
  currentChapterIndex: number;
  visible: boolean;
}

export default function MusicPlayer({ chapters, currentChapterIndex, visible }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const chapter = chapters[Math.min(currentChapterIndex, chapters.length - 1)];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.4;
        });
      }, 160);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
  }, [currentChapterIndex]);

  if (!visible) return null;

  return (
    <div
      className={`fixed z-40 right-4 bottom-20 md:bottom-6 md:right-6 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {isExpanded ? (
        <div className="glass border border-gold/22 p-5 w-60 anim-fade-scale">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0 pr-3">
              <p className="text-xs tracking-[0.2em] text-gold/65 mb-1">♫ NOW PLAYING</p>
              <p className="text-sm text-ivory font-medium leading-snug truncate">
                {chapter.songTitle}
              </p>
              <p className="text-xs text-ivory/38 mt-0.5 truncate">{chapter.artist}</p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-ivory/30 hover:text-ivory/65 text-lg leading-none transition-colors flex-shrink-0"
              aria-label="Collapse player"
            >
              ×
            </button>
          </div>

          {/* Progress bar */}
          <div
            className="w-full h-px bg-ivory/10 mb-4 cursor-pointer relative group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
          >
            <div
              className="h-full bg-gold transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-y-0 -top-2 -bottom-2 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold"
                style={{ left: `${progress}%`, transform: 'translateX(-50%) translateY(-50%)' }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              className="text-ivory/35 hover:text-ivory/65 text-xs transition-colors"
              onClick={() => setProgress(0)}
              aria-label="Restart"
            >
              ⟨⟨
            </button>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-10 h-10 border border-gold/40 flex items-center justify-center text-ivory hover:bg-gold/12 transition-all duration-300 text-sm"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              className="text-ivory/35 hover:text-ivory/65 text-xs transition-colors"
              onClick={() => setProgress(100)}
              aria-label="Skip"
            >
              ⟩⟩
            </button>
          </div>

          <p className="text-center text-xs text-ivory/18 mt-4 tracking-widest font-mono">
            CH. {chapter.number}
          </p>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="glass border border-gold/22 flex items-center gap-3 px-4 py-3 hover:border-gold/45 transition-all duration-300 group"
        >
          <span className={`text-gold text-sm ${isPlaying ? 'animate-pulse' : ''}`}>
            {isPlaying ? '♫' : '♪'}
          </span>
          <div className="text-left max-w-[110px]">
            <p className="text-xs text-ivory truncate leading-tight">{chapter.songTitle}</p>
            <p className="text-xs text-ivory/35 truncate mt-0.5">{chapter.artist}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying((p) => !p);
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="text-ivory/45 hover:text-ivory text-xs transition-colors flex-shrink-0 w-6 h-6 flex items-center justify-center"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </button>
      )}
    </div>
  );
}
