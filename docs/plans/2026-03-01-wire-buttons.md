# Wire Non-Functional Buttons Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wire up 9 non-functional buttons so every click does something meaningful.

**Architecture:** Lift `BookingModal` + its open/close state from `Navbar` up to `App.tsx`. Pass `openBooking` callback and `navigate` as props to the sections/pages that need them. A single modal instance is shared across the whole app.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React. Package manager: `bun`.

---

### Task 1: Lift BookingModal to App.tsx and update Navbar

**Files:**
- Modify: `App.tsx`
- Modify: `components/Layout/Navbar.tsx`

**Step 1: Update `Navbar.tsx`**

Remove the local `isBookingOpen` state and `BookingModal` render from Navbar. Add `onOpenBooking` prop.

Replace the `NavbarProps` interface and component signature:

```tsx
// Before
interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}
export const Navbar: React.FC<NavbarProps> = ({ currentPage, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
```

```tsx
// After
interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  onOpenBooking: () => void;
}
export const Navbar: React.FC<NavbarProps> = ({ currentPage, navigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
```

Remove the `BookingModal` import and JSX from Navbar (`<BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />`).

Change the "Book a Slot" button's onClick:
```tsx
// Before
onClick={() => setIsBookingOpen(true)}
// After
onClick={onOpenBooking}
```

Remove unused `BookingModal` import from the top of the file.

**Step 2: Update `App.tsx`**

Add `BookingModal` state and render at App level. Pass `onOpenBooking` to Navbar.

```tsx
// Add import at top
import { BookingModal } from './components/ui/BookingModal';

// Inside App():
const [isBookingOpen, setIsBookingOpen] = useState(false);
const openBooking = () => setIsBookingOpen(true);

// Update Navbar usage:
<Navbar currentPage={currentPage} navigate={navigate} onOpenBooking={openBooking} />

// Add BookingModal before closing </div> of the relative z-10 wrapper:
<BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
```

**Step 3: Verify the app still loads and "Book a Slot" in navbar still opens the modal**

Run: `bun run dev`
Expected: No TypeScript errors, modal opens when clicking "Book a Slot".

**Step 4: Commit**

```bash
git add App.tsx components/Layout/Navbar.tsx
git commit -m "refactor: lift BookingModal state to App level"
```

---

### Task 2: Wire Hero buttons

**Files:**
- Modify: `components/Sections/Hero.tsx`
- Modify: `App.tsx`

**Step 1: Add props to `Hero`**

```tsx
// Before
export const Hero: React.FC = () => {
```

```tsx
// After
interface HeroProps {
  onOpenBooking: () => void;
}
export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
```

**Step 2: Wire "Join the Waitlist" button**

```tsx
// Before
<Button
  size="lg"
  className="text-white border-none px-8 rounded-full flex items-center gap-2 group"
  style={{ background: 'linear-gradient(135deg, #FF6B9D, #FF9F7F)', boxShadow: '0 8px 24px rgba(255,107,157,0.40)' }}
>
```

```tsx
// After — add onClick
<Button
  size="lg"
  className="text-white border-none px-8 rounded-full flex items-center gap-2 group"
  style={{ background: 'linear-gradient(135deg, #FF6B9D, #FF9F7F)', boxShadow: '0 8px 24px rgba(255,107,157,0.40)' }}
  onClick={onOpenBooking}
>
```

**Step 3: Pass `openBooking` from `App.tsx` to `Hero`**

```tsx
// Before
<Hero />
// After
<Hero onOpenBooking={openBooking} />
```

**Step 4: Verify "Join the Waitlist" in Hero opens the modal**

**Step 5: Commit**

```bash
git add components/Sections/Hero.tsx App.tsx
git commit -m "feat: wire Hero waitlist button to booking modal"
```

---

### Task 3: Wire Plans section buttons

**Files:**
- Modify: `components/Sections/Plans.tsx`
- Modify: `App.tsx`

**Step 1: Add props to `Plans`**

```tsx
// Before
export const Plans: React.FC = () => {
```

```tsx
// After
import type { Page } from '../../App';

interface PlansProps {
  navigate: (page: Page) => void;
}
export const Plans: React.FC<PlansProps> = ({ navigate }) => {
```

