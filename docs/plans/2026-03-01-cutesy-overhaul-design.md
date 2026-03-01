# PawGuardian Cutesy Visual Overhaul — Design Doc

**Date:** 2026-03-01
**Status:** Approved

## Goal

Transform PawGuardian's visual identity from corporate/clinical to playful & cutesy while preserving the navy + cream brand backbone. Add candy-colored accents, a bubbly display font, paw print decorations, and emoji touches throughout.

---

## Design Decisions

### Approach chosen: Option B — Full visual language overhaul

- Retain navy (`#1e3470`) and cream (`#f8f4e8`) as structural backbone
- Add candy accent colors layered on top
- Replace headings with Nunito (Google Fonts), keep system sans for body
- No copy changes

---

## Color Palette

| Token    | Hex       | Used for                        |
|----------|-----------|---------------------------------|
| Navy     | `#1e3470` | Structural (unchanged)          |
| Dark     | `#282239` | Structural (unchanged)          |
| Cream    | `#f8f4e8` | Background (unchanged)          |
| Pink     | `#FF6B9D` | Primary CTAs, active states     |
| Mint     | `#4ECDC4` | Feature highlights, success     |
| Lemon    | `#FFE66D` | Badges, callouts                |
| Peach    | `#FF9F7F` | Dog section accent              |
| Lavender | `#C4B5FD` | Cat section accent              |

---

## Typography

- Load `Nunito` from Google Fonts: weights 400, 600, 700, 800, 900
- Apply to all headings via `index.html` `<link>` + Tailwind `fontFamily` config or `index.css`
- Body text remains existing system sans

---

## Section-by-Section Changes

### Navbar
- Logo `PawPrint` icon background: flat navy → pink-to-peach gradient (`#FF6B9D` → `#FF9F7F`)
- Logo hover: playful wiggle animation (Framer Motion `rotate: [0, -15, 15, 0]`)
- "Book a Slot" button: navy → pink (`#FF6B9D`) with soft pink shadow
- Active nav link: add small lemon-yellow dot under the active item

### Hero
- Lighten dark overlay: `bg-slate-900/60` → `bg-slate-900/40`
- "Accepting Early Access" badge: plain dot → pink pill with `🐾` emoji
- Hero gradient text: update to pink→peach (`#FF6B9D` → `#FF9F7F`)
- "Join the Waitlist" button: navy → pink gradient
- Footer feature chips: plain text → white pill badges with emojis (`🏥`, `👩‍⚕️`, `💸`)
- Add subtle animated paw print SVG pattern, bottom-left corner, ~10% opacity

### ValueProp
- Headings use Nunito
- Card left-border and icon colors → candy (pink for alert, mint for home, lemon for wallet)
- "Save 73%" badge → lemon yellow background, dark text
- Purple info box: rounder corners, add `🐾` emoji prefix

### HowItWorks
- "The 4-Pillar Model" label → wrapped in lemon pill badge
- Each card icon gets its own candy color: pillar 1 pink, 2 mint, 3 peach, 4 lavender
- Ghost number in corner: candy-tinted to match pillar color
- Hover shadow: candy-colored (matching pillar)

### Plans
- Dog heading: "For Dogs 🐶", Cat heading: "For Cats 🐱"
- Dog accent: orange → peach (`#FF9F7F`)
- Cat accent: blue → lavender (`#C4B5FD`)
- Plan cards: `rounded-2xl` → `rounded-3xl`
- Age badge colors: use candy palette

### FinalCTA
- Add decorative paw print divider above heading (5–6 SVG paw prints, alternating pink/peach)
- Soft pink-to-peach radial gradient blob behind text
- The period in "We Can." → colored pink

### Footer
- Logo icon background: flat dark → pink gradient (matches navbar)
- Social icon hover color: navy → pink

---

## Files to Change

1. `index.html` — add Nunito Google Fonts `<link>`
2. `tailwind.config.js` (or `tailwind.config.ts`) — add `nunito` to `fontFamily`
3. `index.css` — set `font-family: 'Nunito', sans-serif` for headings OR add heading utility class
4. `components/Layout/Navbar.tsx`
5. `components/Sections/Hero.tsx`
6. `components/Sections/ValueProp.tsx`
7. `components/Sections/HowItWorks.tsx`
8. `components/Sections/Plans.tsx`
9. `components/Sections/FinalCTA.tsx`
10. `components/Layout/Footer.tsx`
