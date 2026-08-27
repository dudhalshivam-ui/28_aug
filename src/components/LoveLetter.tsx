import { useReveal } from '../hooks/useReveal';

export default function LoveLetter() {
  const headerRef = useReveal<HTMLDivElement>();
  const letterRef = useReveal<HTMLDivElement>();

  return (
    <section id="letter" className="py-24 md:py-32 px-6">
      {/* Header */}
      <div ref={headerRef} className="reveal text-center mb-16">
        <p className="text-xs tracking-[0.4em] text-gold/55 mb-4 uppercase">For You</p>
        <h2 className="font-serif text-4xl md:text-5xl text-ivory">A Letter For You 💌</h2>
        <div className="w-10 h-px bg-gold/30 mx-auto mt-6" />
      </div>

      {/* Letter */}
      <div ref={letterRef} className="reveal max-w-2xl mx-auto">
        <div
          className="relative px-10 md:px-14 py-12 md:py-16"
          style={{
            background: 'linear-gradient(150deg, #1e1914, #18140f)',
            borderLeft: '1px solid rgba(196, 154, 90, 0.2)',
            borderBottom: '1px solid rgba(196, 154, 90, 0.08)',
          }}
        >
          {/* Top ornament */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-32 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

          <p className="font-serif text-xl text-gold/75 mb-8">Dear Annu,</p>

          <div className="space-y-5 font-serif text-base md:text-lg text-ivory/68 leading-[1.85] italic">
            <p>
              I have been sitting here trying to find the right words, and honestly, nothing feels
              quite enough. How do you put into words what someone means to you? How do you describe
              the way a person changes everything — quietly, completely, beautifully?
            </p>
            <p className="text-ivory/45">
              [ Replace this with your personal message to Annu. This is your space to write
              something from the heart. Talk about your favorite memories, the things you love about
              her, what she means to you, and what you hope for the future. ]
            </p>
            <p className="text-ivory/45">
              [ Add another paragraph here. Maybe about a specific moment, or a feeling, or
              something she does that makes you smile. Make it personal, make it real, make it
              yours. ]
            </p>
            <p>
              On this birthday, I just want you to know: you are seen. You are loved. You are
              someone worth celebrating — not just today, but every single day.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-gold/10">
            <p className="font-serif italic text-sm text-ivory/45">With all my love,</p>
            <p className="font-serif text-xl text-gold/75 mt-2">[Your Name] ❤️</p>
          </div>

          {/* Bottom ornament */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px w-32 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        </div>
      </div>
    </section>
  );
}