**Step 2: Wire "View Dog Plans" button**

```tsx
// Before
<Button className="text-white border-none shadow-lg" style={{ backgroundColor: '#FF9F7F' }}>View Dog Plans</Button>
// After
<Button className="text-white border-none shadow-lg" style={{ backgroundColor: '#FF9F7F' }} onClick={() => navigate('services')}>View Dog Plans</Button>
```

**Step 3: Wire "View Cat Plans" button**

```tsx
// Before
<Button className="text-white border-none shadow-lg" style={{ backgroundColor: '#C4B5FD', color: '#3B0764' }}>View Cat Plans</Button>
// After
<Button className="text-white border-none shadow-lg" style={{ backgroundColor: '#C4B5FD', color: '#3B0764' }} onClick={() => navigate('services')}>View Cat Plans</Button>
```

**Step 4: Pass `navigate` from `App.tsx` to `Plans`**

```tsx
// Before
<Plans />
// After
<Plans navigate={navigate} />
```

**Step 5: Verify both plan buttons navigate to Services page**

**Step 6: Commit**

```bash
git add components/Sections/Plans.tsx App.tsx
git commit -m "feat: wire Plans buttons to navigate to Services"
```

---

### Task 4: Wire AboutUs buttons

**Files:**
- Modify: `components/Pages/AboutUs.tsx`
- Modify: `App.tsx`

**Step 1: Add props to `AboutUs`**

Find the current export at the top of the component:
```tsx
export const AboutUs: React.FC = () => {
```

Replace with:
```tsx
import type { Page } from '../../App';

interface AboutUsProps {
  navigate: (page: Page) => void;
  onOpenBooking: () => void;
}
export const AboutUs: React.FC<AboutUsProps> = ({ navigate, onOpenBooking }) => {
```

**Step 2: Wire the CTA buttons (around line 381)**

Find the two buttons in the bottom CTA section:
```tsx
<Button
    size="lg"
    className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
    style={{ backgroundColor: '#1e3470', boxShadow: '0 8px 24px rgba(30,52,112,0.40)' }}
>
    <Users size={18} />
    <span>Join the Waitlist</span>
    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
</Button>
<Button
    size="lg"
    variant="secondary"
    className="bg-white/10 text-white hover:bg-white/20 border-white/20 hover:border-white/40 backdrop-blur-sm rounded-full px-8"
>
    View Our Plans
</Button>
```

Add `onClick` to each:
```tsx
<Button
    size="lg"
    className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
    style={{ backgroundColor: '#1e3470', boxShadow: '0 8px 24px rgba(30,52,112,0.40)' }}
    onClick={onOpenBooking}
>
    <Users size={18} />
    <span>Join the Waitlist</span>
    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
</Button>
<Button
    size="lg"
    variant="secondary"
    className="bg-white/10 text-white hover:bg-white/20 border-white/20 hover:border-white/40 backdrop-blur-sm rounded-full px-8"
    onClick={() => navigate('services')}
>
    View Our Plans
</Button>
```

**Step 3: Pass props from `App.tsx`**

```tsx
// Before
<AboutUs />
// After
<AboutUs navigate={navigate} onOpenBooking={openBooking} />
```

**Step 4: Verify both AboutUs CTA buttons work**

**Step 5: Commit**

```bash
git add components/Pages/AboutUs.tsx App.tsx
git commit -m "feat: wire AboutUs CTA buttons"
```

---

### Task 5: Wire Services page buttons

**Files:**
- Modify: `components/Pages/Services.tsx`
- Modify: `App.tsx`

**Step 1: Add `id` to Services Grid section**

Find the Services Grid section (around line 444):
```tsx
<section className="py-24 px-6 bg-white" style={{ paddingTop: '5rem' }}>
```

Add the `id`:
```tsx
<section id="services-plans" className="py-24 px-6 bg-white" style={{ paddingTop: '5rem' }}>
```

**Step 2: Add props to `Services`**

Find:
```tsx
export const Services: React.FC = () => {
```

Replace with:
```tsx
interface ServicesProps {
  onOpenBooking: () => void;
}
export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
```

