import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Nav } from '@/components/layout/Nav';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { MusicPlayer } from '@/components/layout/MusicPlayer';
import { Hero } from '@/components/sections/Hero';
import { Invitation } from '@/components/sections/Invitation';
import { Countdown } from '@/components/sections/Countdown';
import { Events } from '@/components/sections/Events';
import { Gallery } from '@/components/sections/Gallery';
import { Venue } from '@/components/sections/Venue';
import { Contact } from '@/components/sections/Contact';
import { Rsvp } from '@/components/sections/Rsvp';
import { Footer } from '@/components/sections/Footer';

import { EntryOverlay } from '@/components/layout/EntryOverlay';

/**
 * App — Root component assembling all sections.
 * Section order: Hero → Invitation → Countdown → Events → Gallery → Venue → Contact → RSVP → Footer
 */
function App() {
  const [musicStarted, setMusicStarted] = useState(false);

  return (
    <>
      <EntryOverlay onOpen={() => setMusicStarted(true)} />
      {/* Background music — starts when invitation is opened */}
      <MusicPlayer shouldPlay={musicStarted} />
      {/* Skip to main content — keyboard accessibility */}
      <a
        href="#invitation"
        className={[
          'sr-only focus:not-sr-only',
          'focus:fixed focus:top-4 focus:left-4 focus:z-[100]',
          'focus:px-4 focus:py-2 focus:bg-[#4A2545] focus:text-[#FDFBF7]',
          'focus:rounded-sm focus:text-sm focus:font-medium',
        ].join(' ')}
      >
        Skip to main content
      </a>

      {/* Desktop sticky nav (hidden below lg) */}
      <Nav />

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <Invitation />
        <Countdown />
        <Events />
        <Gallery />
        <Venue />
        <Contact />
        <Rsvp />
      </main>

      <Footer />

      {/* Mobile bottom action bar (hidden on sm+) */}
      <MobileActionBar />

      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: 'Jost, Inter, sans-serif',
            background: '#4A2545',
            color: '#FDFBF7',
            border: '1px solid rgba(201, 162, 39, 0.3)',
          },
        }}
      />
    </>
  );
}

export default App;
