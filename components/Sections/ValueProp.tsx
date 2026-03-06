import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home, Wallet, Activity, ChevronDown, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';

const MaskedSymptomsCard = () => {
    return (
        <div className="mt-6 space-y-4">
            <div className="bg-white p-6 rounded-2xl text-gray-900 shadow-xl" style={{ border: '1px solid rgba(0,35,71,0.08)' }}>
                <div className="flex items-start gap-4 mb-4">
                    <div className="bg-[#FF8E00]/10 p-2 rounded-xl text-[#FF8E00] shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-[#003F7D]">More than 6 out of 10 pets instinctively hide their symptoms.</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                    Catching issues late is dangerous and 3x more expensive. Stay ahead with regular diagnostics.
                </p>
            </div>
        </div>
    );
};

export const ValueProp: React.FC = () => {
    return (
        <section id="value" className="py-12 md:py-24 relative bg-transparent">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
                    >
                        Proactive Care, At Home
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto"
                    >
                        We make pet health easy, stress-free, and affordable.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
                    {/* Left Column: The Cost Card - Adjusted sizing */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full max-w-lg mx-auto lg:mx-0"
                    >
                        <MaskedSymptomsCard />
                    </motion.div>

                    {/* Right Column: The Solution */}
                    <div className="space-y-8">
                        {/* Removed the extra "From Reactive to Proactive" as it overlaps with the main headline now */}

                        <div className="grid gap-5">
                            <Card className="bg-white border transition-all duration-200 group hover:shadow-lg" style={{ borderColor: 'rgba(0,35,71,0.08)' }}>
                                <div className="flex items-start gap-4 p-5">
                                    <div
                                        className="p-3 rounded-xl transition-colors shrink-0"
                                        style={{ backgroundColor: 'rgba(255,142,0,0.15)', color: '#FF8E00' }}
                                    >
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div className="flex-1 mt-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#003F7D]">Expert Oversight</h4>
                                        </div>
                                        <div className="md:mt-2">
                                            <p className="text-gray-600 text-sm leading-relaxed">Licensed veterinarians manage every detail of your pet's health plan.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-white border transition-all duration-200 group hover:shadow-lg" style={{ borderColor: 'rgba(0,35,71,0.08)' }}>
                                <div className="flex items-start gap-4 p-5">
                                    <div
                                        className="p-3 rounded-xl transition-colors shrink-0"
                                        style={{ backgroundColor: 'rgba(255,142,0,0.15)', color: '#FF8E00' }}
                                    >
                                        <AlertCircle size={24} />
                                    </div>
                                    <div className="flex-1 mt-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#003F7D]">Early Detection</h4>
                                        </div>
                                        <div className="md:mt-2">
                                            <p className="text-gray-600 text-sm leading-relaxed">Catch health issues before they become emergencies.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-white border transition-all duration-200 group hover:shadow-lg" style={{ borderColor: 'rgba(0,35,71,0.08)' }}>
                                <div className="flex items-start gap-4 p-5">
                                    <div
                                        className="p-3 rounded-xl transition-colors shrink-0"
                                        style={{ backgroundColor: 'rgba(255,142,0,0.15)', color: '#FF8E00' }}
                                    >
                                        <Home size={24} />
                                    </div>
                                    <div className="flex-1 mt-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#003F7D]">Stress-Free Visits</h4>
                                        </div>
                                        <div className="md:mt-2">
                                            <p className="text-gray-600 text-sm leading-relaxed">No clinic travel or waiting rooms. We come to you.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-white border transition-all duration-200 group hover:shadow-lg" style={{ borderColor: 'rgba(0,35,71,0.08)' }}>
                                <div className="flex items-start gap-4 p-5">
                                    <div
                                        className="p-3 rounded-xl transition-colors shrink-0"
                                        style={{ backgroundColor: 'rgba(255,142,0,0.15)', color: '#FF8E00' }}
                                    >
                                        <Wallet size={24} />
                                    </div>
                                    <div className="flex-1 mt-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#003F7D]">Predictable Costs</h4>
                                        </div>
                                        <div className="md:mt-2">
                                            <p className="text-gray-600 text-sm leading-relaxed">One flat subscription. No surprise emergency bills.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};