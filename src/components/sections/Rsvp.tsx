import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { content } from '@/content';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/layout/SectionLabel';
import { Reveal } from '@/components/layout/Reveal';
import { submitRsvp } from '@/lib/submitRsvp';

// Zod v4 compatible schema
const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  guests: z
    .number({ message: 'Enter a number between 1 and 10' })
    .int()
    .min(1, 'At least 1 guest')
    .max(10, 'Maximum 10 guests'),
  attending: z.enum(['muhurtham', 'reception', 'both'] as const, {
    message: 'Please select an event',
  }),
  message: z.string().max(300, 'Maximum 300 characters').optional(),
});

type FormData = z.infer<typeof schema>;

/**
 * Rsvp — Form with react-hook-form + zod validation.
 * On success, replaces the form with a thank-you message.
 */
export function Rsvp() {
  const { rsvp } = content;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<FormData, any, FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: { guests: 1, attending: 'both' },
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      await submitRsvp(data);
      setSubmitted(true);
      toast.success('RSVP received! We look forward to celebrating with you. 🎊');
    } catch {
      toast.error('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (hasError: boolean) =>
    [
      'w-full px-4 py-3 font-sans-ui text-sm',
      'bg-[#FDFBF7] border rounded-sm outline-none',
      'focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]',
      'transition-colors duration-200',
      hasError ? 'border-red-400' : 'border-[#4A2545]/20',
    ].join(' ');

  return (
    <Section id="rsvp" bg="blush">
      <Reveal>
        <SectionLabel className="text-center">{rsvp.sectionLabel}</SectionLabel>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-section-h2 text-center mb-4">{rsvp.heading}</h2>
      </Reveal>
      <Reveal delay={120}>
        <p className="text-center text-[#4A2545]/70 font-sans-ui text-sm mb-12 max-w-md mx-auto">
          {rsvp.subtext}
        </p>
      </Reveal>

      {submitted ? (
        /* Success state */
        <Reveal>
          <div className="max-w-md mx-auto text-center py-12">
            <div className="text-[#C9A227] text-5xl mb-6 font-display">♡</div>
            <h3 className="font-display text-[clamp(1.5rem,4vw,2.25rem)] text-[#4A2545] mb-4">
              {rsvp.successHeading}
            </h3>
            <p className="font-sans-ui text-[#4A2545]/80">{rsvp.successText}</p>
          </div>
        </Reveal>
      ) : (
        /* RSVP form */
        <Reveal delay={160}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto flex flex-col gap-6"
            noValidate
            aria-label="RSVP form"
          >
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rsvp-name"
                className="font-sans-ui text-xs uppercase tracking-widest text-[#4A2545] font-medium"
              >
                Full Name *
              </label>
              <input
                id="rsvp-name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                {...register('name')}
                className={inputClass(!!errors.name)}
                aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p id="rsvp-name-error" className="text-red-500 text-xs font-sans-ui" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Number of guests */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rsvp-guests"
                className="font-sans-ui text-xs uppercase tracking-widest text-[#4A2545] font-medium"
              >
                Number of Guests (incl. yourself) *
              </label>
              <input
                id="rsvp-guests"
                type="number"
                min={1}
                max={10}
                {...register('guests', { valueAsNumber: true })}
                className={inputClass(!!errors.guests)}
                aria-describedby={errors.guests ? 'rsvp-guests-error' : undefined}
                aria-invalid={!!errors.guests}
              />
              {errors.guests && (
                <p id="rsvp-guests-error" className="text-red-500 text-xs font-sans-ui" role="alert">
                  {errors.guests.message}
                </p>
              )}
            </div>

            {/* Attending */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rsvp-attending"
                className="font-sans-ui text-xs uppercase tracking-widest text-[#4A2545] font-medium"
              >
                Attending *
              </label>
              <select
                id="rsvp-attending"
                {...register('attending')}
                className={[inputClass(!!errors.attending), 'appearance-none cursor-pointer'].join(' ')}
                aria-describedby={errors.attending ? 'rsvp-attending-error' : undefined}
                aria-invalid={!!errors.attending}
              >
                {rsvp.eventOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.attending && (
                <p id="rsvp-attending-error" className="text-red-500 text-xs font-sans-ui" role="alert">
                  {errors.attending.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rsvp-message"
                className="font-sans-ui text-xs uppercase tracking-widest text-[#4A2545] font-medium"
              >
                Message (optional)
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                placeholder="A note for the couple…"
                {...register('message')}
                className={[inputClass(!!errors.message), 'resize-none placeholder:text-[#4A2545]/40'].join(' ')}
                aria-describedby={errors.message ? 'rsvp-message-error' : undefined}
              />
              {errors.message && (
                <p id="rsvp-message-error" className="text-red-500 text-xs font-sans-ui" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className={[
                'w-full py-4 font-sans-ui text-sm font-medium uppercase tracking-widest',
                'bg-[#4A2545] text-[#FDFBF7] rounded-sm',
                'hover:bg-[#C9A227] transition-colors duration-200',
                'disabled:opacity-60 disabled:cursor-not-allowed',
                'focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2',
              ].join(' ')}
            >
              {submitting ? 'Sending…' : rsvp.submitLabel}
            </button>
          </form>
        </Reveal>
      )}
    </Section>
  );
}
