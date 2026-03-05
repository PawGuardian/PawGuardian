# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use `bun` as the package manager (not npm or yarn).

```bash
bun install        # Install dependencies
bun run dev        # Start dev server at http://localhost:3000
bun run build      # Production build
bun run preview    # Preview production build
```

There are no test or lint scripts configured.

## Architecture

This is a single-page React 19 + TypeScript app built with Vite. Navigation is handled entirely via React state — there is no router library.

**Navigation model:** `App.tsx` owns a `currentPage` state of type `Page` (`'home' | 'about' | 'services' | 'vets'`). It passes `currentPage` and a `navigate(page: Page)` callback as props to `Navbar`. Pages do not use URLs or browser history.

**Component structure:**
- `components/Layout/` — `Navbar` and `Footer`, rendered on every page
- `components/Pages/` — Full-page views: `AboutUs`, `Services`, `Vets`
- `components/Sections/` — Sections composing the home page (Hero → ValueProp → HowItWorks → Plans → FinalCTA)
- `components/ui/` — Reusable primitives (`Button`, `Card`, `BookingModal`)
- `lib/supabase.ts` — Supabase client (conditionally initialized; returns `null` if env vars are missing)
- `types.ts` — Shared interfaces (`NavItem`, `Feature`, `PlanDetail`, `IconProps`)

**Styling:** Tailwind CSS utility classes combined with inline `style` props for brand colors. There is no CSS variables file — brand colors are hardcoded as hex strings throughout:
- Navy: `#1e3470`
- Dark: `#282239`
- Cream (background): `#f8f4e8`
- Light blue accent: `#a8b4d8`

**Animations:** Framer Motion (`motion.*` components, `animate`/`transition` props). The global animated background blobs in `App.tsx` only render on the home page.

**Path alias:** `@` maps to the project root (e.g. `@/lib/supabase` → `./lib/supabase.ts`).

**Icons:** Lucide React.

## Supabase Integration

The `Vets` page submits a vet partner application form to Supabase. The client in `lib/supabase.ts` returns `null` when env vars are absent, so all callers must null-check before use.

Required environment variables (create a `.env` file at the root):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

The Supabase table used is `vet_signups` with columns matching the `INITIAL_FORM` object in `Vets.tsx`: `full_name`, `clinic_name`, `license_number`, `email`, `phone`, `location`, `specialty`.

## Planning Docs

`docs/plans/` contains feature design and implementation plan markdown files. These are referenced by the development workflow but are not consumed by the app at runtime.
