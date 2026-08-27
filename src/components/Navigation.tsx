import { useState } from 'react';

interface Props {
  activeSection: string;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'journey', label: 'Journey' },
  { id: 'memories', label: 'Our Memories' },
  { id: 'letter', label: 'Letter' },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navigation({ activeSection }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop — fixed top */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-30 items-center justify-between px-10 py-5 glass border-b border-white/5">
        <p className="font-serif text-sm text-gold/65 italic">for Annu ❤️</p>
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                activeSection === link.id
                  ? 'text-gold'
                  : 'text-ivory/35 hover:text-ivory/65'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile — hamburger top-right */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="fixed top-4 right-4 z-40 glass border border-ivory/10 w-10 h-10 flex items-center justify-center text-ivory/55 hover:text-ivory transition-colors"
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect width="16" height="1.5" rx="0.75" fill="currentColor" />
            <rect y="5.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
            <rect y="10.5" width="16" height="1.5" rx="0.75" fill="currentColor" />
          </svg>
        </button>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center anim-fade-in"
            style={{ background: 'rgba(12, 10, 9, 0.97)' }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-5 right-5 text-ivory/40 hover:text-ivory text-2xl transition-colors"
            >
              ×
            </button>

            <p className="font-serif italic text-sm text-gold/55 mb-10">for Annu ❤️</p>

            <div className="flex flex-col items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollTo(link.id);
                    setMenuOpen(false);
                  }}
                  className={`font-serif text-2xl transition-colors duration-300 ${
                    activeSection === link.id ? 'text-gold' : 'text-ivory/55 hover:text-ivory'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="w-px h-12 bg-gradient-to-b from-gold/20 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
