# FinalCTA Button Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "Join the Waitlist" button to the FinalCTA section that opens the booking modal.

**Architecture:** `App.tsx` already passes `onOpenBooking` to `FinalCTA` (line 65). Only `FinalCTA.tsx` needs to change: accept the prop and render a pink-gradient button between the subtext and tagline.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion. Package manager: `bun`.

---

### Task 1: Add button to FinalCTA

**Files:**
- Modify: `components/Sections/FinalCTA.tsx`

**Step 1: Add `onOpenBooking` prop**

Replace:
```tsx
export const FinalCTA: React.FC = () => {
```

With:
```tsx
interface FinalCTAProps {
  onOpenBooking: () => void;
  navigate: (page: import('../../App').Page) => void;
}
export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
```

(Note: `navigate` is also passed from App.tsx — destructure it even if unused to satisfy TypeScript, or just destructure `onOpenBooking` only. Keep it simple: only destructure what you use.)

**Step 2: Add the Button import**

Add at top of file:
```tsx
import { Button } from '@/components/ui/Button';
```

**Step 3: Insert button between subtext and tagline**

Current structure (around lines 33–43):
```tsx
<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="text-xl text-gray-600 mb-12 leading-relaxed"
>
  Stop waiting for symptoms. Stop stressing your pet with clinic visits. <br className="hidden md:block" />
  Start caring before it's urgent.
</motion.p>

<p className="mt-8 text-sm text-gray-500">Join PawGuardian today and be part of India's preventive pet-care movement.</p>
```

Replace with:
```tsx
<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="text-xl text-gray-600 mb-10 leading-relaxed"
>
  Stop waiting for symptoms. Stop stressing your pet with clinic visits. <br className="hidden md:block" />
  Start caring before it's urgent.
</motion.p>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="mb-8"
>
  <Button
    size="lg"
    className="text-white border-none px-8 rounded-full"
    style={{ background: 'linear-gradient(135deg, #FF6B9D, #FF9F7F)', boxShadow: '0 8px 24px rgba(255,107,157,0.40)' }}
    onClick={onOpenBooking}
  >
    Join the Waitlist
  </Button>
</motion.div>

<p className="text-sm text-gray-500">Join PawGuardian today and be part of India's preventive pet-care movement.</p>
```

**Step 4: Build to verify no TypeScript errors**

Run: `bun run build`
Expected: clean build with no errors.

**Step 5: Commit**

```bash
git add components/Sections/FinalCTA.tsx
git commit -m "feat: add Join the Waitlist button to FinalCTA"
```
