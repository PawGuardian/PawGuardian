# Vet Application Form Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the 7-field vet signup form with a 4-step wizard collecting full professional credentials, practice details, and a signed liability agreement, with file uploads to Supabase Storage.

**Architecture:** A step-array state machine drives the wizard — an ordered array of step labels controls the progress bar and which fields render. Two state objects are kept separate: text/select data (written to `vet_signups` table) and file objects (uploaded to Supabase Storage `vet-docs` bucket at submit time, URLs stored in DB). All changes live in `components/Pages/Vets.tsx`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion, Supabase JS (`@supabase/supabase-js`), Lucide React.

---

### Task 1: Replace form state types and constants

**Files:**
- Modify: `components/Pages/Vets.tsx` (top of file, before component)

**What to do:**

Replace the existing `INITIAL_FORM` constant and add a files constant and step labels array. Replace everything from line 44 to 52 with:

```typescript
const STEPS = ['Personal Info', 'Credentials', 'Practice Details', 'Agreement'];

const INITIAL_FORM = {
  full_name: '',
  email: '',
  phone: '',
  address: '',
  aadhar_number: '',
  degree: '',
  college: '',
  graduation_year: '',
  state_vc_reg_number: '',
  ivpr_vci_number: '',
  clinic_type: '' as 'own' | 'visiting' | 'none' | '',
  clinic_name: '',
  clinic_location: '',
  animal_specialisation: '',
  home_visit_aware: false,
  commute_distance_km: '',
  visits_per_week: '',
};

const INITIAL_FILES = {
  photo: null as File | null,
  registration_cert: null as File | null,
  cv: null as File | null,
  signed_agreement: null as File | null,
};
```

**Step 2: Add file state to the component**

Inside the `Vets` component, after `const [formData, setFormData] = useState(INITIAL_FORM);`, add:

```typescript
const [files, setFiles] = useState(INITIAL_FILES);
const [step, setStep] = useState(0); // 0-indexed, 0–3
```

**Step 3: Update handleChange to handle checkboxes**

Replace the existing `handleChange` function with:

```typescript
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target;
  const checked = (e.target as HTMLInputElement).checked;
  setFormData((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, files: fileList } = e.target;
  if (fileList && fileList[0]) {
    setFiles((prev) => ({ ...prev, [name]: fileList[0] }));
  }
};
```

**Step 4: Commit**

```bash
git add components/Pages/Vets.tsx
git commit -m "refactor: expand vet form state for multi-step wizard"
```

---

### Task 2: Build the ProgressBar component

**Files:**
- Modify: `components/Pages/Vets.tsx` (add below the `Field` component at the bottom of the file)

**What to do:**

Add this component at the bottom of the file, after the `Field` component:

```typescript
interface ProgressBarProps {
  steps: string[];
  current: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, current }) => (
  <div className="flex items-center justify-between mb-8">
    {steps.map((label, i) => (
      <React.Fragment key={label}>
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all"
            style={{
              backgroundColor: i <= current ? '#1e3470' : 'rgba(30,52,112,0.10)',
              color: i <= current ? '#fff' : '#1e3470',
            }}
          >
            {i < current ? <CheckCircle2 size={18} /> : i + 1}
          </div>
          <span
            className="text-[10px] font-semibold uppercase tracking-wide text-center"
            style={{ color: i <= current ? '#1e3470' : '#9ca3af' }}
          >
            {label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div
            className="h-px flex-1 mx-1 mb-5 transition-all"
            style={{ backgroundColor: i < current ? '#1e3470' : 'rgba(30,52,112,0.15)' }}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);
```

**Step 2: Commit**

```bash
git add components/Pages/Vets.tsx
git commit -m "feat: add ProgressBar component for step wizard"
```

---

### Task 3: Build the FileField component

**Files:**
- Modify: `components/Pages/Vets.tsx` (add below `ProgressBar` component)

**What to do:**

Add this reusable file upload field component:

```typescript
interface FileFieldProps {
  label: string;
  name: string;
  accept?: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hint?: string;
}

const FileField: React.FC<FileFieldProps> = ({ label, name, accept, file, onChange, required, hint }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <label
      className="flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
      style={{ borderColor: file ? '#1e3470' : 'rgba(30,52,112,0.20)' }}
    >
      <span
        className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white flex-shrink-0"
        style={{ backgroundColor: '#1e3470' }}
      >
        Choose file
      </span>
      <span className="text-sm text-gray-500 truncate">
        {file ? file.name : hint || 'No file chosen'}
      </span>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        required={required}
        className="sr-only"
      />
    </label>
  </div>
);
```

**Step 2: Commit**

```bash
git add components/Pages/Vets.tsx
git commit -m "feat: add FileField component for styled file uploads"
```

---

### Task 4: Build Step 1 — Personal Info

**Files:**
- Modify: `components/Pages/Vets.tsx` (inside the `form` element, replace existing fields)

**What to do:**

Replace the existing `<form>` content block (the JSX between `<form onSubmit={handleSubmit} className="space-y-5">` and the error/submit button) with step-conditional rendering. First, add a helper function inside the component:

```typescript
const validateStep = (): boolean => {
  if (step === 0) {
    return !!(
      formData.full_name &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.aadhar_number.length === 12 &&
      files.photo
    );
  }
  if (step === 1) {
    return !!(
      formData.degree &&
      formData.college &&
      formData.graduation_year &&
      formData.state_vc_reg_number &&
      formData.ivpr_vci_number &&
      files.registration_cert &&
      files.cv
    );
  }
  if (step === 2) {
    return !!(
      formData.clinic_type &&
      (formData.clinic_type === 'none' || (formData.clinic_name && formData.clinic_location)) &&
      formData.home_visit_aware &&
      formData.commute_distance_km &&
      formData.visits_per_week
    );
  }
  if (step === 3) {
    return !!files.signed_agreement;
  }
  return false;
};
```

Then replace the form body with this structure:

```typescript
<form onSubmit={handleSubmit} className="space-y-5">
  <ProgressBar steps={STEPS} current={step} />

  {/* Step 1 — Personal Info */}
  {step === 0 && (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name" name="full_name" type="text" value={formData.full_name} onChange={handleChange} placeholder="Dr. Priya Sharma" required />
        <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="dr.priya@example.com" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 99887 76655" required />
        <Field label="Aadhar Number" name="aadhar_number" type="text" value={formData.aadhar_number} onChange={handleChange} placeholder="1234 5678 9012" required />
      </div>
      <Field label="Current Address" name="address" type="text" value={formData.address} onChange={handleChange} placeholder="Street, City, State, PIN" required />
      <FileField label="Profile Photo" name="photo" accept="image/*" file={files.photo} onChange={handleFileChange} required hint="JPG or PNG, clear face photo" />
    </div>
  )}

  {/* Steps 2, 3, 4 — placeholder for next tasks */}
  {step === 1 && <div className="py-4 text-center text-gray-400 text-sm">Step 2 coming…</div>}
  {step === 2 && <div className="py-4 text-center text-gray-400 text-sm">Step 3 coming…</div>}
  {step === 3 && <div className="py-4 text-center text-gray-400 text-sm">Step 4 coming…</div>}

  {error && (
    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
      {error}
    </p>
  )}

  {/* Navigation buttons */}
  <div className="flex gap-3 pt-2">
    {step > 0 && (
      <button
        type="button"
        onClick={() => setStep((s) => s - 1)}
        className="flex-1 py-3.5 rounded-full font-semibold text-sm border transition-all cursor-pointer"
        style={{ borderColor: '#1e3470', color: '#1e3470' }}
      >
        Back
      </button>
    )}
    {step < STEPS.length - 1 ? (
      <button
        type="button"
        onClick={() => {
          if (validateStep()) {
            setStep((s) => s + 1);
            setError(null);
          } else {
            setError('Please fill in all required fields before continuing.');
          }
        }}
        className="flex-1 py-3.5 rounded-full font-semibold text-white text-sm transition-all cursor-pointer"
        style={{ backgroundColor: '#1e3470', boxShadow: '0 4px 14px rgba(30,52,112,0.30)' }}
      >
        Next
      </button>
    ) : (
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex-1 py-3.5 rounded-full font-semibold text-white text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        style={{ backgroundColor: '#1e3470', boxShadow: '0 4px 14px rgba(30,52,112,0.30)' }}
      >
        {isSubmitting ? 'Submitting…' : 'Submit Application'}
      </button>
    )}
  </div>
</form>
```