Add a helper for scrolling to the plans section inside the component body:
```tsx
const scrollToPlans = () => {
  document.getElementById('services-plans')?.scrollIntoView({ behavior: 'smooth' });
};
```

**Step 3: Wire the four Services buttons**

Hero "Book a Service" button (around line 381):
```tsx
// Before
<Button
    size="lg"
    className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
    style={{ backgroundColor: '#1e3470', boxShadow: '0 8px 24px rgba(30,52,112,0.50)' }}
>
    <CalendarCheck size={18} />
    <span>Book a Service</span>
    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
</Button>
// After — add onClick
<Button
    size="lg"
    className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
    style={{ backgroundColor: '#1e3470', boxShadow: '0 8px 24px rgba(30,52,112,0.50)' }}
    onClick={onOpenBooking}
>
    <CalendarCheck size={18} />
    <span>Book a Service</span>
    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
</Button>
```

Hero "View Plans & Pricing" button (just below the above):
```tsx
// Before
<Button
    size="lg"
    variant="secondary"
    className="bg-white/10 text-white hover:bg-white/20 border-white/20 hover:border-white/40 backdrop-blur-sm rounded-full px-8"
>
    View Plans & Pricing
</Button>
// After
<Button
    size="lg"
    variant="secondary"
    className="bg-white/10 text-white hover:bg-white/20 border-white/20 hover:border-white/40 backdrop-blur-sm rounded-full px-8"
    onClick={scrollToPlans}
>
    View Plans & Pricing
</Button>
```

Bottom CTA "Book a Home Visit" button (around line 627):
```tsx
// Before
<Button
    size="lg"
    className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
    style={{ backgroundColor: '#1e3470', boxShadow: '0 8px 24px rgba(30,52,112,0.40)' }}
>
    <CalendarCheck size={18} />
    <span>Book a Home Visit</span>
    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
</Button>
// After
<Button
    size="lg"
    className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
    style={{ backgroundColor: '#1e3470', boxShadow: '0 8px 24px rgba(30,52,112,0.40)' }}
    onClick={onOpenBooking}
>
    <CalendarCheck size={18} />
    <span>Book a Home Visit</span>
    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
</Button>
```

Bottom CTA "Explore Subscription Plans" button (just below):
```tsx
// Before
<Button
    size="lg"
    variant="secondary"
    className="bg-white/10 text-white hover:bg-white/20 border-white/20 hover:border-white/40 backdrop-blur-sm rounded-full px-8"
>
    Explore Subscription Plans
</Button>
// After
<Button
    size="lg"
    variant="secondary"
    className="bg-white/10 text-white hover:bg-white/20 border-white/20 hover:border-white/40 backdrop-blur-sm rounded-full px-8"
    onClick={scrollToPlans}
>
    Explore Subscription Plans
</Button>
```

**Step 4: Pass props from `App.tsx`**

```tsx
// Before
<Services />
// After
<Services onOpenBooking={openBooking} />
```

**Step 5: Verify all four Services buttons work**

- "Book a Service" → modal opens
- "View Plans & Pricing" → scrolls to services grid
- "Book a Home Visit" → modal opens
- "Explore Subscription Plans" → scrolls to services grid

**Step 6: Commit**

```bash
git add components/Pages/Services.tsx App.tsx
git commit -m "feat: wire Services page buttons"
```

---

### Task 6: Final verification

**Step 1: Run the dev server**

```bash
bun run dev
```

**Step 2: Check each button manually**

Home page:
- [ ] Hero "Join the Waitlist" → modal opens
- [ ] Plans "View Dog Plans" → navigates to Services
- [ ] Plans "View Cat Plans" → navigates to Services
- [ ] Navbar "Book a Slot" → modal opens

About Us page:
- [ ] "Join the Waitlist" → modal opens
- [ ] "View Our Plans" → navigates to Services

Services page:
- [ ] "Book a Service" → modal opens
- [ ] "View Plans & Pricing" → scrolls to services grid
- [ ] "Book a Home Visit" → modal opens
- [ ] "Explore Subscription Plans" → scrolls to services grid

**Step 3: Check TypeScript errors**

```bash
bun run build
```

Expected: clean build with no type errors.
