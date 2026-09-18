import { useEffect, useState } from 'react';
import { content } from '@/content';
import { cn } from '@/lib/utils';

/**
 * Nav — Fixed transparent top nav that appears after scroll.
 * Hidden below lg breakpoint (handled by MobileActionBar instead).
 * Has active-section indicator via IntersectionObserver.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = content.nav.links.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'hidden lg:block',
        scrolled
          ? 'bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#C9A227]/20 shadow-sm'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-12 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo / couple name */}
        <a
          href="#hero"
          className={cn(
            'font-display text-xl font-semibold text-[#4A2545] hover-underline-grow',
            'transition-opacity duration-300',
            scrolled ? 'opacity-100' : 'opacity-0'
          )}
        >
          Meenakshi &amp; Yadu
        </a>

        {/* Nav links */}
        <ul className="flex items-center gap-8" role="list">
          {content.nav.links.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'font-sans-ui text-xs uppercase tracking-widest font-medium',
                    'hover-underline-grow transition-colors duration-200',
                    isActive ? 'text-[#C9A227]' : 'text-[#4A2545]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
