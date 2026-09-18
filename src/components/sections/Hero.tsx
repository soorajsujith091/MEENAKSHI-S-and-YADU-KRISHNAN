import { content } from '@/content';
import { Reveal } from '@/components/layout/Reveal';

/**
 * Hero — Full-viewport hero section with Radha–Krishna artwork,
 * ivory scrim overlay, and responsive layout.
 *
 * Mobile: single column, 100svh, text centered.
 * Tablet: wider aspect artwork, names lower with more air.
 * Desktop (lg+): artwork panel left (55%), names right (45%), vertically centered.
 *                Artwork capped — never fills 1920px, ivory bg breathes.
 */
export function Hero() {
  const { hero } = content;

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] hero-landscape overflow-hidden bg-[#FDFBF7] flex flex-col lg:flex-row"
      aria-label="Wedding hero"
    >
      {/* ── Artwork panel ── */}
      <div
        className={[
          // Mobile: top, full width, fixed height
          'relative w-full h-[75vw] min-h-[350px] max-h-[500px]',
          // Tablet: slightly taller
          'sm:h-[70vw] sm:max-h-[600px]',
          // Desktop: left column, constrained height
          'lg:w-[55%] lg:h-auto lg:max-h-none lg:min-h-[100svh] lg:max-w-[900px]',
        ].join(' ')}
      >
        <img
          src={hero.heroImage}
          alt={hero.heroImageAlt}
          width={900}
          height={1200}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            // Fallback gracefully if hero.jpg not present
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Soft ivory scrim — bottom fade on mobile, right fade on desktop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(253,251,247,0) 60%, rgba(253,251,247,0.85) 90%, rgba(253,251,247,1) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Desktop: right-side fade */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background:
              'linear-gradient(to right, rgba(253,251,247,0) 60%, rgba(253,251,247,0.95) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Text panel ── */}
      <div
        className={[
          // Mobile: below artwork, centered
          'flex flex-col items-center justify-center text-center',
          'px-5 pb-20 pt-6',
          // Tablet
          'sm:px-8 sm:pb-24 sm:pt-8',
          // Desktop: right column, vertically centered
          'lg:flex-1 lg:items-start lg:text-left',
          'lg:justify-center lg:px-12 lg:py-24',
        ].join(' ')}
      >
        {/* Tagline */}
        <Reveal delay={80}>
          <p className="section-label mb-6">{hero.tagline}</p>
        </Reveal>

        {/* Bride name */}
        <Reveal delay={160}>
          <h1 className="text-hero-name font-display" lang="en">
            {hero.bride}
          </h1>
        </Reveal>

        {/* "with" connector */}
        <Reveal delay={220}>
          <p className="font-display italic text-[clamp(1.1rem,3vw,1.5rem)] text-[#C9A227] my-2">
            {hero.with}
          </p>
        </Reveal>

        {/* Groom name */}
        <Reveal delay={300}>
          <p className="text-hero-name font-display" lang="en">
            {hero.groom}
          </p>
        </Reveal>

        {/* Hairline */}
        <Reveal delay={380}>
          <div className="hairline w-24 mx-auto lg:mx-0 my-6" aria-hidden="true" />
        </Reveal>

        {/* Date */}
        {hero.date?.trim() && (
          <Reveal delay={420}>
            <p className="font-sans-ui text-[clamp(1.1rem,3vw,1.75rem)] font-light tracking-[0.18em] text-[#4A2545]">
              {hero.date}
            </p>
          </Reveal>
        )}

        {/* Location */}
        <Reveal delay={460}>
          <p className="font-sans-ui text-[clamp(0.75rem,1.4vw,0.9rem)] uppercase tracking-widest text-[#C9A227] mt-2">
            {hero.location}
          </p>
        </Reveal>

        {/* Scroll cue */}
        <Reveal delay={600}>
          <div className="mt-10 flex flex-col items-center lg:items-start gap-2 opacity-60">
            <p className="section-label">{hero.scrollCue}</p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#C9A227] animate-bounce"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
