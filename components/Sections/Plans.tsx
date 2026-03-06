import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { Page } from '../../App';
import { HeartPulse, Activity, ShieldCheck } from 'lucide-react';

const stages = [
    {
        title: "Young Pet",
        subtitle: "Build a healthy foundation.",
        desc: "Boost immunity and establish health baselines.",
        features: ["Core vaccinations", "Deworming schedules", "Spay/neuter advice", "Nutrition guide"],
        icon: ShieldCheck,
        color: '#FF8E00'
    },
    {
        title: "Adult Pet",
        subtitle: "Maintain health & prevent.",
        desc: "Keep them active and catch minor issues early.",
        features: ["Annual lab panels", "Dental monitoring", "Parasite protection", "Weight management"],
        icon: Activity,
        color: '#FD7702'
    },
    {
        title: "Senior Pet",
        subtitle: "Comfort & chronic care.",
        desc: "Ensure a high quality of life in their golden years.",
        features: ["Organ screening", "Mobility support", "Pain management", "Cognitive checks"],
        icon: HeartPulse,
        color: '#FF5003'
    }
];

interface PlansProps {
    navigate: (page: Page) => void;
}

export const Plans: React.FC<PlansProps> = ({ navigate }) => {
    return (
        <section id="plans" className="py-12 md:py-24 relative overflow-hidden bg-transparent">
            {/* Background Effects removed to allow global App.tsx glow to show perfectly seamlessly */}

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-6"
                        style={{ color: '#002347' }}
                    >
                        Plans for Every Life Stage
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl font-medium max-w-2xl mx-auto"
                        style={{ color: '#003366' }}
                    >
                        Proactive care that grows with your pet.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {stages.map((stage, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            viewport={{ once: true }}
                            className="bg-surface p-8 rounded-[1.5rem] transition-all flex flex-col h-full group hover:-translate-y-1.5 duration-200 ease-in-out"
                            style={{
                                boxShadow: '0 10px 40px rgba(0, 35, 71, 0.05)',
                                border: '1px solid rgba(0, 35, 71, 0.08)'
                            }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-4 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ease-in-out shadow-sm" style={{ backgroundColor: `${stage.color}15`, color: stage.color }}>
                                    <stage.icon size={32} strokeWidth={2.5} />
                                </div>
                            </div>

                            <h3 className="text-2xl font-extrabold mb-1" style={{ color: '#002347' }}>{stage.title}</h3>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: stage.color }}>
                                {stage.subtitle}
                            </h4>
                            <p className="text-sm leading-relaxed mb-8 flex-grow" style={{ color: '#003F7D' }}>
                                {stage.desc}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {stage.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 p-2 rounded-lg hover:bg-orange-50/50 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: stage.color }} />
                                        <span className="text-sm font-medium" style={{ color: '#003366' }}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button
                        size="lg"
                        className="text-white border-none shadow-lg px-12 transition-transform hover:scale-105"
                        style={{ backgroundColor: '#FF8E00', boxShadow: '0 8px 24px rgba(255,142,0,0.35)' }}
                        onClick={() => navigate('services')}
                    >
                        View Detailed Plans
                    </Button>
                </div>
            </div>
        </section>
    );
};

