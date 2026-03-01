import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: '#f8f4e8' }}>
      {/* Mesh Background */}
      <div className="absolute inset-0 opacity-80" style={{ background: 'linear-gradient(to top right, rgba(30,52,112,0.06), #f8f4e8, rgba(40,34,57,0.05))' }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(30,52,112,0.2), transparent)' }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
        >
          Your Pet Can’t Tell You When Something’s Wrong. <span style={{ color: '#1e3470' }}>We Can.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-12 leading-relaxed"
        >
          Stop waiting for symptoms. Stop stressing your pet with clinic visits. <br className="hidden md:block" />
          Start caring before it’s urgent.
        </motion.p>

        <p className="mt-8 text-sm text-gray-500">Join PawGuardian today and be part of India’s preventive pet-care movement.</p>
      </div>
    </section>
  );
};