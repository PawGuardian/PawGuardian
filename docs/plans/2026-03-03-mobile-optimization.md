# Mobile Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the entire PawGuardian site mobile-friendly down to 375px screens — navigation, typography, layouts, modals, and overflow.

**Architecture:** Component-by-component Tailwind responsive class additions. No new abstractions. The Navbar gets a new hamburger + drawer pattern; everything else is class tweaks.

**Tech Stack:** React 19, Tailwind CSS, Framer Motion (for drawer animation), Lucide React (Menu/X icons)

---

### Task 1: Mobile Navigation — Hamburger + Slide-out Drawer

**Files:**
- Modify: `components/Layout/Navbar.tsx`

**Step 1: Add state and imports**

At the top of `Navbar.tsx`, add `Menu` and `X` to the Lucide import, and add `AnimatePresence` to the framer-motion import:

```tsx
import { PawPrint, Phone, Mail, Calendar, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
```

Inside the component, add mobile menu state:

```tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

**Step 2: Add hamburger button**

In the right CTA `<div>` (line 93), add a hamburger button before the existing buttons. This button is only visible below `md:`:

```tsx
<div className="flex items-center justify-end gap-3">
  {/* Mobile hamburger */}
  <button
    onClick={() => setIsMobileMenuOpen(true)}
    className="md:hidden p-2 rounded-lg bg-transparent border-none cursor-pointer"
    aria-label="Open menu"
  >
    <Menu size={24} style={{ color: '#282239' }} />
  </button>

  {/* existing "Are you a Vet?" and "Are you a Pet Parent?" buttons unchanged */}
