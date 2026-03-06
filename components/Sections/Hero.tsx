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

        {/* Floating Hand-Drawn Annotations */}
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: -12 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute top-12 left-0 md:left-12 hidden lg:flex items-end gap-2 text-accent-orange"
        >
          <span className="font-medium text-sm xl:text-base border-b-2 border-accent-orange/30 pb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>Subscription Based</span>
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="translate-y-4">
            <path d="M10 20 Q 50 20, 80 80 m -20 -10 l 20 10 l 0 -20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 20, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute top-8 right-0 md:right-4 hidden lg:flex items-end gap-2 text-blue-600"
        >
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="translate-y-4 -scale-x-100">
            <path d="M10 20 Q 50 20, 80 80 m -20 -10 l 20 10 l 0 -20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium text-sm xl:text-base border-b-2 border-blue-600/30 pb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>Diagnostics, Preventive &gt; Reactive</span>
        </motion.div>

        {/* Bottom Left */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: 6 }}
          animate={{ opacity: 1, x: 0, rotate: 4 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-32 left-8 md:left-16 hidden lg:flex flex-col items-center gap-1 text-teal-600"
        >
          <svg width="30" height="50" viewBox="0 0 50 100" fill="none" className="rotate-12 translate-x-4">
            <path d="M25 90 Q 40 50, 25 10 m -10 20 l 10 -20 l 10 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium text-sm xl:text-base border-b-2 border-teal-600/30 pb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>At Home as far as possible</span>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, x: 20, rotate: -6 }}
          animate={{ opacity: 1, x: 0, rotate: -4 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute bottom-28 right-8 md:right-16 hidden lg:flex flex-col items-center gap-1 text-purple-600"
        >
          <svg width="30" height="50" viewBox="0 0 50 100" fill="none" className="-rotate-12 -translate-x-4">
            <path d="M25 90 Q 10 50, 25 10 m -10 20 l 10 -20 l 10 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium text-sm xl:text-base border-b-2 border-purple-600/30 pb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>Ecosystem - everything under one roof</span>
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