**Step 2: Verify in browser**

Run `bun run dev`. Navigate to the Vets page. You should see the progress bar with 4 steps, Step 1 fields, and a Next button that validates before advancing.

**Step 3: Commit**

```bash
git add components/Pages/Vets.tsx
git commit -m "feat: add step 1 personal info fields and wizard navigation"
```

---

### Task 5: Build Step 2 — Credentials

**Files:**
- Modify: `components/Pages/Vets.tsx` (replace the Step 2 placeholder)

**What to do:**

Replace `{step === 1 && <div className="py-4 text-center text-gray-400 text-sm">Step 2 coming…</div>}` with:

```typescript
{step === 1 && (
  <div className="space-y-5">
    <div className="grid sm:grid-cols-3 gap-5">
      <Field label="Degree" name="degree" type="text" value={formData.degree} onChange={handleChange} placeholder="BVSc & AH" required />
      <Field label="College" name="college" type="text" value={formData.college} onChange={handleChange} placeholder="KVAFSU" required />
      <Field label="Graduation Year" name="graduation_year" type="number" value={formData.graduation_year} onChange={handleChange} placeholder="2018" required />
    </div>
    <Field label="State Veterinary Council Registration Number" name="state_vc_reg_number" type="text" value={formData.state_vc_reg_number} onChange={handleChange} placeholder="KVA-XXXX" required />
    <Field label="IVPR / VCI Registration Number" name="ivpr_vci_number" type="text" value={formData.ivpr_vci_number} onChange={handleChange} placeholder="VCI-XXXX" required />
    <FileField label="Copy of Registration Certificate" name="registration_cert" accept=".pdf,.jpg,.jpeg,.png" file={files.registration_cert} onChange={handleFileChange} required hint="PDF or image of your registration certificate" />
    <FileField label="CV / Resume" name="cv" accept=".pdf,.doc,.docx" file={files.cv} onChange={handleFileChange} required hint="PDF or Word document" />
  </div>
)}
```

**Step 2: Commit**

```bash
git add components/Pages/Vets.tsx
git commit -m "feat: add step 2 credentials fields"
```

---

### Task 6: Build Step 3 — Practice Details

**Files:**
- Modify: `components/Pages/Vets.tsx` (replace the Step 3 placeholder)

**What to do:**

Replace `{step === 2 && <div className="py-4 text-center text-gray-400 text-sm">Step 3 coming…</div>}` with:

```typescript
{step === 2 && (
  <div className="space-y-5">
    {/* Clinic type radio group */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        Are you practicing in a clinic? <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
        {[
          { value: 'own', label: 'Own clinic' },
          { value: 'visiting', label: 'Visiting vet' },
          { value: 'none', label: 'No clinic' },
        ].map(({ value, label }) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="radio"
              name="clinic_type"
              value={value}
              checked={formData.clinic_type === value}
              onChange={handleChange}
              className="accent-[#1e3470]"
            />
            {label}
          </label>
        ))}
      </div>
    </div>

    {/* Conditional clinic fields */}
    {(formData.clinic_type === 'own' || formData.clinic_type === 'visiting') && (
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Clinic Name" name="clinic_name" type="text" value={formData.clinic_name} onChange={handleChange} placeholder="PetCare Clinic" required />
        <Field label="Clinic Location" name="clinic_location" type="text" value={formData.clinic_location} onChange={handleChange} placeholder="Bengaluru, Karnataka" required />
      </div>
    )}

    {/* Specialisation */}
    <Field label="Animal care you specialise in (optional)" name="animal_specialisation" type="text" value={formData.animal_specialisation} onChange={handleChange} placeholder="e.g. Dogs, Cats, Exotic birds…" />

    {/* Home visit awareness */}
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        name="home_visit_aware"
        checked={formData.home_visit_aware}
        onChange={handleChange}
        className="mt-0.5 accent-[#1e3470] w-4 h-4 flex-shrink-0"
      />
      <span className="text-sm text-gray-700">
        <span className="font-semibold">I understand this is an at-home visit service.</span>{' '}
        Consultations are conducted at the pet owner's residence, not at a clinic.{' '}
        <span className="text-red-500">*</span>
      </span>
    </label>

    {/* Commute details */}
    <div className="grid sm:grid-cols-2 gap-5">
      <Field label="Max commute distance (km)" name="commute_distance_km" type="number" value={formData.commute_distance_km} onChange={handleChange} placeholder="20" required />
      <Field label="Visits per week willing to do" name="visits_per_week" type="number" value={formData.visits_per_week} onChange={handleChange} placeholder="10" required />
    </div>
  </div>
)}
```

