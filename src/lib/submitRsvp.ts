/**
 * submitRsvp.ts — Stubbed RSVP submission handler.
 *
 * TODO: Replace the stub with a real integration:
 *   Option A — Formspree: POST to https://formspree.io/f/<your-form-id>
 *   Option B — Google Sheets via Apps Script web app URL
 *   Option C — EmailJS, Netlify Forms, etc.
 */

export interface RsvpData {
  name: string;
  guests: number;
  attending: 'muhurtham' | 'reception' | 'both';
  message?: string;
}

export async function submitRsvp(data: RsvpData): Promise<void> {
  // --- STUB: Simulates a 1.5s network call ---
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log('[RSVP] Submission received:', data);

  // TODO: Uncomment and configure one of the following:
  //
  // Option A — Formspree
  // const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error('Submission failed');
  //
  // Option B — Google Apps Script
  // const res = await fetch('YOUR_APPS_SCRIPT_EXEC_URL', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error('Submission failed');
}
