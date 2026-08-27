import { useReveal } from '../hooks/useReveal';
import PhotoImage from './PhotoImage';

export default function BirthdayHero() {
  const textRef = useReveal<HTMLDivElement>();
  const photoRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 60% 40%, rgba(140, 28, 48, 0.07) 0%, transparent 60%)',
        }}
      />

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
        {/* Text */}
        <div
          ref={textRef}
          className="reveal flex flex-col gap-6 text-center md:text-left order-2 md:order-1"
        >
          <p className="text-xs tracking-[0.35em] text-gold/60 uppercase">For Annu, with love</p>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.1]">
            Happy
            <br />
            Birthday,
            <br />
            <em className="text-gold">Annu</em> ❤️
          </h2>

          <div className="w-10 h-px bg-gold/35 mx-auto md:mx-0" />

          <p className="text-base text-ivory/55 font-light leading-relaxed">
            Made with love, just for you.
          </p>

          <p className="text-sm text-ivory/40 leading-loose font-light italic">
            "Today is your day — a day I have been thinking about for a while now.
            I wanted to create something that felt as special as you are to me.
            Something you could keep. Something that says what words sometimes cannot."
          </p>

          <p className="text-xs text-gold/35 tracking-widest italic">
            [ Replace with your personal message ]
          </p>
        </div>

        {/* Photo */}
        <div
          ref={photoRef}
          className="reveal reveal-d2 flex justify-center md:justify-end order-1 md:order-2"
        >
          <div className="relative w-full max-w-[280px] md:max-w-[340px]">
            <PhotoImage
              slot="hero"
              className="photo-ph w-full aspect-[3/4]"
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
                    HERO PHOTO
                  </p>
                </div>
              }
            />
            <p className="mt-3 text-xs text-ivory/30 italic text-center tracking-wide">
              Add your favorite photograph here
            </p>
            {/* Offset border decoration */}
            <div className="absolute -bottom-2.5 -right-2.5 w-full h-full border border-gold/12 pointer-events-none -z-10" />
          </div>
        </div>
      </div>

      {/* Scroll line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-14 bg-gradient-to-b from-gold/30 to-transparent" />
      </div>
    </section>
  );
}