**Step 2: Commit**

```bash
git add components/Pages/Vets.tsx
git commit -m "feat: add step 3 practice details with conditional clinic fields"
```

---

### Task 7: Build Step 4 — Agreement & Submit

**Files:**
- Modify: `components/Pages/Vets.tsx` (replace the Step 4 placeholder)

**What to do:**

Replace `{step === 3 && <div className="py-4 text-center text-gray-400 text-sm">Step 4 coming…</div>}` with:

```typescript
{step === 3 && (
  <div className="space-y-5">
    {/* Agreement summary */}
    <div
      className="rounded-2xl p-5 space-y-3"
      style={{ backgroundColor: 'rgba(30,52,112,0.05)', border: '1px solid rgba(30,52,112,0.12)' }}
    >
      <h3 className="text-sm font-bold text-gray-900">Liability Agreement</h3>
      <p className="text-xs text-gray-500 leading-relaxed">
        By joining PawGuardian, you agree to the following terms. Please download, sign, and upload the agreement below.
      </p>
      <ul className="space-y-1.5">
        {[
          'Independent contractor clause — You operate as an independent contractor, not an employee.',
          'Indemnification clause — You indemnify PawGuardian against claims arising from your services.',
          'Mandatory registration validity — Your veterinary registration must remain valid at all times.',
          'Mandatory professional behaviour — You commit to maintaining professional standards of care.',
          'Non-solicitation clause — You agree not to solicit PawGuardian clients outside the platform.',
        ].map((clause) => (
          <li key={clause} className="flex items-start gap-2 text-xs text-gray-600">
            <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#1e3470' }} />
            {clause}
          </li>
        ))}
      </ul>
    </div>

    {/* Download button */}
    <a
      href="/PawGuardian-Vet-Agreement.pdf"
      download
      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border font-semibold text-sm transition-colors hover:bg-gray-50"
      style={{ borderColor: '#1e3470', color: '#1e3470' }}
    >
      Download Agreement PDF
    </a>

    {/* Signed agreement upload */}
    <FileField
      label="Upload Signed Agreement"
      name="signed_agreement"
      accept=".pdf,.jpg,.jpeg,.png"
      file={files.signed_agreement}
      onChange={handleFileChange}
      required
      hint="Upload your signed copy (PDF or scanned image)"
    />
  </div>
)}
```

**Step 2: Commit**

```bash
git add components/Pages/Vets.tsx
git commit -m "feat: add step 4 liability agreement with upload"
```

---

### Task 8: Implement Supabase Storage upload logic

**Files:**
- Modify: `components/Pages/Vets.tsx` (replace `handleSubmit`)

**What to do:**

Replace the existing `handleSubmit` function with this version that uploads files to Supabase Storage before inserting the DB row:

