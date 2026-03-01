# Vet Application Form Redesign

**Date:** 2026-03-01
**Status:** Approved

## Overview

Replace the existing 7-field vet signup form with a 4-step wizard collecting full professional credentials, practice details, and a signed liability agreement. File uploads go to Supabase Storage; structured data goes to the existing `vet_signups` table (schema extended).

## Architecture

**Pattern:** Step-array state machine. An ordered array of step configs drives the wizard — each step knows its label and fields. The active step index advances on validation pass, retreats on Back. Progress bar and step labels derive from the same array. All Supabase Storage uploads happen at final submit, not per-step, to avoid orphaned files from abandoned forms.

## Steps

### Step 1 — Personal Info
- Full Name (text, required)
- Email (email, required)
- Phone (tel, required)
- Current Address (text, required)
- Aadhar Number (numeric, 12 digits, required)
- Photo (file upload → `vet-docs` Supabase Storage bucket, required)

### Step 2 — Credentials
- Degree (text, required)
- College (text, required)
- Year of Graduation (number, 4-digit, required)
- State Veterinary Council Registration Number (text, required)
- IVPR / VCI Registration Number (text, required)
- Copy of Registration Certificate (file upload → Supabase Storage, required)
- CV / Resume (file upload → Supabase Storage, required)

### Step 3 — Practice Details
- Clinic type: Own / Visiting / No clinic (radio group, required)
- Clinic Name (text, conditional — shown only when Own or Visiting selected)
- Clinic Location (text, conditional — same condition)
- Animal care specialisation (free text / multi-select, optional)
- "I understand this is an at-home visit service" (checkbox, required)
- Commute distance willing to travel (number, km, required)
- Visits per week willing to do (number, required)

### Step 4 — Agreement & Submit
- Liability agreement PDF download button (links to a public PDF asset)
- Agreement covers: Independent contractor clause, Indemnification, Mandatory registration validity, Mandatory professional behaviour, Non-solicitation
- Signed agreement upload (file upload → Supabase Storage, required)
- Submit button

## Data Model

Extend `vet_signups` table with new columns:

| Column | Type | Notes |
|---|---|---|
| `address` | text | Current address |
| `aadhar_number` | text | 12-digit, stored as text |
| `photo_url` | text | Supabase Storage URL |
| `degree` | text | |
| `college` | text | |
| `graduation_year` | int | |
| `state_vc_reg_number` | text | State Vet Council reg |
| `ivpr_vci_number` | text | IVPR / VCI reg |
| `registration_cert_url` | text | Supabase Storage URL |
| `cv_url` | text | Supabase Storage URL |
| `clinic_type` | text | 'own' \| 'visiting' \| 'none' |
| `clinic_name` | text | Nullable |
| `clinic_location` | text | Nullable |
| `animal_specialisation` | text | Free text |
| `home_visit_aware` | bool | Acknowledgment checkbox |
| `commute_distance_km` | int | |
| `visits_per_week` | int | |
| `signed_agreement_url` | text | Supabase Storage URL |

Existing columns (`full_name`, `email`, `phone`, `license_number`, `location`, `specialty`, `clinic_name`) remain; some are superseded by the new schema but kept for compatibility.

## UI / Styling

- Progress bar at the top of the form card: numbered circles connected by a line, active step highlighted in navy `#1e3470`
- Step label beneath each circle
- Next / Back buttons at the bottom of each step; Step 4 shows Submit
- File upload fields: custom styled `<input type="file">` with drag-hint text, showing selected filename once chosen
- Conditional clinic fields animate in/out with a simple CSS transition
- Error state: inline red message per invalid field on Next attempt; Supabase error shown at submit
- Success state: same CheckCircle2 screen as current

## File Storage

- Bucket: `vet-docs` (create in Supabase dashboard, public or signed-URL read access)
- Path pattern: `{timestamp}-{fieldName}-{originalFilename}` to avoid collisions
- Upload all files in parallel at submit time using `supabase.storage.from('vet-docs').upload()`
- On upload success, store returned public URLs in the database row
