import { cn } from '@/lib/utils';
import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bg?: 'ivory' | 'blush' | 'lavender';
}

/**
 * Section — semantic <section> wrapper with consistent vertical padding
 * and background colour support.
 */
export function Section({ id, className, children, bg = 'ivory' }: SectionProps) {
  const bgMap = {
    ivory: 'bg-[#FDFBF7]',
    blush: 'bg-[#F7EDF3]',
    lavender: 'bg-[#EDE4F3]',
  };

  return (
    <section
      id={id}
      className={cn(
        'w-full py-[var(--section-py)] px-5 sm:px-8 lg:px-12',
        bgMap[bg],
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
