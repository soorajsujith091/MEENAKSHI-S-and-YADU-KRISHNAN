import { content } from '@/content';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/layout/SectionLabel';
import { Reveal } from '@/components/layout/Reveal';

/**
 * Venue — Google Maps iframe + address block.
 *
 * Mobile: full-width iframe, then address below.
 * Desktop (lg): map iframe left (16:10), address + buttons right.
 */
export function Venue() {
  const { venue } = content;

  return (
    <Section id="venue" bg="ivory">
      <Reveal>
        <SectionLabel className="text-center">{venue.sectionLabel}</SectionLabel>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-section-h2 text-center mb-12">{venue.heading}</h2>
      </Reveal>

      {/* Primary venue */}
      <div className="flex flex-col lg:flex-row lg:gap-12 lg:items-start mb-12">
        {/* Map iframe */}
        <Reveal delay={120} className="lg:w-[55%] flex-shrink-0">
          <div className="relative w-full overflow-hidden rounded-sm border border-[#C9A227]/20" style={{ paddingBottom: '62.5%' /* 16:10 */ }}>
            <iframe
              src={venue.primary.mapSrc}
              title={`Map showing ${venue.primary.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </Reveal>

        {/* Address block */}
        <Reveal delay={200} className="flex-1 mt-8 lg:mt-0 flex flex-col">
          {/* Accent bar */}
          <div className="w-10 h-px bg-[#C9A227] mb-6" aria-hidden="true" />

          <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-[#4A2545] mb-3">
            {venue.primary.name}
          </h3>

          <address className="font-sans-ui not-italic text-[clamp(0.85rem,1.4vw,1rem)] text-[#4A2545]/80 leading-relaxed mb-8">
            {venue.primary.address}
          </address>

          {/* Primary CTA */}
          <a
            href={venue.primary.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'inline-flex items-center gap-2 self-start',
              'px-6 py-3 font-sans-ui text-sm font-medium uppercase tracking-widest',
              'border border-[#C9A227] text-[#C9A227] rounded-sm',
              'hover:bg-[#C9A227] hover:text-[#FDFBF7] transition-colors duration-200',
            ].join(' ')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {venue.primary.label}
          </a>

          {/* Secondary: reception venue */}
          <div className="mt-auto pt-10 border-t border-[#C9A227]/20">
            <p className="font-display italic text-[clamp(1rem,2vw,1.2rem)] text-[#4A2545] mb-2">
              {venue.secondary.name}
            </p>
            <address className="font-sans-ui not-italic text-sm text-[#4A2545]/70 mb-4">
              {venue.secondary.address}
            </address>
            <a
              href={venue.secondary.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'inline-flex items-center gap-2',
                'text-xs font-medium font-sans-ui uppercase tracking-widest',
                'text-[#4A2545]/60 hover:text-[#C9A227] transition-colors',
                'hover-underline-grow',
              ].join(' ')}
            >
              {venue.secondary.label} →
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
