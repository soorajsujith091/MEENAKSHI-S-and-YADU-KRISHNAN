# Meenakshi & Yadu — Wedding Invitation Website

A beautiful, fully responsive wedding invitation website built with **Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (runs at http://localhost:5173)
# Due to the & in the folder name, run via PowerShell:
Set-Location -LiteralPath 'D:\Meenakshi&Yadu'
npm run dev
```

> **Note on folder name**: The `&` character in `Meenakshi&Yadu` causes issues with some shell commands. Always use `Set-Location -LiteralPath` in PowerShell when navigating to this folder.

---

## 📁 Project Structure

```
src/
  content.ts              ← All copy & dates — edit this to change text
  App.tsx                 ← Root component
  main.tsx                ← Entry point
  index.css               ← Global styles, palette tokens, fluid typography
  lib/
    utils.ts              ← cn() class merge utility
    ics.ts                ← .ics calendar file generator
    submitRsvp.ts         ← RSVP submit (stubbed — see below)
  components/
    layout/
      Nav.tsx             ← Fixed top nav (lg+ only)
      MobileActionBar.tsx ← Sticky bottom bar (mobile only)
      Section.tsx         ← Page section wrapper
      SectionLabel.tsx    ← Uppercase tracked label
      Reveal.tsx          ← IntersectionObserver fade-up
    sections/
      Hero.tsx
      Invitation.tsx
      Countdown.tsx
      Events.tsx
      Gallery.tsx
      Venue.tsx
      Contact.tsx
      Rsvp.tsx
      Footer.tsx
    ui/                   ← shadcn/ui primitives
public/
  hero.jpg                ← Radha–Krishna artwork (replace with your image)
  gallery/                ← Add your photos here (photo1.jpg … photo6.jpg)
  favicon.svg             ← Favicon
```

---

## ✏️ How to Customise

### Change Text, Dates, Names
Edit **`src/content.ts`** — all copy is in one typed config object:
- Names, families, addresses → `content.invitation.*`
- Event times, venues → `content.events.cards[]`
- Hero text → `content.hero.*`
- Contact numbers → `content.contact.phones[]`

### Change the Hero Image
Replace `public/hero.jpg` with your Radha–Krishna or couple photo. Recommended size: **900×1200px** (3:4 ratio).

### Add Gallery Photos
Drop images into `public/gallery/`:
- `photo1.jpg` through `photo6.jpg` (or more)
- Update `content.gallery.images` in `src/content.ts` with any additional paths

### Change the Google Maps URL
In `src/content.ts`, update `content.venue.primary.mapSrc` with your embed URL from [Google Maps → Share → Embed a map](https://support.google.com/maps/answer/144361).

### Connect the RSVP Form
Edit `src/lib/submitRsvp.ts` and uncomment one of:
- **Formspree**: replace `YOUR_FORM_ID` with your form's ID
- **Google Apps Script**: replace with your deployment URL

---

## 🎨 Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Ivory | `#FDFBF7` | Page background |
| Blush | `#F7EDF3` | Section alternate bg |
| Lavender | `#EDE4F3` | Countdown, Contact bg |
| Plum | `#4A2545` | Primary text, Footer bg |
| Gold | `#C9A227` | Accents, borders, OM |

---

## 🔤 Typography

- **Display / Names**: Cormorant Garamond (loaded via `@fontsource/cormorant-garamond`)
- **UI / Labels**: Jost (loaded via `@fontsource/jost`)
- No render-blocking Google Fonts CDN links.

---

## 📱 Responsive Strategy

| Breakpoint | Layout |
|-----------|--------|
| `< 640px` | Single column, edge-to-edge, 100svh hero, 2-col gallery, sticky bottom bar |
| `640–1023px` | Centered `max-w-2xl`, 3-col gallery, 2-col events grid, top-right button pair |
| `≥ 1024px` | `max-w-6xl`, two-column sections, fixed top nav, 4-col gallery |
| `≥ 1920px` | Capped at `max-w-7xl`, fluid type scales with `clamp()` |

---

## 🧩 21st.dev Components

> The 21st.dev registry was checked but no components were found that exactly matched our aesthetic without heavy restyling. All UI blocks were hand-built in Tailwind to our palette specification for better maintainability and exact visual control.

If you'd like to add 21st.dev components later, refer to:
```bash
# Check registry first:
npx shadcn@latest add "https://21st.dev/r/<author>/<component>"
```

---

## ✅ Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `section`, `footer`, `address`)
- Single `<h1>` on the page (Hero)
- All images have descriptive `alt` text
- Visible focus rings (gold `outline`)
- Form labels tied to inputs via `htmlFor`
- `aria-live` on countdown timer
- Skip-to-main-content link
- `prefers-reduced-motion` respected (CSS only)
- Contrast: plum `#4A2545` on ivory `#FDFBF7` → 8.6:1 ✅

---

## 🔧 Build

```bash
# Due to & in folder name, use node directly:
node node_modules/vite/bin/vite.js build
```

---

## 📅 Key Dates

- **Reception**: Saturday, 21 November 2026, 6:30–9:30 PM @ Riverside Retreat, Kuttoor
- **Muhurtham**: Sunday, 22 November 2026, 12:05–12:25 PM @ Yatir Auditorium, Thiruvalla
