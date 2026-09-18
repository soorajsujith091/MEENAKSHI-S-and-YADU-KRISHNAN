import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * SectionLabel — Small uppercase tracked label above section headings.
 */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'section-label mb-3',
        className
      )}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </p>
  );
}
