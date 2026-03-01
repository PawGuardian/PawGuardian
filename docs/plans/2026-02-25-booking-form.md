# Booking Form Modal Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a modal booking form that opens from the "Book a Slot" navbar button, collects pet parent + pet details, and shows a success message on submit.

**Architecture:** A new `BookingModal` component handles all form state and renders as a centered overlay. `Navbar.tsx` owns a single `isOpen` boolean state and passes open/close handlers as props. No changes to `App.tsx`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React. Package manager: `bun`. No test runner configured.

---

### Task 1: Create the BookingModal component

**Files:**
- Create: `components/ui/BookingModal.tsx`

**Step 1: Create the file with all imports and the form data type**

```tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface BookingFormData {
  name: string;
  city: string;
  petType: string;
  petName: string;
  petBreed: string;
  petAge: string;
  petGender: string;
}

const EMPTY_FORM: BookingFormData = {
  name: '',
  city: '',
  petType: 'Dog',
  petName: '',
  petBreed: '',
  petAge: '',
  petGender: 'Male',
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Step 2: Add the Escape key handler hook inside the component**

```tsx
export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<BookingFormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY_FORM);
      setSubmitted(false);
    }
  }, [isOpen]);
```

**Step 3: Add the submit handler**

```tsx
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
```

**Step 4: Write the JSX — overlay + modal card with AnimatePresence**

```tsx
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(40,34,57,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: '#f8f4e8' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#1e3470]/10">
              <h2 className="text-xl font-bold" style={{ color: '#282239' }}>Book a Slot</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#1e3470]/10 transition-colors"
                aria-label="Close"
              >
                <X size={20} style={{ color: '#282239' }} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
              {submitted ? (
                <SuccessView onClose={onClose} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Field label="Your Name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="e.g. Priya Sharma" />
                  <Field label="City" name="city" type="text" value={form.city} onChange={handleChange} required placeholder="e.g. Mumbai" />

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#282239' }}>
                      Type of Pet <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="petType"
                      value={form.petType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 bg-white"
                      style={{ borderColor: '#a8b4d8', color: '#282239', focusRingColor: '#1e3470' }}
                    >
                      <option>Dog</option>
                      <option>Cat</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <Field label="Pet's Name" name="petName" type="text" value={form.petName} onChange={handleChange} required placeholder="e.g. Bruno" />
                  <Field label="Breed" name="petBreed" type="text" value={form.petBreed} onChange={handleChange} required placeholder="e.g. Labrador Retriever" />
                  <Field label="Age (years)" name="petAge" type="number" value={form.petAge} onChange={handleChange} required placeholder="e.g. 2" min="0" step="0.5" />

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#282239' }}>
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="petGender"
                      value={form.petGender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 bg-white"
                      style={{ borderColor: '#a8b4d8', color: '#282239' }}
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="md"
                      className="w-full text-white border-none"
                      style={{ backgroundColor: '#1e3470', boxShadow: '0 4px 14px rgba(30,52,112,0.30)' }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

**Step 5: Add the reusable `Field` sub-component and `SuccessView` at the bottom of the file**

```tsx
interface FieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  min?: string;
  step?: string;
}

const Field: React.FC<FieldProps> = ({ label, name, type, value, onChange, required, placeholder, min, step }) => (
  <div>
    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#282239' }}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      min={min}
      step={step}
      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 bg-white"
      style={{ borderColor: '#a8b4d8', color: '#282239' }}
    />
  </div>
);

const SuccessView: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="py-8 flex flex-col items-center text-center gap-4">
    <CheckCircle2 size={48} style={{ color: '#1e3470' }} />
    <h3 className="text-xl font-bold" style={{ color: '#282239' }}>You're all set!</h3>
    <p className="text-gray-600">We'll be in touch soon to confirm your slot.</p>
    <Button
      size="md"
      className="mt-2 text-white border-none"
      style={{ backgroundColor: '#1e3470', boxShadow: '0 4px 14px rgba(30,52,112,0.30)' }}
      onClick={onClose}
    >
      Close
    </Button>
  </div>
);
```

**Step 6: Verify the app compiles**

```bash
bun run build
```
Expected: Build succeeds with no TypeScript errors.

**Step 7: Commit**

```bash
git add components/ui/BookingModal.tsx
git commit -m "feat: add BookingModal component with pet parent form and success state"
```

---

### Task 2: Wire the modal into Navbar

**Files:**
- Modify: `components/Layout/Navbar.tsx`

**Step 1: Add `useState` import and `isOpen` state**

At the top of `Navbar.tsx`, `useState` is already imported from React (line 1). Add the state inside the component, right after the existing `isScrolled` state:

```tsx
const [isBookingOpen, setIsBookingOpen] = useState(false);
```

**Step 2: Import BookingModal**

Add to the imports at the top of `Navbar.tsx`:

```tsx
import { BookingModal } from '../ui/BookingModal';
```

**Step 3: Wire the "Book a Slot" button onClick**

Find the `<Button>` at line ~107 that renders "Book a Slot" and add `onClick`:

```tsx
<Button
  size="sm"
  className="hidden md:flex text-white border-none rounded-full px-5"
  style={
    {
      backgroundColor: '#1e3470',
      boxShadow: '0 4px 14px rgba(30,52,112,0.30)',
    } as React.CSSProperties
  }
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#19296a';
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1e3470';
  }}
  onClick={() => setIsBookingOpen(true)}
>
  Book a Slot
</Button>
```

**Step 4: Render BookingModal at the end of the component return**

Inside the `<>` fragment in Navbar's return, after the `</motion.nav>` closing tag, add:

```tsx
<BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
```

**Step 5: Verify in dev server**

```bash
bun run dev
```

Open http://localhost:3000. Click "Book a Slot" in the navbar. Verify:
- Modal opens with dimmed background
- All 7 fields are present
- Pressing Escape closes it
- Clicking outside the modal card closes it
- Submitting the form shows the success view
- Clicking Close on the success view closes and resets the form

**Step 6: Build check**

```bash
bun run build
```
Expected: No errors.

**Step 7: Commit**

```bash
git add components/Layout/Navbar.tsx
git commit -m "feat: wire BookingModal to Book a Slot button in Navbar"
```
