import { content } from '@/content';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/layout/SectionLabel';
import { Reveal } from '@/components/layout/Reveal';

/**
 * Invitation — Formal family invitation text.
 *
 * Mobile/Tablet: stacked single column.
 * Desktop (lg+): two-column layout with a vertical hairline divider
 *                and a centred gold "ॐ" symbol on it.
 */
export function Invitation() {
  const { invitation } = content;

  return (
    <Section id="invitation" bg="blush">
      <Reveal>
        <SectionLabel className="text-center">{invitation.sectionLabel}</SectionLabel>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-section-h2 text-center mb-10 lg:mb-16">
          {invitation.heading}
        </h2>
      </Reveal>

      {/* ── Two-column layout on desktop ── */}
      <div className="relative flex flex-col lg:flex-row lg:items-start lg:gap-0">

        {/* ── Bride's family (left) ── */}
        <Reveal delay={120} className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right lg:pr-16 pb-12 lg:pb-0">
          <p className="font-sans-ui font-medium text-[#4A2545] text-[clamp(0.85rem,1.4vw,1rem)] leading-relaxed mb-1">
            {invitation.bride.parents}
          </p>
          <p className="font-sans-ui text-[clamp(0.75rem,1.2vw,0.875rem)] text-[#4A2545]/70 mb-6 italic">
            {invitation.bride.address}
          </p>

          <p className="font-display italic text-[clamp(1rem,1.8vw,1.2rem)] text-[#4A2545]/80 mb-8 max-w-xs lg:max-w-sm leading-relaxed">
            {invitation.bride.text}
          </p>

          <p className="font-display font-semibold text-[clamp(1.75rem,4vw,2.75rem)] text-[#4A2545] leading-tight">
            {invitation.bride.name}
          </p>
        </Reveal>

        {/* ── Vertical hairline divider (desktop only) ── */}
        <div
          className="hidden lg:flex flex-col items-center w-px bg-[#C9A227]/30 self-stretch mx-0"
          aria-hidden="true"
        >
          {/* Gold OM centred on the hairline */}
          <div className="flex-1" />
          <div className="relative -translate-x-1/2">
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C9A227] font-display text-2xl bg-[#F7EDF3] px-2 select-none">
              {invitation.dividerSymbol}
            </span>
          </div>
          <div className="flex-1" />
        </div>

        {/* ── Mobile / tablet: hairline separator ── */}
        <div className="lg:hidden flex items-center gap-4 mb-12">
          <div className="flex-1 hairline" />
          <span className="text-[#C9A227] font-display text-2xl select-none">
            {invitation.dividerSymbol}
          </span>
          <div className="flex-1 hairline" />
        </div>

        {/* ── Groom's family (right) ── */}
        <Reveal delay={200} className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-16">
          <p className="font-display font-semibold text-[clamp(1.75rem,4vw,2.75rem)] text-[#4A2545] leading-tight mb-8">
            {invitation.groom.name}
          </p>

          <p className="font-sans-ui font-medium text-[#4A2545] text-[clamp(0.85rem,1.4vw,1rem)] leading-relaxed mb-1">
            {invitation.groom.parents}
          </p>
          <p className="font-sans-ui text-[clamp(0.75rem,1.2vw,0.875rem)] text-[#4A2545]/70 italic">
            {invitation.groom.address}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
