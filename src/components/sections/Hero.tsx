import { content } from '@/content';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { ChevronDown, Sparkles } from 'lucide-react';

/**
 * Hero — Interactive scroll-expanding hero section.
 *
 * Expands the central wedding portrait on scroll/wheel/touch gesture,
 * separating the bride & groom typography and unfolding the invitation details.
 * Optimized for mobile, desktop, user accessibility, and SEO.
 */
export function Hero() {
  const { hero } = content;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#120B10]"
      aria-label={`${hero.bride} and ${hero.groom} Wedding Invitation Hero`}
    >
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={hero.heroImage || '/hero.jpg'}
        bgImageSrc="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80"
        firstPart="Meenakshi S"
        secondPart="& Yadu Krishnan"
        title="Meenakshi S & Yadu Krishnan"
        date={hero.date}
        scrollToExpand="Scroll to Unfold Our Story"
        scrollCueText="CONTINUE TO INVITATION"
        showScrollCue={true}
        titleClassName="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FDFBF7] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] tracking-wide"
        dateClassName="font-sans-ui text-xl md:text-2xl tracking-[0.25em] text-[#E5C158] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        hintClassName="font-sans-ui text-xs sm:text-sm text-[#FDFBF7]/90 font-light tracking-[0.2em] uppercase mt-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
        textBlend={false}
      >
        {/* Unfolded content revealed when media expansion reaches 100% */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center py-8 px-4 text-[#FDFBF7]">
          <div className="flex items-center gap-2 text-[#C9A227] mb-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="font-display text-3xl">ॐ</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>

          <p className="font-sans-ui uppercase tracking-[0.25em] text-xs text-[#E5C158] mb-3">
            {hero.tagline}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[#FDFBF7] tracking-tight mb-3">
            {hero.bride} <span className="font-display italic text-[#C9A227]">with</span> {hero.groom}
          </h2>

          <div className="w-20 h-[1px] bg-[#C9A227]/70 my-3 mx-auto" aria-hidden="true" />

          <p className="font-sans-ui text-base sm:text-lg tracking-widest text-[#FDFBF7]/90 mb-1">
            {hero.date}
          </p>
          <p className="font-sans-ui text-xs sm:text-sm uppercase tracking-[0.2em] text-[#E5C158]">
            {hero.location}
          </p>

          <div className="mt-8 flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-sans-ui text-[11px] uppercase tracking-[0.22em] text-[#FDFBF7]/80">
              Continue to Invitation
            </span>
            <ChevronDown className="w-5 h-5 text-[#C9A227] animate-bounce" aria-hidden="true" />
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
