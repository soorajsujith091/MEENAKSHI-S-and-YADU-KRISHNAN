import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

/**
 * MusicPlayer — Floating background music control.
 *
 * Browsers require a user gesture to play audio, so playback starts
 * when `shouldPlay` becomes true (triggered by the Entry Overlay open).
 * A small floating button in the bottom-right lets the user mute/unmute.
 */
export function MusicPlayer({ shouldPlay }: { shouldPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Start playing when shouldPlay becomes true (user opened the invitation)
  useEffect(() => {
    if (shouldPlay && !hasStarted && audioRef.current) {
      audioRef.current.volume = 0.35;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          // Autoplay blocked — user can click the button manually
          setIsPlaying(false);
        });
    }
  }, [shouldPlay, hasStarted]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.35;
      audio.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {});
    }
  }, [isPlaying]);

  // Don't render the toggle until the overlay has been opened at least once
  if (!shouldPlay && !hasStarted) return (
    <audio ref={audioRef} src="/wedding-music.mp4" loop preload="auto" />
  );

  return (
    <>
      <audio ref={audioRef} src="/wedding-music.mp4" loop preload="auto" />

      {/* Floating toggle button — bottom right, above mobile action bar */}
      <button
        onClick={toggle}
        className={cn(
          'fixed z-[90] flex items-center justify-center',
          'w-11 h-11 rounded-full',
          'bg-[#4A2545]/90 text-[#FDFBF7] backdrop-blur-sm',
          'border border-[#C9A227]/40',
          'shadow-lg hover:scale-110 active:scale-95',
          'transition-all duration-200',
          // Position: bottom-right, above mobile bar on small screens
          'bottom-6 right-6 sm:bottom-8 sm:right-8',
          'max-sm:bottom-[5.5rem]' // above MobileActionBar
        )}
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        title={isPlaying ? 'Mute music' : 'Play music'}
      >
        {isPlaying ? (
          /* Speaker playing icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          /* Speaker muted icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}

        {/* Pulse animation when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[#C9A227]/50 animate-ping opacity-30 pointer-events-none" />
        )}
      </button>
    </>
  );
}
