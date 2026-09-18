import { useEffect, useState } from 'react';
import { content } from '@/content';
import { cn } from '@/lib/utils';

/**
 * MobileActionBar — Sticky bottom action bar visible on mobile only (<640px).
 * Appears once the hero section has scrolled out of view.
 * On tablet+ (sm:) this bar hides and the Nav takes over.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'sm:hidden', // hidden on tablet and up
        'transition-transform duration-400 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full',
        'bg-[#4A2545] border-t border-[#C9A227]/30',
        'safe-area-inset-bottom' // padding for notched phones
      )}
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="flex items-center">
        {/* RSVP */}
        <a
          href={content.mobileBar.rsvp.href}
          className={cn(
            'flex-1 flex flex-col items-center justify-center gap-1',
            'min-h-[52px] py-2',
            'text-[#FDFBF7] hover:text-[#C9A227] transition-colors',
            'border-r border-[#C9A227]/20'
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-[10px] uppercase tracking-wider font-medium font-sans-ui">
            {content.mobileBar.rsvp.label}
          </span>
        </a>

        {/* Directions */}
        <a
          href={content.mobileBar.directions.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex-1 flex flex-col items-center justify-center gap-1',
            'min-h-[52px] py-2',
            'text-[#FDFBF7] hover:text-[#C9A227] transition-colors',
            'border-r border-[#C9A227]/20'
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          <span className="text-[10px] uppercase tracking-wider font-medium font-sans-ui">
            {content.mobileBar.directions.label}
          </span>
        </a>

        {/* Call */}
        <a
          href={content.mobileBar.call.href}
          className={cn(
            'flex-1 flex flex-col items-center justify-center gap-1',
            'min-h-[52px] py-2',
            'text-[#FDFBF7] hover:text-[#C9A227] transition-colors'
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="text-[10px] uppercase tracking-wider font-medium font-sans-ui">
            {content.mobileBar.call.label}
          </span>
        </a>
      </div>
      {/* safe area padding at bottom for iOS */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
}
