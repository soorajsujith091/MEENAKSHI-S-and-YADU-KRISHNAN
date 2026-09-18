import { useState } from 'react';
import { content } from '@/content';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/layout/SectionLabel';
import { Reveal } from '@/components/layout/Reveal';

/**
 * Gallery — Responsive photo grid with lazy loading and fixed aspect ratios.
 * Mobile: 2 columns. Tablet: 3 columns. Desktop: 4 columns.
 * Click opens a lightbox.
 *
 * Images go in /public/gallery/.
 * If an image is missing, a lavender placeholder tile is shown.
 */
export function Gallery() {
  const { gallery } = content;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <Section id="gallery" bg="blush">
      <Reveal>
        <SectionLabel className="text-center">{gallery.sectionLabel}</SectionLabel>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-section-h2 text-center mb-12">{gallery.heading}</h2>
      </Reveal>

      {/* Photo grid */}
      <ul
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 list-none p-0 m-0"
        aria-label="Photo gallery"
      >
        {gallery.images.map((img, i) => (
          <li key={img.src}>
            <Reveal
              delay={i * 60}
              className="relative aspect-square overflow-hidden rounded-sm bg-[#EDE4F3] cursor-pointer group block"
            >
              <button
                onClick={() => setLightbox(img)}
                className="w-full h-full focus-visible:ring-2 focus-visible:ring-[#C9A227] block"
                aria-label={`View: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className={[
                    'w-full h-full object-cover',
                    'transition-transform duration-500',
                    'group-hover:scale-105',
                  ].join(' ')}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#4A2545]/0 group-hover:bg-[#4A2545]/20 transition-colors duration-300 pointer-events-none" />
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Lightbox dialog */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
              aria-label="Close lightbox"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <figcaption className="sr-only">{lightbox.alt}</figcaption>
          </div>
        </div>
      )}
    </Section>
  );
}
