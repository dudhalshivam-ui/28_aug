import { useReveal } from '../hooks/useReveal';

interface Props {
  text: string;
}

export default function QuoteSection({ text }: Props) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32 px-8">
      <div ref={ref} className="reveal max-w-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-8 h-px bg-gold/30" />
          <div className="w-1 h-1 rounded-full bg-gold/40" />
          <div className="w-8 h-px bg-gold/30" />
        </div>

        <blockquote className="font-serif italic text-2xl md:text-3xl text-ivory/78 leading-relaxed">
          {text}
        </blockquote>

        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="w-8 h-px bg-gold/30" />
          <div className="w-1 h-1 rounded-full bg-gold/40" />
          <div className="w-8 h-px bg-gold/30" />
        </div>
      </div>
    </section>
  );
}
