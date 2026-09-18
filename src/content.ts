/**
 * content.ts — Single source of truth for all copy and dates.
 * Edit this file to change any text, dates, or contact info.
 */

export const WEDDING_DATE_UTC = '2026-11-22T06:35:00.000Z'; // 12:05 PM IST = 06:35 UTC
export const MUHURTHAM_END_UTC = '2026-11-22T06:55:00.000Z'; // 12:25 PM IST

export const content = {
  meta: {
    title: 'Meenakshi & Yadu Krishna — Wedding Invitation · 22.11.2026',
    description:
      'Join us to celebrate the wedding of Meenakshi S and Yadu Krishnan on 22nd November 2026 at Yatir Auditorium, Thiruvalla, Kerala.',
    ogImage: '/hero.jpg',
    url: 'https://meenakshi-yadu.wedding',
  },

  hero: {
    om: 'ॐ',
    tagline: 'Together with their families',
    bride: 'Meenakshi S',
    with: 'with',
    groom: 'Yadu Krishnan',
    date: '22 · 11 · 2026',
    location: 'Thiruvalla, Kerala',
    scrollCue: 'Scroll',
    heroImage: '/hero.jpg',
    heroImageAlt: 'Radha Krishna painting — artwork for Meenakshi & Yadu wedding',
  },

  invitation: {
    sectionLabel: 'The Invitation',
    heading: 'You Are Cordially Invited',
    bride: {
      parents: 'Mr. Sunil Kumar & Mrs. Sindhu S Kumar',
      address: 'Devibhavanam, Kuttoor P.O., Thiruvalla',
      text: 'cordially invite your esteemed presence with family on the occasion of the marriage of our daughter',
      name: 'Meenakshi S',
    },
    groom: {
      parents: 'S/o Late P.B. Radhakrishnan & Mrs. Girija Radhakrishnan',
      address: 'Krishnagiri, Punnakkal, Elamakkara P.O., Kochi - 26',
      name: 'Yadu Krishnan',
    },
    dividerSymbol: 'ॐ',
  },

  countdown: {
    sectionLabel: 'Counting Down',
    heading: 'The Big Day',
    targetDate: WEDDING_DATE_UTC,
    labels: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
    },
    marriedText: 'Married ♡ 22.11.2026',
  },

  events: {
    sectionLabel: 'Events',
    heading: 'Join Us For',
    cards: [
      {
        id: 'reception',
        title: 'Reception',
        badge: null,
        dayLabel: 'Saturday, 21 November 2026',
        hindiDate: null,
        venue: 'Riverside Retreat, Kuttoor',
        time: '6:30 PM – 9:30 PM',
        address: 'Kuttoor, Thiruvalla, Kerala',
        calendarStart: '20261121T183000', // local time string for ICS
        calendarEnd: '20261121T213000',
        calendarTimezone: 'Asia/Kolkata',
      },
      {
        id: 'muhurtham',
        title: 'Muhurtham',
        badge: 'Main Event',
        dayLabel: 'Sunday, 22 November 2026',
        hindiDate: '1202 Vrischikam 6',
        venue: 'Yatir Auditorium',
        venueAddress: 'T.K. Road, Vallamkulam East, Thiruvalla',
        time: 'Muhurtham: 12:05 PM – 12:25 PM',
        busTime: 'Bus departs: 11:00 AM',
        address: 'T.K. Road, Vallamkulam East, Thiruvalla, Kerala',
        calendarStart: '20261122T120500',
        calendarEnd: '20261122T122500',
        calendarTimezone: 'Asia/Kolkata',
      },
    ],
  },

  gallery: {
    sectionLabel: 'Gallery',
    heading: 'A Glimpse',
    // Add your image paths here — place files in /public/gallery/
    images: [
      { src: '/gallery/photo1.jpg', alt: 'Meenakshi and Yadu Krishna' },
      { src: '/gallery/photo2.jpg', alt: 'Couple portrait' },
      { src: '/gallery/photo3.jpg', alt: 'Celebration moment' },
      { src: '/gallery/photo4.jpg', alt: 'Family together' },
      { src: '/gallery/photo5.jpg', alt: 'Joyful celebration' },
      { src: '/gallery/photo6.jpg', alt: 'Wedding preparations' },
    ],
  },

  venue: {
    sectionLabel: 'Venue',
    heading: 'Find Us Here',
    primary: {
      name: 'Yatir Auditorium',
      address: 'T.K. Road, Vallamkulam East, Thiruvalla, Kerala',
      mapSrc:
        // TODO: Replace with actual Google Maps embed URL
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.0!2d76.5!3d9.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjInNDguMCJOIDc2wrAzMCcwMC4wIkU!5e0!3m2!1sen!2sin!4v1234567890',
      mapsUrl:
        'https://maps.google.com/?q=Yatir+Auditorium+TK+Road+Thiruvalla+Kerala',
      label: 'Open in Maps',
    },
    secondary: {
      name: 'Riverside Retreat',
      address: 'Kuttoor, Thiruvalla, Kerala',
      mapsUrl:
        'https://maps.google.com/?q=Riverside+Retreat+Kuttoor+Thiruvalla+Kerala',
      label: 'Directions to Reception Venue',
    },
  },

  contact: {
    sectionLabel: 'Contact',
    heading: 'Reach Us',
    phones: [
      { label: 'Bride\'s family', number: '8078443579' },
      { label: 'Contact', number: '9605100568' },
      { label: 'Contact', number: '9074184662' },
    ],
  },

  rsvp: {
    sectionLabel: 'RSVP',
    heading: 'Will You Join Us?',
    subtext: 'Kindly confirm your attendance by 15 November 2026.',
    eventOptions: [
      { value: 'muhurtham', label: 'Muhurtham (22 Nov)' },
      { value: 'reception', label: 'Reception (21 Nov)' },
      { value: 'both', label: 'Both Events' },
    ],
    successHeading: 'Thank You!',
    successText: "We look forward to celebrating with you. You'll receive a confirmation shortly.",
    submitLabel: 'Send RSVP',
  },

  footer: {
    compliments: 'Best compliments from:',
    names: 'Vishnu, Rukma & Jishnu',
    om: 'ॐ',
    couple: 'Meenakshi & Yadu',
    date: '22.11.2026',
  },

  nav: {
    links: [
      { label: 'Invitation', href: '#invitation' },
      { label: 'Events', href: '#events' },
      { label: 'Venue', href: '#venue' },
      { label: 'RSVP', href: '#rsvp' },
    ],
  },

  mobileBar: {
    rsvp: { label: 'RSVP', href: '#rsvp' },
    directions: {
      label: 'Directions',
      href: 'https://maps.google.com/?q=Yatir+Auditorium+TK+Road+Thiruvalla+Kerala',
    },
    call: { label: 'Call', href: 'tel:8078443579' },
  },
} as const;

export type Content = typeof content;
