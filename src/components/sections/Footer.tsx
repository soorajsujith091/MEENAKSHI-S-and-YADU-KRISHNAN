import { content } from '@/content';
import { Reveal } from '@/components/layout/Reveal';

/**
 * Footer — Compliments, gold OM, couple name & date.
 */
export function Footer() {
  const { footer } = content;

  return (
    <footer role="contentinfo" className="bg-[#4A2545] py-16 px-5 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-4">
        {/* Hairline */}
        <div className="w-24 h-px bg-[#C9A227]/40 mb-4" aria-hidden="true" />

        {/* Compliments */}
        <Reveal>
          <p className="font-sans-ui text-[#FDFBF7]/70 text-xs uppercase tracking-widest">
            {footer.compliments}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p className="font-display italic text-[clamp(1.1rem,3vw,1.5rem)] text-[#FDFBF7]">
            {footer.names}
          </p>
        </Reveal>

        {/* Gold OM */}
        <Reveal delay={160}>
          <div className="text-[#C9A227] font-display text-5xl my-4 select-none" aria-label="Om">
            {footer.om}
          </div>
        </Reveal>

        {/* Couple & date */}
        <Reveal delay={220}>
          <p className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-[#FDFBF7] font-semibold">
            {footer.couple}
          </p>
        </Reveal>
        <Reveal delay={260}>
          <p className="font-sans-ui text-[#C9A227] text-sm tracking-widest">
            {footer.date}
          </p>
        </Reveal>

        {/* Hairline */}
        <div className="w-24 h-px bg-[#C9A227]/40 mt-4" aria-hidden="true" />
      </div>
    </footer>
  );
}
