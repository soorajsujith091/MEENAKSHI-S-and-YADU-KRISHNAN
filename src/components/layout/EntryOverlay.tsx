import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { content } from '@/content';

export function EntryOverlay({ onOpen }: { onOpen?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const { hero } = content;

  useEffect(() => {
    // Lock body scroll when overlay is active
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Wait for animation to finish before unmounting (1.2s total)
      const timer = setTimeout(() => {
        setIsUnmounted(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (isUnmounted) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] overflow-hidden pointer-events-auto',
        isOpen && 'pointer-events-none'
      )}
    >
      {/* Left Envelope Flap */}
      <div
        className={cn(
          'absolute top-0 left-0 w-[50.5%] h-full bg-[#FDFBF7] shadow-[2px_0_15px_rgba(0,0,0,0.1)] z-10 flex flex-col justify-between transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]',
          isOpen ? '-translate-x-full' : 'translate-x-0'
        )}
      >
        {/* Subtle floral/corner accent top left */}
        <div className="w-32 h-32 opacity-20 pointer-events-none" style={{
          background: 'radial-gradient(circle at top left, #4A2545 0%, transparent 70%)'
        }} />
        <div className="w-32 h-32 opacity-20 pointer-events-none" style={{
          background: 'radial-gradient(circle at bottom left, #4A2545 0%, transparent 70%)'
        }} />
      </div>

      {/* Right Envelope Flap */}
      <div
        className={cn(
          'absolute top-0 right-0 w-[50.5%] h-full bg-[#FDFBF7] shadow-[-2px_0_15px_rgba(0,0,0,0.1)] z-10 flex flex-col justify-between items-end transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]',
          isOpen ? 'translate-x-full' : 'translate-x-0'
        )}
      >
        {/* Subtle floral/corner accent top right */}
        <div className="w-32 h-32 opacity-20 pointer-events-none" style={{
          background: 'radial-gradient(circle at top right, #4A2545 0%, transparent 70%)'
        }} />
        <div className="w-32 h-32 opacity-20 pointer-events-none" style={{
          background: 'radial-gradient(circle at bottom right, #4A2545 0%, transparent 70%)'
        }} />
      </div>

      {/* Center Content */}
      <div
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] w-[90%] max-w-[500px]',
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        )}
      >
        {/* Added Text Content */}
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <p className="font-sans-ui uppercase tracking-[0.2em] text-[#C9A227] text-xs md:text-sm font-medium">
            The Blessed Wedding Celebration
          </p>
          <div className="flex flex-col items-center gap-1 mt-2">
            <p className="font-display italic text-3xl md:text-4xl text-[#4A2545]">
              You're invited
            </p>
            <p className="font-sans-ui text-sm md:text-base text-[#4A2545]/80 mt-2 uppercase tracking-widest">
              to celebrate the wedding of
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[#4A2545] mt-3 font-semibold leading-tight">
              {hero.bride.split(' ')[0]} <span className="text-[#C9A227] italic font-normal text-3xl md:text-4xl">&</span> {hero.groom.split(' ')[0]}
            </h2>
          </div>
        </div>

        {/* Center Seal */}
        <button
          onClick={() => { setIsOpen(true); onOpen?.(); }}
          className={cn(
            'relative flex flex-col items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 group',
            'w-24 h-24 md:w-28 md:h-28 mb-6',
            'bg-[#4A2545] text-[#FDFBF7]', // Plum base
            'shadow-[0_4px_20px_rgba(74,37,69,0.4),inset_0_2px_5px_rgba(255,255,255,0.2)]', // Outer drop shadow + inner highlight for wax look
            'border-[3px] border-[#C9A227]/80 cursor-pointer' // Gold trim
          )}
          aria-label="Open invitation"
        >
          {/* Inner ring for wax seal realism */}
          <div className="absolute inset-2 rounded-full border border-[#C9A227]/30 pointer-events-none" />
          
          <span className="font-display text-3xl md:text-4xl text-[#C9A227]">
            M<span className="text-xl md:text-2xl">&</span>Y
          </span>
        </button>

        {/* Open Invitation Text */}
        <button 
          onClick={() => { setIsOpen(true); onOpen?.(); }}
          className="flex flex-col items-center gap-2 text-[#4A2545] hover:text-[#C9A227] transition-colors group cursor-pointer"
        >
          <span className="font-sans-ui text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
            Open invitation
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce group-hover:text-[#C9A227] transition-colors">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