```

**Step 3: Add slide-out drawer**

After the closing `</motion.nav>` tag (but still inside the component return, wrap both in a fragment `<>`), add the mobile drawer:

```tsx
<AnimatePresence>
  {isMobileMenuOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40"
        onClick={() => setIsMobileMenuOpen(false)}
      />
      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 z-50 w-72 shadow-2xl flex flex-col"
        style={{ backgroundColor: '#f8f4e8' }}
      >
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(0,35,71,0.10)' }}>
          <span className="text-lg font-bold" style={{ color: '#282239' }}>Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg bg-transparent border-none cursor-pointer"
            aria-label="Close menu"
          >
            <X size={24} style={{ color: '#282239' }} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4 flex-1">
          {NAV_LINKS.map(({ label, page }) => {
            const isActive = page !== null && currentPage === page;
            return (
              <button
                key={label}
                onClick={() => {
                  if (page) {
                    navigate(page);
                    setIsMobileMenuOpen(false);
                  }
                }}
                className="text-left px-4 py-3 rounded-xl text-base font-medium bg-transparent border-none cursor-pointer transition-colors"
                style={{
                  color: isActive ? '#003F7D' : '#4a4a6a',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'rgba(0,63,125,0.08)' : 'transparent',
                }}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(0,35,71,0.10)' }}>
          <button
            onClick={() => { navigate('vets'); setIsMobileMenuOpen(false); }}
            className="w-full text-center text-sm font-semibold rounded-full px-5 py-3 cursor-pointer bg-transparent transition-colors"
            style={{ border: '1px solid #003F7D', color: '#003F7D' }}
          >
            Are you a Vet?
          </button>
          <button
            onClick={() => { onOpenBooking(); setIsMobileMenuOpen(false); }}
            className="w-full text-center text-sm font-semibold text-white rounded-full px-5 py-3 cursor-pointer border-none"
            style={{ backgroundColor: '#FF8E00', boxShadow: '0 4px 14px rgba(255,142,0,0.35)' }}
          >
            Are you a Pet Parent?
          </button>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

**Step 4: Lock body scroll when drawer is open**

Add a `useEffect` in the component:

```tsx
useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => { document.body.style.overflow = ''; };
}, [isMobileMenuOpen]);
```

**Step 5: Verify manually**

Run: `bun run dev`
Open browser at 375px width. Confirm hamburger appears, drawer slides in/out, links navigate, body scroll is locked.

**Step 6: Commit**

```bash
git add components/Layout/Navbar.tsx
git commit -m "feat: add mobile hamburger + slide-out drawer navigation"
```

---

### Task 2: App.tsx — Responsive Background Blobs

**Files:**
- Modify: `App.tsx:42,52`

**Step 1: Scale down blobs on mobile**

Change line 42:
```
w-[800px] h-[800px]  →  w-[300px] h-[300px] md:w-[800px] md:h-[800px]
```

Change line 52:
```
w-[600px] h-[600px]  →  w-[250px] h-[250px] md:w-[600px] md:h-[600px]
```

**Step 2: Commit**

```bash
git add App.tsx
git commit -m "fix: scale down animated background blobs on mobile"
```

---

### Task 3: Hero Section — Responsive Typography & Height

**Files:**
- Modify: `components/Sections/Hero.tsx`

**Step 1: Fix section height**

Line 12: Change `h-[85vh]` to `min-h-[70vh] md:h-[85vh]`

**Step 2: Fix heading size**

Line 57: Change `text-5xl md:text-7xl` to `text-3xl sm:text-5xl md:text-7xl`

**Step 3: Hide decorative paw on mobile**

Line 25: Add `hidden md:block` to the paw container:
```
className="absolute bottom-8 left-8 opacity-10 pointer-events-none select-none z-0 hidden md:block"
```

**Step 4: Commit**

```bash
git add components/Sections/Hero.tsx
git commit -m "fix: responsive hero height, heading size, and decorative paw"
```

---

### Task 4: ValueProp Section — Responsive Text & Touch-Friendly Cards

**Files:**
- Modify: `components/Sections/ValueProp.tsx`

**Step 1: Fix padding**

Line 30: Change `py-24` to `py-12 md:py-24`

**Step 2: Fix heading**

Line 37: Change `text-3xl md:text-5xl` to `text-2xl sm:text-3xl md:text-5xl`

**Step 3: Fix grid gap**

Line 53: Change `gap-12 lg:gap-20` to `gap-8 md:gap-12 lg:gap-20`

**Step 4: Make expandable cards always show content on mobile**

For each of the 3 expandable cards (lines 85, 105, 125), change:
```
className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 group-hover:mt-3"
```
to:
```
className="overflow-hidden transition-all duration-500 max-h-32 opacity-100 mt-3 md:max-h-0 md:opacity-0 md:mt-0 md:group-hover:max-h-32 md:group-hover:opacity-100 md:group-hover:mt-3"
```

And for each ChevronDown (lines 83, 103, 123), change:
```
className="text-white/50 group-hover:text-white group-hover:rotate-180 transition-all duration-300"
```
to:
```
className="text-white/50 hidden md:block group-hover:text-white group-hover:rotate-180 transition-all duration-300"
```

**Step 5: Commit**

```bash
git add components/Sections/ValueProp.tsx
git commit -m "fix: responsive ValueProp typography, gaps, and touch-friendly cards"
```

---

### Task 5: Empathy Section — Responsive Typography & Stat

**Files:**
- Modify: `components/Sections/Empathy.tsx`

**Step 1: Fix padding**

Line 8: Change `py-24` to `py-12 md:py-24`

**Step 2: Fix grid gap**

Line 10: Change `gap-16` to `gap-8 md:gap-16`

**Step 3: Fix heading**

Line 18: Change `text-4xl md:text-5xl` to `text-2xl sm:text-4xl md:text-5xl`

**Step 4: Fix stat size**

Line 68: Change `text-6xl` to `text-4xl sm:text-6xl`

**Step 5: Commit**

```bash
git add components/Sections/Empathy.tsx
git commit -m "fix: responsive Empathy section typography and spacing"
```

---

### Task 6: Timeline Section — Responsive Spacing

**Files:**
- Modify: `components/Sections/Timeline.tsx`

**Step 1: Fix padding**

Line 51: Change `py-24` to `py-12 md:py-24`

**Step 2: Fix heading**

Line 60: Change `text-4xl md:text-6xl` to `text-2xl sm:text-4xl md:text-6xl`

**Step 3: Fix bottom margin on header**

Line 53: Change `mb-20` to `mb-12 md:mb-20`

**Step 4: Commit**

```bash
git add components/Sections/Timeline.tsx
git commit -m "fix: responsive Timeline section typography and spacing"
```

---

### Task 7: HowItWorks Section — Responsive Grid

**Files:**
- Modify: `components/Sections/HowItWorks.tsx`

**Step 1: Fix padding**

Line 38: Change `py-24` to `py-12 md:py-24`

**Step 2: Fix heading**

Line 47: Change `text-3xl md:text-5xl` to `text-2xl sm:text-3xl md:text-5xl`

**Step 3: Fix bottom margin on header**

Line 40: Change `mb-20` to `mb-12 md:mb-20`

**Step 4: Commit**

```bash
git add components/Sections/HowItWorks.tsx
git commit -m "fix: responsive HowItWorks section typography and spacing"
```

---

### Task 8: Plans Section — Responsive Typography & Overflow

**Files:**
- Modify: `components/Sections/Plans.tsx`

**Step 1: Fix padding**

Line 40: Change `py-24` to `py-12 md:py-24`

**Step 2: Fix heading**

Line 53: Change `text-3xl md:text-5xl` to `text-2xl sm:text-3xl md:text-5xl`

**Step 3: Fix background blobs overflow**

Line 43: Change `w-[600px] h-[600px]` to `w-[300px] h-[300px] md:w-[600px] md:h-[600px]`

Line 44: Change `w-[500px] h-[500px]` to `w-[250px] h-[250px] md:w-[500px] md:h-[500px]`

**Step 4: Commit**

```bash
git add components/Sections/Plans.tsx
git commit -m "fix: responsive Plans section typography and blob sizes"
```

---

### Task 9: FinalCTA Section — Responsive Typography

**Files:**
- Modify: `components/Sections/FinalCTA.tsx`

**Step 1: Fix padding**

Line 13: Change `py-32` to `py-16 md:py-32`

**Step 2: Fix heading**

Line 36: Change `text-4xl md:text-6xl` to `text-2xl sm:text-4xl md:text-6xl`

**Step 3: Commit**

```bash
git add components/Sections/FinalCTA.tsx
git commit -m "fix: responsive FinalCTA section typography and padding"
```

---

### Task 10: AboutUs Page — Responsive Typography, Image, Gaps

**Files:**
- Modify: `components/Pages/AboutUs.tsx`

**Step 1: Fix hero padding**

Line 74: Change `py-32` to `py-16 md:py-32`

**Step 2: Fix hero heading**

Line 97: Change `text-5xl md:text-7xl` to `text-3xl sm:text-5xl md:text-7xl`

**Step 3: Fix mission section padding and gap**

Line 121: Change `py-24` to `py-12 md:py-24`

Line 122: Change `gap-16` to `gap-8 md:gap-16`

**Step 4: Fix image height**

Line 134: Change `h-[480px]` to `h-[280px] md:h-[480px]`

**Step 5: Fix mission heading**

Line 149: Change `text-3xl md:text-5xl` to `text-2xl sm:text-3xl md:text-5xl`

**Step 6: Fix values section padding**

Line 164: Change `py-24` to `py-12 md:py-24`

**Step 7: Fix CTA section padding**

Line 222: Change `py-24` to `py-12 md:py-24`

**Step 8: Fix CTA heading**

Line 230: Change `text-3xl md:text-5xl` to `text-2xl sm:text-3xl md:text-5xl`

**Step 9: Commit**

```bash
git add components/Pages/AboutUs.tsx
git commit -m "fix: responsive AboutUs page typography, image, and spacing"
```

---

### Task 11: Services Page — Fix Hidden Buttons, Responsive Text, Pill Nav, Trust Banner

**Files:**
- Modify: `components/Pages/Services.tsx`

**Step 1: Fix hero heading**

Line 423: Change `text-5xl md:text-7xl` to `text-3xl sm:text-5xl md:text-7xl`

**Step 2: Fix subscription heading**

Line 441: Change `text-3xl md:text-5xl` to `text-2xl sm:text-3xl md:text-5xl`

**Step 3: Fix dog enrollment button — CRITICAL**

Line 487: Change `hidden md:block` to just remove `hidden md:block` entirely. The class should be:
```
className="w-full text-white border-none shadow-lg py-4 text-lg"
```

**Step 4: Fix cat enrollment button — CRITICAL**

Line 533: Change `hidden md:flex items-center justify-center gap-2` to remove `hidden md:flex`. The class should be:
```
className="w-full text-white border-none shadow-lg py-4 text-lg flex items-center justify-center gap-2"
```

**Step 5: Fix pill nav padding**

Line 557: Change `px-5` to `px-3 sm:px-5`

**Step 6: Fix trust banner gap**

Line 612: Change `gap-x-10` to `gap-x-4 sm:gap-x-10`

**Step 7: Fix one-time services heading**

Line 588: Change `text-3xl md:text-5xl` to `text-2xl sm:text-3xl md:text-5xl`

**Step 8: Fix services section padding**

Line 583: Change `py-24` to `py-12 md:py-24`

**Step 9: Fix hero padding**

Line 399: Change `pb-32` to `pb-16 md:pb-32`

**Step 10: Fix subscription section margin**

Line 439: Change `mb-32` to `mb-16 md:mb-32`

**Step 11: Fix FAQ section padding**

Line 701: Change `py-24` to `py-12 md:py-24`

**Step 12: Fix FAQ card padding**

Line 703: Change `p-12` to `p-6 md:p-12`

**Step 13: Fix CTA section padding**

Line 722: Change `py-24` to `py-12 md:py-24`

**Step 14: Fix CTA heading**

Line 744: Change `text-3xl md:text-5xl` to `text-2xl sm:text-3xl md:text-5xl`

**Step 15: Commit**

```bash
git add components/Pages/Services.tsx
git commit -m "fix: show enrollment buttons on mobile, responsive Services page"
```

---

### Task 12: Vets Page — Responsive Typography, Paw, Benefits Grid, Padding

**Files:**
- Modify: `components/Pages/Vets.tsx`

**Step 1: Fix hero padding**

Line 210: Change `py-32` to `py-16 md:py-32`

**Step 2: Fix hero heading**

Line 249: Change `text-5xl md:text-7xl` to `text-3xl sm:text-5xl md:text-7xl`

**Step 3: Hide paw watermark on mobile**

Line 226: Change the class to:
```
className="absolute right-12 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none hidden md:block"
```

**Step 4: Fix benefits grid**

Line 307: Change `grid sm:grid-cols-3 gap-8` to `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`

**Step 5: Fix benefits section padding**

Line 289: Change `py-24` to `py-12 md:py-24`

**Step 6: Fix how-it-works section padding**

Line 333: Change `py-24` to `py-12 md:py-24`

**Step 7: Fix how-it-works heading**

Line 342: Change `text-3xl md:text-5xl` to `text-2xl sm:text-3xl md:text-5xl`

**Step 8: Fix how-it-works grid**

Line 347: Change `grid sm:grid-cols-3 gap-8` to `grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8`

**Step 9: Fix benefits heading**

Line 298: Change `text-3xl md:text-5xl` to `text-2xl sm:text-3xl md:text-5xl`

**Step 10: Fix signup section padding**

Line 384: Change `py-24` to `py-12 md:py-24`

**Step 11: Fix step wizard labels — hide text on small screens**

Line 676 (inside ProgressBar component): Change the step label span to:
```tsx
<span
  className="text-[10px] font-semibold uppercase tracking-wide text-center hidden sm:block"
  style={{ color: i <= current ? '#003F7D' : '#9ca3af' }}
>
  {label}
</span>
```

**Step 12: Commit**

```bash
git add components/Pages/Vets.tsx
git commit -m "fix: responsive Vets page typography, grid, paw, and step labels"
```

---

### Task 13: BookingModal — Mobile Breathing Room

**Files:**
- Modify: `components/ui/BookingModal.tsx`

**Step 1: Fix header padding**

Line 175: Change `px-6` to `px-4 sm:px-6`

**Step 2: Fix body padding and max height**

Line 190: Change `px-6 py-5 max-h-[70vh]` to `px-4 sm:px-6 py-5 max-h-[80vh] sm:max-h-[70vh]`

**Step 3: Commit**

```bash
git add components/ui/BookingModal.tsx
git commit -m "fix: responsive BookingModal padding and max height"
```

---

### Task 14: Footer — Responsive Gap

**Files:**
- Modify: `components/Layout/Footer.tsx`

**Step 1: Fix gap**

Line 10: Change `gap-8` to `gap-4 md:gap-8`

**Step 2: Commit**

```bash
git add components/Layout/Footer.tsx
git commit -m "fix: responsive Footer gap"
```

---

### Task 15: Verify Full Site

**Step 1: Run dev server**

Run: `bun run dev`

**Step 2: Manual verification checklist at 375px**

- [ ] Hamburger menu appears, drawer opens/closes
- [ ] All nav links work from drawer
- [ ] No horizontal scrollbar on any page
- [ ] Headings fit on screen without overflow
- [ ] Services enrollment buttons visible and tappable
- [ ] BookingModal has breathing room
- [ ] Expandable cards in ValueProp show content
- [ ] All section spacing is comfortable
- [ ] Footer stacks properly

**Step 3: Build check**

Run: `bun run build`
Expected: No errors

**Step 4: Commit**

If any tweaks were needed during verification, commit them:
```bash
git add -A
git commit -m "fix: mobile optimization verification tweaks"
```
