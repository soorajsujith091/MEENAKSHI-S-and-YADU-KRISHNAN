import { useEffect, useRef, useState } from 'react';
import { content } from '@/content';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/layout/SectionLabel';
import { Reveal } from '@/components/layout/Reveal';

/**
 * Countdown — Live countdown to the wedding day (22 Nov 2026, 12:05 PM IST).
 * UTC timestamp used so it works correctly for guests abroad.
 * After the wedding date has passed, shows "Married ♡ 22.11.2026".
 */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(targetUtc: string): TimeLeft | null {
  const target = new Date(targetUtc).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

interface CountdownCellProps {
  value: number;
  label: string;
  delay: number;
}

function CountdownCell({ value, label, delay }: CountdownCellProps) {
  const prevRef = useRef(value);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 300);
      prevRef.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <Reveal delay={delay} className="flex flex-col items-center px-4 sm:px-6">
      <span
        className={[
          'text-countdown font-display font-medium tabular-nums',
          'transition-opacity duration-150',
          flash ? 'opacity-60' : 'opacity-100',
        ].join(' ')}
        aria-live="polite"
        aria-label={`${value} ${label}`}
      >
        {pad(value)}
      </span>
      <span className="section-label mt-1">{label}</span>
    </Reveal>
  );
}

export function Countdown() {
  const { countdown } = content;
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    computeTimeLeft(countdown.targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(computeTimeLeft(countdown.targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown.targetDate]);

  return (
    <Section id="countdown" bg="lavender">
      <Reveal>
        <SectionLabel className="text-center">{countdown.sectionLabel}</SectionLabel>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-section-h2 text-center mb-12">{countdown.heading}</h2>
      </Reveal>

      {timeLeft === null ? (
        /* Post-wedding state */
        <Reveal>
          <p className="font-display text-[clamp(1.5rem,5vw,3rem)] text-center text-[#4A2545]">
            {countdown.marriedText}
          </p>
        </Reveal>
      ) : (
        /* Live countdown grid — single row on tablet+ */
        <div
          className="flex flex-wrap justify-center gap-y-8 sm:flex-nowrap sm:gap-y-0 divide-x divide-[#C9A227]/30"
          role="timer"
          aria-label="Countdown to the wedding"
        >
          <CountdownCell value={timeLeft.days} label={countdown.labels.days} delay={100} />
          <CountdownCell value={timeLeft.hours} label={countdown.labels.hours} delay={160} />
          <CountdownCell value={timeLeft.minutes} label={countdown.labels.minutes} delay={220} />
          <CountdownCell value={timeLeft.seconds} label={countdown.labels.seconds} delay={280} />
        </div>
      )}
    </Section>
  );
}
