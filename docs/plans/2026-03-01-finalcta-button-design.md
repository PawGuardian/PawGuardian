# FinalCTA Button Design

**Goal:** Add a "Join the Waitlist" booking button to the FinalCTA home page section.

## Design

Add `onOpenBooking: () => void` prop to `FinalCTA`. Place a single pink-gradient button between the subtext paragraph and the tagline. Button style matches the Hero CTA: `linear-gradient(135deg, #FF6B9D, #FF9F7F)`, white text, `rounded-full`, pink glow shadow, `px-8 py-3 lg`. Pass `openBooking` from `App.tsx`.

**Layout:**
```
headline
subtext
[Join the Waitlist]  ← new button
tagline (small grey text)
```
