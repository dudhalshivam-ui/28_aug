import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function FinalSection() {
  const [revealed, setRevealed] = useState(false);
  const introRef = useReveal<HTMLDivElement>();
  const photoRef = useReveal<HTMLDivElement>();

  return (
    <section id="final" className="py-24 md:py-32">
      {/* "And one last thing..." */}
      <div ref={introRef} className="reveal text-center px-6 mb-16">
        <p className="font-serif italic text-3xl md:text-4xl text-ivory/60 mb-12">
          And one last thing...
        </p>

        {!revealed && (
          <button
            onClick={() => setRevealed(true)}
            className="anim-pulse-ring inline-block px-10 py-5 border border-burgundy/45 text-ivory/80 text-xs tracking-[0.28em] uppercase hover:bg-burgundy/15 hover:border-burgundy/70 hover:text-ivory transition-all duration-500"
          >
            Open ❤️
          </button>
        )}
      </div>

      {/* Revealed message */}
      {revealed && (
        <div className="text-center px-6 mb-20 anim-fade-scale">
          <div className="flex items-center justify-center gap-4 mb-14">
            <div className="w-8 h-px bg-gold/30" />
            <div className="w-1 h-1 rounded-full bg-gold/40" />
            <div className="w-8 h-px bg-gold/30" />
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory leading-tight mb-10">
            Happy Birthday,
            <br />
            <em className="text-gold">Annu</em> ❤️
          </h2>

          <div className="max-w-md mx-auto space-y-6">
            <p className="font-serif italic text-xl md:text-2xl text-ivory/68 leading-relaxed">
              "You are one of the most beautiful parts of my life."
            </p>
            <p className="text-sm text-ivory/42 leading-loose font-light">
              I hope this year gives you everything your heart deserves. More laughter, more love,
              more moments that take your breath away.
            </p>
            <p className="font-serif text-3xl text-burgundy mt-10 tracking-wide">I love you.</p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-14">
            <div className="w-8 h-px bg-gold/30" />
            <div className="w-1 h-1 rounded-full bg-gold/40" />
            <div className="w-8 h-px bg-gold/30" />
          </div>
        </div>
      )}

      {/* Final photo */}
      <div ref={photoRef} className="reveal px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="photo-ph w-full aspect-video md:aspect-[16/9]">
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
                YOUR FINAL PHOTO HERE
              </p>
            </div>
          </div>

          <p className="text-center mt-5 font-serif italic text-base text-ivory/35">
            My favorite person.
          </p>
        </div>
      </div>

      {/* Closing */}
      <div className="text-center mt-20 pb-16 px-6">
        <p className="text-xs tracking-[0.42em] text-ivory/20 uppercase">
          Forever grateful for you. ❤️
        </p>
        <div className="mt-8 w-px h-14 bg-gradient-to-b from-gold/20 to-transparent mx-auto" />
      </div>
    </section>
  );
}
