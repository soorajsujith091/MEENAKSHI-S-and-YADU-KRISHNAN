/**
 * ics.ts — Client-side .ics (iCalendar) file generator.
 * Generates a VCALENDAR blob that can be downloaded by the user.
 * No external dependencies required.
 */

interface IcsEvent {
  uid: string;
  summary: string;
  description: string;
  location: string;
  /** Format: YYYYMMDDTHHMMSS (local) or YYYYMMDDTHHMMSSZ (UTC) */
  dtstart: string;
  dtend: string;
  timezone: string;
}

function escapeIcs(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export function generateIcs(event: IcsEvent): void {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Meenakshi&Yadu Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=${event.timezone}:${event.dtstart}`,
    `DTEND;TZID=${event.timezone}:${event.dtend}`,
    `SUMMARY:${escapeIcs(event.summary)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(event.location)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.uid}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
