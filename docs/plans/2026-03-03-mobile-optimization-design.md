# Mobile Optimization Design

**Date:** 2026-03-03
**Scope:** Full mobile overhaul across all components
**Min target:** 375px (iPhone SE / modern minimum)
**Approach:** Component-by-component Tailwind fixes, no new abstractions

## 1. Mobile Navigation

- Add hamburger icon button (Lucide `Menu`/`X`), visible below `md:` breakpoint
- Slide-out drawer from right, animated with Framer Motion
- Drawer contains all nav links + "Are you a Vet?" / "Are you a Pet Parent?" CTAs
- Clicking a link closes drawer and navigates
- Backdrop overlay behind drawer, click to dismiss
- Body scroll locked when open
- Breakpoints: `< md` = hamburger + drawer; `>= md` = current desktop nav

## 2. Typography & Spacing

**Headings (3-tier responsive):**
- Hero/page headings: `text-3xl sm:text-5xl md:text-7xl`
- Section headings: `text-2xl sm:text-3xl md:text-5xl`
- Subheadings: `text-lg sm:text-xl`

**Section padding:**
- `py-32` -> `py-16 md:py-32`
- `py-24` -> `py-12 md:py-24`

**Fixed heights:**
- Hero `h-[85vh]` -> `min-h-[70vh] md:h-[85vh]`
- Image `h-[480px]` -> `h-[280px] md:h-[480px]`

## 3. Layouts & Grids

**Services page hidden buttons:**
- Remove `hidden md:block` / `hidden md:flex` from enrollment buttons
- Stack full-width on mobile

**Grid breakpoints (consistent pattern):**
- 3-col: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- 2-col: `grid grid-cols-1 md:grid-cols-2`
- Vets benefits: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

**Grid gaps (responsive):**
- `gap-16` -> `gap-8 md:gap-16`
- `gap-10` -> `gap-6 md:gap-10`

**Services sticky pill nav:**
- Keep `overflow-x-auto`, add `snap-x snap-mandatory`
- Pill padding: `px-3 sm:px-5`

**Trust banner:**
- `gap-x-10` -> `gap-x-4 sm:gap-x-10`

## 4. Modals, Forms & Touch

**BookingModal:**
- Add `mx-4` margin on mobile
- Header padding: `px-4 sm:px-6`
- Body max-height: `max-h-[80vh] sm:max-h-[70vh]`

**Vets form:**
- Step wizard labels: `hidden sm:inline` on label text (show numbers only on small screens)

**Touch interactions:**
- ValueProp expandable cards: always show expanded content below `md:`, use `md:group-hover:` for desktop hover effect

## 5. Overflow & Decorative Elements

**Background blobs (App.tsx):**
- `overflow-hidden` on blob container
- Blob sizes: `w-[300px] h-[300px] md:w-[800px] md:h-[800px]`

**Services hero blobs:**
- Same — scale down, `overflow-hidden` on parent

**Decorative SVGs:**
- Hero paw: hide on mobile `hidden md:block` or scale down
- Vets paw watermark: `hidden md:block`

**Footer:**
- Gap: `gap-4 md:gap-8`
