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

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight mb-8 text-text-primary leading-[1.1]"
        >
          World-class pet care, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-amber-500">
            delivered home.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          India's first subscription-based preventive care ecosystem. Stop stressing your pet with clinic visits—get vet-grade diagnostics and expert guidance right at your door.
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

        {/* Trust Signal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-3 mb-20"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Parent" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-surface flex items-center justify-center shadow-sm z-10 text-xs font-bold text-text-secondary">
              +2k
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
            <div className="flex text-amber-400 gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span>Trusted by early adopters</span>
          </div>
        </motion.div>

        {/* Hero Product Image / Dashboard Mockup frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto rounded-[2rem] p-3 md:p-4 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]"
        >
          <div className="relative rounded-[1.5rem] overflow-hidden aspect-video shadow-sm border border-border/50">
            <img
              src="/hero-bg-sunset.jpg"
              alt="PawGuardian at home care"
              className="w-full h-full object-cover"
            />
            {/* Soft inner shadow for premium feel */}
            <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] rounded-[1.5rem] pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};