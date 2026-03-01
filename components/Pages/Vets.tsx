import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CalendarCheck, ShieldCheck, PawPrint, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Page } from '../../App';

interface VetsProps {
  navigate: (page: Page) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const benefits = [
  {
    icon: Users,
    title: 'Grow Your Clientele',
    desc: 'Reach thousands of pet owners actively looking for trusted, licensed vets in their area.',
  },
  {
    icon: CalendarCheck,
    title: 'Streamlined Scheduling',
    desc: 'Manage all your appointments through our platform — no more back-and-forth phone calls.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified & Trusted',
    desc: 'Join a network of certified, reviewed professionals that pet owners rely on every day.',
  },
];

const steps = [
  { number: '01', title: 'Apply', desc: 'Fill out the form below with your credentials and specialty.' },
  { number: '02', title: 'Get Verified', desc: 'We review your license and credentials within 2 business days.' },
  { number: '03', title: 'Start Seeing Patients', desc: 'Go live on the platform and start accepting bookings immediately.' },
];

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

export const Vets: React.FC<VetsProps> = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [files, setFiles] = useState(INITIAL_FILES);
  const [step, setStep] = useState(0); // 0-indexed, 0–3
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!supabase) {
      setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      setIsSubmitting(false);
      return;
    }

    const { error: supabaseError } = await supabase.from('vet_signups').insert([formData]);

    if (supabaseError) {
      setError('Something went wrong. Please try again or contact us directly.');
      setIsSubmitting(false);
    } else {
      setIsSuccess(true);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#f8f4e8' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-32 px-6"
        style={{ backgroundColor: '#282239' }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[130px]"
            style={{ backgroundColor: 'rgba(30,52,112,0.30)' }}
          />
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]"
            style={{ backgroundColor: 'rgba(168,180,216,0.10)' }}
          />
        </div>

        {/* Paw watermark */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none">
          <PawPrint size={320} strokeWidth={0.8} className="text-white" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#a8b4d8' }} />
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: '#a8b4d8' }}
            >
              For Veterinarians
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
          >
            Partner With{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(to right, #a8b8e8, #c8b4f0)' }}
            >
              PawGuardian
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Join India's fastest-growing home-visit vet network. Expand your practice, set your
            own schedule, and make a real difference in the lives of pets and their families.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
          >
            {[
              { value: '500+', label: 'Partner Vets' },
              { value: '10K+', label: 'Pet Owners' },
              { value: 'Verified', label: 'Platform' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center px-8 py-4 rounded-2xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(168,180,216,0.15)',
                }}
              >
                <span className="text-3xl font-extrabold text-white">{value}</span>
                <span className="text-sm mt-1" style={{ color: '#a8b4d8' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Benefits Grid ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#f8f4e8' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="font-semibold tracking-wide uppercase text-sm"
              style={{ color: '#1e3470' }}
            >
              Why Join Us
            </span>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
              Built for <span style={{ color: '#1e3470' }}>Vets First</span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
              We handle the logistics so you can focus on what matters — delivering outstanding
              care to every patient.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col gap-4 hover:shadow-xl transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(30,52,112,0.08)' }}
                >
                  <Icon size={26} strokeWidth={1.6} style={{ color: '#1e3470' }} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#1e3470' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="font-semibold tracking-wide uppercase text-sm"
              style={{ color: '#a8b4d8' }}
            >
              The Process
            </span>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-white">
              How It Works
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 relative">
            {/* Connecting line — desktop only */}
            <div
              className="hidden sm:block absolute top-10 left-[16.67%] right-[16.67%] h-px"
              style={{ backgroundColor: 'rgba(168,180,216,0.25)' }}
            />

            {steps.map(({ number, title, desc }, i) => (
              <motion.div
                key={number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center relative z-10"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(168,180,216,0.25)',
                  }}
                >
                  <span className="text-2xl font-black text-white">{number}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: '#a8b4d8' }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signup Form ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#f8f4e8' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="font-semibold tracking-wide uppercase text-sm"
              style={{ color: '#1e3470' }}
            >
              Get Started
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Apply to Join
            </h2>
            <p className="mt-3 text-gray-500 leading-relaxed">
              Fill in your details below and we'll get back to you within 2 business days.
            </p>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10"
          >
            {isSuccess ? (
              <div className="text-center py-10">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: 'rgba(30,52,112,0.08)' }}
                >
                  <CheckCircle2 size={32} style={{ color: '#1e3470' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Received!</h3>
                <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
                  We'll review your details and get back to you within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Full Name"
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Dr. Priya Sharma"
                    required
                  />
                  <Field
                    label="Clinic / Hospital Name"
                    name="clinic_name"
                    type="text"
                    value={formData.clinic_name}
                    onChange={handleChange}
                    placeholder="PetCare Clinic"
                    required
                  />
                </div>

                <Field
                  label="License Number"
                  name="license_number"
                  type="text"
                  value={formData.license_number}
                  onChange={handleChange}
                  placeholder="VCI-XXXX-XXXX"
                  required
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="dr.priya@example.com"
                    required
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 99887 76655"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="City / Location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Bengaluru"
                    required
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">
                      Specialty <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      required
                      className="rounded-xl border px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 transition-shadow bg-white"
                      style={{
                        borderColor: 'rgba(30,52,112,0.20)',
                        focusRingColor: '#1e3470',
                      } as React.CSSProperties}
                    >
                      <option value="" disabled>Select specialty…</option>
                      <option value="Small Animals">Small Animals</option>
                      <option value="Large Animals">Large Animals</option>
                      <option value="Exotic Pets">Exotic Pets</option>
                      <option value="General Practice">General Practice</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full font-semibold text-white text-sm transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    backgroundColor: '#1e3470',
                    boxShadow: '0 4px 14px rgba(30,52,112,0.30)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting)
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#19296a';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1e3470';
                  }}
                >
                  {isSubmitting ? 'Submitting…' : 'Submit Application'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

// ── Reusable field component ────────────────────────────────────────────────

interface FieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, name, type, value, onChange, placeholder, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3470]/30 transition-shadow"
      style={{ borderColor: 'rgba(30,52,112,0.20)' }}
    />
  </div>
);

// ── Progress bar for step wizard ────────────────────────────────────────────

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

// ── Styled file upload field ─────────────────────────────────────────────────

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
