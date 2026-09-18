import { content } from '@/content';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/layout/SectionLabel';
import { Reveal } from '@/components/layout/Reveal';

/**
 * Contact — Tel: links as pill buttons.
 * Mobile: stacked. Tablet+: inline row.
 * Minimum 44px tap targets.
 */
export function Contact() {
  const { contact } = content;

  return (
    <Section id="contact" bg="lavender">
      <Reveal>
        <SectionLabel className="text-center">{contact.sectionLabel}</SectionLabel>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-section-h2 text-center mb-12">{contact.heading}</h2>
      </Reveal>

      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4">
        {contact.phones.map((phone, i) => (
          <Reveal key={phone.number} delay={i * 100}>
            <a
              href={`tel:${phone.number}`}
              className={[
                'inline-flex flex-col items-center justify-center',
                'min-h-[60px] px-7 py-3 rounded-full',
                'border border-[#4A2545]/30 text-[#4A2545]',
                'hover:bg-[#4A2545] hover:text-[#FDFBF7] hover:border-[#4A2545]',
                'transition-all duration-200',
                'font-sans-ui',
              ].join(' ')}
              aria-label={`Call ${phone.label}: ${phone.number}`}
            >
              <span className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-0.5">
                {phone.label}
              </span>
              <span className="text-lg font-medium tracking-wide">
                {phone.number}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
