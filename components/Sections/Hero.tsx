import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, PawPrint, Star } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-transparent">
      {/* SaaS Grid Pattern (Subtle) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Early Access Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full bg-surface border border-border text-accent-orange shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
            </span>
            Accepting Early Access
          </span>
        </motion.div>

        {/* Floating Refined Annotations */}
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute top-16 left-4 md:left-12 hidden lg:flex items-center gap-3 text-accent-orange"
        >
          <span className="font-semibold text-sm xl:text-base tracking-tight" style={{ color: '#FF8E00' }}>Subscription Care</span>
          <svg width="45" height="25" viewBox="0 0 45 25" fill="none" className="opacity-60">
            <path d="M2 2C15 2 25 10 40 22M40 22L32 20M40 22L38 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 20, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 6 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute top-12 right-4 md:right-8 hidden lg:flex items-center gap-3 text-[#003F7D]"
        >
          <svg width="45" height="25" viewBox="0 0 45 25" fill="none" className="opacity-60 -scale-x-100">
            <path d="M2 2C15 2 25 10 40 22M40 22L32 20M40 22L38 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-semibold text-sm xl:text-base tracking-tight">Preventive First</span>
        </motion.div>

        {/* Bottom Left */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-40 left-12 md:left-20 hidden lg:flex flex-col items-start gap-1 text-teal-600"
        >
          <span className="font-semibold text-sm xl:text-base tracking-tight">At-Home Diagnostics</span>
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="opacity-60 -scale-x-100">
            <path d="M58 2C45 2 30 15 2 18M2 18L10 16M2 18L4 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, x: 20, rotate: -3 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute bottom-36 right-12 md:right-20 hidden lg:flex flex-col items-end gap-1 text-purple-600"
        >
          <span className="font-semibold text-sm xl:text-base tracking-tight">Complete Ecosystem</span>
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="opacity-60">
            <path d="M58 2C45 2 30 15 2 18M2 18L10 16M2 18L4 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight mb-8 text-text-primary leading-[1.1] relative z-10"
        >
          Revolutionising <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-amber-500">
            Pet Care.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Vet-grade diagnostics and expert guidance at your door. No more stressful clinic visits.
        </motion.p>

        {/* Buttons & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            size="lg"
            onClick={onOpenBooking}
            variant="primary"
            className="w-full sm:w-auto px-8 group font-semibold text-[15px]"
          >
            <span>Join the Waitlist</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>

          <a
            href="https://whatsapp.com/channel/0029VbC9jX1CXC3Lhz8rRv3A"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 font-semibold text-[15px] bg-white hover:bg-gray-50 text-text-primary"
            >
              Get Updates via WhatsApp
            </Button>
          </a>
        </motion.div>



      </div>
    </section>
  );
};