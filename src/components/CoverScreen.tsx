interface Props {
  opened: boolean;
  onOpen: () => void;
}

const particles = [
  { symbol: '✦', style: { left: '12%', bottom: '28%', fontSize: '9px', animationDelay: '0s', animationDuration: '5s' } },
  { symbol: '♡', style: { left: '22%', bottom: '22%', fontSize: '11px', animationDelay: '1.3s', animationDuration: '6s' } },
  { symbol: '·', style: { left: '38%', bottom: '18%', fontSize: '18px', animationDelay: '0.6s', animationDuration: '4.5s' } },
  { symbol: '✦', style: { left: '55%', bottom: '20%', fontSize: '8px', animationDelay: '2.1s', animationDuration: '5.5s' } },
  { symbol: '♡', style: { left: '68%', bottom: '26%', fontSize: '13px', animationDelay: '0.9s', animationDuration: '5s' } },
  { symbol: '·', style: { left: '78%', bottom: '22%', fontSize: '16px', animationDelay: '1.7s', animationDuration: '4s' } },
  { symbol: '✦', style: { left: '88%', bottom: '30%', fontSize: '10px', animationDelay: '3s', animationDuration: '6.5s' } },
  { symbol: '♡', style: { left: '5%', bottom: '40%', fontSize: '9px', animationDelay: '2.4s', animationDuration: '5.2s' } },
];

export default function CoverScreen({ opened, onOpen }: Props) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${
        opened ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background:
          'radial-gradient(ellipse at 50% 55%, #1e0e0c 0%, #120a09 45%, #0c0a09 100%)',
      }}
    >
      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute anim-float-up text-gold select-none pointer-events-none"
          style={{ ...p.style, opacity: 0 }}
        >
          {p.symbol}
        </div>
      ))}

      {/* Vertical gold line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-gold opacity-25" />

      <div className="flex flex-col items-center gap-7 px-8 text-center max-w-xs mx-auto">
        {/* Portrait photo */}
        <div className="relative">
          <div className="w-44 h-60 md:w-52 md:h-72 photo-ph anim-pulse-ring overflow-hidden">
            <img
              src="/image.png"
              alt="Portrait"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="absolute -inset-px border border-gold opacity-15" />
          <div className="absolute -inset-3 border border-gold opacity-6" />
        </div>

        {/* Label */}
        <p className="text-xs tracking-[0.38em] text-gold/65 uppercase">A Gift For You</p>

        {/* Headline */}
        <h1 className="font-serif text-3xl md:text-4xl text-ivory leading-snug">
          Something I Made
          <br />
          <em>Just For You</em> ❤️
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-ivory/45 leading-relaxed font-light">
          Because you deserve more than
          <br />
          just a birthday wish.
        </p>

        {/* CTA */}
        <button
          onClick={onOpen}
          className="group relative px-8 py-4 border border-gold/35 text-ivory/85 text-xs tracking-[0.22em] uppercase hover:bg-gold/8 hover:border-gold/55 hover:text-ivory transition-all duration-500"
        >
          Open Your Surprise ✨
        </button>

        {/* Hint */}
        <p className="text-xs text-ivory/22 tracking-[0.3em] animate-pulse">Tap to begin</p>
      </div>

      {/* Vertical gold line bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-gold opacity-25" />
    </div>
  );
}
