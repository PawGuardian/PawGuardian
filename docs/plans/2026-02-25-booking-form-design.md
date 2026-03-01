# Booking Form Modal — Design

**Date:** 2026-02-25

## Summary

Add a booking form modal that opens when the "Book a Slot" button in the Navbar is clicked. The form collects pet parent and pet details, then shows a success message on submit.

## Fields

| Field        | Input type | Notes                      |
|--------------|-----------|----------------------------|
| Name         | text      | required                   |
| City         | text      | required                   |
| Type of pet  | select    | Dog / Cat / Other          |
| Name of pet  | text      | required                   |
| Breed of pet | text      | required                   |
| Age of pet   | number    | min 0, step 0.5 (years)   |
| Gender of pet| select    | Male / Female              |

## Architecture

- **New file:** `components/ui/BookingModal.tsx`
- **Modified:** `components/Layout/Navbar.tsx` — add `isOpen` state, wire button `onClick`

## Modal Behaviour

- Centered overlay with `backdrop-blur-sm` dark scrim
- Animated entry/exit via Framer Motion `AnimatePresence`
- Close triggers: ✕ button, backdrop click, Escape key
- On submit: client-side required-field validation → swap to success message
- Success message: "We'll be in touch soon!" + Close button

## Styling

- Brand colors: `#f8f4e8` (cream bg), `#1e3470` (navy), `#282239` (dark)
- Uses existing `Button` component for submit/close actions
- Consistent with existing Framer Motion animation patterns in the app

## Approach

Option A: self-contained — modal state lives in `Navbar.tsx`, `BookingModal` is a separate reusable component. No changes to `App.tsx`.
