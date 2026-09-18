import { content } from '@/content';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/layout/SectionLabel';
import { Reveal } from '@/components/layout/Reveal';
import { generateIcs } from '@/lib/ics';

/**
 * Events — Reception and Muhurtham event cards.
 *
 * Mobile: stacked single column.
 * Tablet (sm): 2-col grid.
 * Desktop (lg): side-by-side equal height cards.
 *
 * Each card has an "Add to Calendar" button that generates a .ics file client-side.
 */
export function Events() {
  const { events } = content;

  function handleAddToCalendar(card: (typeof events.cards)[number]) {
    generateIcs({
      uid: `${card.id}-meenakshi-yadu-2026`,
      summary: `${card.title} — Meenakshi & Yadu Krishna`,
      description:
        card.id === 'muhurtham'
          ? `Muhurtham: 12:05 PM – 12:25 PM. Bus departs at 11:00 AM.`
          : `Reception: 6:30 PM – 9:30 PM`,
      location: 'address' in card ? card.address : '',
      dtstart: card.calendarStart,
      dtend: card.calendarEnd,
      timezone: card.calendarTimezone,
    });
  }

  return (
    <Section id="events" bg="ivory">
      <Reveal>
        <SectionLabel className="text-center">{events.sectionLabel}</SectionLabel>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-section-h2 text-center mb-12">{events.heading}</h2>
      </Reveal>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {events.cards.map((card, i) => {
          const isMuhurtham = card.id === 'muhurtham';
          return (
            <Reveal
              key={card.id}
              delay={i * 120}
              className={[
                'relative flex flex-col rounded-sm border p-8 lg:p-10',
                'hover-lift transition-shadow',
                isMuhurtham
                  ? 'border-[#C9A227] bg-[#FDFBF7]'
                  : 'border-[#4A2545]/15 bg-[#F7EDF3]',
              ].join(' ')}
            >
              {/* Badge */}
              {card.badge && (
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-medium font-sans-ui text-[#FDFBF7] bg-[#C9A227] px-2.5 py-1 rounded-full">
                  {card.badge}
                </span>
              )}

              {/* Gold accent bar */}
              <div className="w-10 h-px bg-[#C9A227] mb-6" aria-hidden="true" />

              {/* Title */}
              <h3 className="font-display text-[clamp(1.4rem,3vw,2rem)] font-semibold text-[#4A2545] mb-4">
                {card.title}
              </h3>

              {/* Day */}
              <p className="font-sans-ui text-sm font-medium text-[#4A2545] mb-1">
                {card.dayLabel}
              </p>

              {/* Malayalam date (muhurtham only) */}
              {'hindiDate' in card && card.hindiDate && (
                <p className="font-sans-ui text-xs text-[#C9A227] tracking-wide mb-4">
                  {card.hindiDate}
                </p>
              )}

              {/* Venue */}
              <p className="font-display italic text-[clamp(1rem,2vw,1.25rem)] text-[#4A2545] mt-2 mb-1">
                {'venue' in card ? card.venue : ''}
              </p>
              {'venueAddress' in card && card.venueAddress && (
                <p className="font-sans-ui text-xs text-[#4A2545]/60 mb-4">
                  {card.venueAddress}
                </p>
              )}

              {/* Time */}
              <p className="font-sans-ui font-medium text-[#4A2545] mb-2 mt-auto pt-4">
                {card.time}
              </p>

              {/* Bus time (muhurtham only) */}
              {'busTime' in card && card.busTime && (
                <p className="font-sans-ui text-sm text-[#4A2545]/70 mb-6">
                  {card.busTime}
                </p>
              )}

              {/* Add to Calendar */}
              <button
                onClick={() => handleAddToCalendar(card)}
                className={[
                  'mt-6 self-start inline-flex items-center gap-2',
                  'px-4 py-2 text-xs font-medium font-sans-ui uppercase tracking-widest',
                  'border rounded-sm transition-colors duration-200',
                  isMuhurtham
                    ? 'border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-[#FDFBF7]'
                    : 'border-[#4A2545]/40 text-[#4A2545] hover:bg-[#4A2545] hover:text-[#FDFBF7]',
                ].join(' ')}
                aria-label={`Add ${card.title} to calendar`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Add to Calendar
              </button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