```typescript
const uploadFile = async (file: File, fieldName: string): Promise<string> => {
  if (!supabase) throw new Error('Supabase not configured');
  const path = `${Date.now()}-${fieldName}-${file.name}`;
  const { data, error } = await supabase.storage.from('vet-docs').upload(path, file);
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage.from('vet-docs').getPublicUrl(data.path);
  return publicUrl;
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateStep()) {
    setError('Please upload the signed agreement before submitting.');
    return;
  }
  setIsSubmitting(true);
  setError(null);

  if (!supabase) {
    setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
    setIsSubmitting(false);
    return;
  }

  try {
    // Upload all files in parallel
    const [photo_url, registration_cert_url, cv_url, signed_agreement_url] = await Promise.all([
      uploadFile(files.photo!, 'photo'),
      uploadFile(files.registration_cert!, 'registration_cert'),
      uploadFile(files.cv!, 'cv'),
      uploadFile(files.signed_agreement!, 'signed_agreement'),
    ]);

    const payload = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      aadhar_number: formData.aadhar_number,
      photo_url,
      degree: formData.degree,
      college: formData.college,
      graduation_year: Number(formData.graduation_year),
      state_vc_reg_number: formData.state_vc_reg_number,
      ivpr_vci_number: formData.ivpr_vci_number,
      registration_cert_url,
      cv_url,
      clinic_type: formData.clinic_type,
      clinic_name: formData.clinic_name || null,
      clinic_location: formData.clinic_location || null,
      animal_specialisation: formData.animal_specialisation || null,
      home_visit_aware: formData.home_visit_aware,
      commute_distance_km: Number(formData.commute_distance_km),
      visits_per_week: Number(formData.visits_per_week),
      signed_agreement_url,
    };

    const { error: supabaseError } = await supabase.from('vet_signups').insert([payload]);
    if (supabaseError) throw supabaseError;

    setIsSuccess(true);
  } catch (err) {
    console.error(err);
    setError('Something went wrong uploading your files or saving your application. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

**Step 2: Commit**

```bash
git add components/Pages/Vets.tsx
git commit -m "feat: implement Supabase Storage file uploads on submit"
```

---

### Task 9: Supabase schema — document required table changes

**Files:**
- No code change — this task is a reminder about DB setup.

**What to do:**

In the Supabase dashboard, run this SQL to add the new columns to `vet_signups`. The existing columns stay untouched.

```sql
ALTER TABLE vet_signups
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS aadhar_number text,
  ADD COLUMN IF NOT EXISTS photo_url text,
  ADD COLUMN IF NOT EXISTS degree text,
  ADD COLUMN IF NOT EXISTS college text,
  ADD COLUMN IF NOT EXISTS graduation_year int,
  ADD COLUMN IF NOT EXISTS state_vc_reg_number text,
  ADD COLUMN IF NOT EXISTS ivpr_vci_number text,
  ADD COLUMN IF NOT EXISTS registration_cert_url text,
  ADD COLUMN IF NOT EXISTS cv_url text,
  ADD COLUMN IF NOT EXISTS clinic_type text,
  ADD COLUMN IF NOT EXISTS clinic_location text,
  ADD COLUMN IF NOT EXISTS animal_specialisation text,
  ADD COLUMN IF NOT EXISTS home_visit_aware boolean,
  ADD COLUMN IF NOT EXISTS commute_distance_km int,
  ADD COLUMN IF NOT EXISTS visits_per_week int,
  ADD COLUMN IF NOT EXISTS signed_agreement_url text;
```

Also create the `vet-docs` storage bucket in Supabase: Storage → New bucket → name: `vet-docs` → toggle Public on.

**No commit needed for this task.**

---

### Task 10: Smoke test the full flow

**What to do:**

1. Run `bun run dev`
2. Navigate to the Vets page via the navbar
3. Fill in Step 1 — try clicking Next with an empty field, confirm error shows
4. Fill all Step 1 fields including uploading a photo, advance to Step 2
5. Fill Step 2 credentials and upload the two files, advance to Step 3
6. Test all three clinic type radio options — confirm clinic name/location appear/disappear
7. Fill Step 3 and advance to Step 4
8. Download the agreement PDF link (will 404 locally — expected), upload any file as the signed agreement
9. Click Submit — confirm success screen appears
10. Check Supabase dashboard → Table Editor → `vet_signups` to verify the row was inserted with all URLs populated

**Step 2: Final commit**

```bash
git add .
git commit -m "feat: complete vet application multi-step wizard with file uploads"
```
