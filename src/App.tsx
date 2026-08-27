import { useState, useEffect, useCallback } from 'react';
import CoverScreen from './components/CoverScreen';
import BirthdayHero from './components/BirthdayHero';
import ChapterSection from './components/ChapterSection';
import QuoteSection from './components/QuoteSection';
import MusicPlayer from './components/MusicPlayer';
import MemoriesGallery from './components/MemoriesGallery';
import LoveLetter from './components/LoveLetter';
import FinalSection from './components/FinalSection';
import Navigation from './components/Navigation';
import { chapters } from './data';

const SECTION_IDS = ['home', 'journey', 'letter', 'memories', 'final'];

export default function App() {
  const [opened, setOpened] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentChapter, setCurrentChapter] = useState(0);

  // Lock scroll until opened
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  // Track active section via scroll position
  useEffect(() => {
    if (!opened) return;

    const handleScroll = () => {
      const center = window.innerHeight / 2;
      let closestId = SECTION_IDS[0];
      let closestDist = Infinity;

      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const dist = Math.abs(midpoint - center);
        if (dist < closestDist) {
          closestDist = dist;
          closestId = id;
        }
      });

      setActiveSection(closestId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [opened]);

  const handleChapterEnter = useCallback((index: number) => {
    setCurrentChapter(index);
  }, []);

  return (
    <div className="relative">
      {/* Subtle grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.018]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Cover screen — fixed overlay */}
      <CoverScreen opened={opened} onOpen={() => setOpened(true)} />

      {/* Nav + player — only after opening */}
      {opened && (
        <>
          <Navigation activeSection={activeSection} />
          <MusicPlayer
            chapters={chapters}
            currentChapterIndex={currentChapter}
            visible={opened}
          />
        </>
      )}

      {/* Main scrollable content */}
      <main
        className={`transition-opacity duration-1000 delay-200 ${
          opened ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Desktop nav spacer */}
        <div className="hidden md:block h-[68px]" />

        {/* 1. Birthday Hero */}
        <BirthdayHero />

        {/* Opening quote */}
        <QuoteSection
          text={"Every picture holds a memory. Every memory makes me smile."}
        />

        {/* 2–11. Song Chapters */}
        <div id="journey">
          {chapters.map((chapter, i) => (
            <div key={chapter.number}>
              <ChapterSection
                chapter={chapter}
                chapterIndex={i}
                onChapterEnter={handleChapterEnter}
              />
              {i === 2 && (
                <QuoteSection
                  text={"You somehow make ordinary moments feel extraordinary."}
                />
              )}
              {i === 5 && (
                <QuoteSection text={"I could look at this smile forever."} />
              )}
              {i === 8 && (
                <QuoteSection
                  text={
                    "Some people make the world more beautiful just by being in it."
                  }
                />
              )}
            </div>
          ))}
        </div>

        {/* 12. Love Letter */}
        <LoveLetter />

        {/* 13. Memories Gallery */}
        <MemoriesGallery />

        {/* 14–15. Final */}
        <FinalSection />

        {/* Mobile bottom padding */}
        <div className="md:hidden h-8" />
      </main>
    </div>
  );
}
